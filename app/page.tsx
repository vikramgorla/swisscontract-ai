import type { Metadata } from 'next';
import { translations } from './i18n/translations';
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

export default function Home() {
  // Root path '/' is always English — other locales are at /de /fr /it
  const t = translations['en'];
  return <HomeClient locale="en" t={t} />;
}
