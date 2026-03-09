import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { translations } from '../../i18n/translations';
import { CONTRACT_TYPES, ContractType, contractPages } from '../../i18n/contractPages';
import ContractLandingPage from '../../components/ContractLandingPage';

type Props = { params: Promise<{ type: string }> };

export async function generateStaticParams() {
  return CONTRACT_TYPES.map(type => ({ type }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  if (!CONTRACT_TYPES.includes(type as ContractType)) return {};

  const safeType = type as ContractType;
  const content = contractPages['en'][safeType];

  return {
    title: content.meta_title,
    description: content.meta_description,
    robots: 'index, follow',
    alternates: {
      canonical: `https://swisscontract.ai/contracts/${safeType}`,
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
      url: `https://swisscontract.ai/contracts/${safeType}`,
      siteName: 'swisscontract.ai',
      locale: translations['en'].og_locale,
      images: [{
        url: 'https://swisscontract.ai/og-image.svg',
        width: 1200,
        height: 630,
        alt: content.h1,
      }],
    },
  };
}

export default async function ContractTypePageEN({ params }: Props) {
  const { type } = await params;
  if (!CONTRACT_TYPES.includes(type as ContractType)) notFound();

  return (
    <ContractLandingPage
      locale="en"
      contractType={type as ContractType}
    />
  );
}
