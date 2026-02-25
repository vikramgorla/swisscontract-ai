import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — swisscontract.ai',
  description: 'How swisscontract.ai handles your data. Short version: we don\'t store anything.',
  robots: 'index, follow',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
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
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose prose-gray max-w-none">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: February 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">The short version</h2>
          <p className="text-gray-700 leading-relaxed">We do not store your contracts, your questions, or your analysis results. Nothing you upload is written to a database. We have no user accounts and no way to link any document to any person.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">What happens when you upload a contract</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2"><span className="text-green-500 mt-1">✓</span> Your file is sent over HTTPS to our server.</li>
            <li className="flex items-start gap-2"><span className="text-green-500 mt-1">✓</span> Text is extracted in memory and sent to the AI for analysis.</li>
            <li className="flex items-start gap-2"><span className="text-green-500 mt-1">✓</span> The analysis result is returned to your browser.</li>
            <li className="flex items-start gap-2"><span className="text-green-500 mt-1">✓</span> The extracted text is discarded immediately — it is never written to disk or any storage system.</li>
            <li className="flex items-start gap-2"><span className="text-green-500 mt-1">✓</span> Your original file is never stored on our servers.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Analytics cookies</h2>
          <p className="text-gray-700 leading-relaxed mb-3">We use Google Analytics to understand how many people use swisscontract.ai and which features are most useful. This requires a cookie. <strong>We only load Google Analytics after you explicitly accept cookies</strong> via the banner at the bottom of the page.</p>
          <p className="text-gray-700 leading-relaxed mb-3">If you decline, no analytics cookies are set and no data is sent to Google.</p>
          <p className="text-gray-700 leading-relaxed">We store your cookie preference (accepted/declined) in your browser&apos;s localStorage. This preference itself does not leave your device.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Language preference</h2>
          <p className="text-gray-700 leading-relaxed">We store your selected language (EN/DE/FR/IT) in a browser cookie so we can show the site in your preferred language on your next visit. This cookie contains no personal data.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Data we do not collect</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2"><span className="text-red-400 mt-1">✗</span> We do not collect your name, email, or any personal details.</li>
            <li className="flex items-start gap-2"><span className="text-red-400 mt-1">✗</span> We do not store the contracts you upload.</li>
            <li className="flex items-start gap-2"><span className="text-red-400 mt-1">✗</span> We do not log which contracts you analyse.</li>
            <li className="flex items-start gap-2"><span className="text-red-400 mt-1">✗</span> We do not sell data to third parties.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Open source</h2>
          <p className="text-gray-700 leading-relaxed">
            swisscontract.ai is open source. You can review exactly how your contract is processed, what is sent to the AI, and what is discarded.{' '}
            <a
              href="https://github.com/vikramgorla/swisscontract-ai"
              className="text-red-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View the source code on GitHub →
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Your rights (nFADP / GDPR)</h2>
          <p className="text-gray-700 leading-relaxed">Because we do not store personal data or link any information to individuals, most data subject rights (access, deletion, portability) do not apply in practice — there is nothing to access or delete.</p>
        </section>
      </article>

      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 text-center text-xs text-gray-400">
          <Link href="/" className="text-red-600 hover:underline font-medium">← Back to swisscontract.ai</Link>
        </div>
      </footer>
    </main>
  );
}
