import { headers } from 'next/headers';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, translations } from '../i18n/translations';

export const metadata: Metadata = {
  title: 'Privacy Policy — swisscontract.ai',
  description: 'How swisscontract.ai handles your data. Short version: we don\'t store anything.',
  robots: 'index, follow',
};

function detectLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return 'en';
  const valid: Locale[] = ['en', 'de', 'fr', 'it'];
  const langs = acceptLanguage.split(',').map(p => p.trim().split(';')[0].trim().toLowerCase());
  for (const lang of langs) {
    const exact = valid.find(l => l === lang);
    if (exact) return exact;
    const prefix = valid.find(l => lang.startsWith(l));
    if (prefix) return prefix;
  }
  return 'en';
}

export default async function PrivacyPage() {
  const headerStore = await headers();
  const safeLocale = detectLocale(headerStore.get('accept-language'));
  const t = translations[safeLocale];

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <circle cx="10" cy="15" r="2.5" />
                <line x1="12" y1="17" x2="14.5" y2="19.5" />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">swisscontract<span className="text-red-600">.ai</span></span>
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose prose-gray max-w-none">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{t.pp_title}</h1>
        <p className="text-sm text-gray-400 mb-8">{t.pp_updated}</p>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t.pp_short_title}</h2>
          <p className="text-gray-700 leading-relaxed">{t.pp_short_body}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t.pp_upload_title}</h2>
          <ul className="space-y-2 text-gray-700">
            {t.pp_upload_items.map((item, i) => (
              <li key={i} className="flex items-start gap-2"><span className="text-green-500 mt-1">✓</span> {item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t.pp_ai_title}</h2>
          <ul className="space-y-2 text-gray-700">
            {t.pp_ai_items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>
                  {item.includes('infomaniak.com/en/legal/confidentiality-policy') ? (
                    <>
                      {item.split('infomaniak.com/en/legal/confidentiality-policy')[0]}
                      <a href="https://www.infomaniak.com/en/legal/confidentiality-policy" className="text-red-600 hover:underline" target="_blank" rel="noopener noreferrer">infomaniak.com/en/legal/confidentiality-policy</a>
                      {item.split('infomaniak.com/en/legal/confidentiality-policy')[1]}
                    </>
                  ) : (
                    item
                  )}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t.pp_third_party_title}</h2>
          <p className="text-gray-700 leading-relaxed">{t.pp_third_party_body}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t.pp_no_tracking_title}</h2>
          <p className="text-gray-700 leading-relaxed">{t.pp_no_tracking_body}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t.pp_lang_title}</h2>
          <p className="text-gray-700 leading-relaxed">{t.pp_lang_body}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t.pp_no_collect_title}</h2>
          <ul className="space-y-2 text-gray-700">
            {t.pp_no_collect_items.map((item, i) => (
              <li key={i} className="flex items-start gap-2"><span className="text-red-400 mt-1">✗</span> {item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t.pp_opensource_title}</h2>
          <p className="text-gray-700 leading-relaxed">
            {t.pp_opensource_body}{' '}
            <a
              href="https://github.com/vikramgorla/swisscontract-ai"
              className="text-red-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub →
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t.pp_rights_title}</h2>
          <p className="text-gray-700 leading-relaxed">{t.pp_rights_body}</p>
        </section>
      </article>

      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 text-center text-xs text-gray-400">
          <Link href="/" className="text-red-600 hover:underline font-medium">← {t.footer_tagline}</Link>
        </div>
      </footer>
    </main>
  );
}
