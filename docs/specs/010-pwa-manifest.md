# SPEC-010: PWA Manifest

**Status:** shipped  
**Version:** v0.6.0

## Summary
Web app manifest enabling "Add to Home Screen" on mobile, plus theme-color and Apple meta tags.

## Acceptance Criteria
- [x] `public/manifest.json` with app name, icons, standalone display, Swiss red theme
- [x] `<link rel="manifest">` in layout.tsx
- [x] `<meta name="theme-color" content="#DC2626">`
- [x] Apple mobile web app meta tags (capable, status-bar-style)
- [x] References existing `favicon-192.png` and `apple-touch-icon.png`

## Implementation
- `public/manifest.json`: name, short_name, start_url, display, background_color, theme_color, icons
- `app/layout.tsx`: manifest link + 3 meta tags in head
