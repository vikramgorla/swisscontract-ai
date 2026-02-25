# swisscontract.ai

AI-powered contract analysis for Switzerland. Upload any Swiss contract and get an instant plain-language summary — key clauses, red flags, and Swiss law context.

**Live:** https://swisscontract.ai  
**Repo:** https://github.com/vikramgorla/swisscontract-ai

## What it does

- Upload employment, tenancy, insurance, NDA, or freelance contracts (PDF, DOCX, TXT)
- AI analysis — identifies red flags, positive clauses, key terms, Swiss law context
- Optional: ask a specific question about your contract and get a direct answer
- Scanned PDFs supported via AI-powered OCR
- Available in English, German, French and Italian
- Private — nothing is stored

## Stack

- Next.js (App Router), TypeScript, Tailwind CSS
- Anthropic Claude API
- PDF parsing: unpdf (+ OCR fallback) | DOCX parsing: mammoth
- Deployed on Vercel

## Running locally

```bash
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

Push to `main` → GitHub Actions → auto-deploys to Vercel.

Requires GitHub environment secrets: `VERCEL_TOKEN`, `ANTHROPIC_API_KEY`  
And environment variables: `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

## Limits

- 5MB max file size
- 20 pages max (PDF)
- 5 analyses per IP per 24h (in-memory, resets on cold start)

## Docs

- [PRODUCT.md](PRODUCT.md) — product overview and roadmap
- [docs/specs/](docs/specs/) — feature specs
- [LICENSE](LICENSE) — CC BY 4.0
