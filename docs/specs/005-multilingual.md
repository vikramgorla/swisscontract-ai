# SPEC-005 — Multilingual UI (EN / DE / FR / IT)

**Status:** shipped  
**Author:** Léa 🏔️  
**Date:** 2026-02-25

---

## Overview

Add full multilingual support for German (DE), French (FR), and Italian (IT) alongside existing English (EN). Language switcher in header. Cookie-based locale selection. Analysis results returned in the user's selected language.

---

## Implementation

### Approach
Cookie-based locale switching on a single-page Next.js app. Server component (`app/page.tsx`) reads the `locale` cookie and passes the locale + translation object to the `HomeClient` client component.

### Files Created
- `app/i18n/translations.ts` — All UI strings for EN / DE / FR / IT
- `app/components/LanguageSwitcher.tsx` — Header language switcher component
- `app/components/HomeClient.tsx` — Refactored interactive homepage (client component)

### Files Modified
- `app/page.tsx` — Converted to server component; reads cookie, passes locale + translations to HomeClient
- `app/api/analyse/route.ts` — Accepts `locale` FormData field; instructs the AI to return analysis in the selected language
- `app/layout.tsx` — Added `hreflang` alternate links for SEO
- `app/components/AnalysisResult.tsx` — Added optional `resetLabel` prop for translated reset button text

---

## Locales

| Code | Language | Cookie Value |
|------|----------|-------------|
| `en` | English  | `locale=en` |
| `de` | German   | `locale=de` |
| `fr` | French   | `locale=fr` |
| `it` | Italian  | `locale=it` |

Default locale: `en` (when no cookie set).

---

## Language Switching

- User clicks flag button in header
- `LanguageSwitcher` sets `locale=<code>` cookie (1-year expiry, path=/)
- `router.refresh()` triggers server component re-render
- New locale is picked up from cookie; page re-renders in selected language

---

## Analysis Results Language

The `locale` field is appended to FormData for both `handleAnalyse` and `handleAskQuestion`. The API route reads this and appends to the AI system prompt:

> "Return all analysis fields (summary, red flags, key terms, swiss_law_notes) in [Language]."

---

## SEO — hreflang

Added via Next.js `metadata.alternates.languages`:

```
en       → https://swisscontract.ai/
de-CH    → https://swisscontract.ai/?locale=de
fr-CH    → https://swisscontract.ai/?locale=fr
it-CH    → https://swisscontract.ai/?locale=it
x-default → https://swisscontract.ai/
```

---

## Acceptance Criteria

- [x] Language switcher visible in header on all screen sizes
- [x] Switching language persists across page reloads (cookie)
- [x] All UI strings translated for DE, FR, IT
- [x] Analysis results (summary, red flags, key terms, Swiss law notes) returned in selected language
- [x] hreflang tags present for SEO
- [x] Default locale is EN when no cookie set
- [x] Invalid cookie values fall back gracefully to EN

---

## Translation Review Notes

Translations were machine-generated and are functionally correct. The following strings may benefit from native speaker review before a high-traffic launch:

- **DE:** "Datenschutz by Design" (mixed EN/DE — intentional tech term, but worth checking)
- **FR:** "Confidentialité by design" (same — "by design" kept in EN as common tech phrase)
- **IT:** "Privacy by design" (same pattern — consistent with industry usage)
- **FR FAQ:** Punctuation spacing before `?` and `!` — French typography standard (space before `?`) not applied; standard web convention (no space) used instead for consistency
