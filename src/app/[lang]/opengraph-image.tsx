import { ImageResponse } from 'next/og';
import { isLocale } from '@/lib/i18n';
import { getDictionary } from '@/content/dictionary';
import { site } from '@/content/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${site.brand.name} — Locations for creative production`;

// One social card, generated from the same tokens as the site.
export default function OpengraphImage({ params }: { params: { lang: string } }) {
  const locale = isLocale(params.lang) ? params.lang : 'en';
  const dict = getDictionary(locale);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F4F2EE',
          color: '#141210',
          padding: 80,
          fontFamily: 'Helvetica, Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 26,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#726B63',
          }}
        >
          <span>{site.brand.name}</span>
          <span>{site.location} · {site.coordinates}</span>
        </div>
        <div style={{ display: 'flex', fontSize: 108, fontWeight: 600, letterSpacing: -4, lineHeight: 1 }}>
          {dict.home.heroTagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
