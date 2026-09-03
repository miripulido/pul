import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { isLocale } from '@/lib/i18n';
import { getDictionary } from '@/content/dictionary';
import { locations } from '@/content/locations';
import { site } from '@/content/site';
import Reveal from '@/components/Reveal';
import LocationCard from '@/components/LocationCard';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const locale: Locale = isLocale(params.lang) ? params.lang : 'en';
  const dict = getDictionary(locale);
  return {
    title: dict.meta.locationsTitle,
    description: dict.meta.locationsDescription,
    alternates: { canonical: `/${locale}/locations`, languages: { en: '/en/locations', es: '/es/locations' } },
    openGraph: { title: dict.meta.locationsTitle, description: dict.meta.locationsDescription, url: `/${locale}/locations` },
    twitter: { card: 'summary_large_image', title: dict.meta.locationsTitle, description: dict.meta.locationsDescription },
  };
}

export default function LocationsPage({ params }: { params: { lang: string } }) {
  const locale: Locale = isLocale(params.lang) ? params.lang : 'en';
  const dict = getDictionary(locale);

  return (
    <div className="wrap pt-16 sm:pt-24">
      <div className="flex items-baseline justify-between border-b border-line pb-6">
        <span className="eyebrow">{dict.locationsPage.title}</span>
        <span className="eyebrow">{site.location}</span>
      </div>

      <Reveal as="h1" className="mt-16 text-h1 font-medium tracking-tightest max-w-[18ch]">
        {dict.locationsPage.lead}
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2">
        {locations.map((loc, i) => (
          <Reveal key={loc.slug} delay={(i % 2) * 80}>
            <LocationCard location={loc} locale={locale} dict={dict} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
