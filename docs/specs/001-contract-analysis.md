# SPEC-001: AI Contract Analysis (MVP)

**Status:** shipped  
**Created:** 2026-02-24  
**Author:** Léa (SwissContract Agent)

## Problem

People living and working in Switzerland regularly encounter contracts written in dense legal language — employment agreements, rental/tenancy contracts, service agreements, NDAs. Most residents (including expats and non-native speakers) cannot easily assess whether a contract is fair, contains unusual clauses, or conflicts with Swiss law. Professional legal review is expensive and slow.

## Users

- **Expats and international residents** — unfamiliar with Swiss legal norms, often dealing with English or German contracts
- **Young professionals** — first employment contracts, first rental agreements
- **Freelancers and contractors** — reviewing service agreements, NDAs, and consulting contracts
- **Anyone in Switzerland** — who wants a quick, plain-language second opinion before signing

## User Stories

- As an expat, I want to upload my employment contract and get a plain-English summary so that I understand what I'm signing before my start date.
- As a tenant, I want to know if my rental agreement has any unusual or risky clauses so that I can negotiate or reject them upfront.
- As a freelancer, I want to understand the key obligations in a service agreement so that I don't miss important terms buried in legalese.
- As any user, I want to see red flags highlighted clearly so that I know what to pay attention to or push back on.
- As a user, I want to know the analysis is not stored anywhere so that I can share sensitive documents without privacy concerns.

## Acceptance Criteria

- [x] User can upload a contract document (PDF, DOCX, DOC, TXT) via drag-and-drop or file picker
- [x] File size limit enforced at 5MB
- [x] Page count limit enforced at 20 pages (PDF)
- [x] Unsupported file types are rejected with a clear error message
- [x] Text is extracted from the uploaded file (PDF via unpdf, DOCX via mammoth, TXT directly)
- [x] Scanned/image-only PDFs return a clear error (no OCR)
- [x] Extracted text is sent to the AI for analysis
- [x] Analysis returns: summary, contract type, key terms, red flags, positive clauses, Swiss law notes, detected language
- [x] Results displayed in a structured, readable UI with sections for each analysis category
- [x] Red flags are visually prominent (distinct styling)
- [x] Disclaimer shown prominently — tool is informational only, not legal advice
- [x] Rate limiting: max 5 analyses per IP per day (in-memory, resets daily)
- [x] Rate limit error shown with reset time estimate
- [x] No file content or contract text is persisted anywhere — ephemeral processing only
- [x] API key is server-side only, never exposed to the client
- [x] Document text truncated at 50,000 characters if needed

## Technical Notes

### Stack
- **Frontend:** Next.js 16 App Router, TypeScript, Tailwind CSS
- **Backend:** Next.js API Route (`/api/analyse`) running on Node.js runtime
- **AI:** Infomaniak AI API — Apertus 70B (`swiss-ai/Apertus-70B-Instruct-2509`), max 8192 output tokens
- **PDF extraction:** `unpdf` library
- **DOCX extraction:** `mammoth` library
- **Deployment:** VPS (Infomaniak) with Docker + Traefik, auto-deploy via GitHub Actions

### Privacy Architecture
The system is designed with privacy as a hard constraint:
1. Files are received as multipart form data in the API route
2. Text is extracted from the file buffer in memory
3. Only the extracted text string is sent to the AI API
4. The response (structured JSON analysis) is returned to the client
5. No file, no extracted text, and no analysis result is written to disk or any database
6. `contractText` variable is explicitly cleared after sending to the API

### Rate Limiting
- Implemented in `app/lib/rateLimit.ts` using an in-memory Map
- Keyed by IP address (from `x-forwarded-for` or `x-real-ip` headers)
- Limit: 5 requests per IP per 24-hour window
- **Caveat:** Resets on server restart; in-memory only, not shared across instances. Sufficient for MVP abuse prevention.

### AI Prompt Design
The system prompt instructs the AI to:
- Return only valid JSON (no markdown wrappers)
- Produce plain-English explanations without legal jargon
- Be specific about Swiss legal context where relevant
- Categorise contracts as: employment, tenancy, NDA, freelance, or other

### Contract Types Supported
- Employment contracts (`Arbeitsvertrag` / contrat de travail)
- Rental/tenancy agreements (`Mietvertrag` / bail à loyer)
- Service agreements and consulting contracts
- NDAs and confidentiality agreements
- Other general contracts under Swiss law

### Supported Languages
The AI can analyse contracts in any language but the UI is English-first. The `language` field in the response identifies the contract's language.

### Error Handling
| Scenario | Behaviour |
|---|---|
| File > 5MB | 400 with size error |
| PDF > 20 pages | 400 with page count error |
| Unsupported file type | 400 with format error |
| Scanned PDF (no text) | 400 with OCR error |
| Text < 50 chars after extraction | 400 with content error |
| Rate limit exceeded | 429 with reset time |
| AI API failure | 500 with generic error |
| JSON parse failure | 500, fallback regex parse attempted first |

## Open Questions

- ~~Should we add OCR support for scanned PDFs?~~ → Evaluated and deferred. Scanned PDFs return a clear error asking for a text-based PDF. See SPEC-004.
- Should rate limits be persisted (Redis) to survive server restarts and scale across instances?
- Should we support German/French/Italian UI localisation?
- What's the right page limit for larger contracts (e.g. complex employment agreements)?
- Should we add a feedback mechanism ("was this analysis helpful?")?

## Changelog
- 2026-02-24: Spec written retrospectively to document shipped MVP
- 2026-02-24: MVP shipped — PDF/DOCX upload, AI analysis, rate limiting, no storage
- 2026-02-24: Added insurance contract type; hero subtitle shortened
