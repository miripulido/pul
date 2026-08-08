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

export default function Nav({ locale, dict }: NavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const base = `/${locale}`;

  const links = [
    { href: `${base}/locations`, label: dict.nav.locations },
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

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-[2px] border-b border-line">
      <nav className="wrap flex items-center justify-between h-16 sm:h-20" aria-label="Primary">
        <Link
          href={base}
          className="text-xl sm:text-2xl font-medium tracking-tighter leading-none"
          aria-label={`${site.brand.name} — home`}
        >
          {site.brand.wordmark}
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
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
          className="md:hidden text-eyebrow uppercase tracking-label"
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
        always wins the cascade. */}
    <div
      id="mobile-menu"
      className={`${open ? 'flex' : 'hidden'} md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-paper flex-col justify-between`}
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
    </>
  );
}
