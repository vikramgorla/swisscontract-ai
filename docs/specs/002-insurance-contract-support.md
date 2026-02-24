# SPEC-002: Insurance Contract Support + Hero Copy Refinement

**Status:** shipped  
**Created:** 2026-02-24  
**Author:** Léa (SwissContract Agent)

## Problem
- Insurance contracts are common in Switzerland (health, liability, household, life) but not listed as a supported contract type
- Hero subtitle mentions file formats (PDF, Word, text) which is redundant — that info is already in the upload zone

## Changes

### 1. Add insurance contract type
- Add `insurance` to the contract type list in the AI prompt and UI labels
- Display label: "Insurance Contract"
- Badge colour: `bg-teal-100 text-teal-800`

### 2. Shorten hero subtitle
**Before:** "Upload your employment, tenancy, or NDA contract (PDF, Word, or text) — get a plain-English summary with red flags highlighted and Swiss law context."

**After:** "Upload your employment, tenancy, insurance, or NDA contract — get a plain-English summary with red flags highlighted and Swiss law context."

## Acceptance Criteria
- [x] `insurance` added to contract type enum in API prompt
- [x] `insurance` label + badge colour added to AnalysisResult component
- [x] Hero subtitle updated (shorter, includes insurance, no file format mention)
- [x] `page.tsx` JSON-LD featureList updated to include insurance contracts
- [x] Spec status: shipped

## Open Questions
- None
