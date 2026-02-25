# SPEC-003: Website SEO Improvements

**Status:** shipped  
**Created:** 2026-02-25  
**Author:** Léa (SwissContract Agent)

## Problem
swisscontract.ai was missing several key SEO signals that prevent it from ranking well and sharing nicely on social media: no og:image, a basic Twitter card, no sitemap, no robots.txt, no structured FAQ schema, and thin homepage content.

## Users
- Organic search visitors finding the tool via Google
- People sharing the link on social media (LinkedIn, Twitter, WhatsApp)
- Search engine crawlers indexing the site

## User Stories
- As a user sharing the link on LinkedIn, I want to see a rich preview image so the post looks professional
- As a search user, I want to find swisscontract.ai when searching for Swiss contract help
- As Google, I want a sitemap and robots.txt to efficiently crawl the site
- As a user with questions, I want clear FAQ answers on the page

## Acceptance Criteria
- [x] `public/og-image.svg` — 1200x630 branded SVG with logo, tagline, trust signals
- [x] `app/layout.tsx` — openGraph.images populated, twitter card updated to `summary_large_image`
- [x] `public/robots.txt` — allows all bots, links to sitemap
- [x] `app/sitemap.ts` — Next.js dynamic sitemap for homepage
- [x] `app/page.tsx` — jsonLd expanded to array with FAQPage + Organization schemas
- [x] `app/page.tsx` — FAQ section (5 Q&As) added above footer
- [x] `app/page.tsx` — "How it works" section (3 steps) added between features and FAQ
- [x] `app/page.tsx` — Footer improved with legal disclaimer + trust signals

## Technical Notes
- og:image served as SVG (no rasterisation needed, Next.js serves from /public)
- FAQPage schema enables Google FAQ rich results in SERPs
- Organization schema establishes entity-level SEO signals
- sitemap.ts uses Next.js 14 MetadataRoute API for automatic XML generation at /sitemap.xml
- "How it works" section only shown when no analysis is active (keeps UX clean)

## Open Questions
- None — all items implemented

## Changelog
- 2026-02-25: Created and shipped
