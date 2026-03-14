# PRODUCT.md — swisscontract.ai

**Live:** https://swisscontract.ai  
**Preprod:** https://preprod.swisscontract.ai  
**Repo:** https://github.com/vikramgorla/swisscontract-ai  
**Stack:** Next.js 16, TypeScript, Tailwind CSS, Infomaniak AI (Apertus 70B)

---

## What It Does

swisscontract.ai lets anyone in Switzerland upload a contract and get an instant plain-language AI analysis — key clauses, red flags, positive terms, and Switzerland-specific legal context.

No account required. No data stored. 100% Swiss infrastructure.

---

## Shipped Features

### ✅ Contract Analysis — [SPEC-001](docs/specs/001-contract-analysis.md)
- Upload PDF, DOCX, DOC, or TXT contracts
- AI analysis: plain-English summary, contract type detection, key terms, red flags, positive clauses, Swiss law notes
- Limits: 5MB file size, 20 pages (PDF), 5 analyses per IP per day
- Zero storage — contract text is never written to disk or database

### ✅ Contract Question — [SPEC-002](docs/specs/002-contract-question.md)
- Optional free-text question before or after analysis
- Question answered inline at the top of results
- Re-submits contract + question to AI, no separate storage

### ✅ Scanned PDF Handling + OCR — [SPEC-004](docs/specs/004-ocr-scanned-pdfs.md)
- Scanned/image-only PDFs automatically processed via Tesseract OCR
- PDF pages rendered to images, then OCR'd with eng+deu+fra+ita language support
- Graceful fallback: if OCR also fails, clear error message in all 4 languages
- Zero persistence: temp files created during OCR are deleted immediately

### ✅ Multilingual UI — [SPEC-005](docs/specs/005-multilingual.md)
- Full UI in English, German, French, Italian
- Path-based locale routing (/de, /fr, /it) — zero cookies
- Analysis results returned in the selected language

### ✅ SEO & Trust — [SPEC-003](docs/specs/003-seo-improvements.md)
- og:image (illustrated PNG 1200×630), sitemap.xml, robots.txt, FAQPage schema
- Privacy Promise section on homepage
- No analytics, no cookies — zero tracking

### ✅ Swiss Sovereignty — [SPEC-006](docs/specs/006-swiss-model-comparison.md)
- **Apertus 70B** — Swiss-sovereign LLM, sole AI model
- Hosted by Infomaniak on Swiss data centres
- No analytics, no tracking, no third-party data flows outside Switzerland
- Swiss sovereignty badges on homepage
- Awareness checkbox, updated privacy policy, all 4 locales

### ✅ Demo Contract Mode — [SPEC-007](docs/specs/007-demo-contract.md)
- "Try with a sample" button — one click, zero friction
- Loads realistic Swiss employment contract, auto-triggers analysis
- Intentionally aggressive non-compete to demonstrate red flag detection

### ✅ Download Results as PDF — [SPEC-008](docs/specs/008-download-pdf.md)
- "Download PDF" button in analysis results
- Browser print-to-PDF with all sections expanded, zero new dependencies
- Translated in all 4 languages

### ✅ Contract Type Landing Pages — [SPEC-009](docs/specs/009-contract-landing-pages.md)
- 5 contract types × 4 languages = 20 new indexed URLs
- Employment, tenancy, NDA, insurance, freelance
- Swiss-specific legal content with proper terminology per language
- Contract-type-specific AI prompts (relevant law articles and focus areas)
- Red flags, key Swiss laws, FAQPage schema, upload widget on each page
- "Browse by contract type" cards on homepage

### ✅ PWA Manifest — [SPEC-010](docs/specs/010-pwa-manifest.md)
- Web app manifest, theme-color, Apple meta tags
- Enables "Add to Home Screen" on mobile

### ✅ CI/CD Pipeline — v0.4.0–v0.5.0
- Build-once promote: single Docker image per commit, re-tagged on merge
- Semver pre-release versioning: `-beta.N` auto-bumped on preprod
- Zero CI commits to main — version arrives via PR merge
- Docker image cleanup after every deploy (prevents disk exhaustion)
- Header-driven feature flags (X-Show-Banner, X-Debug-Enabled via Traefik)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI | Infomaniak AI API (Apertus 70B — Swiss-sovereign) |
| PDF parsing | unpdf |
| DOCX parsing | mammoth |
| Hosting | Infomaniak VPS with Docker + Traefik |
| CI/CD | GitHub Actions → Docker → VPS deploy |

---

## Architecture Principles

1. **Privacy by design** — no persistent storage, ephemeral processing only
2. **Swiss-first** — analysis grounded in Swiss legal context (OR, CO, tenancy law)
3. **Swiss sovereignty** — all AI processing on Swiss infrastructure (Infomaniak)
4. **Plain language** — jargon-free output for non-lawyers
5. **Accessible** — no account, works on mobile, 4 languages
6. **Transparency** — awareness checkbox, open source, privacy policy explains data flow

---

## Roadmap

- [ ] Submit sitemap to Google Search Console
- [ ] Blog Post #1: "Swiss Employment Contract: 10 Red Flags" (EN + DE)
- [ ] Privacy-respecting analytics (Plausible or similar)
- [ ] Contract comparison mode (upload two versions, see diffs)
- [ ] Freemium model — CHF 9.90/analysis or CHF 29/mo
- [ ] Insurance referral integration (AXA-ARAG, DAS, Protekta)
- [ ] WhatsApp bot for contract analysis
- [ ] Canton-specific analysis

---

## Specs

All feature specs live in [`docs/specs/`](docs/specs/).

---

*Maintained by Léa 🏔️ — SwissContract Agent*
