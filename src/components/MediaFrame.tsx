import Image from 'next/image';
import type { Media } from '@/content/locations';
import type { Locale } from '@/lib/i18n';

// The placeholder frame's own tiny label — not worth threading the full
// Dictionary through every MediaFrame call site for two words.
const PLACEHOLDER_LABEL: Record<Locale, { image: string; video: string }> = {
  en: { image: 'Image', video: 'Video' },
  es: { image: 'Imagen', video: 'Vídeo' },
};

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
 * The single media primitive for the site.
 *
 * When `media.src` is set, it renders a responsive, lazy next/image (or, for
 * `type: 'video'`, a muted/looping/autoplaying <video> — no controls, no
 * sound, ready for future cinematic loops) inside a fixed-ratio frame. When
 * `src` is null, it renders a considered, labelled placeholder — a flat
 * neutral frame marked with its aspect ratio — so layouts are complete and
 * art-directed rather than broken. Drop a real path into the location data
 * (and set `type: 'video'` if it's footage) and the same frame fills with
 * the media, no layout change.
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
  const isVideo = media.type === 'video';

  return (
    <figure
      className={`group relative overflow-hidden bg-ink-faint ${className ?? ''}`}
      style={{ aspectRatio: media.ratio.replace('/', ' / ') }}
    >
      {media.src ? (
        isVideo ? (
          <video
            src={media.src}
            aria-label={alt}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={
              'photo-grade absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-arch ' +
              (hover ? 'group-hover:scale-[1.03]' : '')
            }
          />
        ) : (
          <Image
            src={media.src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={
              'photo-grade object-cover transition-transform duration-[900ms] ease-arch ' +
              (hover ? 'group-hover:scale-[1.03]' : '')
            }
          />
        )
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex items-end justify-between p-4 sm:p-6"
        >
          {/* Discreet frame markers — reads as intentional, not unfinished. */}
          <span className="text-eyebrow uppercase tracking-label text-muted/70">
            {isVideo ? PLACEHOLDER_LABEL[locale].video : PLACEHOLDER_LABEL[locale].image}
          </span>
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
