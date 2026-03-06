import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isPreprod = process.env.NEXT_PUBLIC_ENV === 'preprod';

  if (isPreprod) {
    return {
      rules: { userAgent: '*', disallow: '/' },
    };
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://swisscontract.ai/sitemap.xml',
  };
}
