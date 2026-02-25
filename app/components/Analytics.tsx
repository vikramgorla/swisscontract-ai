'use client';
import { useEffect } from 'react';

const GA_ID = 'GA_MEASUREMENT_ID';

function loadGA() {
  // Guard: don't inject twice
  if (document.getElementById('ga-script')) return;

  const script = document.createElement('script');
  script.id = 'ga-script';
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) { (window as any).dataLayer.push(args); }
    (window as any).gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  };
}

export default function Analytics() {
  useEffect(() => {
    // Fire on mount if consent already given
    if (localStorage.getItem('cookie_consent') === 'accepted') {
      loadGA();
    }

    // Fire when user accepts consent in this session
    const handler = () => loadGA();
    window.addEventListener('cookie_consent_accepted', handler);
    return () => window.removeEventListener('cookie_consent_accepted', handler);
  }, []);

  return null;
}
