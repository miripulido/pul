import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';
import { availableLocations } from '@/content/locations';
import { site } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', '/locations', '/about', '/rates', '/enquire'];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${site.url}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: path === '' ? 1 : 0.7,
      });
    }
    for (const loc of availableLocations) {
      entries.push({
        url: `${site.url}/${locale}/locations/${loc.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return entries;
}
