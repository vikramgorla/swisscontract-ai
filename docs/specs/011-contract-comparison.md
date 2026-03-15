# SPEC-011: Contract Comparison

**Status:** `shipped`
**Author:** Léa 🏔️
**Created:** 2026-03-14

## Summary

Upload two versions of a contract (original + revised) and see what changed, with Swiss law context on legally significant differences.

## User Story

> "My landlord sent a new lease for the renewal. What did they change? Should I be worried?"

Users upload Document A (original) and Document B (revised/amended). The AI identifies every meaningful change and flags its legal significance.

## UX Flow

1. User lands on `/compare` (or clicks "Compare contracts" from homepage)
2. Two upload zones side-by-side: **Original** (left) and **Revised** (right)
3. Same file types supported: PDF, DOCX, TXT
4. Same nFADP awareness checkbox (single, covers both docs)
5. Click "Compare" → progress bar → results

## Results Format

The AI returns a structured comparison:

```json
{
  "summary": "Overview of what changed between the two versions",
  "changes": [
    {
      "title": "Notice period shortened",
      "original": "3 months (Art. 8.2)",
      "revised": "1 month (Art. 8.2)",
      "impact": "unfavourable",
      "explanation": "The new notice period is below the minimum required by OR Art. 335c for your employment duration."
    }
  ],
  "unchanged_highlights": ["Salary", "Working hours", "Vacation entitlement"],
  "overall_assessment": "The revised contract contains 2 unfavourable changes...",
  "swiss_law_notes": "Relevant Swiss law context for the changes",
  "language": "en"
}
```

**Impact levels:**
- 🟢 `favourable` — change benefits the user
- 🟡 `neutral` — no material legal impact
- 🔴 `unfavourable` — change disadvantages the user or may violate Swiss law

## UI Design

### Results display
- Summary card at top
- Changes list — each change as an expandable card with:
  - Title
  - Side-by-side: Original text → Revised text
  - Impact badge (🟢/🟡/🔴)
  - Explanation
- "Unchanged highlights" section (collapsed by default)
- Overall assessment
- Swiss law notes
- Same disclaimer as single analysis
- Download as PDF (reuse existing browser print-to-PDF)

### Navigation
- New tab/link on homepage: "Compare two versions"
- `/compare` route with locale support: `/en/compare`, `/de/compare`, `/fr/compare`, `/it/compare`

## Technical Design

### New files
- `app/[locale]/compare/page.tsx` — locale-aware compare page
- `app/compare/page.tsx` — default (redirects to locale)
- `app/components/CompareClient.tsx` — main comparison UI component
- `app/components/ComparisonResult.tsx` — results display

### API changes
- `app/api/compare/route.ts` — new endpoint
  - Accepts two files via FormData (`fileA` and `fileB`)
  - Same file validation as `/api/analyse` (type, size, page count)
  - Extracts text from both documents
  - Sends both texts to AI with comparison system prompt
  - Same rate limiting (counts as 1 analysis — generous)
  - Same 120s timeout
  - Same prompt injection guard (both texts in delimiter tags)

### System prompt (comparison mode)
```
You are a Swiss contract comparison assistant. You have been given two versions of a contract — an ORIGINAL and a REVISED version. Compare them and identify all meaningful changes.

For each change:
1. Identify what clause/section changed
2. Quote the relevant text from both versions
3. Assess the impact: "favourable" (benefits the contract holder), "neutral", or "unfavourable"
4. Explain the legal significance, citing Swiss law where relevant

Also note key terms that remained unchanged (to reassure the user).

<ORIGINAL_CONTRACT>
{textA}
</ORIGINAL_CONTRACT>

<REVISED_CONTRACT>
{textB}
</REVISED_CONTRACT>
```

### Translations
Add keys for all 4 locales:
- `compare_title`, `compare_subtitle`
- `compare_upload_original`, `compare_upload_revised`
- `compare_button`, `compare_analysing`
- `compare_favourable`, `compare_neutral`, `compare_unfavourable`
- `compare_original_text`, `compare_revised_text`
- `compare_unchanged`, `compare_overall`
- Navigation label: `compare_nav`

### Sitemap
Add `/compare` and all locale variants to `app/sitemap.ts`

## Acceptance Criteria

- [ ] `/compare` page renders in all 4 languages
- [ ] Two-file upload works for PDF, DOCX, TXT (mix and match allowed)
- [ ] Analysis returns structured comparison with impact flags
- [ ] Changes displayed with side-by-side original/revised text
- [ ] Impact badges render correctly (🟢/🟡/🔴)
- [ ] Rate limiting counts comparison as 1 analysis
- [ ] Prompt injection guard applied to both document texts
- [ ] Download results as PDF works
- [ ] Mobile responsive (stacked upload zones on small screens)
- [ ] Homepage links to compare page
- [ ] Sitemap updated
- [ ] Error handling: mismatched languages, unreadable files, timeout

## Out of Scope
- Automatic clause matching / text diffing (AI handles this semantically)
- Version history / storing previous comparisons
- More than 2 documents at once

## SEO Value
- `/en/compare` — "compare contract versions Switzerland"
- `/de/compare` — "Vertrag vergleichen Schweiz"
- `/fr/compare` — "comparer contrats Suisse"
- `/it/compare` — "confrontare contratti Svizzera"
