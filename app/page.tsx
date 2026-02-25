import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { Locale, translations } from './i18n/translations';
import HomeClient from './components/HomeClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://swisscontract.ai/',
    languages: {
      'en': 'https://swisscontract.ai/',
      'de': 'https://swisscontract.ai/de',
      'fr': 'https://swisscontract.ai/fr',
      'it': 'https://swisscontract.ai/it',
      'x-default': 'https://swisscontract.ai/',
    },
  },
};

export default async function Home() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value ?? 'en') as Locale;
  const validLocales: Locale[] = ['en', 'de', 'fr', 'it'];
  const safeLocale: Locale = validLocales.includes(locale) ? locale : 'en';
  const t = translations[safeLocale];

  return <HomeClient locale={safeLocale} t={t} />;
}
