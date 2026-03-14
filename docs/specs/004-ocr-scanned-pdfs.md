# SPEC-004: Scanned PDF Handling + OCR

**Status:** shipped (OCR via Tesseract)  
**Created:** 2026-02-25  
**Updated:** 2026-07-12  
**Author:** Léa 🏔️

## Problem
PDFs containing only scanned images return empty text from unpdf, blocking analysis for a common contract format (many Swiss tenancy and employment contracts are scanned).

## Solution

### Phase 1 (shipped 2026-03-06): Graceful rejection
When extracted text < 100 chars, return `ERR_SCANNED_PDF` with a clear error message.

### Phase 2 (shipped 2026-07-12): OCR fallback via Tesseract
When text extraction yields < 100 chars and the `tesseract` binary is available:
1. Render each PDF page to a PNG image using `pdf-to-img`
2. Run `tesseract` on each page with `eng+deu+fra+ita` languages
3. Concatenate results and proceed with normal analysis
4. If OCR also yields < 100 chars, return `ERR_SCANNED_PDF` with updated error message

## Acceptance Criteria
- [x] Scanned PDFs with readable text: OCR extracts text → analysis proceeds
- [x] Truly unreadable PDFs: user receives clear error (updated message mentioning OCR was attempted)
- [x] Normal (text-based) PDFs unaffected (OCR not invoked)
- [x] Error message translated in all 4 locales
- [x] Max pages limit enforced (20 pages)
- [x] Temp files created during OCR are deleted immediately after use
- [x] Graceful fallback when tesseract binary not available (local dev)

## Technical Notes
- **PDF rendering:** `pdf-to-img` (uses pdfjs internally, works in Node.js without canvas)
- **OCR engine:** `tesseract-ocr` binary installed in Docker image (Alpine package)
- **Languages:** `eng` (default) + `deu` + `fra` + `ita` — covering all 4 Swiss national languages
- **Scale factor:** 2.0× for good OCR quality
- **Timeout:** 30 seconds per page max
- **Privacy:** temp PNG files written to `/tmp/ocr-*`, deleted immediately after OCR
- **Docker:** `tesseract-ocr` + language data packs added to runtime stage (~15MB)
- **Local dev:** if `tesseract` binary not found, falls back to old ERR_SCANNED_PDF behavior
- **Config:** `pdf-to-img` added to `serverExternalPackages` in next.config.ts
