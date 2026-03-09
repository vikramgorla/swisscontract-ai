import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Locale, translations } from '../../../i18n/translations';
import { CONTRACT_TYPES, ContractType, contractPages } from '../../../i18n/contractPages';
import ContractLandingPage from '../../../components/ContractLandingPage';

const VALID_LOCALES: Locale[] = ['en', 'de', 'fr', 'it'];

type Props = { params: Promise<{ locale: string; type: string }> };

export async function generateStaticParams() {
  const params: { locale: string; type: string }[] = [];
  for (const locale of VALID_LOCALES) {
    for (const type of CONTRACT_TYPES) {
      params.push({ locale, type });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, type } = await params;
  if (!VALID_LOCALES.includes(locale as Locale)) return {};
  if (!CONTRACT_TYPES.includes(type as ContractType)) return {};

  const safeLocale = locale as Locale;
  const safeType = type as ContractType;
  const content = contractPages[safeLocale][safeType];

  const canonicalLocalePrefix = safeLocale === 'en' ? '' : `/${safeLocale}`;
  const canonicalUrl = `https://swisscontract.ai${canonicalLocalePrefix}/contracts/${safeType}`;

  return {
    title: content.meta_title,
    description: content.meta_description,
    robots: 'index, follow',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `https://swisscontract.ai/contracts/${safeType}`,
        'de': `https://swisscontract.ai/de/contracts/${safeType}`,
        'fr': `https://swisscontract.ai/fr/contracts/${safeType}`,
        'it': `https://swisscontract.ai/it/contracts/${safeType}`,
        'x-default': `https://swisscontract.ai/contracts/${safeType}`,
      },
    },
    openGraph: {
      title: content.meta_title,
      description: content.meta_description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'swisscontract.ai',
      locale: translations[safeLocale].og_locale,
      images: [{
        url: 'https://swisscontract.ai/og-image.svg',
        width: 1200,
        height: 630,
        alt: content.h1,
      }],
    },
  };
}

export default async function ContractTypePage({ params }: Props) {
  const { locale, type } = await params;
  if (!VALID_LOCALES.includes(locale as Locale)) notFound();
  if (!CONTRACT_TYPES.includes(type as ContractType)) notFound();

  const safeLocale = locale as Locale;
  const safeType = type as ContractType;

  return (
    <ContractLandingPage
      locale={safeLocale}
      contractType={safeType}
    />
  );
}
