'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { Media } from '@/content/locations';
import type { Locale } from '@/lib/i18n';

interface ParallaxHeroProps {
  media: Media;
  locale: Locale;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * A single-use, tightly-scoped parallax hero for the homepage — image today,
 * video-ready for whenever footage exists (`media.type: 'video'`; same
 * muted/loop/autoplay/no-controls treatment as MediaFrame's video branch —
 * set the flag and drop a source in, nothing else about this component
 * needs to change).
 *
 * Deliberately separate from MediaFrame rather than adding this behaviour
 * there: MediaFrame is a server component used a dozen+ times per page, and
 * a scroll-linked transform needs client JS. Isolating it here keeps every
 * other image on the site server-rendered with zero added client weight.
 *
 * The media is rendered ~12% oversized inside the frame; scrolling
 * translates it within that headroom, so the crop never reveals an edge.
 * Motion is capped at a few pixels — a hint of depth, not a scroll effect.
 */
export default function ParallaxHero({ media, locale, sizes = '100vw', priority, className }: ParallaxHeroProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!media.src) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = trackRef.current;
    if (!el) return;

    let raf = 0;
    const STRENGTH = 22; // total px of travel, top of viewport to bottom

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = vh + rect.height;
      const traveled = vh - rect.top;
      const progress = Math.min(1, Math.max(0, traveled / total));
      const offset = (progress - 0.5) * STRENGTH;
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [media.src]);

  if (!media.src) return null;
  const isVideo = media.type === 'video';

  return (
    <figure
      className={`relative overflow-hidden bg-ink-faint ${className ?? ''}`}
      style={{ aspectRatio: media.ratio.replace('/', ' / ') }}
    >
      <div ref={trackRef} className="absolute inset-[-7%] will-change-transform">
        {isVideo ? (
          <video
            src={media.src}
            aria-label={media.alt[locale]}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Image
            src={media.src}
            alt={media.alt[locale]}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        )}
      </div>
    </figure>
  );
}
