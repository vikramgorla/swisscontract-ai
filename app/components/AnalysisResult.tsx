'use client';

import React, { useState } from 'react';

interface TermItem {
  title: string;
  explanation: string;
}

interface Analysis {
  question_answer?: string;
  summary: string;
  contract_type: string;
  key_terms: TermItem[];
  red_flags: TermItem[];
  positive_clauses: TermItem[];
  swiss_law_notes: string;
  language: string;
}

interface AnalysisResultProps {
  analysis: Analysis;
  onReset: () => void;
  resetLabel?: string;
  languageLabel?: string;
  languageNames?: Record<string, string>;
  compact?: boolean;
  contractTypeLabels?: Record<string, string>;
  labels?: {
    summary: string;
    keyTerms: string;
    redFlags: string;
    positiveClauses: string;
    swissLaw: string;
    yourQuestion: string;
    disclaimer: string;
    download?: string;
  };
}

const contractTypeLabelsFallback: Record<string, string> = {
  employment: 'Employment Contract',
  tenancy: 'Tenancy Agreement',
  NDA: 'Non-Disclosure Agreement',
  freelance: 'Freelance Contract',
  insurance: 'Insurance Contract',
  other: 'Contract',
};

const contractTypeColors: Record<string, string> = {
  employment: 'bg-blue-100 text-blue-800',
  tenancy: 'bg-purple-100 text-purple-800',
  NDA: 'bg-yellow-100 text-yellow-800',
  freelance: 'bg-orange-100 text-orange-800',
  insurance: 'bg-teal-100 text-teal-800',
  other: 'bg-gray-100 text-gray-800',
};

function AccordionItem({ item, index }: { item: TermItem; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 text-left transition-colors"
      >
        <span className="font-medium text-gray-800">{item.title}</span>
        <svg
          className={`w-4 h-4 text-gray-500 flex-shrink-0 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-700 text-sm leading-relaxed">{item.explanation}</p>
        </div>
      )}
    </div>
  );
}

function buildPrintHtml(analysis: Analysis, contractLabel: string, l: {
  summary: string; keyTerms: string; redFlags: string; positiveClauses: string;
  swissLaw: string; yourQuestion: string; disclaimer: string; download?: string;
}): string {
  const escHtml = (str: string) => str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const renderItems = (items: Array<{ title: string; explanation: string }>, color: string) =>
    items.map(item => `
      <div style="border:1px solid ${color}33; border-radius:8px; padding:12px 16px; margin-bottom:10px; background:#fff;">
        <p style="font-weight:700; color:${color}; margin:0 0 4px 0; font-size:14px;">${escHtml(item.title)}</p>
        <p style="color:#444; margin:0; font-size:13px; line-height:1.6;">${escHtml(item.explanation)}</p>
      </div>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>swisscontract.ai — ${escHtml(contractLabel)}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a1a; margin: 0; padding: 0; background: #fff; }
    .page { max-width: 800px; margin: 0 auto; padding: 40px 32px; }
    .header { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb; }
    .logo { font-size: 22px; font-weight: 800; color: #111; letter-spacing: -0.5px; }
    .logo span { color: #dc2626; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; background: #dbeafe; color: #1e40af; }
    .section { margin-bottom: 28px; }
    .section-title { font-size: 16px; font-weight: 700; color: #111; margin: 0 0 12px 0; padding-bottom: 6px; border-bottom: 1px solid #e5e7eb; }
    .summary-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.7; color: #374151; white-space: pre-line; }
    .qa-box { background: #eef2ff; border: 1px solid #c7d2fe; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.7; color: #3730a3; }
    .swiss-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.7; color: #1e40af; white-space: pre-line; }
    .disclaimer { background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 12px 16px; font-size: 12px; color: #92400e; line-height: 1.5; margin-top: 32px; }
    .footer-note { text-align: center; font-size: 11px; color: #9ca3af; margin-top: 16px; }
    @media print {
      body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
      .page { padding: 20px; }
    }
  </style>
</head>
<body>
<div class="page">
  <div class="header">
    <div class="logo">swisscontract<span>.ai</span></div>
    <span class="badge">${escHtml(contractLabel)}</span>
  </div>

  ${analysis.question_answer ? `
  <div class="section">
    <p class="section-title">💬 ${escHtml(l.yourQuestion)}</p>
    <div class="qa-box">${escHtml(analysis.question_answer)}</div>
  </div>` : ''}

  <div class="section">
    <p class="section-title">📄 ${escHtml(l.summary)}</p>
    <div class="summary-box">${escHtml(analysis.summary)}</div>
  </div>

  ${analysis.red_flags && analysis.red_flags.length > 0 ? `
  <div class="section">
    <p class="section-title">⚠️ ${escHtml(l.redFlags)} (${analysis.red_flags.length})</p>
    ${renderItems(analysis.red_flags, '#dc2626')}
  </div>` : ''}

  ${analysis.positive_clauses && analysis.positive_clauses.length > 0 ? `
  <div class="section">
    <p class="section-title">✅ ${escHtml(l.positiveClauses)} (${analysis.positive_clauses.length})</p>
    ${renderItems(analysis.positive_clauses, '#16a34a')}
  </div>` : ''}

  ${analysis.key_terms && analysis.key_terms.length > 0 ? `
  <div class="section">
    <p class="section-title">🏷️ ${escHtml(l.keyTerms)}</p>
    ${renderItems(analysis.key_terms, '#374151')}
  </div>` : ''}

  ${analysis.swiss_law_notes ? `
  <div class="section">
    <p class="section-title">🇨🇭 ${escHtml(l.swissLaw)}</p>
    <div class="swiss-box">${escHtml(analysis.swiss_law_notes)}</div>
  </div>` : ''}

  <div class="disclaimer">${escHtml(l.disclaimer)}</div>
  <div class="footer-note">Generated by swisscontract.ai</div>
</div>
<script>window.onload = function() { window.print(); };<\/script>
</body>
</html>`;
}

export default function AnalysisResult({ analysis, onReset, resetLabel = 'Analyse Another Contract', languageLabel = 'Language', languageNames, compact = false, contractTypeLabels: labelMap, labels }: AnalysisResultProps) {
  const l = labels ?? {
    summary: 'Summary',
    keyTerms: 'Key Terms & Clauses',
    redFlags: 'Red Flags',
    positiveClauses: 'Positive Clauses',
    swissLaw: 'Swiss Law Context',
    yourQuestion: 'Your Question Answered',
    disclaimer: 'Not legal advice. This AI summary is for informational purposes only. Consult a qualified Swiss lawyer for legal matters.',
    download: 'Download PDF',
  };
  const contractLabel = (labelMap && labelMap[analysis.contract_type]) || contractTypeLabelsFallback[analysis.contract_type] || analysis.contract_type || 'Contract';

  const handleDownloadPdf = () => {
    const html = buildPrintHtml(analysis, contractLabel, l);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  };
  const contractColor = contractTypeColors[analysis.contract_type] || contractTypeColors.other;
  const displayLanguage = languageNames
    ? (languageNames[analysis.language?.toLowerCase()] || analysis.language)
    : analysis.language;

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${contractColor}`}>
            {contractLabel}
          </span>
          <span className="text-sm text-gray-500">
            {languageLabel}: <span className="font-medium text-gray-700">{displayLanguage}</span>
          </span>
        </div>
        {!compact && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPdf}
              className="text-sm text-gray-600 hover:text-gray-800 font-medium flex items-center gap-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {l.download || 'Download PDF'}
            </button>
            <button
              onClick={onReset}
              className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center gap-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {resetLabel}
            </button>
          </div>
        )}
      </div>

      {/* Question Answer */}
      {analysis.question_answer && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-indigo-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {l.yourQuestion}
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
          {l.summary}
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{analysis.summary}</p>
      </div>

      {/* Red Flags */}
      {analysis.red_flags && analysis.red_flags.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {l.redFlags} ({analysis.red_flags.length})
          </h2>
          <div className="space-y-3">
            {analysis.red_flags.map((flag, i) => (
              <div key={i} className="bg-white border border-red-200 rounded-lg p-4">
                <p className="font-semibold text-red-800 mb-1">{flag.title}</p>
                <p className="text-red-700 text-sm leading-relaxed">{flag.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Positive Clauses */}
      {analysis.positive_clauses && analysis.positive_clauses.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {l.positiveClauses} ({analysis.positive_clauses.length})
          </h2>
          <div className="space-y-3">
            {analysis.positive_clauses.map((clause, i) => (
              <div key={i} className="bg-white border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-green-800 mb-1">{clause.title}</p>
                <p className="text-green-700 text-sm leading-relaxed">{clause.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Terms */}
      {analysis.key_terms && analysis.key_terms.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            {l.keyTerms}
          </h2>
          <div className="space-y-2">
            {analysis.key_terms.map((term, i) => (
              <AccordionItem key={i} item={term} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Swiss Law Notes */}
      {analysis.swiss_law_notes && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {l.swissLaw}
          </h2>
          <p className="text-blue-800 text-sm leading-relaxed whitespace-pre-line">{analysis.swiss_law_notes}</p>
        </div>
      )}

      {/* Disclaimer */}
      {!compact && (
        <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
          <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <p className="text-sm text-amber-800 leading-relaxed">
            {l.disclaimer}
          </p>
        </div>
      )}

      {/* Bottom Reset Button */}
      {!compact && (
        <div className="text-center pt-2 pb-4">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {resetLabel}
          </button>
        </div>
      )}
    </div>
  );
}
