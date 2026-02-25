import { cookies } from 'next/headers';
import { Locale, translations } from './i18n/translations';
import HomeClient from './components/HomeClient';

export default async function Home() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value ?? 'en') as Locale;
  const validLocales: Locale[] = ['en', 'de', 'fr', 'it'];
  const safeLocale: Locale = validLocales.includes(locale) ? locale : 'en';
  const t = translations[safeLocale];

  return <HomeClient locale={safeLocale} t={t} />;
}
