# PRODUCT.md — swisscontract.ai

**Live:** https://swisscontract.ai  
**Repo:** https://github.com/vikramgorla/swisscontract-ai  
**Stack:** Next.js 16, TypeScript, Tailwind CSS, Claude API, Vercel

---

## What It Does

swisscontract.ai lets anyone in Switzerland upload a contract and get an instant plain-language AI analysis — key clauses, red flags, positive terms, and Switzerland-specific legal context.

No account required. No data stored.

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
- Image-only PDFs (scanned contracts) supported via Claude vision OCR
- Fallback triggers automatically when text extraction returns < 100 chars

### ✅ Multilingual UI — [SPEC-005](docs/specs/005-multilingual.md)
- Full UI in English, German, French, Italian
- Language switcher in header (cookie-based)
- Analysis results returned in the selected language

### ✅ SEO & Trust — [SPEC-003](docs/specs/003-seo-improvements.md)
- og:image, sitemap.xml, robots.txt, FAQPage schema
- Privacy Promise section on homepage
- Cookie consent banner (GDPR/nFADP compliant)
- GA fires only after consent

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI | Anthropic Claude API (`claude-sonnet-4-5`) |
| PDF parsing | unpdf + Claude vision OCR fallback |
| DOCX parsing | mammoth |
| Hosting | Vercel |
| CI/CD | GitHub Actions → Vercel (production environment) |

---

## Architecture Principles

1. **Privacy by design** — no persistent storage, ephemeral processing only
2. **Swiss-first** — analysis grounded in Swiss legal context (OR, CO, tenancy law)
3. **Plain language** — jargon-free output for non-lawyers
4. **Accessible** — no account, works on mobile, 4 languages

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
