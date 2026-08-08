import Image from 'next/image';
import type { Media } from '@/content/locations';
import type { Locale } from '@/lib/i18n';

interface MediaFrameProps {
  media: Media;
  locale: Locale;
  /** Give the browser a sizes hint for responsive loading. */
  sizes?: string;
  /** First image on a page should not be lazy-loaded. */
  priority?: boolean;
  /** Enables a subtle scale-in on hover (for interactive cards). */
  hover?: boolean;
  className?: string;
}

/**
 * The single image primitive for the site.
 *
 * When `media.src` is set, it renders a responsive, lazy next/image inside a
 * fixed-ratio frame. When it is null (no photography supplied yet), it renders
 * a considered, labelled placeholder — a flat neutral frame marked with its
 * aspect ratio — so layouts are complete and art-directed rather than broken.
 * Drop a real path into the location data and the same frame fills with the
 * photograph, no layout change.
 */
export default function MediaFrame({
  media,
  locale,
  sizes = '100vw',
  priority = false,
  hover = false,
  className,
}: MediaFrameProps) {
  const alt = media.alt[locale];

  return (
    <figure
      className={`group relative overflow-hidden bg-ink-faint ${className ?? ''}`}
      style={{ aspectRatio: media.ratio.replace('/', ' / ') }}
    >
      {media.src ? (
        <Image
          src={media.src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={
            'object-cover transition-transform duration-[900ms] ease-arch ' +
            (hover ? 'group-hover:scale-[1.03]' : '')
          }
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex items-end justify-between p-4 sm:p-6"
        >
          {/* Discreet frame markers — reads as intentional, not unfinished. */}
          <span className="text-eyebrow uppercase tracking-label text-muted/70">Image</span>
          <span className="text-eyebrow uppercase tracking-label text-muted/70">
            {media.ratio.replace('/', ':')}
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-px w-8 -translate-x-1/2 -translate-y-1/2 bg-muted/30"
          />
        </div>
      )}
    </figure>
  );
}
