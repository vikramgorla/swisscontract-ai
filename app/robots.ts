import type { MetadataRoute } from 'next';
import { isProd } from './lib/env';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const prod = await isProd();

  if (!prod) {
    return {
      rules: { userAgent: '*', disallow: '/' },
    };
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://swisscontract.ai/sitemap.xml',
  };
}
