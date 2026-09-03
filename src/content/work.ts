import type { Media } from './locations';

/**
 * "Selected work" gallery on the homepage — the kind of campaigns and
 * content the locations are built for. Stock photography as a placeholder;
 * swap each `src` for a real production still as work is delivered. Same
 * `Media` shape as location imagery, so it renders through the same
 * MediaFrame primitive.
 */
export const workImages: Media[] = [
  {
    ratio: '4/5',
    src: '/images/work/work-01.jpg',
    alt: { en: 'Coastal cliffs and turquoise water', es: 'Acantilados costeros y agua turquesa' },
  },
  {
    ratio: '4/5',
    src: '/images/work/work-02.jpg',
    alt: { en: 'A road winding through misty green hills', es: 'Una carretera entre colinas verdes y niebla' },
  },
  {
    ratio: '4/5',
    src: '/images/work/work-03.jpg',
    alt: { en: 'Desk flat-lay with keyboard, notebook and glasses', es: 'Composición de escritorio con teclado, libreta y gafas' },
  },
  {
    ratio: '4/5',
    src: '/images/work/work-04.jpg',
    alt: { en: 'Granite peaks reflected in a forest river', es: 'Picos de granito reflejados en un río de bosque' },
  },
  {
    ratio: '4/5',
    src: '/images/work/work-05.jpg',
    alt: { en: 'Abstract close-up with soft bokeh light', es: 'Primer plano abstracto con luz difuminada' },
  },
  {
    ratio: '4/5',
    src: '/images/work/work-06.jpg',
    alt: { en: 'A figure standing beside a mountain river', es: 'Una figura junto a un río de montaña' },
  },
];

/**
 * Placeholder client marks. These are NOT real brand names — swap for real
 * logos/wordmarks once there are confirmed clients to show. Never replace
 * with invented company names.
 */
export const brands = ['BRAND 01', 'BRAND 02', 'BRAND 03', 'BRAND 04', 'BRAND 05', 'BRAND 06'];
