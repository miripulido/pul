import type { Config } from 'tailwindcss';

/**
 * PUL design system — expressed as Tailwind tokens.
 * Colours, type and rhythm are all driven from here so the whole site
 * stays on one system. Photography provides the colour; the UI stays neutral.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    // A single, restrained palette. No accent colour by design.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      paper: '#FFFFFF', // the page
      ink: '#141210', // near-black — text
      muted: '#726B63', // neutral grey — secondary text
      line: '#D8D3CB', // hairline rules
      'ink-faint': 'rgba(20,18,16,0.06)', // placeholder / wash
      white: '#FFFFFF',
    },
    fontFamily: {
      // ONE typeface family across the entire site.
      // Swap this single stack for a licensed Neue Haas Grotesk / Söhne later.
      sans: ['var(--font-sans)'],
    },
    extend: {
      maxWidth: {
        page: '1600px',
      },
      letterSpacing: {
        tightest: '-0.03em',
        tighter: '-0.02em',
        label: '0.14em', // editorial small-caps tracking
        wide: '0.06em',
      },
      fontSize: {
        // Fluid editorial scale (clamp: min, preferred vw, max)
        eyebrow: ['0.72rem', { lineHeight: '1', letterSpacing: '0.14em' }],
        display: ['clamp(2.75rem, 8vw, 8.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        h1: ['clamp(2rem, 4.5vw, 4rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        h2: ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        lead: ['clamp(1.15rem, 1.7vw, 1.6rem)', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
      },
      transitionTimingFunction: {
        // One architectural easing curve, used everywhere.
        arch: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        // The motion system's three tiers. Pick by what's moving, not by
        // feel in the moment — micro-interactions read as fast, structural
        // UI (menus, cards, buttons) as standard, editorial/image reveals
        // as slow. Arbitrary values (duration-[Nms]) remain available for
        // the rare case that's paired with a JS timer and can't drift.
        fast: '300ms', // hover colour/underline, small state changes
        standard: '500ms', // card lift, arrow nudge, menu/panel transitions
        slow: '900ms', // scroll reveals, image entrances, headline reveals
      },
      keyframes: {
        reveal: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
