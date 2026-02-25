'use client';

import { useState, useEffect } from 'react';
import { translations, Locale } from '../i18n/translations';

const TYPE_SPEED = 45;    // ms per character typed
const DELETE_SPEED = 20;  // ms per character deleted
const PAUSE_AFTER = 2200; // ms to pause when fully typed
const PAUSE_BEFORE = 400; // ms to pause before typing next

export function useTypewriterPlaceholder(locale: Locale = 'en') {
  const examples = translations[locale].typewriter_examples as readonly string[];
  const [displayText, setDisplayText] = useState('');
  const [exampleIndex, setExampleIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting' | 'waiting'>('typing');
  const [charIndex, setCharIndex] = useState(0);

  // Reset when locale changes
  useEffect(() => {
    setDisplayText('');
    setExampleIndex(0);
    setPhase('typing');
    setCharIndex(0);
  }, [locale]);

  useEffect(() => {
    const current = examples[exampleIndex % examples.length];

    if (phase === 'typing') {
      if (charIndex < current.length) {
        const t = setTimeout(() => {
          setDisplayText(current.slice(0, charIndex + 1));
          setCharIndex(c => c + 1);
        }, TYPE_SPEED);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('deleting'), PAUSE_AFTER);
        return () => clearTimeout(t);
      }
    }

    if (phase === 'deleting') {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setDisplayText(current.slice(0, charIndex - 1));
          setCharIndex(c => c - 1);
        }, DELETE_SPEED);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setExampleIndex(i => (i + 1) % examples.length);
          setPhase('typing');
        }, PAUSE_BEFORE);
        return () => clearTimeout(t);
      }
    }
  }, [phase, charIndex, exampleIndex, examples]);

  return displayText;
}
