import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { translations } from './i18n/translations';
import { getAppEnv } from './lib/env';
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });
const enT = translations['en'];

export const metadata: Metadata = {
  title: enT.meta_title,
  description: enT.meta_description,
  keywords: [
    "swiss contract analysis",
    "Switzerland employment contract",
    "Swiss tenancy agreement",
    "NDA Switzerland",
    "AI contract review",
    "understand Swiss contract",
    "Mietvertrag verstehen",
    "Arbeitsvertrag Schweiz",
    "contract summary AI",
    "Swiss law contract",
    "expat Switzerland contract",
    "freelance contract Switzerland",
    "contrat de travail Suisse",
    "bail logement Suisse",
    "legal document analysis Switzerland",
    "contract red flags",
    "AI legal tool Switzerland",
  ],
  authors: [{ name: "swisscontract.ai" }],
  robots: "index, follow",
  alternates: {
    canonical: 'https://swisscontract.ai',
    languages: {
      'en': 'https://swisscontract.ai/',
      'de': 'https://swisscontract.ai/de',
      'fr': 'https://swisscontract.ai/fr',
      'it': 'https://swisscontract.ai/it',
      'x-default': 'https://swisscontract.ai/',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: enT.meta_title,
    description: enT.meta_description,
    type: "website",
    url: "https://swisscontract.ai",
    siteName: "swisscontract.ai",
    locale: "en_CH",
    images: [
      {
        url: 'https://swisscontract.ai/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'swisscontract.ai — AI contract analysis for Switzerland',
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: enT.meta_title,
    description: enT.meta_description,
    images: ['https://swisscontract.ai/og-image.svg'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const env = await getAppEnv();
  const showBanner = env !== 'production';

  return (
    <html lang="en">
      <body className={geist.className}>
        {showBanner && (
          <div className="bg-amber-400 text-amber-900 text-xs font-bold text-center py-1 px-4">
            ⚗️ PREPROD — Testing Swiss-sovereign AI models — not for production use
          </div>
        )}
        {children}
      </body>
    </html>
  );
}
