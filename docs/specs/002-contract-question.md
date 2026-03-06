# SPEC-002: Contract Question

**Status:** shipped  
**Created:** 2026-02-24  
**Author:** Léa 🏔️

## Problem
After getting an analysis, users want a specific answer to their own question about the contract — not just the generic summary. E.g. "Do I need additional insurance?" or "Can my employer terminate me during probation?"

## Design
- 1 optional free-text question field, shown below the upload zone
- User can fill it before OR after upload — it persists until reset
- On "Analyse Contract", the question is sent alongside the contract text
- If a question is provided, the API adds a `question_answer` field to the response
- Answer is shown as a dedicated section in the results, above the summary
- If no question is asked, nothing changes from current behaviour

## UI
- Input placeholder: *"Optional: ask a specific question — e.g. 'Do I need additional insurance for this contract?'"*
- Label: "Your question (optional)"
- Max length: 300 characters
- Shown below upload zone, above the Analyse button
- Visible whether or not a file is selected

## API Changes (`app/api/analyse/route.ts`)
- Accept optional `question` field from FormData
- If present, append to system prompt:
  ```
  The user has a specific question about this contract: "{question}"
  Please add a "question_answer" field to your JSON response with a direct, 
  plain-English answer (2–4 sentences).
  ```
- `question_answer`: string | undefined in the response schema

## UI Changes
- `app/page.tsx` — add question input state + field
- `app/components/AnalysisResult.tsx` — add `question_answer` section at top of results if present
  - Heading: "Your Question Answered"
  - Icon: speech bubble
  - Style: `bg-indigo-50 border-indigo-200` (distinct from other sections)

## Acceptance Criteria
- [x] Question input shown below upload zone
- [x] Placeholder with example question
- [x] Question sent with FormData on analyse
- [x] API handles question presence/absence gracefully
- [x] Answer shown at top of results when question was asked
- [x] No visible change when no question asked
- [x] Question cleared on reset

## What This Is NOT
- Not a multi-turn chat
- Not stored anywhere
- Not mandatory
