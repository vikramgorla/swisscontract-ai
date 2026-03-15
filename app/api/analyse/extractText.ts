import { execSync } from 'child_process';
import { writeFileSync, mkdtempSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

const MAX_PAGES = 20;

/**
 * Check if the tesseract binary is available (only in Docker/production).
 */
let tesseractAvailable: boolean | null = null;
function hasTesseract(): boolean {
  if (tesseractAvailable !== null) return tesseractAvailable;
  try {
    execSync('tesseract --version', { timeout: 5000, stdio: 'pipe' });
    execSync('pdftoppm -v', { timeout: 5000, stdio: 'pipe' });
    tesseractAvailable = true;
  } catch {
    tesseractAvailable = false;
  }
  return tesseractAvailable;
}

/**
 * OCR fallback: render PDF pages to images and run Tesseract on each.
 * Temp files are created, used, and deleted immediately — nothing persists.
 */
async function ocrPdfPages(pdfData: Uint8Array): Promise<string> {
  const pages: string[] = [];
  const tempDir = mkdtempSync(join(tmpdir(), 'ocr-'));
  const pdfFile = join(tempDir, 'input.pdf');

  try {
    // Write PDF to temp file for pdftoppm
    writeFileSync(pdfFile, pdfData);

    // Use pdftoppm (poppler-utils) to convert PDF pages to PNG images
    execSync(
      `pdftoppm -png -r 300 -l ${MAX_PAGES} "${pdfFile}" "${join(tempDir, 'page')}"`,
      { timeout: 60000, maxBuffer: 10 * 1024 * 1024 }
    );

    // Process each generated PNG
    const { readdirSync } = await import('fs');
    const pngFiles = readdirSync(tempDir)
      .filter(f => f.startsWith('page-') && f.endsWith('.png'))
      .sort();

    for (const pngFile of pngFiles) {
      const tempFile = join(tempDir, pngFile);
      try {
        const text = execSync(
          `tesseract "${tempFile}" stdout -l eng+deu+fra+ita --psm 3`,
          { timeout: 30000, maxBuffer: 5 * 1024 * 1024 }
        ).toString();
        pages.push(text);
      } catch {
        // OCR failed for this page — skip it
      }
    }
  } finally {
    // Clean up entire temp dir
    try { execSync(`rm -rf "${tempDir}"`); } catch { /* ignore */ }
  }

  return pages.join('\n\n');
}

/**
 * Extract text from the uploaded file (PDF, DOCX, or plain text).
 */
export async function extractText(file: File): Promise<string> {
  const fileName = file.name.toLowerCase();

  if (file.type === 'application/pdf' || fileName.endsWith('.pdf')) {
    const arrayBuffer = await file.arrayBuffer();
    const { extractText: pdfExtract, getDocumentProxy } = await import('unpdf');

    const pdf = await getDocumentProxy(new Uint8Array(arrayBuffer.slice(0)));
    const pageCount = pdf.numPages;
    await pdf.destroy();

    if (pageCount > MAX_PAGES) {
      throw new Error(`Document has ${pageCount} pages. Maximum allowed is ${MAX_PAGES} pages. Please upload a shorter document.`);
    }

    const { text } = await pdfExtract(new Uint8Array(arrayBuffer.slice(0)), { mergePages: true });

    if (text.trim().length < 100) {
      // Scanned PDF detected — try OCR if tesseract is available
      if (hasTesseract()) {
        console.log('[ocr] Scanned PDF detected, attempting OCR...');
        const ocrText = await ocrPdfPages(new Uint8Array(arrayBuffer.slice(0)));
        if (ocrText.trim().length < 100) {
          throw new Error('ERR_SCANNED_PDF'); // OCR also failed
        }
        console.log(`[ocr] OCR succeeded: ${ocrText.trim().length} chars extracted`);
        return ocrText;
      }
      throw new Error('ERR_SCANNED_PDF');
    }

    return text;
  }

  if (fileName.endsWith('.docx') || fileName.endsWith('.doc') ||
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type === 'application/msword') {
    const arrayBuffer = await file.arrayBuffer();
    const mammoth = await import('mammoth');
    const result = await mammoth.extractRawText({ buffer: Buffer.from(arrayBuffer) });
    return result.value;
  }

  // Plain text
  return await file.text();
}
