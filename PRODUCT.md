# PRODUCT.md — swisscontract.ai

**Live:** https://swisscontract.ai  
**Repo:** https://github.com/vikramgorla/swisscontract-ai  
**Stack:** Next.js 14, TypeScript, Tailwind CSS, Claude API, Vercel

---

## What It Does

swisscontract.ai lets anyone in Switzerland upload a contract and get an instant plain-language AI analysis — key clauses, red flags, positive terms, and Switzerland-specific legal context.

No account required. No data stored. Completely free.

---

## Current Features

### ✅ Contract Analysis (MVP) — [SPEC-001](docs/specs/001-contract-analysis.md)
- Upload PDF, DOCX, DOC, or TXT contracts
- AI analysis powered by Claude (Anthropic)
- Returns:
  - Plain-English summary (2–3 paragraphs)
  - Contract type detection (employment, tenancy, NDA, freelance, other)
  - Key terms explained without jargon
  - Red flags — unusual or risky clauses highlighted
  - Positive clauses — notably fair or favourable terms
  - Swiss law notes — Switzerland-specific legal context
  - Language detection
- Limits: 5MB file size, 20 pages (PDF), 5 analyses per IP per day
- Zero storage — contract text is never written to disk or database
- Prominent disclaimer: informational only, not legal advice

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI | Anthropic Claude API (`claude-sonnet-4-5`) |
| PDF parsing | unpdf |
| DOCX parsing | mammoth |
| Hosting | Vercel |
| CI/CD | GitHub Actions → Vercel auto-deploy |

---

## Architecture Principles

1. **Privacy by design** — no persistent storage, ephemeral processing only
2. **Swiss-first** — analysis grounded in Swiss legal context
3. **Plain language** — jargon-free output for non-lawyers
4. **Accessible** — no account, no paywall, works on mobile

---

## Roadmap (Not Yet Built)

- [ ] Multi-language UI (German, French, Italian)
- [ ] OCR support for scanned PDFs
- [ ] Persistent rate limiting (Redis) across server instances
- [ ] Contract comparison (upload two versions, see diffs)
- [ ] Export analysis as PDF
- [ ] Clause library (common Swiss contract patterns explained)

---

## Spec Index

| Spec | Feature | Status |
|---|---|---|
| [SPEC-001](docs/specs/001-contract-analysis.md) | AI Contract Analysis (MVP) | shipped |

---

*Maintained by Léa 🏔️ — SwissContract Agent*
