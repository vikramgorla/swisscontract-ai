# SPEC-008: Download Results as PDF

**Status:** shipped  
**Version:** v0.6.0

## Summary
Download button in analysis results that generates a clean PDF of the contract analysis via browser print dialog.

## Acceptance Criteria
- [x] "Download PDF" button in results header, next to reset button
- [x] Opens print-friendly HTML in new window with all sections expanded
- [x] Includes: summary, key terms, red flags, positive clauses, Swiss law context, Q&A (if present), disclaimer
- [x] Clean inline-styled layout optimised for print/PDF
- [x] Translated in all 4 languages
- [x] Zero new npm dependencies — browser print API only

## Implementation
- `AnalysisResult.tsx`: `buildPrintHtml()` generates standalone HTML; `handleDownloadPdf()` opens new window + triggers `window.print()`
- `translations.ts`: `download_pdf` key in all locales
- `HomeClient.tsx`: passes `download: t.download_pdf` in labels prop
