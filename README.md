# PUL

Curated locations for creative production — advertising, film and photography.
Marketing site built to read as a brand and a growing location portfolio, not a
rental listing.

**Live:** https://pul-website.vercel.app (auto-deploys from `main` via Vercel)

> **PUL is a temporary working name.** To rebrand, change `brand.name` in
> `src/content/site.ts`. Nothing else hard-codes the name.

## Stack

- **Next.js 14** (App Router) · **TypeScript** · **Tailwind CSS**
- No i18n library, no UI/animation libraries — dependencies are kept minimal.
- One typeface family site-wide (a neutral neo-grotesk stack). Swap the single
  `--font-sans` variable in `src/app/globals.css` for a licensed grotesk
  (Neue Haas, Söhne, Aktiv) via `next/font` to upgrade with no other changes.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /en
npm run build    # production build
npm start
```

## Architecture

```
src/
  app/[lang]/            Localised routes (en | es)
    page.tsx             Home
    about | rates | locations | enquire
    locations/[slug]     Scalable location template
    opengraph-image.tsx  Generated social card
  app/api/enquiry        Enquiry endpoint (validation + delivery stub)
  app/sitemap.ts, robots.ts
  components/            Nav, Footer, MediaFrame, LocationCard, EnquiryForm, Reveal…
  content/
    site.ts              Brand + global config (single source of truth)
    dictionary.ts        All UI copy, EN + ES (hand-written, no machine translation)
    locations.ts         The location portfolio — data-driven
  lib/                   i18n + formatting helpers
middleware.ts            Locale routing (/ → /en)
```

## Content model

Locations live in `src/content/locations.ts`. Adding **002, 003, …** is a matter
of appending an entry — the pages, cards and grids are generic. Each field maps
1:1 onto a headless CMS (Sanity / Contentful) when you migrate: `LocalizedText`,
`LocalizedList`, and `Media` slots (each with `alt` text and an aspect ratio).

### Photography

No photography ships with this build. Every `Media` slot has `src: null`, which
renders a considered, labelled placeholder frame. **Drop a real path (or CDN
URL) into `src`** and the same frame fills with a responsive, lazy-loaded,
`next/image` — no layout change. For remote images, add the hostname to
`images.remotePatterns` in `next.config.mjs`.

## Making the enquiry form live

The form (`/[lang]/enquire`) posts JSON to `POST /api/enquiry`, which validates
server-side (plus a honeypot) but **does not deliver anywhere yet**. Pick one:

- **Resend** (simplest) — `npm i resend`, set `RESEND_API_KEY`, `ENQUIRY_TO`,
  `ENQUIRY_FROM`, and un-stub the `DELIVERY` block in
  `src/app/api/enquiry/route.ts`.
- **Any webhook / CRM / Slack / Notion** — same place, same payload.

See `.env.example`.

## Deliberately pending (not invented)

Per the brief, these are left unspecified until confirmed — never faked:
exact address (only "Madrid, Spain" is ever shown), half/full-day durations,
overtime rate, crew capacity, parking, power and Wi-Fi. They surface as
"on request" or are simply omitted, and there is a clear slot for each once known.

## Accessibility & SEO

Semantic landmarks, skip link, keyboard-operable nav and forms, visible focus
rings, `prefers-reduced-motion` respected, descriptive `alt` on every media slot.
Per-page metadata, `hreflang` alternates, canonical URLs, Open Graph + Twitter
cards, JSON-LD on location pages, `sitemap.xml` and `robots.txt`.

## Set before launch

`NEXT_PUBLIC_SITE_URL` and the placeholders in `src/content/site.ts`
(`email`, `instagram`).
