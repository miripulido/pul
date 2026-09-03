'use client';

import { useRef } from 'react';
import type { Media } from '@/content/locations';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/content/dictionary';
import MediaFrame from './MediaFrame';

interface WorkCarouselProps {
  images: Media[];
  locale: Locale;
  dict: Dictionary;
}

/**
 * A horizontally scrolling, snap-aligned image strip — native scroll/swipe
 * on touch, with prev/next buttons for mouse/keyboard. Dependency-free, in
 * keeping with the rest of the site's motion system (ParallaxHero, Reveal).
 */
export default function WorkCarousel({ images, locale, dict }: WorkCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const node = trackRef.current;
    if (!node) return;
    node.scrollBy({ left: node.clientWidth * 0.8 * direction, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth"
      >
        {images.map((media, i) => (
          <div key={i} className="w-[70vw] shrink-0 snap-start sm:w-[38vw] lg:w-[24vw]">
            <MediaFrame
              media={media}
              locale={locale}
              sizes="(min-width: 1024px) 24vw, (min-width: 640px) 38vw, 70vw"
            />
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label={dict.actions.prev}
          className="flex h-11 w-11 items-center justify-center border border-line text-lg transition-colors duration-standard ease-arch hover:border-ink hover:bg-ink hover:text-paper"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label={dict.actions.next}
          className="flex h-11 w-11 items-center justify-center border border-line text-lg transition-colors duration-standard ease-arch hover:border-ink hover:bg-ink hover:text-paper"
        >
          →
        </button>
      </div>
    </div>
  );
}
