'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, isLocale, type Locale } from '@/lib/i18n';

/**
 * EN / ES switch. Rebuilds the current path under the other locale so the
 * visitor stays on the same page when switching language.
 */
export default function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() || `/${current}`;

  const swap = (target: Locale) => {
    const segments = pathname.split('/');
    // segments[0] is '' (leading slash); segments[1] is the locale.
    if (isLocale(segments[1])) {
      segments[1] = target;
    } else {
      segments.splice(1, 0, target);
    }
    return segments.join('/') || `/${target}`;
  };

  return (
    <div className="flex items-center gap-2 text-eyebrow uppercase tracking-label" aria-label="Language">
      {locales.map((locale, i) => {
        const active = locale === current;
        return (
          <span key={locale} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="text-muted/50">/</span>}
            <Link
              href={swap(locale)}
              hrefLang={locale}
              aria-current={active ? 'true' : undefined}
              className={
                'transition-colors duration-fast ' +
                (active ? 'text-ink' : 'text-muted hover:text-ink')
              }
            >
              {locale}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
