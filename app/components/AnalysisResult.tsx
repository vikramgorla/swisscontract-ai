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
}

const contractTypeLabels: Record<string, string> = {
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

export default function AnalysisResult({ analysis, onReset, resetLabel = 'Analyse Another Contract', languageLabel = 'Language' }: AnalysisResultProps) {
  const contractLabel = contractTypeLabels[analysis.contract_type] || 'Contract';
  const contractColor = contractTypeColors[analysis.contract_type] || contractTypeColors.other;

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${contractColor}`}>
            {contractLabel}
          </span>
          <span className="text-sm text-gray-500">
            {languageLabel}: <span className="font-medium text-gray-700">{analysis.language}</span>
          </span>
        </div>
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

      {/* Question Answer */}
      {analysis.question_answer && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-indigo-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Your Question Answered
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
          Summary
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
            Red Flags ({analysis.red_flags.length})
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
            Positive Clauses ({analysis.positive_clauses.length})
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
            Key Terms & Clauses
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
            Swiss Law Context
          </h2>
          <p className="text-blue-800 text-sm leading-relaxed whitespace-pre-line">{analysis.swiss_law_notes}</p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
        <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
        <p className="text-sm text-amber-800 leading-relaxed">
          <strong>Not legal advice.</strong> This AI summary is for self-review purposes — to help you understand what you're reading before you sign. For binding legal decisions, always consult a qualified Swiss lawyer.
        </p>
      </div>

      {/* Bottom Reset Button */}
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
    </div>
  );
}
