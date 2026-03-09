import { MetadataRoute } from 'next'

const CONTRACT_TYPES = ['employment', 'tenancy', 'nda', 'insurance', 'freelance'] as const;
const LOCALES = ['en', 'de', 'fr', 'it'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const contractTypeEntries: MetadataRoute.Sitemap = [];

  for (const type of CONTRACT_TYPES) {
    for (const locale of LOCALES) {
      const prefix = locale === 'en' ? '' : `/${locale}`;
      contractTypeEntries.push({
        url: `https://swisscontract.ai${prefix}/contracts/${type}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return [
    {
      url: 'https://swisscontract.ai',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://swisscontract.ai/de',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://swisscontract.ai/fr',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://swisscontract.ai/it',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...contractTypeEntries,
    {
      url: 'https://swisscontract.ai/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
