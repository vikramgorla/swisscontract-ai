# swisscontract.ai

AI-powered contract analysis for Switzerland. Upload any Swiss contract and get an instant plain-language summary — key clauses, red flags, and Swiss law context.

**Live:** https://swisscontract.ai  
**Preprod:** https://preprod.swisscontract.ai  
**Repo:** https://github.com/vikramgorla/swisscontract-ai

## What it does

- Upload employment, tenancy, insurance, NDA, or freelance contracts (PDF, DOCX, TXT)
- AI analysis — identifies red flags, positive clauses, key terms, Swiss law context
- Optional: ask a specific question about your contract and get a direct answer
- Available in English, German, French and Italian
- Private — nothing is stored
- nFADP awareness checkbox — users confirm third-party data obligations before analysis

## Swiss Sovereignty

swisscontract.ai runs on **100% Swiss infrastructure**:

- **AI Model:** [Apertus 70B](https://huggingface.co/swiss-ai/Apertus-70B-Instruct-2509) — a Swiss-sovereign open-source LLM
- **AI Hosting:** [Infomaniak](https://www.infomaniak.com) — Swiss company headquartered in Geneva, data centres in Switzerland
- **No data leaves Switzerland** during the analysis process
- **nFADP compliant** — built for Swiss data protection law
- **No analytics, no cookies, no tracking** — zero data retention

Everything stays in Switzerland.

## Stack

- Next.js (App Router), TypeScript, Tailwind CSS
- Infomaniak AI API (Apertus 70B — Swiss-sovereign LLM)
- PDF parsing: unpdf | DOCX parsing: mammoth
- Deployed on Infomaniak / Swiss VPS

## Running locally

```bash
cp .env.example .env.local
# Add your INFOMANIAK_AI_TOKEN and INFOMANIAK_PRODUCT_ID to .env.local

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

- **Preprod:** Push to `preprod` → deploy to VPS at `preprod.swisscontract.ai`
- **Production:** Push to `main` → auto-deploys

## Limits

- 5MB max file size
- 20 pages max (PDF)
- 5 analyses per IP per 24h (in-memory, resets on cold start)

## Docs

- [PRODUCT.md](PRODUCT.md) — product overview and roadmap
- [docs/specs/](docs/specs/) — feature specs
- [LICENSE](LICENSE) — CC BY 4.0
