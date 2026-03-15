import type { Metadata } from 'next';
import { translations } from '../i18n/translations';
import CompareClient from '../components/CompareClient';

export const metadata: Metadata = {
  title: 'Compare Contract Versions — swisscontract.ai',
  description: 'Upload original and revised contracts to see what changed. AI-powered comparison with impact flags and Swiss law context.',
  alternates: {
    canonical: 'https://swisscontract.ai/compare',
    languages: {
      'en': 'https://swisscontract.ai/compare',
      'de': 'https://swisscontract.ai/de/compare',
      'fr': 'https://swisscontract.ai/fr/compare',
      'it': 'https://swisscontract.ai/it/compare',
      'x-default': 'https://swisscontract.ai/compare',
    },
  },
};

export default function ComparePage() {
  const t = translations['en'];
  return <CompareClient locale="en" t={t} />;
}
