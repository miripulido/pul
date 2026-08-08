import type { Locale } from './i18n';

/** Locale-aware currency formatting. €1,200 in EN, 1.200 € in ES. */
export function formatPrice(amount: number, locale: Locale, currency = 'EUR'): string {
  return new Intl.NumberFormat(locale === 'es' ? 'es-ES' : 'en-IE', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
