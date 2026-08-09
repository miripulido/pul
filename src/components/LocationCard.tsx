import Link from 'next/link';
import type { Location } from '@/content/locations';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/content/dictionary';
import MediaFrame from './MediaFrame';

interface LocationCardProps {
  location: Location;
  locale: Locale;
  dict: Dictionary;
  sizes?: string;
}

/**
 * One card in the collection grid. Available locations link through and react
 * to hover; coming-soon entries are deliberate, quiet placeholders that make
 * the collection read as a growing series rather than a single listing.
 */
export default function LocationCard({ location, locale, dict, sizes }: LocationCardProps) {
  const title = location.title[locale];

  if (location.status === 'coming-soon') {
    return (
      <div className="group flex flex-col">
        <div
          className="relative flex items-center justify-center border border-line bg-transparent transition-colors duration-700 ease-arch group-hover:border-ink/30"
          style={{ aspectRatio: '3 / 2' }}
        >
          <span className="text-eyebrow uppercase tracking-label text-muted/60 transition-colors duration-700 ease-arch group-hover:text-muted">
            {dict.location.comingSoon}
          </span>
        </div>
        <div className="mt-5 flex items-baseline justify-between">
          <span className="eyebrow">{location.number}</span>
          <span className="eyebrow text-muted/70">{location.tagline[locale]}</span>
        </div>
      </div>
    );
  }

  const href = `/${locale}/locations/${location.slug}`;

  return (
    <Link href={href} className="group flex flex-col">
      {location.hero && (
        <MediaFrame media={location.hero} locale={locale} hover sizes={sizes ?? '(min-width: 768px) 50vw, 100vw'} />
      )}
      <div className="mt-5 flex items-start justify-between gap-6 transition-transform duration-500 ease-arch group-hover:-translate-y-0.5">
        <div>
          <div className="flex items-baseline gap-4">
            <span className="eyebrow">{location.number}</span>
            <h3 className="text-h2 tracking-tighter leading-none">{title}</h3>
          </div>
          <p className="mt-2 text-muted transition-colors duration-500 ease-arch group-hover:text-ink">{location.place}</p>
        </div>
        <span
          aria-hidden
          className="mt-1 shrink-0 translate-x-0 text-lg transition-transform duration-500 ease-arch group-hover:translate-x-1"
        >
          →
        </span>
      </div>
      {location.productions && (
        <p className="mt-3 text-eyebrow uppercase tracking-label text-muted">
          {location.productions[locale].slice(0, 4).join('  /  ')}
        </p>
      )}
    </Link>
  );
}
