import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Locale, translations } from '../../i18n/translations';
import CompareClient from '../../components/CompareClient';

const VALID_LOCALES: Locale[] = ['en', 'de', 'fr', 'it'];

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
  return VALID_LOCALES.map(locale => ({ locale }));
}

const compareMeta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Compare Contract Versions — swisscontract.ai',
    description: 'Upload original and revised contracts to see what changed. AI-powered comparison with impact flags and Swiss law context.',
  },
  de: {
    title: 'Vertragsversionen vergleichen — swisscontract.ai',
    description: 'Laden Sie Original und überarbeitete Version hoch und sehen Sie, was sich geändert hat. KI-gestützter Vergleich mit Auswirkungsbewertung und Schweizer Rechtskontext.',
  },
  fr: {
    title: 'Comparer les versions du contrat — swisscontract.ai',
    description: 'Téléchargez les versions originale et révisée pour voir ce qui a changé. Comparaison par IA avec indicateurs d\'impact et contexte juridique suisse.',
  },
  it: {
    title: 'Confronta le versioni del contratto — swisscontract.ai',
    description: 'Carica la versione originale e quella rivista per vedere cosa è cambiato. Confronto basato sull\'IA con indicatori di impatto e contesto giuridico svizzero.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as Locale)) return {};
  const safeLocale = locale as Locale;
  const meta = compareMeta[safeLocale];
  const canonicalPath = safeLocale === 'en' ? '/compare' : `/${safeLocale}/compare`;

  return {
    title: meta.title,
    description: meta.description,
    robots: 'index, follow',
    alternates: {
      canonical: `https://swisscontract.ai${canonicalPath}`,
      languages: {
        'en': 'https://swisscontract.ai/compare',
        'de': 'https://swisscontract.ai/de/compare',
        'fr': 'https://swisscontract.ai/fr/compare',
        'it': 'https://swisscontract.ai/it/compare',
        'x-default': 'https://swisscontract.ai/compare',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      url: `https://swisscontract.ai${canonicalPath}`,
      siteName: 'swisscontract.ai',
    },
  };
}

export default async function CompareLocalePage({ params }: Props) {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as Locale)) notFound();
  const safeLocale = locale as Locale;
  const t = translations[safeLocale];
  return <CompareClient locale={safeLocale} t={t} />;
}
