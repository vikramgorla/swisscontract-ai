'use client';
import { useState, useEffect } from 'react';
import { translations, Locale } from '../i18n/translations';

export default function CookieBanner({ locale = 'en' }: { locale?: Locale }) {
  const [visible, setVisible] = useState(false);
  const t = translations[locale];

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    window.dispatchEvent(new Event('cookie_consent_accepted'));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-sm text-gray-600">{t.cookie_banner}</p>
        <button
          onClick={accept}
          className="flex-shrink-0 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
        >
          {t.cookie_accept}
        </button>
      </div>
    </div>
  );
}
