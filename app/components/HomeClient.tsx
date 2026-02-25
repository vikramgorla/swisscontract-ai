'use client';

import React, { useState } from 'react';
import UploadZone from './UploadZone';
import AnalysisResult from './AnalysisResult';
import LanguageSwitcher from './LanguageSwitcher';
import { useTypewriterPlaceholder } from './TypewriterPlaceholder';
import { Locale, TranslationKeys } from '../i18n/translations';

interface Analysis {
  question_answer?: string;
  summary: string;
  contract_type: string;
  key_terms: Array<{ title: string; explanation: string }>;
  red_flags: Array<{ title: string; explanation: string }>;
  positive_clauses: Array<{ title: string; explanation: string }>;
  swiss_law_notes: string;
  language: string;
}

interface HomeClientProps {
  locale: Locale;
  t: TranslationKeys;
}

export default function HomeClient({ locale, t }: HomeClientProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [question, setQuestion] = useState<string>('');
  const typewriterPlaceholder = useTypewriterPlaceholder();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setAnalysis(null);
    setError(null);
  };

  const handleAnalyse = async () => {
    if (!selectedFile) return;

    setIsAnalysing(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('locale', locale);
    if (question.trim()) {
      formData.append('question', question.trim());
    }

    try {
      const response = await fetch('/api/analyse', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Analysis failed. Please try again.');
      } else {
        setAnalysis(data.analysis);
        setTimeout(() => {
          document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch {
      setError(t.error_network);
    } finally {
      setIsAnalysing(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!selectedFile || !question.trim()) return;
    setIsAnalysing(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('question', question.trim());
    formData.append('locale', locale);
    try {
      const response = await fetch('/api/analyse', { method: 'POST', body: formData });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Analysis failed. Please try again.');
      } else {
        setAnalysis(data.analysis);
      }
    } catch {
      setError(t.error_network);
    } finally {
      setIsAnalysing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setAnalysis(null);
    setError(null);
    setQuestion('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "swisscontract.ai",
      "url": "https://swisscontract.ai",
      "description": "AI-powered contract analysis for Switzerland. Upload employment contracts, tenancy agreements, or NDAs and get plain-English summaries with red flags highlighted.",
      "applicationCategory": "LegalService",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CHF", "availability": "https://schema.org/LimitedAvailability" },
      "inLanguage": ["en", "de", "fr", "it"],
      "areaServed": { "@type": "Country", "name": "Switzerland" },
      "featureList": [
        "Contract red flag detection",
        "Swiss law context",
        "Employment contract analysis",
        "Tenancy agreement analysis",
        "NDA analysis",
        "Insurance contract analysis",
        "PDF and Word document support",
        "Private — documents not stored"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": t.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a,
        }
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "swisscontract.ai",
      "url": "https://swisscontract.ai",
      "areaServed": { "@type": "Country", "name": "Switzerland" },
      "knowsAbout": ["Swiss contract law", "Employment contracts Switzerland", "Tenancy law Switzerland", "NDA Switzerland"]
    }
  ];

  const featureIcons = [
    <path key="shield" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
    <path key="globe" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />,
    <path key="lock" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
  ];

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Document + magnifying glass icon */}
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <circle cx="10" cy="15" r="2.5" />
                <line x1="12" y1="17" x2="14.5" y2="19.5" />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">swisscontract<span className="text-red-600">.ai</span></span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher current={locale} />
            <span className="text-xs text-gray-400 hidden sm:block">{t.built_in}</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-3 sm:mb-6 border border-red-100">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            {t.badge}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-3 sm:mb-5">
            {t.h1}<br className="hidden sm:block" />
            <span className="text-red-600"> {t.h1_accent}</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-500 max-w-2xl mx-auto mb-4 sm:mb-6 leading-relaxed">
            {t.subtitle}
          </p>

          {/* Upload + Analyse area */}
          {!analysis && (
            <div className="max-w-xl mx-auto">
              <UploadZone onFileSelect={handleFileSelect} isAnalysing={isAnalysing} />

              <div className="mt-3">
                <label htmlFor="question-input" className="block text-sm font-medium text-gray-600 mb-1 text-left">
                  {t.question_label} <span className="text-gray-400 font-normal">{t.question_optional}</span>
                </label>
                <input
                  id="question-input"
                  type="text"
                  maxLength={300}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={isAnalysing}
                  placeholder={question ? '' : (typewriterPlaceholder || t.question_placeholder_fallback)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent disabled:opacity-50"
                />
              </div>

              {error && (
                <div className="mt-4 flex items-start gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-left">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleAnalyse}
                disabled={!selectedFile || isAnalysing}
                className={`
                  mt-5 w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200
                  ${selectedFile && !isAnalysing
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                {isAnalysing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {t.analysing}
                  </span>
                ) : t.analyse_btn}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      {analysis && (
        <section id="results" className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          {/* Question panel */}
          <div className="mb-6 bg-gray-50 border border-gray-200 rounded-xl p-5">
            <label htmlFor="question-input-results" className="block text-sm font-semibold text-gray-700 mb-2">
              {t.ask_question_label}
            </label>
            <div className="flex gap-2">
              <input
                id="question-input-results"
                type="text"
                maxLength={300}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={isAnalysing}
                onKeyDown={(e) => { if (e.key === 'Enter' && question.trim() && !isAnalysing) handleAskQuestion(); }}
                placeholder={question ? '' : (typewriterPlaceholder || t.question_placeholder_fallback)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent disabled:opacity-50"
              />
              <button
                onClick={handleAskQuestion}
                disabled={!question.trim() || isAnalysing}
                className="px-4 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-700 transition-colors whitespace-nowrap flex items-center gap-2"
              >
                {isAnalysing ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {t.asking}
                  </>
                ) : t.ask_btn}
              </button>
            </div>
            {error && (
              <div className="mt-3 flex items-start gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>

          {isAnalysing && (
            <div className="mb-6 bg-indigo-50 border border-indigo-200 rounded-xl p-6 animate-pulse">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded bg-indigo-200" />
                <div className="h-4 w-40 rounded bg-indigo-200" />
              </div>
              <div className="space-y-2">
                <div className="h-3 rounded bg-indigo-200 w-full" />
                <div className="h-3 rounded bg-indigo-200 w-5/6" />
                <div className="h-3 rounded bg-indigo-200 w-4/6" />
              </div>
            </div>
          )}

          <AnalysisResult analysis={analysis} onReset={handleReset} resetLabel={t.results_reset} />
        </section>
      )}

      {/* Features strip */}
      {!analysis && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {t.features.map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3 p-6 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {featureIcons[i]}
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* How it works */}
      {!analysis && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t.how_title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {t.how_steps.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-600 text-white font-bold text-lg flex items-center justify-center">{i + 1}</div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t.faq_title}</h2>
        <div className="divide-y divide-gray-100">
          {t.faqs.map((item, i) => (
            <div key={i} className="py-5">
              <h3 className="font-semibold text-gray-900 mb-1.5">{item.q}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-400 text-center sm:text-left">
              <span className="font-medium text-gray-600">swisscontract.ai</span> — {t.footer_tagline}<br />
              {t.footer_disclaimer}
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>{t.footer_built}</span>
              <span>·</span>
              <span>{t.footer_private}</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
