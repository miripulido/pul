/**
 * Brand + global configuration.
 *
 * PUL is a temporary working name. To rename the brand everywhere, change
 * `brand.name` (and, if you like, `brand.wordmark`). Nothing else hard-codes it.
 */
export const site = {
  brand: {
    name: 'PUL',
    wordmark: 'PUL', // typographic wordmark — kept deliberately plain
  },
  location: 'Madrid, Spain', // the only geography we ever expose publicly
  coordinates: '40° N', // used as a discreet editorial marker, not an address
  email: 'studio@pul.studio', // placeholder — replace with the real inbox
  instagram: {
    handle: '@pul.studio', // placeholder handle
    url: 'https://instagram.com', // replace when the account exists
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pul.studio',
} as const;

export const founded = 2026;
