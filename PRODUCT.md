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

### ✅ Scanned PDF OCR — [SPEC-004](docs/specs/004-ocr-scanned-pdfs.md)
- Image-only PDFs (scanned contracts) supported via AI-powered OCR
- Fallback triggers automatically when text extraction returns < 100 chars

### ✅ Multilingual UI — [SPEC-005](docs/specs/005-multilingual.md)
- Full UI in English, German, French, Italian
- Language switcher in header (localStorage-based)
- Analysis results returned in the selected language

### ✅ SEO & Trust — [SPEC-003](docs/specs/003-seo-improvements.md)
- og:image, sitemap.xml, robots.txt, FAQPage schema
- Privacy Promise section on homepage
- No analytics, no cookies — zero tracking

### ✅ Swiss Sovereignty — [SPEC-006](docs/specs/006-swiss-model-comparison.md) (updated)
- **Apertus 70B** — Swiss-sovereign LLM, sole AI model
- Hosted by Infomaniak on Swiss data centres
- No Anthropic, no Google Analytics, no US cloud providers
- Swiss sovereignty USP badges on homepage
- nFADP awareness checkbox (required before analysis)
- Updated privacy policy: Infomaniak section, third-party data warning
- All 4 locales (EN/DE/FR/IT) updated

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
| Hosting | Infomaniak / Swiss VPS |
| CI/CD | GitHub → VPS deploy |

---

## Architecture Principles

1. **Privacy by design** — no persistent storage, ephemeral processing only
2. **Swiss-first** — analysis grounded in Swiss legal context (OR, CO, tenancy law)
3. **Swiss sovereignty** — all AI processing on Swiss infrastructure (Infomaniak)
4. **Plain language** — jargon-free output for non-lawyers
5. **Accessible** — no account, works on mobile, 4 languages
6. **nFADP compliant** — awareness checkbox, transparent data processing

---

## Roadmap

- [ ] Freemium model — CHF 9/mo subscription (Stripe)
- [ ] Insurance referral integration (HelloSafe/Comparis affiliate)
- [ ] Export analysis as PDF
- [ ] Persistent rate limiting (Redis/Upstash) across server instances
- [ ] Contract comparison (upload two versions, see diffs)

---

## Specs

All feature specs live in [`docs/specs/`](docs/specs/).

---

*Maintained by Léa 🏔️ — SwissContract Agent*
