import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { Locale, translations } from '../i18n/translations';
import HomeClient from '../components/HomeClient';

const VALID_LOCALES: Locale[] = ['en', 'de', 'fr', 'it'];

const LOCALE_META: Record<Locale, { title: string; description: string; htmlLang: string; ogLocale: string }> = {
  en: {
    title: 'swisscontract.ai — Understand Any Swiss Contract in Seconds',
    description: 'AI-powered contract analysis for Switzerland. Upload your employment contract, tenancy agreement, or NDA and get a plain-English summary with red flags highlighted.',
    htmlLang: 'en',
    ogLocale: 'en_CH',
  },
  de: {
    title: 'swisscontract.ai — Jeden Schweizer Vertrag verstehen',
    description: 'KI-gestützte Vertragsanalyse für die Schweiz. Laden Sie Ihren Arbeits-, Miet- oder NDA-Vertrag hoch und erhalten Sie eine verständliche Zusammenfassung mit hervorgehobenen Risiken.',
    htmlLang: 'de',
    ogLocale: 'de_CH',
  },
  fr: {
    title: 'swisscontract.ai — Comprenez tout contrat suisse en quelques secondes',
    description: "Analyse de contrats par IA pour la Suisse. Déposez votre contrat de travail, bail ou NDA et obtenez un résumé clair avec les points d'attention mis en évidence.",
    htmlLang: 'fr',
    ogLocale: 'fr_CH',
  },
  it: {
    title: 'swisscontract.ai — Comprendi qualsiasi contratto svizzero in pochi secondi',
    description: "Analisi contratti con IA per la Svizzera. Carica il tuo contratto di lavoro, affitto o NDA e ottieni un riassunto chiaro con i rischi evidenziati.",
    htmlLang: 'it',
    ogLocale: 'it_CH',
  },
};

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
  return VALID_LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as Locale)) return {};
  const safeLocale = locale as Locale;
  const meta = LOCALE_META[safeLocale];
  const canonicalPath = safeLocale === 'en' ? '/' : `/${safeLocale}`;

  return {
    title: meta.title,
    description: meta.description,
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
      title: meta.title,
      description: meta.description,
      type: 'website',
      url: `https://swisscontract.ai${canonicalPath}`,
      siteName: 'swisscontract.ai',
      locale: meta.ogLocale,
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
  // Read cookie for any additional context (unused here but available)
  await cookies();
  const t = translations[safeLocale];

  return <HomeClient locale={safeLocale} t={t} />;
}
