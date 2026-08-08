import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { isLocale } from '@/lib/i18n';
import { getDictionary } from '@/content/dictionary';
import { site } from '@/content/site';
import { pricing } from '@/content/locations';
import { formatPrice } from '@/lib/format';
import EnquiryForm from '@/components/EnquiryForm';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const locale: Locale = isLocale(params.lang) ? params.lang : 'en';
  const dict = getDictionary(locale);
  return {
    title: dict.meta.enquireTitle,
    description: dict.meta.enquireDescription,
    alternates: { canonical: `/${locale}/enquire`, languages: { en: '/en/enquire', es: '/es/enquire' } },
    openGraph: { title: dict.meta.enquireTitle, description: dict.meta.enquireDescription, url: `/${locale}/enquire` },
  };
}

export default function EnquirePage({ params }: { params: { lang: string } }) {
  const locale: Locale = isLocale(params.lang) ? params.lang : 'en';
  const dict = getDictionary(locale);

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
          <div className="mt-12 space-y-3 border-t border-line pt-8 text-eyebrow uppercase tracking-label">
            <p className="text-muted">{site.location}</p>
            <p>
              <a href={`mailto:${site.email}`} className="link text-muted hover:text-ink">{site.email}</a>
            </p>
          </div>
        </aside>

        {/* Form */}
        <div className="md:col-span-8 md:pl-12 md:border-l md:border-line">
          <EnquiryForm locale={locale} dict={dict} />
        </div>
      </div>
    </div>
  );
}
