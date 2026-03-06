# SPEC-006: Swiss AI Sovereignty (Preprod)

**Status:** shipped  
**Branch:** preprod  
**Date:** 2026-03-05  
**Updated:** 2026-03-06

## Evolution

This spec originally defined a 3-model comparison mode (Qwen3, Kimi K2.5, Apertus 70B). After evaluation, Vik decided to go all-in on **Apertus 70B** as the sole Swiss-sovereign LLM. The comparison mode has been removed.

## Current State

### Single Model: Apertus 70B
- `swiss-ai/Apertus-70B-Instruct-2509` is the only model in the `MODELS` array
- No comparison mode — single-model analysis only
- All processing via Infomaniak OpenAI-compatible API on Swiss data centres

### nFADP Compliance
- Awareness checkbox required before analysis — user confirms third-party data obligations
- Privacy policy updated: Infomaniak section, third-party data warning
- Swiss sovereignty USP badges on homepage (4 badges: hosted in CH, Swiss AI, zero retention, nFADP)

### Files Changed
- `app/lib/aiProviders.ts` — Apertus-only, removed Qwen3 and Kimi
- `app/api/analyse/route.ts` — removed comparison mode, Apertus as default
- `app/components/HomeClient.tsx` — removed ComparisonView, added badges + checkbox
- `app/components/ComparisonView.tsx` — deleted
- `app/i18n/translations.ts` — added badge + awareness keys for all 4 locales
- `app/privacy/page.tsx` — added Infomaniak section, third-party data section
- `README.md` — updated for Swiss sovereignty
- `PRODUCT.md` — updated shipped features

## Original Acceptance Criteria (Updated)

1. ~~Anthropic removed~~ ✅ (done in earlier iteration)
2. ~~Three parallel analyses~~ → **Single model: Apertus 70B** ✅
3. ~~Side-by-side UI~~ → **Single analysis result** ✅
4. **nFADP awareness checkbox** — required before analysis ✅
5. **Swiss sovereignty badges** — 4 badges on homepage ✅
6. **Privacy policy updated** — Infomaniak section + third-party data ✅
7. **All 4 locales** (EN/DE/FR/IT) updated ✅
8. **No changes to `main` branch** ✅
