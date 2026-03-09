# SPEC-009: Contract Type Landing Pages

**Status:** shipped  
**Version:** v0.6.0

## Summary
Dedicated SEO landing pages for each contract type, in all 4 languages — 20 new indexed URLs with Swiss-specific legal content and contract-type-aware AI analysis.

## Contract Types
1. Employment — Swiss employment contract (OR Art. 319–362)
2. Tenancy — Swiss rental/tenancy agreement (OR Art. 253–273c)
3. NDA — Swiss NDA (OR Art. 321a, Art. 163)
4. Insurance — Swiss insurance contract (VVG/LCA)
5. Freelance — Swiss freelance contract (OR Art. 394–406)

## Acceptance Criteria
- [x] 5 contract types × 4 languages = 20 new URLs
- [x] URL structure: `/contracts/{type}` (EN), `/{locale}/contracts/{type}` (DE/FR/IT)
- [x] Each page: H1, intro content, upload widget, red flags section, key Swiss laws, FAQs
- [x] Swiss-specific legal content with proper terminology per language
- [x] FAQPage structured data on each page
- [x] hreflang alternates across all 4 languages + x-default
- [x] Sitemap updated with 20 new URLs
- [x] "Browse by contract type" cards on homepage
- [x] Language switcher handles contract type pages
- [x] Contract-type-specific AI prompt hints when analysing from a landing page

## Implementation
- `app/i18n/contractPages.ts`: all content + types for all 4 locales
- `app/[locale]/contracts/[type]/page.tsx`: locale-specific route
- `app/contracts/[type]/page.tsx`: English default route
- `app/components/ContractLandingPage.tsx`: shared page component
- `app/components/HomeClient.tsx`: browse-by-type section
- `app/components/LanguageSwitcher.tsx`: contractType prop support
- `app/sitemap.ts`: 20 new contract type URLs
- `app/api/analyse/route.ts`: `contractType` form field + type-specific prompt hints

## AI Prompt Hints
When a user uploads from a landing page, `contractType` is sent to the API. The system prompt is augmented with type-specific Swiss law articles and focus areas (e.g. employment: probation, non-compete, notice periods; tenancy: deposit rules, rent increases, termination protection).
