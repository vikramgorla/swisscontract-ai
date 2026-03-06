# SPEC-004: OCR for Scanned PDFs

**Status:** shipped  
**Created:** 2026-02-25  
**Author:** Léa 🏔️

## Problem
PDFs containing only scanned images return empty text from unpdf, causing "Contract text is too short or empty" error.

## Solution
OCR fallback: when extracted text < 100 chars, a clear error is returned asking the user to upload a searchable (text-based) PDF. Infomaniak AI models are text-only and do not support native PDF vision.

## Acceptance Criteria
- [x] Scanned PDFs: user receives clear error asking for text-based PDF
- [x] Normal (text-based) PDFs unaffected
- [x] Error message is informative if OCR also fails
- [x] Max pages limit enforced (20 pages)

## Technical Notes
- Uses unpdf for text extraction; scanned PDFs (< 100 chars) return a user-facing error
- **No OffscreenCanvas needed** — OffscreenCanvas is NOT available in Node.js 22 or Vercel
- The pdfjs-dist canvas rendering approach was evaluated and rejected due to Node.js canvas incompatibility
- Text is extracted in-memory using unpdf; no external OCR service is used
- For scanned PDFs, users are asked to provide a searchable PDF or Word document
- pdfjs-dist remains in serverExternalPackages for future use / unpdf compatibility
- OCR adds ~5-10s to processing time for scanned docs
- No additional API calls for OCR — handled entirely server-side with unpdf
