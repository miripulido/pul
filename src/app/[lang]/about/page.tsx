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
  };
}

export default function AboutPage({ params }: { params: { lang: string } }) {
  const locale: Locale = isLocale(params.lang) ? params.lang : 'en';
  const dict = getDictionary(locale);
  const base = `/${locale}`;

  return (
    <article className="wrap pt-16 sm:pt-24">
      <div className="flex items-baseline justify-between border-b border-line pb-6">
        <span className="eyebrow">{dict.about.title}</span>
        <span className="eyebrow">{site.location}</span>
      </div>

      <Reveal as="h1" className="mt-16 text-h1 font-medium tracking-tightest max-w-[18ch]">
        {dict.about.lead}
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className="eyebrow">01 — {dict.about.title}</span>
        </div>
        <div className="md:col-span-8 space-y-6 text-lead tracking-tight">
          {dict.about.body.map((p, i) => (
            <Reveal as="p" key={i} delay={i * 60}>
              {p}
            </Reveal>
          ))}
        </div>
      </div>

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
        <Link href={`${base}/enquire`} className="btn mt-10">
          {dict.actions.requestAvailability} <span aria-hidden>→</span>
        </Link>
      </section>
    </article>
  );
}
