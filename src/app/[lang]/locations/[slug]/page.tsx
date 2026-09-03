import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { isLocale, locales } from '@/lib/i18n';
import { getDictionary } from '@/content/dictionary';
import { availableLocations, getLocation, pricing } from '@/content/locations';
import { site } from '@/content/site';
import { formatPrice } from '@/lib/format';
import Reveal from '@/components/Reveal';
import WordReveal from '@/components/WordReveal';
import MediaFrame from '@/components/MediaFrame';

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    availableLocations.map((loc) => ({ lang, slug: loc.slug })),
  );
}

export function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Metadata {
  const locale: Locale = isLocale(params.lang) ? params.lang : 'en';
  const dict = getDictionary(locale);
  const location = getLocation(params.slug);
  if (!location || location.status !== 'available' || !location.meta) {
    return { title: dict.meta.homeTitle };
  }
  const path = `/${locale}/locations/${location.slug}`;
  return {
    title: location.meta.title[locale],
    description: location.meta.description[locale],
    alternates: {
      canonical: path,
      languages: {
        en: `/en/locations/${location.slug}`,
        es: `/es/locations/${location.slug}`,
      },
    },
    openGraph: {
      title: location.meta.title[locale],
      description: location.meta.description[locale],
      url: path,
    },
    // Metadata merges with the root layout's, so any field left unset here
    // (this one was) silently inherits the layout's site-wide default —
    // which meant every location page's Twitter card showed the homepage's
    // title/description instead of its own. Every field that varies by page
    // needs to be set explicitly at the page level.
    twitter: {
      card: 'summary_large_image',
      title: location.meta.title[locale],
      description: location.meta.description[locale],
    },
  };
}

export default function LocationDetail({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const locale: Locale = isLocale(params.lang) ? params.lang : 'en';
  const dict = getDictionary(locale);
  const location = getLocation(params.slug);

  if (!location || location.status !== 'available') notFound();
  const base = `/${locale}`;

  // Structured data — a shooting location offered for hire, with rates.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: `${site.brand.name} ${location.number} — ${location.title[locale]}`,
    description: location.meta?.description[locale],
    address: { '@type': 'PostalAddress', addressLocality: 'Madrid', addressCountry: 'ES' },
    makesOffer: [
      { '@type': 'Offer', name: dict.rates.halfDay, price: pricing.halfDay, priceCurrency: pricing.currency },
      { '@type': 'Offer', name: dict.rates.fullDay, price: pricing.fullDay, priceCurrency: pricing.currency },
    ],
  };

  return (
    <article className="wrap pt-16 sm:pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <div className="flex items-baseline justify-between border-b border-line pb-6">
        <Link href={base} className="link eyebrow">
          ← {dict.actions.back}
        </Link>
        <span className="eyebrow">{location.place} · {site.coordinates}</span>
      </div>

      <div className="mt-12 flex items-baseline gap-6">
        <Reveal as="span" className="eyebrow">{location.number}</Reveal>
        <WordReveal
          as="h1"
          text={location.title[locale]}
          className="text-h1 font-medium tracking-tightest leading-none"
        />
      </div>
      <Reveal as="p" className="mt-6 text-lead tracking-tight max-w-2xl">
        {location.tagline[locale]}
      </Reveal>

      {/* Hero */}
      {location.hero && (
        <Reveal className="mt-12" variant="mask">
          <MediaFrame media={location.hero} locale={locale} priority sizes="(min-width: 1600px) 1600px, 100vw" />
        </Reveal>
      )}

      {/* Description */}
      {location.body && (
        <section className="mt-20 sm:mt-28 grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="eyebrow">{location.place}</span>
          </div>
          <div className="md:col-span-8 space-y-6 text-lead tracking-tight">
            {location.body[locale].map((p, i) => (
              <Reveal as="p" key={i} delay={i * 60}>{p}</Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Image sequence */}
      {location.gallery && (
        <section className="mt-20 sm:mt-28 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-12">
          {location.gallery.map((m, i) => {
            // Alternate span/offset for an art-directed rhythm.
            const layout = [
              'md:col-span-8 md:col-start-1',
              'md:col-span-4 md:col-start-9 md:mt-24',
              'md:col-span-5 md:col-start-2',
              'md:col-span-6 md:col-start-7 md:mt-8',
            ];
            return (
              <Reveal
                key={i}
                delay={(i % 2) * 60}
                variant={i === 0 ? 'mask' : 'rise'}
                className={layout[i % layout.length]}
              >
                <MediaFrame media={m} locale={locale} sizes="(min-width: 768px) 50vw, 100vw" />
              </Reveal>
            );
          })}
        </section>
      )}

      {/* Features + Productions */}
      <section className="mt-24 sm:mt-32 grid grid-cols-1 gap-16 md:grid-cols-2">
        {location.features && (
          <div>
            <div className="border-t border-line pt-6"><span className="eyebrow">{dict.location.features}</span></div>
            <ul className="mt-6">
              {location.features[locale].map((f, i) => (
                <Reveal as="li" key={f} delay={i * 40} className="border-b border-line py-5 text-h2 tracking-tighter">
                  {f}
                </Reveal>
              ))}
            </ul>
          </div>
        )}
        {location.productions && (
          <div>
            <div className="border-t border-line pt-6"><span className="eyebrow">{dict.location.productions}</span></div>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-h2 tracking-tighter">
              {location.productions[locale].map((p, i) => (
                <li key={p} className={i % 2 === 1 ? 'text-muted' : ''}>{p}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Rates */}
      <section className="mt-24 sm:mt-32">
        <div className="border-t border-line pt-6"><span className="eyebrow">{dict.location.rates}</span></div>
        <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-3">
          <div>
            <p className="eyebrow">{dict.rates.halfDay}</p>
            <p className="mt-3 text-h1 font-medium tracking-tightest">{formatPrice(pricing.halfDay, locale)}</p>
          </div>
          <div>
            <p className="eyebrow">{dict.rates.fullDay}</p>
            <p className="mt-3 text-h1 font-medium tracking-tightest">{formatPrice(pricing.fullDay, locale)}</p>
          </div>
          <div className="text-muted">
            <p>{dict.rates.overtime}</p>
            {location.notes && <p className="mt-3">{location.notes[locale]}</p>}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-24 sm:mt-40 border-t border-ink pt-12">
        <Reveal as="h2" variant="fade" className="text-display font-medium tracking-tightest max-w-[14ch]">
          {dict.home.finalHeading}
        </Reveal>
        <Link href={`${base}/enquire?location=${location.slug}`} className="group btn mt-10">
          {dict.actions.requestAvailability}{' '}
          <span aria-hidden className="inline-block transition-transform duration-standard ease-arch group-hover:translate-x-1">→</span>
        </Link>
      </section>
    </article>
  );
}
