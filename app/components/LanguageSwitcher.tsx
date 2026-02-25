'use client';
import { useRouter } from 'next/navigation';

const LANGUAGES = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'it', label: 'IT', flag: '🇮🇹' },
];

export default function LanguageSwitcher({ current }: { current: string }) {
  const router = useRouter();

  const switchLocale = (code: string) => {
    document.cookie = `locale=${code};path=/;max-age=31536000`;
    router.refresh();
  };

  return (
    <div className="flex items-center gap-1">
      {LANGUAGES.map(lang => (
        <button
          key={lang.code}
          onClick={() => switchLocale(lang.code)}
          className={`text-xs px-2 py-1 rounded font-medium transition-colors ${
            current === lang.code
              ? 'bg-red-600 text-white'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          {lang.flag} {lang.label}
        </button>
      ))}
    </div>
  );
}
