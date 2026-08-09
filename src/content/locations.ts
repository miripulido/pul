import type { Locale } from '@/lib/i18n';

/**
 * The location portfolio.
 *
 * Everything visual and textual for a location is described here — the pages
 * and cards are generic and render whatever this data contains. Adding 002,
 * 003, … is a matter of appending an entry. This is also the natural shape to
 * later back with a headless CMS (Sanity / Contentful): each field maps 1:1.
 *
 * Unknown facts (crew capacity, power, exact durations, address) are simply
 * absent — never invented. The UI degrades gracefully when a field is omitted.
 */

/** A media slot. `src` is null until real photography (or footage) is supplied. */
export interface Media {
  /** Aspect ratio, e.g. '3/2', '4/5', '16/9'. */
  ratio: string;
  /** Descriptive alt text — always written, even before the media exists. */
  alt: LocalizedText;
  /** Path or URL to the file. Null renders a labelled placeholder frame. */
  src?: string | null;
  /**
   * 'image' (default) or 'video' — for future cinematic loops / hero footage.
   * Both MediaFrame and the homepage's ParallaxHero render a muted, looping,
   * autoplaying <video> when set, with no controls and no sound; drop a
   * source in and set this flag, nothing else about the surrounding layout
   * changes.
   */
  type?: 'image' | 'video';
}

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export interface Location {
  number: string; // '001' — used editorially; the collection reads as a series
  slug: string; // URL segment, e.g. 'the-american-house'
  status: 'available' | 'coming-soon';
  title: LocalizedText;
  place: string; // public geography only — never an address
  tagline: LocalizedText;
  description?: LocalizedText;
  body?: LocalizedList; // paragraphs
  features?: LocalizedList;
  productions?: LocalizedList;
  notes?: LocalizedText;
  hero?: Media;
  gallery?: Media[];
  meta?: {
    title: LocalizedText;
    description: LocalizedText;
  };
}

/** Shared pricing. Durations, overtime rate and crew cap are intentionally
 *  undefined — they are quoted on request until confirmed. */
export const pricing = {
  halfDay: 1200,
  fullDay: 2000,
  currency: 'EUR',
  from: 1200,
} as const;

export const locations: Location[] = [
  {
    number: '001',
    slug: 'the-american-house',
    status: 'available',
    place: 'Madrid, Spain',
    title: { en: 'The American House', es: 'The American House' },
    tagline: {
      en: 'American character. Madrid light.',
      es: 'Carácter americano. Luz de Madrid.',
    },
    description: {
      en: 'A house with an unmistakably American character, set in the Madrid light. Garden, pool and terraces read as another country on camera — without leaving Spain.',
      es: 'Una casa de carácter inconfundiblemente americano, bajo la luz de Madrid. Jardín, piscina y terrazas se leen como otro país ante la cámara, sin salir de España.',
    },
    body: {
      en: [
        'The architecture is unmistakably American — porches, proportion, painted timber — an aesthetic rarely available in Europe. Placed under Madrid’s clean, high light, it gives productions an American visual language without an American budget.',
        'Offered primarily for exterior productions: garden, pool, terraces, garages and exterior architecture, with strong natural light through the day. Areas suited to still-life and product setups are available on site.',
      ],
      es: [
        'La arquitectura es inconfundiblemente americana —porches, proporción, madera pintada—, una estética poco habitual en Europa. Bajo la luz limpia y alta de Madrid, ofrece a las producciones un lenguaje visual americano sin un presupuesto americano.',
        'Se ofrece principalmente para producciones de exterior: jardín, piscina, terrazas, garajes y arquitectura exterior, con abundante luz natural durante el día. En el sitio hay áreas adecuadas para bodegón y producto.',
      ],
    },
    features: {
      en: ['Garden', 'Pool', 'Terraces', 'Garages', 'Still-life areas', 'Natural light'],
      es: ['Jardín', 'Piscina', 'Terrazas', 'Garajes', 'Áreas de bodegón', 'Luz natural'],
    },
    productions: {
      en: ['Campaigns', 'Film', 'Commercials', 'Editorial', 'Stills', 'Still life', 'Branded content', 'Social'],
      es: ['Campañas', 'Cine', 'Publicidad', 'Editorial', 'Foto fija', 'Bodegón', 'Contenido de marca', 'Social'],
    },
    notes: {
      en: 'Offered primarily for exterior productions. Interiors available upon request.',
      es: 'Se ofrece principalmente para producciones de exterior. Interiores disponibles bajo petición.',
    },
    hero: {
      ratio: '16/9',
      src: '/images/the-american-house/hero.jpg',
      alt: {
        en: 'Wraparound porch of the American house at golden hour',
        es: 'Porche envolvente de la casa americana al atardecer',
      },
    },
    gallery: [
      { ratio: '3/2', src: '/images/the-american-house/gallery-01.jpg', alt: { en: 'Aerial view of the facade and gable roofline', es: 'Vista aérea de la fachada y los tejados a dos aguas' } },
      { ratio: '4/5', src: '/images/the-american-house/gallery-02.jpg', alt: { en: 'Porch entrance with gable and chimney detail', es: 'Entrada del porche con detalle de aguilón y chimenea' } },
      { ratio: '4/5', src: '/images/the-american-house/gallery-03.jpg', alt: { en: 'Detail of black shutters and porch beams', es: 'Detalle de contraventanas negras y vigas del porche' } },
      { ratio: '3/2', src: '/images/the-american-house/gallery-04.jpg', alt: { en: 'Rooftop and chimney architecture', es: 'Arquitectura de tejados y chimenea' } },
      { ratio: '3/2', src: '/images/the-american-house/gallery-05.jpg', alt: { en: 'Garage detail', es: 'Detalle de garaje' } },
      { ratio: '4/5', src: '/images/the-american-house/gallery-06.jpg', alt: { en: 'The house at dusk', es: 'La casa al anochecer' } },
    ],
    meta: {
      title: {
        en: 'The American House — Production location in Madrid',
        es: 'The American House — Localización de producción en Madrid',
      },
      description: {
        en: 'An American house in Madrid for campaigns, film and stills. Exterior productions; interiors on request. Rates from €1,200.',
        es: 'Una casa americana en Madrid para campañas, cine y foto fija. Producciones de exterior; interiores bajo petición. Tarifas desde 1.200 €.',
      },
    },
  },
  {
    number: '002',
    slug: 'coming-soon-002',
    status: 'coming-soon',
    place: 'Location to be announced',
    title: { en: 'Coming soon', es: 'Próximamente' },
    tagline: { en: 'In selection.', es: 'En selección.' },
  },
  {
    number: '003',
    slug: 'coming-soon-003',
    status: 'coming-soon',
    place: 'Location to be announced',
    title: { en: 'Coming soon', es: 'Próximamente' },
    tagline: { en: 'In selection.', es: 'En selección.' },
  },
];

export const availableLocations = locations.filter((l) => l.status === 'available');
export const comingSoonLocations = locations.filter((l) => l.status === 'coming-soon');

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
