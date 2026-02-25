import { NextRequest, NextResponse } from 'next/server';

const VALID_LOCALES = ['en', 'de', 'fr', 'it'] as const;
type Locale = typeof VALID_LOCALES[number];

// Map Accept-Language tags to our supported locales
function detectLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return 'en';

  // Parse and sort by quality value
  const langs = acceptLanguage
    .split(',')
    .map(part => {
      const [lang, q] = part.trim().split(';q=');
      return { lang: lang.trim().toLowerCase(), q: q ? parseFloat(q) : 1.0 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of langs) {
    // Exact match: 'de', 'fr', 'it', 'en'
    const exact = VALID_LOCALES.find(l => l === lang);
    if (exact) return exact;

    // Prefix match: 'de-CH' → 'de', 'fr-CH' → 'fr'
    const prefix = VALID_LOCALES.find(l => lang.startsWith(l + '-') || lang.startsWith(l));
    if (prefix) return prefix;
  }

  return 'en';
}

export function middleware(request: NextRequest) {
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

  // If user is already on a locale path (/de, /fr, /it, /en), let them through
  // and set the locale cookie so it persists
  const pathLocale = VALID_LOCALES.find(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (pathLocale) {
    const response = NextResponse.next();
    response.cookies.set('locale', pathLocale, { path: '/', maxAge: 31536000, sameSite: 'lax' });
    return response;
  }

  // Only auto-detect on root path '/'
  if (pathname !== '/') return NextResponse.next();

  // If locale cookie is already set, respect it (user made an explicit choice)
  const cookieLocale = request.cookies.get('locale')?.value;
  if (cookieLocale && VALID_LOCALES.includes(cookieLocale as Locale)) {
    // If cookie says 'en', stay on '/' — no redirect needed
    if (cookieLocale === 'en') return NextResponse.next();
    // Otherwise redirect to the locale path
    const url = request.nextUrl.clone();
    url.pathname = `/${cookieLocale}`;
    return NextResponse.redirect(url, { status: 302 });
  }

  // First visit: detect from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  const detected = detectLocale(acceptLanguage);

  // English stays on '/', others get redirected
  if (detected === 'en') {
    // Set cookie so we don't re-detect next time
    const response = NextResponse.next();
    response.cookies.set('locale', 'en', { path: '/', maxAge: 31536000, sameSite: 'lax' });
    return response;
  }

  // Redirect to locale path
  const url = request.nextUrl.clone();
  url.pathname = `/${detected}`;
  const response = NextResponse.redirect(url, { status: 302 });
  response.cookies.set('locale', detected, { path: '/', maxAge: 31536000, sameSite: 'lax' });
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.svg
     * - public files with extensions
     */
    '/((?!_next/static|_next/image|favicon\\.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)).*)',
  ],
};
