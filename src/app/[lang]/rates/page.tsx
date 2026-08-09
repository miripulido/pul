import type { Metadata } from 'next';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { isLocale } from '@/lib/i18n';
import { getDictionary } from '@/content/dictionary';
import { pricing } from '@/content/locations';
import { formatPrice } from '@/lib/format';
import Reveal from '@/components/Reveal';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const locale: Locale = isLocale(params.lang) ? params.lang : 'en';
  const dict = getDictionary(locale);
  return {
    title: dict.meta.ratesTitle,
    description: dict.meta.ratesDescription,
    alternates: { canonical: `/${locale}/rates`, languages: { en: '/en/rates', es: '/es/rates' } },
    openGraph: { title: dict.meta.ratesTitle, description: dict.meta.ratesDescription, url: `/${locale}/rates` },
  };
}

export default function RatesPage({ params }: { params: { lang: string } }) {
  const locale: Locale = isLocale(params.lang) ? params.lang : 'en';
  const dict = getDictionary(locale);
  const base = `/${locale}`;
  const t = dict.rates;

  const tiers = [
    { label: t.halfDay, price: pricing.halfDay, note: t.halfNote },
    { label: t.fullDay, price: pricing.fullDay, note: t.fullNote },
  ];

  return (
    <article className="wrap pt-16 sm:pt-24">
      <div className="flex items-baseline justify-between border-b border-line pb-6">
        <span className="eyebrow">{t.title}</span>
        <span className="eyebrow">
          {t.from} {formatPrice(pricing.from, locale)}
        </span>
      </div>

      <Reveal as="h1" className="mt-16 text-h1 font-medium tracking-tightest max-w-[16ch]">
        {t.title}
      </Reveal>
      <Reveal as="p" className="mt-6 max-w-2xl text-lead tracking-tight text-muted">
        {t.lead}
      </Reveal>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2">
        {tiers.map((tier, i) => (
          <Reveal
            key={tier.label}
            delay={i * 80}
            className={
              'border-t border-line py-10 sm:py-14 ' +
              (i === 0 ? 'md:pr-12' : 'md:pl-12 md:border-l')
            }
          >
            <p className="eyebrow">{tier.label}</p>
            <p className="mt-4 text-display font-medium tracking-tightest leading-none">
              {formatPrice(tier.price, locale)}
            </p>
            <p className="mt-6 text-muted">{tier.note}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-14 space-y-3 border-t border-line pt-8">
        <p className="text-muted">— {t.overtime}</p>
        <p className="text-muted">— {t.interiors}</p>
        <p className="text-muted">— {t.quoteNote}</p>
      </div>

      <section className="mt-28 sm:mt-40 border-t border-ink pt-12">
        <Reveal as="h2" className="text-h1 font-medium tracking-tightest max-w-[16ch]">
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
