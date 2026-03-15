'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import UploadZone from './UploadZone';
import AnalysisResult from './AnalysisResult';
import ProgressBar from './ProgressBar';
import LanguageSwitcher from './LanguageSwitcher';
import { useTypewriterPlaceholder } from './TypewriterPlaceholder';
import { Locale, translations } from '../i18n/translations';
import { analysisSteps, ProgressStats } from '../lib/progressSteps';
import { ContractType, contractPages, CONTRACT_TYPES, contractBrowse } from '../i18n/contractPages';

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

interface ContractLandingPageProps {
  locale: Locale;
  contractType: ContractType;
}

export default function ContractLandingPage({ locale, contractType }: ContractLandingPageProps) {
  const t = translations[locale];
  const content = contractPages[locale][contractType];
  const browse = contractBrowse[locale];

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [question, setQuestion] = useState<string>('');
  const [awarenessChecked, setAwarenessChecked] = useState(false);
  const [progressStats, setProgressStats] = useState<ProgressStats | null>(null);
  const typewriterPlaceholder = useTypewriterPlaceholder(locale);

  // Auto-scroll to results when analysis completes
  useEffect(() => {
    if (analysis) {
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    }
  }, [analysis]);

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
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError(t.error_file_too_large);
      return;
    }

    setIsAnalysing(true);
    setError(null);
    setWarning(null);

    let fileBlob: Blob;
    try {
      const buffer = await selectedFile.arrayBuffer();
      if (buffer.byteLength === 0) {
        setError(t.error_file_unreadable);
        setIsAnalysing(false);
        return;
      }
      fileBlob = new Blob([buffer], { type: selectedFile.type || 'application/octet-stream' });
    } catch {
      setError(t.error_file_unreadable);
      setIsAnalysing(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', fileBlob, selectedFile.name);
    formData.append('locale', locale);
    formData.append('contractType', contractType);
    if (question.trim()) {
      formData.append('question', question.trim());
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000);
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
      setError(t.error_network);
      setIsAnalysing(false);
      return;
    }
    if (!response.ok) {
      const errorMessage = data.error === 'ERR_SCANNED_PDF' ? t.error_scanned_pdf : data.error === 'ERR_FILE_TOO_LARGE' ? t.error_file_too_large : data.error === 'ERR_DOC_TOO_LONG' ? t.error_doc_too_long : (String(data.error) || 'Analysis failed. Please try again.');
      setError(errorMessage);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setAnalysis(data.analysis as any);
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
    setProgressStats(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // FAQPage structured data
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": content.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  const localePrefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href={locale === 'en' ? '/' : `/${locale}`} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <circle cx="10" cy="15" r="2.5" />
                <line x1="12" y1="17" x2="14.5" y2="19.5" />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">swisscontract<span className="text-red-600">.ai</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher current={locale} contractType={contractType} />
            <span className="text-xs text-gray-400 hidden sm:block">{t.built_in}</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 text-center ${isAnalysing || analysis ? 'py-4 sm:py-6' : 'py-6 sm:py-16'}`}>
          {!isAnalysing && !analysis && (
            <>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4 sm:mb-6">
                {content.h1}
              </h1>
              <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-6 leading-relaxed">
                {content.cta}
              </p>
            </>
          )}

          {/* Trust badges */}
          {!analysis && !isAnalysing && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-0 my-6">
              <div className="flex items-center gap-2 px-6">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect width="20" height="20" rx="2" fill="#D52B1E"/>
                  <rect x="8.5" y="3.5" width="3" height="13" fill="white"/>
                  <rect x="3.5" y="8.5" width="13" height="3" fill="white"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">{t.badge_hosted}</span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-gray-200" />
              <div className="flex items-center gap-2 px-6">
                <Image src="/apertus-logo.jpg" alt="Apertus" width={20} height={20} className="rounded-sm object-cover flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700">{t.badge_ai}</span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-gray-200" />
              <div className="flex items-center gap-2 px-6">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="10" cy="10" r="8.5" stroke="#6B7280" strokeWidth="1.5"/>
                  <line x1="5.5" y1="10" x2="14.5" y2="10" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">{t.badge_privacy}</span>
              </div>
            </div>
          )}

          {/* Upload widget — ProgressBar swaps with UploadZone */}
          <div className="max-w-xl mx-auto">
            {(isAnalysing || analysis) ? (
              /* Single ProgressBar instance — stays mounted through active → complete */
              <ProgressBar
                steps={analysisSteps}
                isActive={isAnalysing}
                isComplete={analysis !== null}
                translations={t}
                onComplete={(s) => setProgressStats(s)}
                stats={progressStats}
              />
            ) : (
              <UploadZone onFileSelect={handleFileSelect} isAnalysing={isAnalysing} t={t} />
            )}

            {!analysis && (
              <>
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
                  {isAnalysing ? t.analysing : t.analyse_btn}
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      {analysis && (
        <section id="results" className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
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
              labels={{
                summary: t.result_summary,
                keyTerms: t.result_key_terms,
                redFlags: t.result_red_flags,
                positiveClauses: t.result_positive_clauses,
                swissLaw: t.result_swiss_law,
                yourQuestion: t.result_your_question,
                disclaimer: t.result_disclaimer,
              }}
            />
        </section>
      )}

      {/* Content: intro text */}
      {!analysis && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
          <div className="prose prose-gray max-w-none">
            {content.intro.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-gray-600 leading-relaxed mb-4">{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {/* Red Flags section */}
      {!analysis && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 border-t border-gray-100">
          <div className="bg-red-50 rounded-2xl p-6 sm:p-8 border border-red-100">
            <div className="flex flex-col items-center mb-5">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 text-center">{content.red_flags_title}</h2>
            </div>
            <ul className="space-y-3 max-w-lg mx-auto">
              {content.red_flags.map((flag, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01" />
                  </svg>
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Key Swiss Laws section */}
      {!analysis && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 border-t border-gray-100">
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200">
            <div className="flex flex-col items-center mb-5">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 text-center">{content.laws_title}</h2>
            </div>
            <ul className="space-y-2 max-w-lg mx-auto">
              {content.laws.map((law, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {law}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {!analysis && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t.faq_title}</h2>
          <div className="divide-y divide-gray-100">
            {content.faqs.map((item, i) => (
              <div key={i} className="py-5">
                <h3 className="font-semibold text-gray-900 mb-1.5">{item.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Browse other contract types */}
      {!analysis && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{browse.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONTRACT_TYPES.filter(ct => ct !== contractType).map(ct => (
              <Link
                key={ct}
                href={`${localePrefix}/contracts/${ct}`}
                className="group block p-5 rounded-xl border border-gray-200 bg-white hover:border-red-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors mb-1">
                  {browse.cards[ct].label}
                </h3>
                <p className="text-sm text-gray-500">{browse.cards[ct].description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

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
