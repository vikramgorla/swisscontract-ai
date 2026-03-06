# SPEC-004: Scanned PDF Handling

**Status:** shipped (graceful rejection — no OCR)  
**Created:** 2026-02-25  
**Updated:** 2026-03-06  
**Author:** Léa 🏔️

## Problem
PDFs containing only scanned images return empty text from unpdf, causing "Contract text is too short or empty" error.

## Solution
Graceful error handling: when extracted text < 100 chars, a clear error (`ERR_SCANNED_PDF`) is returned asking the user to upload a searchable (text-based) PDF or Word document. **No OCR is performed** — Infomaniak AI models are text-only and do not support native PDF vision.

OCR was evaluated and deferred due to Node.js canvas incompatibility and the complexity of self-hosted Tesseract. May be revisited in future.

## Acceptance Criteria
- [x] Scanned PDFs: user receives clear error asking for text-based PDF
- [x] Normal (text-based) PDFs unaffected
- [x] Error message is informative and translated in all 4 locales
- [x] Max pages limit enforced (20 pages)

## Technical Notes
- Uses unpdf for text extraction; scanned PDFs (< 100 chars) return `ERR_SCANNED_PDF`
- **No OCR is implemented** — the OffscreenCanvas / pdfjs-dist approach was evaluated and rejected
- For scanned PDFs, users are asked to provide a searchable PDF or Word document
- pdfjs-dist remains in serverExternalPackages for unpdf compatibility
