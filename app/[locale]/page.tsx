import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Locale, translations } from '../i18n/translations';
import HomeClient from '../components/HomeClient';

const VALID_LOCALES: Locale[] = ['en', 'de', 'fr', 'it'];

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
  return VALID_LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as Locale)) return {};
  const safeLocale = locale as Locale;
  const t = translations[safeLocale];
  const canonicalPath = safeLocale === 'en' ? '/' : `/${safeLocale}`;

  return {
    title: t.meta_title,
    description: t.meta_description,
    robots: 'index, follow',
    alternates: {
      canonical: `https://swisscontract.ai${canonicalPath}`,
      languages: {
        'en': 'https://swisscontract.ai/',
        'de': 'https://swisscontract.ai/de',
        'fr': 'https://swisscontract.ai/fr',
        'it': 'https://swisscontract.ai/it',
        'x-default': 'https://swisscontract.ai/',
      },
    },
    openGraph: {
      title: t.meta_title,
      description: t.meta_description,
      type: 'website',
      url: `https://swisscontract.ai${canonicalPath}`,
      siteName: 'swisscontract.ai',
      locale: t.og_locale,
      images: [{
        url: 'https://swisscontract.ai/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'swisscontract.ai — AI contract analysis for Switzerland',
      }],
    },
  };
}

export default async function LocalePage({ params }: Props) {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as Locale)) notFound();
  const safeLocale = locale as Locale;
  const t = translations[safeLocale];
  return <HomeClient locale={safeLocale} t={t} />;
}
