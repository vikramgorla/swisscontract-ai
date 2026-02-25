'use client';
import { useEffect } from 'react';
import Script from 'next/script';

export default function Analytics() {
  useEffect(() => {
    // Only load GA after consent has been given
    const consent = localStorage.getItem('cookie_consent');
    if (consent !== 'accepted') return;

    // Dynamically load GA script
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) { (window as any).dataLayer.push(args); }
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    };
  }, []);

  // Also fire GA when consent is given for the first time (CookieBanner sets this)
  useEffect(() => {
    const handler = () => {
      const consent = localStorage.getItem('cookie_consent');
      if (consent === 'accepted') {
        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
          (window as any).dataLayer = (window as any).dataLayer || [];
          function gtag(...args: any[]) { (window as any).dataLayer.push(args); }
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        };
      }
    };

    window.addEventListener('cookie_consent_accepted', handler);
    return () => window.removeEventListener('cookie_consent_accepted', handler);
  }, []);

  return null;
}
