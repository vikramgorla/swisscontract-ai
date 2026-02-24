import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { checkRateLimit } from '../../lib/rateLimit';


export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_PAGES = 20;

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a Swiss contract analysis assistant. Analyse the provided contract and return a structured JSON response with:
1. summary: A 2-3 paragraph plain-English summary of what the contract is about
2. contract_type: Type of contract (employment, tenancy, NDA, freelance, other)
3. key_terms: Array of 5-8 key terms/clauses explained in plain English
4. red_flags: Array of concerning clauses or unusual terms (can be empty)
5. positive_clauses: Array of notably good/fair clauses (can be empty)
6. swiss_law_notes: Any Switzerland-specific legal context relevant to this contract
7. language: Detected language of the contract

Be practical and helpful. Use plain English. Avoid legal jargon.
Format each item in key_terms, red_flags, positive_clauses as: { title: string, explanation: string }

Return ONLY valid JSON, no markdown, no code blocks.`;

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown';

    const rate = checkRateLimit(ip);
    if (!rate.allowed) {
      const resetIn = Math.ceil((rate.resetAt - Date.now()) / 1000 / 60 / 60);
      return NextResponse.json(
        { error: `Daily limit reached. You can analyse up to ${5} documents per day. Resets in ~${resetIn}h.` },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum size is 5MB.' }, { status: 400 });
    }

    // Check file type
    const allowedTypes = ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    const allowedExtensions = ['.pdf', '.txt', '.docx', '.doc'];
    const fileName = file.name.toLowerCase();
    const hasAllowedExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

    if (!allowedTypes.includes(file.type) && !hasAllowedExtension) {
      return NextResponse.json({ error: 'Unsupported file format. Please upload a PDF, Word document (.docx), or text file.' }, { status: 400 });
    }

    // Extract text — nothing is stored at any point
    let contractText = '';

    if (file.type === 'application/pdf' || fileName.endsWith('.pdf')) {
      const arrayBuffer = await file.arrayBuffer();

      try {
        const { extractText, getDocumentProxy } = await import('unpdf');

        // Check page count with a fresh buffer copy
        const pdf = await getDocumentProxy(new Uint8Array(arrayBuffer.slice(0)));
        const pageCount = pdf.numPages;
        await pdf.destroy();

        if (pageCount > MAX_PAGES) {
          return NextResponse.json(
            { error: `Document has ${pageCount} pages. Maximum allowed is ${MAX_PAGES} pages. Please upload a shorter document.` },
            { status: 400 }
          );
        }

        // Extract text with a fresh buffer copy — original arrayBuffer released after this scope
        const { text } = await extractText(new Uint8Array(arrayBuffer.slice(0)), { mergePages: true });
        contractText = text;
      } catch (pdfError) {
        console.error('PDF extraction failed:', pdfError);
        return NextResponse.json({ error: 'Could not extract text from PDF. Please ensure the PDF contains readable text (not scanned images).' }, { status: 400 });
      }

    } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc') ||
               file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
               file.type === 'application/msword') {
      const arrayBuffer = await file.arrayBuffer();

      try {
        const mammoth = await import('mammoth');
        const result = await mammoth.extractRawText({ buffer: Buffer.from(arrayBuffer) });
        contractText = result.value;

        if (result.messages.length > 0) {
          console.info('mammoth warnings:', result.messages);
        }
      } catch (docError) {
        console.error('Word document extraction failed:', docError);
        return NextResponse.json({ error: 'Could not extract text from Word document. Please try saving as PDF or .txt instead.' }, { status: 400 });
      }

    } else {
      // Plain text
      contractText = await file.text();
    }

    if (!contractText || contractText.trim().length < 50) {
      return NextResponse.json({ error: 'Contract text is too short or empty. Please upload a valid contract document.' }, { status: 400 });
    }

    // Truncate if too long — only the truncated text string is sent to the AI, never the raw file
    const maxChars = 50000;
    if (contractText.length > maxChars) {
      contractText = contractText.substring(0, maxChars) + '\n\n[Document truncated — first 50,000 characters analysed]';
    }

    // Send to AI — only the extracted text string is transmitted, not the file
    const message = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Please analyse this contract:\n\n${contractText}`,
        },
      ],
    });

    // Clear the contract text from memory immediately after sending
    contractText = '';

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

    let analysis;
    try {
      analysis = JSON.parse(responseText);
    } catch {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        console.error('Failed to parse Claude response:', responseText);
        return NextResponse.json({ error: 'Failed to parse analysis response. Please try again.' }, { status: 500 });
      }
    }

    // Only the structured analysis result is returned — no document content, no raw text
    return NextResponse.json({ success: true, analysis });
  } catch (error) {
    console.error('Analysis error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json({ error: 'API configuration error. Please contact support.' }, { status: 500 });
      }
      return NextResponse.json({ error: `Analysis failed: ${error.message}` }, { status: 500 });
    }
    
    return NextResponse.json({ error: 'An unexpected error occurred. Please try again.' }, { status: 500 });
  }
}
