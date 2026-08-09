import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { isLocale } from '@/lib/i18n';
import { getDictionary } from '@/content/dictionary';
import { availableLocations, comingSoonLocations, pricing } from '@/content/locations';
import { site } from '@/content/site';
import { formatPrice } from '@/lib/format';
import Reveal from '@/components/Reveal';
import WordReveal from '@/components/WordReveal';
import MediaFrame from '@/components/MediaFrame';
import ParallaxHero from '@/components/ParallaxHero';
import LocationCard from '@/components/LocationCard';

export default function Home({ params }: { params: { lang: string } }) {
  const locale: Locale = isLocale(params.lang) ? params.lang : 'en';
  const dict = getDictionary(locale);
  const base = `/${locale}`;
  const featured = availableLocations[0];

  return (
    <>
      {/* ---------------------------------------------------------------- HERO
          Entrance is choreographed, not simultaneous: wordmark/nav (see
          Nav.tsx) settle first, then this eyebrow row, then the headline,
          then the hero image — each beat later than the last. */}
      <section className="wrap pt-16 sm:pt-24">
        <div
          data-intro=""
          style={{ '--intro-delay': '180ms' } as React.CSSProperties}
          className="flex items-baseline justify-between"
        >
          <span className="eyebrow">{site.brand.name} — 001</span>
          <span className="eyebrow">
            {site.location} · {site.coordinates}
          </span>
        </div>
        <Reveal as="h1" variant="fade" delay={300} className="mt-8 sm:mt-12 text-display font-medium text-ink max-w-[16ch]">
          {dict.home.heroTagline}
        </Reveal>
      </section>

      <Reveal className="wrap mt-12 sm:mt-16" variant="mask" delay={480}>
        {featured.hero && (
          <ParallaxHero media={featured.hero} locale={locale} priority sizes="(min-width: 1600px) 1600px, 100vw" />
        )}
      </Reveal>

      {/* -------------------------------------------------------- INTRODUCTION */}
      <section className="wrap mt-28 sm:mt-40">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="eyebrow">01 — {dict.about.title}</span>
          </div>
          <Reveal as="p" className="md:col-span-9 text-lead tracking-tight text-ink max-w-4xl">
            {dict.home.intro}
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------- FEATURED LOCATION */}
      <section className="wrap mt-28 sm:mt-40">
        <div className="flex items-baseline justify-between border-t border-line pt-6">
          <span className="eyebrow">{dict.home.featuredIndex}</span>
          <span className="eyebrow">{featured.number}</span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <WordReveal
              as="h2"
              text={featured.title[locale]}
              className="text-h1 font-medium tracking-tightest leading-none"
            />
            <Reveal as="p" delay={120} className="mt-4 text-muted">{featured.place}</Reveal>
          </div>
          <Reveal className="md:col-span-5" delay={80}>
            <p className="text-lead tracking-tight">{featured.tagline[locale]}</p>
            {featured.description && (
              <p className="mt-5 text-muted max-w-md">{featured.description[locale]}</p>
            )}
            <Link href={`${base}/locations/${featured.slug}`} className="group link mt-7 inline-flex items-center gap-3 text-eyebrow uppercase tracking-label">
              {dict.actions.viewLocation}{' '}
              <span aria-hidden className="inline-block transition-transform duration-standard ease-arch group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>

        {/* Visual sequence — art-directed, uneven grid with room to breathe. */}
        {featured.gallery && featured.gallery.length >= 4 && (
          <div className="mt-16 sm:mt-24 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-12">
            <Reveal className="md:col-span-7 md:col-start-1" variant="mask">
              <MediaFrame media={featured.gallery[0]} locale={locale} sizes="(min-width: 768px) 58vw, 100vw" />
            </Reveal>
            <Reveal className="md:col-span-4 md:col-start-9 md:mt-24" delay={80}>
              <MediaFrame media={featured.gallery[1]} locale={locale} sizes="(min-width: 768px) 33vw, 100vw" />
            </Reveal>
            <Reveal className="md:col-span-5 md:col-start-2 md:mt-8" delay={40}>
              <MediaFrame media={featured.gallery[2]} locale={locale} sizes="(min-width: 768px) 42vw, 100vw" />
            </Reveal>
            <Reveal className="md:col-span-6 md:col-start-7" delay={80}>
              <MediaFrame media={featured.gallery[3]} locale={locale} sizes="(min-width: 768px) 50vw, 100vw" />
            </Reveal>
          </div>
        )}
      </section>

      {/* --------------------------------------------------- LOCATION FEATURES */}
      <section className="wrap mt-28 sm:mt-40">
        <div className="border-t border-line pt-6">
          <span className="eyebrow">{dict.home.featuresTitle}</span>
        </div>
        {featured.features && (
          <ul className="mt-8 grid grid-cols-2 md:grid-cols-3">
            {featured.features[locale].map((f, i) => (
              <Reveal
                as="li"
                key={f}
                delay={i * 40}
                className="border-b border-line py-6 sm:py-8 text-h2 tracking-tighter"
              >
                {f}
              </Reveal>
            ))}
          </ul>
        )}
      </section>

      {/* ---------------------------------------------------- PRODUCTION TYPES */}
      <section className="wrap mt-28 sm:mt-40">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="eyebrow">{dict.home.productionsTitle}</span>
          </div>
          <div className="md:col-span-9">
            <Reveal className="flex flex-wrap gap-x-8 gap-y-2 text-h1 font-medium tracking-tightest leading-[1.05]">
              {dict.home.productions.map((p, i) => (
                <span key={p} className={i % 2 === 1 ? 'text-muted' : 'text-ink'}>
                  {p}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- RATES */}
      <section className="wrap mt-28 sm:mt-40">
        <div className="border-t border-line pt-6 flex items-baseline justify-between">
          <span className="eyebrow">{dict.home.ratesTitle}</span>
          <span className="eyebrow">
            {dict.rates.from} {formatPrice(pricing.from, locale)}
          </span>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow">{dict.rates.halfDay}</p>
            <p className="mt-3 text-h1 font-medium tracking-tightest">{formatPrice(pricing.halfDay, locale)}</p>
          </Reveal>
          <Reveal className="md:col-span-4" delay={60}>
            <p className="eyebrow">{dict.rates.fullDay}</p>
            <p className="mt-3 text-h1 font-medium tracking-tightest">{formatPrice(pricing.fullDay, locale)}</p>
          </Reveal>
          <Reveal className="md:col-span-4 md:text-right" delay={120}>
            <p className="text-muted">{dict.rates.overtime}</p>
            <p className="mt-2 text-muted">{dict.rates.interiors}</p>
            <Link href={`${base}/rates`} className="link mt-6 inline-flex text-eyebrow uppercase tracking-label">
              {dict.nav.rates} →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- MORE LOCATIONS */}
      <section className="wrap mt-28 sm:mt-40">
        <div className="border-t border-line pt-6 flex items-baseline justify-between">
          <span className="eyebrow">{dict.home.moreTitle}</span>
          <span className="eyebrow text-muted/70">{dict.home.moreComing}</span>
        </div>
        <Reveal as="p" className="mt-8 max-w-2xl text-lead tracking-tight text-muted">
          {dict.home.moreBody}
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2">
          {comingSoonLocations.map((loc, i) => (
            <Reveal key={loc.slug} delay={i * 100}>
              <LocationCard location={loc} locale={locale} dict={dict} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ FINAL CTA */}
      <section className="wrap mt-28 sm:mt-48">
        <div className="border-t border-ink pt-12 sm:pt-16">
          <Reveal as="h2" variant="fade" className="text-display font-medium tracking-tightest max-w-[14ch]">
            {dict.home.finalHeading}
          </Reveal>
          <Link href={`${base}/enquire`} className="group btn mt-10">
            {dict.actions.requestAvailability}{' '}
            <span aria-hidden className="inline-block transition-transform duration-standard ease-arch group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
