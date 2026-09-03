import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { isLocale } from '@/lib/i18n';
import { getDictionary } from '@/content/dictionary';
import { site } from '@/content/site';
import { pricing, getLocation } from '@/content/locations';
import { formatPrice } from '@/lib/format';
import EnquiryForm from '@/components/EnquiryForm';

// This page reads ?location= to preselect an enquiry. Next.js prerenders
// pages statically by default at build time, when there's no real request
// and so no query string to read — force per-request rendering so the
// preselected-location block actually reflects the URL that was visited.
export const dynamic = 'force-dynamic';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const locale: Locale = isLocale(params.lang) ? params.lang : 'en';
  const dict = getDictionary(locale);
  return {
    title: dict.meta.enquireTitle,
    description: dict.meta.enquireDescription,
    alternates: { canonical: `/${locale}/enquire`, languages: { en: '/en/enquire', es: '/es/enquire' } },
    openGraph: { title: dict.meta.enquireTitle, description: dict.meta.enquireDescription, url: `/${locale}/enquire` },
    twitter: { card: 'summary_large_image', title: dict.meta.enquireTitle, description: dict.meta.enquireDescription },
  };
}

export default function EnquirePage({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams: { location?: string };
}) {
  const locale: Locale = isLocale(params.lang) ? params.lang : 'en';
  const dict = getDictionary(locale);
  const preselected = searchParams.location ? getLocation(searchParams.location) : undefined;

  return (
    <div className="wrap pt-16 sm:pt-24">
      <div className="flex items-baseline justify-between border-b border-line pb-6">
        <span className="eyebrow">{dict.enquiry.title}</span>
        <span className="eyebrow">{dict.rates.from} {formatPrice(pricing.from, locale)}</span>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-12">
        {/* Aside */}
        <aside className="md:col-span-4">
          <h1 className="text-h1 font-medium tracking-tightest max-w-[12ch]">{dict.enquiry.title}</h1>
          <p className="mt-6 text-lead tracking-tight text-muted max-w-xs">{dict.enquiry.lead}</p>
          {preselected && (
            <div className="mt-8 border-t border-line pt-6">
              <p className="eyebrow">{dict.enquiry.enquiringAbout}</p>
              <p className="mt-2 text-h2 tracking-tighter">{preselected.title[locale]}</p>
            </div>
          )}
          <div className="mt-12 space-y-3 border-t border-line pt-8 text-eyebrow uppercase tracking-label">
            <p className="text-muted">{site.location}</p>
            <p>
              <a href={`mailto:${site.email}`} className="link text-muted hover:text-ink">{site.email}</a>
            </p>
          </div>
        </aside>

        {/* Form */}
        <div className="md:col-span-8 md:pl-12 md:border-l md:border-line">
          <EnquiryForm locale={locale} dict={dict} location={preselected} />
        </div>
      </div>
    </div>
  );
}
