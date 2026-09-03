import Link from 'next/link';
import type { Location } from '@/content/locations';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/content/dictionary';
import MediaFrame from './MediaFrame';
import CursorFollow from './CursorFollow';

interface LocationCardProps {
  location: Location;
  locale: Locale;
  dict: Dictionary;
  sizes?: string;
}

/** One card in the collection grid, linking through to a location's page. */
export default function LocationCard({ location, locale, dict, sizes }: LocationCardProps) {
  const title = location.title[locale];
  const href = `/${locale}/locations/${location.slug}`;

  return (
    <Link href={href} className="group flex flex-col">
      {location.hero && (
        <CursorFollow label={dict.actions.view}>
          <MediaFrame media={location.hero} locale={locale} hover sizes={sizes ?? '(min-width: 768px) 50vw, 100vw'} />
        </CursorFollow>
      )}
      <div className="mt-5 flex items-start justify-between gap-6 transition-transform duration-standard ease-arch group-hover:-translate-y-0.5">
        <div>
          <div className="flex items-baseline gap-4">
            <span className="eyebrow">{location.number}</span>
            <h3 className="text-h2 tracking-tighter leading-none">{title}</h3>
          </div>
          <p className="mt-2 text-muted transition-colors duration-standard ease-arch group-hover:text-ink">{location.place}</p>
        </div>
        <span
          aria-hidden
          className="mt-1 shrink-0 translate-x-0 text-lg transition-transform duration-standard ease-arch group-hover:translate-x-1"
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
