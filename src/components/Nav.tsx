'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/content/dictionary';
import { site } from '@/content/site';
import LanguageSwitcher from './LanguageSwitcher';

interface NavProps {
  locale: Locale;
  dict: Dictionary;
}

// Mobile menu transition duration — the "standard" motion tier (500ms, see
// tailwind.config.ts). Kept in one place so the JS unmount delay and the
// CSS transition can never drift out of sync.
const MENU_TRANSITION_MS = 500;

export default function Nav({ locale, dict }: NavProps) {
  const [open, setOpen] = useState(false);
  // Stays true slightly after `open` goes false, so the panel can play its
  // exit transition before being removed from the DOM (and the a11y tree).
  const [rendered, setRendered] = useState(false);
  const pathname = usePathname();
  const base = `/${locale}`;

  const links = [
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/rates`, label: dict.nav.rates },
  ];

  // Close the mobile menu on navigation and lock scroll while it is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  useEffect(() => {
    if (open) {
      setRendered(true);
      return;
    }
    const timeout = setTimeout(() => setRendered(false), MENU_TRANSITION_MS);
    return () => clearTimeout(timeout);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-[2px] border-b border-line">
      <nav className="wrap flex items-center justify-between h-16 sm:h-20" aria-label="Primary">
        <Link
          href={base}
          data-intro=""
          className="text-xl sm:text-2xl font-medium tracking-tighter leading-none"
          aria-label={`${site.brand.name} — home`}
        >
          {site.brand.wordmark}
        </Link>

        {/* Desktop */}
        <div
          data-intro=""
          style={{ '--intro-delay': '120ms' } as React.CSSProperties}
          className="hidden md:flex items-center gap-8 lg:gap-12"
        >
          <ul className="flex items-center gap-8 lg:gap-10 text-eyebrow uppercase tracking-label">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                  className={
                    'link transition-colors ' +
                    (isActive(l.href) ? 'text-ink' : 'text-muted hover:text-ink')
                  }
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <span aria-hidden className="h-4 w-px bg-line" />
          <LanguageSwitcher current={locale} />
          <Link href={`${base}/enquire`} className="btn !px-6 !py-3">
            {dict.nav.enquire}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          data-intro=""
          style={{ '--intro-delay': '80ms' } as React.CSSProperties}
          className="md:hidden text-eyebrow uppercase tracking-label transition-colors duration-fast hover:text-muted"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? dict.nav.close : dict.nav.menu}
        </button>
      </nav>
    </header>

    {/* Mobile menu — rendered as a sibling of <header>, not a child of it.
        <header> has backdrop-blur (backdrop-filter), which per spec becomes
        the containing block for `position: fixed` descendants; nested inside
        it, this panel's top/bottom insets resolved against the ~64px header
        instead of the viewport and collapsed to zero height.
        Visibility is driven by Tailwind display classes, not the native
        `hidden` attribute — an unconditional `flex` utility has the same
        specificity as the UA `[hidden]` rule and, being an author style,
        always wins the cascade.
        Stays mounted for MENU_TRANSITION_MS after closing so the fade/rise
        exit can play; `inert` drops it from focus and the a11y tree the
        instant it starts closing, well before it actually unmounts. */}
    {rendered && (
      <div
        id="mobile-menu"
        {...(!open ? ({ inert: '' } as Record<string, string>) : {})}
        className={`md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-paper flex flex-col justify-between transition-all duration-standard ease-arch ${
          open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <ul className="wrap flex flex-col gap-2 pt-10">
          {[...links, { href: `${base}/enquire`, label: dict.nav.enquire }].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block py-3 text-h2 tracking-tighter"
                aria-current={isActive(l.href) ? 'page' : undefined}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="wrap flex items-center justify-between py-8 border-t border-line">
          <span className="eyebrow">{site.location}</span>
          <LanguageSwitcher current={locale} />
        </div>
      </div>
    )}
    </>
  );
}
