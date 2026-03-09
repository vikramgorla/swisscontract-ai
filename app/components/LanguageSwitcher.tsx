'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LANGUAGES = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'it', label: 'IT', flag: '🇮🇹' },
];

export default function LanguageSwitcher({ current, contractType }: { current: string; contractType?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const currentLang = LANGUAGES.find(l => l.code === current) ?? LANGUAGES[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const switchLocale = (code: string) => {
    setOpen(false);
    const prefix = code === 'en' ? '' : `/${code}`;
    const suffix = contractType ? `/contracts/${contractType}` : '';
    const path = prefix + suffix || '/';
    router.push(path);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
      >
        <span>{currentLang.flag}</span>
        <span>{currentLang.label}</span>
        <svg className={`w-3 h-3 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50 min-w-[80px]">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => switchLocale(lang.code)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors text-left ${
                lang.code === current
                  ? 'bg-red-50 text-red-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
