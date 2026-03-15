'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import ComparisonResult from './ComparisonResult';
import ProgressBar from './ProgressBar';
import LanguageSwitcher from './LanguageSwitcher';
import { Locale, TranslationKeys } from '../i18n/translations';
import { comparisonSteps } from '../lib/progressSteps';

interface Change {
  title: string;
  original: string;
  revised: string;
  impact: 'favourable' | 'neutral' | 'unfavourable';
  explanation: string;
}

interface ComparisonAnalysis {
  question_answer?: string;
  summary: string;
  changes: Change[];
  unchanged_highlights: string[];
  overall_assessment: string;
  swiss_law_notes: string;
  language: string;
  identical?: boolean;
  near_identical?: boolean;
  changes_before_verification?: number;
  changes_after_verification?: number;
}

interface CompareClientProps {
  locale: Locale;
  t: TranslationKeys;
}

function FileDropZone({
  label,
  file,
  onSelect,
  isAnalysing,
  t,
}: {
  label: string;
  file: File | null;
  onSelect: (file: File) => void;
  isAnalysing: boolean;
  t: TranslationKeys;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
  const allowedExtensions = ['.pdf', '.txt', '.docx', '.doc'];

  const validate = (f: File) => {
    setError(null);
    const name = f.name.toLowerCase();
    const hasExt = allowedExtensions.some(ext => name.endsWith(ext));
    if (!allowedTypes.includes(f.type) && !hasExt) {
      setError(t.error_invalid_file_type);
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError(t.error_file_too_large);
      return;
    }
    onSelect(f);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) validate(e.dataTransfer.files[0]);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-gray-700 mb-2">{label}</p>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => !isAnalysing && inputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 min-h-[120px] flex items-center justify-center
          ${isDragging ? 'border-red-500 bg-red-50' : file ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50 hover:border-red-400 hover:bg-red-50'}
          ${isAnalysing ? 'cursor-not-allowed opacity-75' : ''}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.doc,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,text/plain"
          onChange={(e) => { if (e.target.files?.[0]) validate(e.target.files[0]); }}
          className="hidden"
          disabled={isAnalysing}
        />
        {file ? (
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="font-medium text-gray-800 text-sm truncate max-w-full">{file.name}</p>
            <p className="text-xs text-gray-500">{formatSize(file.size)} · {t.upload_change}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-sm text-gray-500">{t.upload_title}</p>
            <p className="text-xs text-gray-400">{t.upload_hint}</p>
          </div>
        )}
      </div>
      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs">{error}</p>
        </div>
      )}
    </div>
  );
}

export default function CompareClient({ locale, t }: CompareClientProps) {
  const [fileA, setFileA] = useState<File | null>(null);
  const [fileB, setFileB] = useState<File | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [analysis, setAnalysis] = useState<ComparisonAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [awarenessChecked, setAwarenessChecked] = useState(false);

  // Auto-scroll to results when analysis completes
  useEffect(() => {
    if (analysis) {
      setTimeout(() => {
        document.getElementById('compare-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    }
  }, [analysis]);

  const handleCompare = async () => {
    if (!fileA || !fileB || !awarenessChecked) return;

    if (!fileA || !fileB) {
      setError(t.compare_error_both_files ?? 'Please upload both the original and revised contract');
      return;
    }

    setIsAnalysing(true);
    setError(null);
    setAnalysis(null);

    // Read both files into blobs
    let blobA: Blob;
    let blobB: Blob;
    try {
      const bufA = await fileA.arrayBuffer();
      const bufB = await fileB.arrayBuffer();
      if (bufA.byteLength === 0 || bufB.byteLength === 0) {
        setError(t.error_file_unreadable);
        setIsAnalysing(false);
        return;
      }
      blobA = new Blob([bufA], { type: fileA.type || 'application/octet-stream' });
      blobB = new Blob([bufB], { type: fileB.type || 'application/octet-stream' });
    } catch {
      setError(t.error_file_unreadable);
      setIsAnalysing(false);
      return;
    }

    const formData = new FormData();
    formData.append('fileA', blobA, fileA.name);
    formData.append('fileB', blobB, fileB.name);
    formData.append('locale', locale);
    if (question.trim()) {
      formData.append('question', question.trim());
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 300000);

    let response: Response;
    try {
      response = await fetch('/api/compare', {
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
      const errMsg = String(data.error || '');
      const errorMessage = errMsg.includes('ERR_SCANNED_PDF') ? t.error_scanned_pdf
        : errMsg.includes('ERR_FILE_TOO_LARGE') ? t.error_file_too_large
        : errMsg.includes('ERR_DOC_TOO_LONG') ? t.error_doc_too_long
        : errMsg.includes('ERR_AI_UNAVAILABLE') ? t.error_ai_unavailable
        : (errMsg || 'Comparison failed. Please try again.');
      setError(errorMessage);
    } else {
      setAnalysis(data.analysis as ComparisonAnalysis);
    }
    setIsAnalysing(false);
  };

  const handleReset = () => {
    setFileA(null);
    setFileB(null);
    setAnalysis(null);
    setError(null);
    setQuestion('');
    setAwarenessChecked(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const localePrefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href={localePrefix || '/'} className="flex items-center gap-2">
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
            <LanguageSwitcher current={locale} page="compare" />
            <span className="text-xs text-gray-400 hidden sm:block">{t.built_in}</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 text-center ${isAnalysing || analysis ? 'py-4 sm:py-6' : 'py-6 sm:py-16'}`}>
          {!isAnalysing && !analysis && (
            <>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 sm:mb-5">
                {t.compare_title}
              </h1>
              <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-6 leading-relaxed">
                {t.compare_subtitle}
              </p>
            </>
          )}

          {/* Upload area */}
          {!analysis && (
            <div className="max-w-2xl mx-auto">
              {/* Swap: show ProgressBar in place of upload zones during analysis */}
              {isAnalysing ? (
                <ProgressBar
                  steps={comparisonSteps}
                  isActive={isAnalysing}
                  isComplete={false}
                  translations={t}
                />
              ) : (
                <>
                  {/* Two upload zones */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <FileDropZone
                      label={t.compare_upload_original}
                      file={fileA}
                      onSelect={(f) => { setFileA(f); setError(null); }}
                      isAnalysing={isAnalysing}
                      t={t}
                    />
                    <div className="hidden sm:flex items-center justify-center px-2">
                      <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <FileDropZone
                      label={t.compare_upload_revised}
                      file={fileB}
                      onSelect={(f) => { setFileB(f); setError(null); }}
                      isAnalysing={isAnalysing}
                      t={t}
                    />
                  </div>
                </>
              )}

              {/* Optional question */}
              <div className="mt-3">
                <label htmlFor="compare-question" className="block text-sm font-medium text-gray-600 mb-1 text-left">
                  {t.question_label} <span className="text-gray-400 font-normal">{t.question_optional}</span>
                </label>
                <input
                  id="compare-question"
                  type="text"
                  maxLength={300}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={isAnalysing}
                  placeholder={t.question_placeholder_fallback}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent disabled:opacity-50"
                />
              </div>

              {/* Error display */}
              {error && (
                <div className="mt-4 flex items-start gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-left">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* nFADP checkbox */}
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
                  >{t.awareness_checkbox_opensource}</a>.
                </span>
              </label>

              {/* Compare button */}
              <button
                onClick={handleCompare}
                disabled={!fileA || !fileB || isAnalysing || !awarenessChecked}
                className={`
                  mt-5 w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200
                  ${fileA && fileB && !isAnalysing && awarenessChecked
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                {isAnalysing ? t.compare_analysing : t.compare_button}
              </button>

              {/* Link back to single analysis */}
              {!isAnalysing && (
                <div className="mt-4 text-center">
                  <Link href={localePrefix || '/'} className="text-sm text-gray-500 hover:text-red-600 transition-colors">
                    ← {t.analyse_btn}
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      {analysis && analysis.identical && (
        <section id="compare-results" className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          {/* Completion summary */}
          <div className="max-w-xl mx-auto mb-6">
            <ProgressBar
              steps={comparisonSteps}
              isActive={false}
              isComplete={true}
              translations={t}
            />
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-green-800 mb-2">✅ {t.compare_identical}</h2>
            <p className="text-green-700 text-sm mb-6">{analysis.overall_assessment}</p>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-white border border-green-300 rounded-xl text-green-700 font-medium hover:bg-green-50 transition-colors"
            >
              {t.results_reset}
            </button>
          </div>
        </section>
      )}

      {analysis && !analysis.identical && (
        <section id="compare-results" className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          {/* Completion summary */}
          <div className="max-w-xl mx-auto mb-6">
            <ProgressBar
              steps={comparisonSteps}
              isActive={false}
              isComplete={true}
              translations={t}
            />
          </div>
          {/* Near-identical warning */}
          {analysis.near_identical && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-amber-700">{t.compare_near_identical}</p>
            </div>
          )}

          {/* Verification badge */}
          {analysis.changes_before_verification != null && analysis.changes_after_verification != null && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="text-sm text-blue-700">
                {t.compare_verified}
                {analysis.changes_before_verification !== analysis.changes_after_verification && (
                  <span className="text-blue-500 ml-1">
                    ({analysis.changes_before_verification} → {analysis.changes_after_verification})
                  </span>
                )}
              </p>
            </div>
          )}

          <ComparisonResult
            analysis={analysis}
            onReset={handleReset}
            locale={locale}
            t={t}
          />
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
