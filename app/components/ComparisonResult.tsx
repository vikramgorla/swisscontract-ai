'use client';

import React, { useState } from 'react';
import { Locale, TranslationKeys } from '../i18n/translations';
import { renderMarkdown, markdownToHtml } from '../lib/renderMarkdown';

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
}

interface ComparisonResultProps {
  analysis: ComparisonAnalysis;
  onReset: () => void;
  locale: Locale;
  t: TranslationKeys;
}

const impactConfig = {
  favourable: { emoji: '🟢', bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
  neutral: { emoji: '🟡', bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
  unfavourable: { emoji: '🔴', bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
};

function ChangeCard({ change, t, defaultOpen }: { change: Change; t: TranslationKeys; defaultOpen: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const config = impactConfig[change.impact] || impactConfig.neutral;
  const impactLabel = change.impact === 'favourable' ? t.compare_favourable
    : change.impact === 'unfavourable' ? t.compare_unfavourable
    : t.compare_neutral;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 text-left transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} flex-shrink-0`}>
            {config.emoji} {impactLabel}
          </span>
          <span className="font-medium text-gray-800 truncate">{change.title}</span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 flex-shrink-0 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 border-t border-gray-100">
          {/* Side-by-side comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1.5">{t.compare_original_text}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{change.original}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <p className="text-xs font-semibold text-blue-600 uppercase mb-1.5">{t.compare_revised_text}</p>
              <p className="text-sm text-blue-800 leading-relaxed">{change.revised}</p>
            </div>
          </div>
          {/* Explanation */}
          <div className="mt-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
            <p className="text-sm text-gray-700 leading-relaxed">{renderMarkdown(change.explanation)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function buildComparisonPrintHtml(analysis: ComparisonAnalysis, t: TranslationKeys): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const impactBadge = (impact: string) => {
    const colors = impact === 'favourable' ? 'background:#dcfce7;color:#166534;' : impact === 'unfavourable' ? 'background:#fee2e2;color:#991b1b;' : 'background:#fef9c3;color:#854d0e;';
    const emoji = impact === 'favourable' ? '🟢' : impact === 'unfavourable' ? '🔴' : '🟡';
    const label = impact === 'favourable' ? esc(t.compare_favourable) : impact === 'unfavourable' ? esc(t.compare_unfavourable) : esc(t.compare_neutral);
    return `<span style="display:inline-block;padding:2px 10px;border-radius:999px;font-size:11px;font-weight:700;${colors}">${emoji} ${label}</span>`;
  };

  const changesHtml = analysis.changes.map(c => `
    <div style="border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin-bottom:12px;background:#fff;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
        ${impactBadge(c.impact)}
        <strong style="font-size:14px;">${esc(c.title)}</strong>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:10px;">
        <tr>
          <td style="width:50%;vertical-align:top;padding:8px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px 0 0 6px;">
            <p style="font-size:10px;font-weight:700;color:#6b7280;text-transform:uppercase;margin:0 0 4px 0;">${esc(t.compare_original_text)}</p>
            <p style="font-size:13px;color:#374151;margin:0;line-height:1.5;">${esc(c.original)}</p>
          </td>
          <td style="width:50%;vertical-align:top;padding:8px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:0 6px 6px 0;">
            <p style="font-size:10px;font-weight:700;color:#2563eb;text-transform:uppercase;margin:0 0 4px 0;">${esc(t.compare_revised_text)}</p>
            <p style="font-size:13px;color:#1e40af;margin:0;line-height:1.5;">${esc(c.revised)}</p>
          </td>
        </tr>
      </table>
      <p style="font-size:13px;color:#374151;line-height:1.6;margin:0;">${markdownToHtml(esc(c.explanation))}</p>
    </div>`).join('');

  const unchangedHtml = analysis.unchanged_highlights.length > 0
    ? `<div style="margin-bottom:20px;"><p style="font-size:16px;font-weight:700;margin:0 0 10px 0;">✅ ${esc(t.compare_unchanged)}</p><p style="font-size:13px;color:#374151;">${analysis.unchanged_highlights.map(esc).join(' · ')}</p></div>`
    : '';

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8" /><title>swisscontract.ai — ${esc(t.compare_title)}</title>
<style>*{box-sizing:border-box;}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1a1a1a;margin:0;padding:0;background:#fff;}.page{max-width:800px;margin:0 auto;padding:40px 32px;}.header{display:flex;align-items:center;gap:12px;margin-bottom:32px;padding-bottom:20px;border-bottom:2px solid #e5e7eb;}.logo{font-size:22px;font-weight:800;color:#111;}.logo span{color:#dc2626;}.section{margin-bottom:24px;}.section-title{font-size:16px;font-weight:700;color:#111;margin:0 0 12px 0;padding-bottom:6px;border-bottom:1px solid #e5e7eb;}.summary-box{background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;font-size:14px;line-height:1.7;color:#374151;}.swiss-box{background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;font-size:14px;line-height:1.7;color:#1e40af;}.disclaimer{background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px 16px;font-size:12px;color:#92400e;line-height:1.5;margin-top:32px;}.footer-note{text-align:center;font-size:11px;color:#9ca3af;margin-top:16px;}@media print{body{print-color-adjust:exact;-webkit-print-color-adjust:exact;}.page{padding:20px;}}</style>
</head><body><div class="page">
  <div class="header"><div class="logo">swisscontract<span>.ai</span></div><span style="font-size:14px;color:#6b7280;">${esc(t.compare_title)}</span></div>
  ${analysis.question_answer ? `<div class="section"><p class="section-title">💬 ${esc(t.result_your_question)}</p><div class="summary-box" style="background:#eef2ff;border-color:#c7d2fe;color:#3730a3;">${esc(analysis.question_answer)}</div></div>` : ''}
  <div class="section"><p class="section-title">📄 ${esc(t.result_summary)}</p><div class="summary-box">${markdownToHtml(esc(analysis.summary))}</div></div>
  <div class="section"><p class="section-title">📋 Changes (${analysis.changes.length})</p>${changesHtml}</div>
  ${unchangedHtml}
  <div class="section"><p class="section-title">📊 ${esc(t.compare_overall)}</p><div class="summary-box">${markdownToHtml(esc(analysis.overall_assessment))}</div></div>
  ${analysis.swiss_law_notes ? `<div class="section"><p class="section-title">🇨🇭 ${esc(t.result_swiss_law)}</p><div class="swiss-box">${markdownToHtml(esc(analysis.swiss_law_notes))}</div></div>` : ''}
  <div class="disclaimer">${esc(t.result_disclaimer)}</div>
  <div class="footer-note">Generated by swisscontract.ai</div>
</div><script>window.onload=function(){window.print();};<\/script></body></html>`;
}

export default function ComparisonResult({ analysis, onReset, locale, t }: ComparisonResultProps) {
  const [showUnchanged, setShowUnchanged] = useState(false);

  const handleDownloadPdf = () => {
    const html = buildComparisonPrintHtml(analysis, t);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  };

  // Count impacts
  const counts = { favourable: 0, neutral: 0, unfavourable: 0 };
  analysis.changes.forEach(c => { if (counts[c.impact] !== undefined) counts[c.impact]++; });

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Header controls */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          {counts.unfavourable > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
              🔴 {counts.unfavourable} {t.compare_unfavourable}
            </span>
          )}
          {counts.favourable > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
              🟢 {counts.favourable} {t.compare_favourable}
            </span>
          )}
          {counts.neutral > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
              🟡 {counts.neutral} {t.compare_neutral}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadPdf}
            className="text-sm text-gray-600 hover:text-gray-800 font-medium flex items-center gap-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {t.download_pdf}
          </button>
          <button
            onClick={onReset}
            className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center gap-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {t.results_reset}
          </button>
        </div>
      </div>

      {/* Question answer */}
      {analysis.question_answer && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-indigo-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {t.result_your_question}
          </h2>
          <p className="text-indigo-800 text-sm leading-relaxed">{analysis.question_answer}</p>
        </div>
      )}

      {/* Summary */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {t.result_summary}
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{analysis.summary}</p>
      </div>

      {/* Changes */}
      {analysis.changes.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Changes ({analysis.changes.length})
          </h2>
          {analysis.changes.map((change, i) => (
            <ChangeCard key={i} change={change} t={t} defaultOpen={i === 0} />
          ))}
        </div>
      )}

      {/* Unchanged highlights */}
      {analysis.unchanged_highlights.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setShowUnchanged(!showUnchanged)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 text-left transition-colors"
          >
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t.compare_unchanged}
            </h2>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${showUnchanged ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showUnchanged && (
            <div className="px-5 pb-5 border-t border-gray-100">
              <div className="flex flex-wrap gap-2 mt-3">
                {analysis.unchanged_highlights.map((item, i) => (
                  <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-green-50 text-green-800 border border-green-200">
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Overall assessment */}
      {analysis.overall_assessment && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {t.compare_overall}
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{analysis.overall_assessment}</p>
        </div>
      )}

      {/* Swiss law notes */}
      {analysis.swiss_law_notes && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t.result_swiss_law}
          </h2>
          <p className="text-blue-800 text-sm leading-relaxed whitespace-pre-line">{renderMarkdown(analysis.swiss_law_notes)}</p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
        <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
        <p className="text-sm text-amber-800 leading-relaxed">{t.result_disclaimer}</p>
      </div>

      {/* Bottom reset */}
      <div className="text-center pt-2 pb-4">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {t.results_reset}
        </button>
      </div>
    </div>
  );
}
