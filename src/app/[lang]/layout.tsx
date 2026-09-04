import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Archivo } from 'next/font/google';
import '../globals.css';
import { locales, isLocale, type Locale } from '@/lib/i18n';
import { getDictionary } from '@/content/dictionary';
import { site } from '@/content/site';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

// The site's single typeface (see globals.css's `--font-sans` comment) —
// a licensed-quality grotesk self-hosted via next/font, replacing the old
// system-Helvetica fallback stack. Variable weight, so font-medium /
// font-semibold etc. all render as real cuts, not synthesized bold.
const archivo = Archivo({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const locale: Locale = isLocale(params.lang) ? params.lang : 'en';
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(site.url),
    title: {
      default: dict.meta.homeTitle,
      template: `%s`,
    },
    description: dict.meta.homeDescription,
    applicationName: site.brand.name,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        es: '/es',
        'x-default': '/en',
      },
    },
    openGraph: {
      type: 'website',
      siteName: site.brand.name,
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      url: `/${locale}`,
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
    },
    robots: { index: true, follow: true },
    icons: { icon: '/favicon.svg' },
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang;
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={archivo.variable}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:text-eyebrow focus:uppercase focus:tracking-label"
        >
          Skip to content
        </a>
        <Nav locale={locale} dict={dict} />
        <main id="main" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
