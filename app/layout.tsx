import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "swisscontract.ai — Understand Any Swiss Contract in Seconds",
  description: "AI-powered contract analysis for Switzerland. Upload your employment contract, tenancy agreement, or NDA and get a plain-English summary with red flags highlighted. Free to try. No account needed. Built in Switzerland.",
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
    canonical: "https://swisscontract.ai",
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: "swisscontract.ai — AI Contract Analysis for Switzerland",
    description: "Understand any Swiss contract in seconds. Upload a PDF or Word doc and get a plain-English summary, red flags, and Swiss law context. Private — nothing stored.",
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
    title: "swisscontract.ai — Understand Any Swiss Contract in Seconds",
    description: "AI-powered contract analysis for Switzerland. Red flags highlighted. Swiss law context. Nothing stored.",
    images: ['https://swisscontract.ai/og-image.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body className={geist.className}>
        {children}
      </body>
    </html>
  );
}
