import { NextRequest, NextResponse } from 'next/server';

const VALID_LOCALES = ['en', 'de', 'fr', 'it'] as const;
type Locale = typeof VALID_LOCALES[number];

function detectLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return 'en';

  const langs = acceptLanguage
    .split(',')
    .map(part => {
      const [lang, q] = part.trim().split(';q=');
      return { lang: lang.trim().toLowerCase(), q: q ? parseFloat(q) : 1.0 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of langs) {
    const exact = VALID_LOCALES.find(l => l === lang);
    if (exact) return exact;
    const prefix = VALID_LOCALES.find(l => lang.startsWith(l + '-') || lang.startsWith(l));
    if (prefix) return prefix;
  }

  return 'en';
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip: API routes, static files, Next.js internals, privacy page
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/og-image') ||
    pathname.startsWith('/robots') ||
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/privacy') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // If already on a valid locale path, let through — no cookie needed
  const pathLocale = VALID_LOCALES.find(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (pathLocale) return NextResponse.next();

  // Only auto-detect on root '/'
  if (pathname !== '/') return NextResponse.next();

  // Detect from Accept-Language header — pure path-based, no cookies
  const detected = detectLocale(request.headers.get('accept-language'));

  // English stays on '/', others redirect to locale path
  if (detected === 'en') return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${detected}`;
  return NextResponse.redirect(url, { status: 302 });
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)).*)',
  ],
};
