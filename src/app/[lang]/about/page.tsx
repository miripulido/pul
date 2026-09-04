import type { Metadata } from 'next';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { isLocale } from '@/lib/i18n';
import { getDictionary } from '@/content/dictionary';
import { site } from '@/content/site';
import Reveal from '@/components/Reveal';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const locale: Locale = isLocale(params.lang) ? params.lang : 'en';
  const dict = getDictionary(locale);
  return {
    title: dict.meta.aboutTitle,
    description: dict.meta.aboutDescription,
    alternates: { canonical: `/${locale}/about`, languages: { en: '/en/about', es: '/es/about' } },
    openGraph: { title: dict.meta.aboutTitle, description: dict.meta.aboutDescription, url: `/${locale}/about` },
    // Left unset, this silently inherits the root layout's homepage Twitter
    // card instead of this page's own — see the location page's comment.
    twitter: { card: 'summary_large_image', title: dict.meta.aboutTitle, description: dict.meta.aboutDescription },
  };
}

export default function AboutPage({ params }: { params: { lang: string } }) {
  const locale: Locale = isLocale(params.lang) ? params.lang : 'en';
  const dict = getDictionary(locale);
  const base = `/${locale}`;

  return (
    <article className="wrap pt-16 sm:pt-24">
      {/* This header, the h1 and the intro paragraphs are all visible on
          load without scrolling on most viewports — a scroll-triggered
          Reveal never gets a chance to animate content that's already in
          view the instant it mounts (IntersectionObserver's first callback
          fires already-intersecting, so React sets [data-shown] before the
          browser's first paint, and there's nothing left to transition
          from). `.enter-rise` is the mount-triggered equivalent used
          elsewhere for exactly this case (EnquiryForm's fields, its
          success/error state) — staggered here the same way. Content
          further down the page (Approach, the final CTA) genuinely is
          off-screen at load, so it keeps the normal scroll-triggered
          Reveal. */}
      <div className="enter-rise flex items-baseline justify-between border-b border-line pb-6">
        <span className="eyebrow">{dict.about.title}</span>
        <span className="eyebrow">{site.location}</span>
      </div>

      <h1
        className="enter-rise mt-16 text-h1 font-medium tracking-tightest max-w-[18ch]"
        style={{ animationDelay: '80ms' }}
      >
        {dict.about.lead}
      </h1>

      <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-12">
        <div className="enter-rise md:col-span-3" style={{ animationDelay: '140ms' }}>
          <span className="eyebrow">01 — {dict.about.title}</span>
        </div>
        <div className="md:col-span-8 space-y-6 text-lead tracking-tight">
          {dict.about.body.map((p, i) => (
            <p key={i} className="enter-rise" style={{ animationDelay: `${180 + i * 80}ms` }}>
              {p}
            </p>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- WHERE */}
      <section className="mt-28 sm:mt-40">
        <div className="border-t border-line pt-6">
          <span className="eyebrow">{dict.about.locationTitle}</span>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="text-lead tracking-tight max-w-xs">{dict.about.locationNote}</p>
          </Reveal>
          <Reveal className="md:col-span-8" delay={80} variant="mask">
            {/* City-level view only, no marker — the address itself is
                never shown, matching the "Discreet" principle below.
                Grayscale keeps the map from introducing colour into the
                UI chrome; photography stays the site's only source of it. */}
            <div
              className="relative overflow-hidden border border-line bg-ink-faint"
              style={{ aspectRatio: '16 / 9' }}
            >
              <iframe
                title="Madrid"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-3.83%2C40.30%2C-3.58%2C40.53&layer=mapnik"
                className="absolute inset-0 h-full w-full grayscale contrast-[1.1]"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mt-28 sm:mt-40">
        <div className="border-t border-line pt-6">
          <span className="eyebrow">{dict.about.principlesTitle}</span>
        </div>
        <dl className="mt-8 grid grid-cols-1 md:grid-cols-3">
          {dict.about.principles.map((pr, i) => (
            <Reveal key={pr.term} delay={i * 60} className="border-b border-line py-8 md:pr-8">
              <dt className="text-h2 tracking-tighter">{pr.term}</dt>
              <dd className="mt-4 text-muted max-w-xs">{pr.def}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="mt-28 sm:mt-40 border-t border-ink pt-12">
        <Reveal as="h2" variant="fade" className="text-display font-medium tracking-tightest max-w-[14ch]">
          {dict.home.finalHeading}
        </Reveal>
        <Link href={`${base}/enquire`} className="group btn mt-10">
          {dict.actions.requestAvailability}{' '}
          <span aria-hidden className="inline-block transition-transform duration-standard ease-arch group-hover:translate-x-1">→</span>
        </Link>
      </section>
    </article>
  );
}
