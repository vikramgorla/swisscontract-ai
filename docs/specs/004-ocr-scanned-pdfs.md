# SPEC-004: OCR for Scanned PDFs

**Status:** shipped  
**Created:** 2026-02-25  
**Author:** Léa 🏔️

## Problem
PDFs containing only scanned images return empty text from unpdf, causing "Contract text is too short or empty" error.

## Solution
Claude vision OCR fallback: when extracted text < 100 chars, send the raw PDF as a base64 `document` block directly to Claude, which natively renders and extracts text from PDF pages — no canvas or pdfjs rendering required.

## Acceptance Criteria
- [x] Scanned PDFs are processed via Claude vision OCR
- [x] Normal (text-based) PDFs unaffected
- [x] Error message is informative if OCR also fails
- [x] Max pages limit respected for OCR too (Claude enforces its own limits)

## Technical Notes
- Uses Claude's native PDF document support (`DocumentBlockParam` with `Base64PDFSource`)
- **No OffscreenCanvas needed** — OffscreenCanvas is NOT available in Node.js 22 or Vercel
- The pdfjs-dist canvas rendering approach was evaluated and rejected due to Node.js canvas incompatibility
- Instead, the raw PDF bytes are base64-encoded and sent directly to Claude as a `document` content block
- Claude handles page rendering and OCR internally — same quality, zero server-side dependencies
- pdfjs-dist remains in serverExternalPackages for future use / unpdf compatibility
- OCR adds ~5-10s to processing time for scanned docs
- Same Claude client, separate `messages.create` call before main analysis
