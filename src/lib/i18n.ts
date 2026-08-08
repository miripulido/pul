/**
 * Minimal, dependency-free i18n.
 * English is the default. Spanish is a first-class, hand-written translation
 * (never machine-translated in the interface — the dictionary lives in code).
 */
export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
};
