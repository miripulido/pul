import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/content/dictionary';
import { site, founded } from '@/content/site';

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 sm:mt-48 border-t border-line">
      <div className="wrap py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <Link href={base} className="text-4xl sm:text-5xl font-medium tracking-tightest leading-none">
              {site.brand.wordmark}
            </Link>
            <p className="mt-6 max-w-xs text-muted">{dict.footer.tagline}</p>
          </div>

          <nav className="md:col-span-3" aria-label="Footer">
            <ul className="flex flex-col gap-3 text-eyebrow uppercase tracking-label">
              <li><Link href={`${base}/locations`} className="link text-muted hover:text-ink">{dict.nav.locations}</Link></li>
              <li><Link href={`${base}/about`} className="link text-muted hover:text-ink">{dict.nav.about}</Link></li>
              <li><Link href={`${base}/rates`} className="link text-muted hover:text-ink">{dict.nav.rates}</Link></li>
              <li><Link href={`${base}/enquire`} className="link text-muted hover:text-ink">{dict.nav.enquire}</Link></li>
            </ul>
          </nav>

          <div className="md:col-span-3">
            <ul className="flex flex-col gap-3 text-eyebrow uppercase tracking-label">
              <li className="text-muted">{site.location}</li>
              <li>
                <a href={`mailto:${site.email}`} className="link text-muted hover:text-ink">{dict.footer.contact}</a>
              </li>
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="link text-muted hover:text-ink">
                  {dict.footer.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-eyebrow uppercase tracking-label text-muted">
            © {founded === year ? founded : `${founded}–${year}`} {site.brand.name}. {dict.footer.rights}
          </p>
          <p className="text-eyebrow uppercase tracking-label text-muted">
            {site.location} · {site.coordinates}
          </p>
        </div>
      </div>
    </footer>
  );
}
