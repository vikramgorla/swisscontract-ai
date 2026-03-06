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
  const [warning, setWarning] = useState<string | null>(null);
  const [question, setQuestion] = useState<string>('');
  const [awarenessChecked, setAwarenessChecked] = useState(false);
  const typewriterPlaceholder = useTypewriterPlaceholder(locale);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setAnalysis(null);
    setError(null);
    setWarning(null);
    if (file.size > 5 * 1024 * 1024) {
      setWarning(t.warn_large_file);
    }
  };

  const handleAnalyse = async () => {
    if (!selectedFile || !awarenessChecked) return;

    // Client-side size check before uploading — gives immediate feedback
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError(t.error_file_too_large);
      return;
    }

    setIsAnalysing(true);
    setError(null);
    setWarning(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('locale', locale);
    if (question.trim()) {
      formData.append('question', question.trim());
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000);
    let response: Response;
    try {
      response = await fetch('/api/analyse', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
    } catch (err) {
      clearTimeout(timeoutId);
      setError(err instanceof Error && err.name === 'AbortError' ? t.error_timeout : t.error_network);
      setIsAnalysing(false);
      return;
    }

    let data: Record<string, unknown>;
    try {
      data = await response.json();
    } catch {
      // Server returned non-JSON (nginx error page, 502, etc.)
      setError(t.error_network);
      setIsAnalysing(false);
      return;
    }
    if (!response.ok) {
      const errorMessage = data.error === 'ERR_SCANNED_PDF' ? t.error_scanned_pdf : data.error === 'ERR_FILE_TOO_LARGE' ? t.error_file_too_large : (String(data.error) || 'Analysis failed. Please try again.');
      setError(errorMessage);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setAnalysis(data.analysis as any);
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setIsAnalysing(false);
  };

  const handleAskQuestion = async () => {
    if (!selectedFile || !question.trim()) return;
    setIsAnalysing(true);
    setError(null);
    setWarning(null);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('question', question.trim());
    formData.append('locale', locale);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000);
    let response: Response;
    try {
      response = await fetch('/api/analyse', { method: 'POST', body: formData, signal: controller.signal });
      clearTimeout(timeoutId);
    } catch (err) {
      clearTimeout(timeoutId);
      setError(err instanceof Error && err.name === 'AbortError' ? t.error_timeout : t.error_network);
      setIsAnalysing(false);
      return;
    }

    let data: Record<string, unknown>;
    try {
      data = await response.json();
    } catch {
      setError(t.error_network);
      setIsAnalysing(false);
      return;
    }
    if (!response.ok) {
      const errorMessage = data.error === 'ERR_SCANNED_PDF' ? t.error_scanned_pdf : data.error === 'ERR_FILE_TOO_LARGE' ? t.error_file_too_large : (String(data.error) || 'Analysis failed. Please try again.');
      setError(errorMessage);
    } else {
      setAnalysis(data.analysis);
    }
    setIsAnalysing(false);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setAnalysis(null);
    setError(null);
    setWarning(null);
    setQuestion('');
    setAwarenessChecked(false);
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
        "Private — documents not stored",
        "Swiss AI — powered by Apertus 70B",
        "AI runs on infrastructure hosted in Switzerland"
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

  /* Swiss sovereignty badges */
  const badges = [
    { icon: '🇨🇭', title: t.badge_hosted, sub: t.badge_hosted_sub },
    { icon: '🏔️', title: t.badge_swiss_ai, sub: t.badge_swiss_ai_sub },
    { icon: '🔒', title: t.badge_zero_retention, sub: t.badge_zero_retention_sub },
    { icon: '🛡️', title: t.badge_nfadp, sub: t.badge_nfadp_sub },
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
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-3 sm:mb-5">
            {t.h1}<br className="hidden sm:block" />
            <span className="text-red-600"> {t.h1_accent}</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-500 max-w-2xl mx-auto mb-4 sm:mb-6 leading-relaxed">
            {t.subtitle}
          </p>

          {/* Swiss sovereignty badges */}
          {!analysis && (
            <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8">
              {badges.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
                >
                  <span className="text-sm leading-none" role="img" aria-hidden="true">{b.icon}</span>
                  <div className="text-left">
                    <div className="text-xs font-medium text-gray-700 leading-tight">{b.title}</div>
                    <div className="text-[10px] text-gray-400 leading-tight">{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upload + Analyse area */}
          {!analysis && (
            <div className="max-w-xl mx-auto">
              <UploadZone onFileSelect={handleFileSelect} isAnalysing={isAnalysing} t={t} />

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

              {warning && !error && (
                <div className="mt-4 flex items-start gap-2 text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-left">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  </svg>
                  <p className="text-sm">{warning}</p>
                </div>
              )}

              {/* nFADP awareness checkbox */}
              <label className="mt-4 flex items-start gap-3 text-left cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={awarenessChecked}
                  onChange={(e) => setAwarenessChecked(e.target.checked)}
                  disabled={isAnalysing}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 flex-shrink-0"
                />
                <span className="text-xs text-gray-600 leading-relaxed">
                  {t.awareness_checkbox_pre}{' '}
                  <strong className="text-gray-800">{t.awareness_checkbox_no_store}</strong>
                  {t.awareness_checkbox_mid}{' '}
                  <strong className="text-gray-800">{t.awareness_checkbox_no_third_party}</strong>
                  {' '}{t.awareness_checkbox_post}{' '}
                  <a
                    href="https://github.com/vikramgorla/swisscontract-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-red-600 transition-colors"
                  >{t.awareness_checkbox_opensource}</a>
                  .
                </span>
              </label>

              <button
                onClick={handleAnalyse}
                disabled={!selectedFile || isAnalysing || !awarenessChecked}
                className={`
                  mt-5 w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200
                  ${selectedFile && !isAnalysing && awarenessChecked
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

      {/* Results — Single Model View */}
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

          <AnalysisResult
            analysis={analysis}
            onReset={handleReset}
            resetLabel={t.results_reset}
            languageLabel={t.language_label}
            languageNames={t.language_names}
            contractTypeLabels={{
              employment: t.contract_type_employment,
              tenancy: t.contract_type_tenancy,
              NDA: t.contract_type_nda,
              freelance: t.contract_type_freelance,
              insurance: t.contract_type_insurance,
              other: t.contract_type_other,
            }}
          />
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

      {/* Privacy Promise */}
      {!analysis && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 border-t border-gray-100">
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200">
            <div className="flex flex-col items-center mb-5">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 text-center">{t.privacy_title}</h2>
            </div>
            <ul className="space-y-2 max-w-lg mx-auto">
              {t.privacy_points.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Why is this free? */}
      {!analysis && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 border-t border-gray-100">
          <div className="bg-amber-50 rounded-2xl p-6 sm:p-8 border border-amber-100">
            <div className="flex flex-col items-center mb-5">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 text-center">{t.why_free_title}</h2>
            </div>
            <div className="max-w-lg mx-auto space-y-3 text-sm text-gray-600 leading-relaxed">
              <p>{t.why_free_p1}</p>
              <p>{t.why_free_p2}</p>
              <p className="font-medium text-gray-700">{t.why_free_p3}</p>
            </div>
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
              <a href={`/privacy?lang=${locale}`} className="hover:text-gray-600 transition-colors">{t.footer_privacy}</a>
              <span>·</span>
              <a
                href="https://github.com/vikramgorla/swisscontract-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-colors flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                {t.footer_opensource}
              </a>
              <span>·</span>
              <span>{t.footer_private}</span>
            </div>
          </div>
        </div>
      </footer>
      
    </main>
  );
}
