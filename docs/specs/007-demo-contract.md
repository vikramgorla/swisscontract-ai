# SPEC-007: Demo Contract Mode

**Status:** shipped  
**Version:** v0.6.0

## Summary
"Try with a sample" button that loads a pre-built Swiss employment contract and auto-triggers analysis — zero friction for first-time visitors.

## Acceptance Criteria
- [x] Sample contract file at `public/samples/employment-contract-en.txt`
- [x] Realistic Swiss employment contract (Alpine Tech Solutions AG, Zürich)
- [x] Includes intentionally aggressive non-compete clause for red flag detection
- [x] One-click: loads contract, auto-checks awareness box, triggers analysis
- [x] Translated button in all 4 languages (EN/DE/FR/IT)
- [x] Button hidden once file is selected or analysis is running

## Implementation
- `HomeClient.tsx`: `handleLoadDemo()` fetches sample, creates File, calls `setAwarenessChecked(true)` + `runAnalysis(file)`
- `translations.ts`: `demo_btn` and `demo_loading` keys in all locales
- No auto-submit bypass — uses the same `runAnalysis` path as manual uploads
