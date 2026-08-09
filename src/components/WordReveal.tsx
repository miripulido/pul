'use client';

import { useEffect, useRef, useState, type ElementType } from 'react';

interface WordRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** ms between each word's entrance. */
  stagger?: number;
}

/**
 * Splits a heading into words and reveals them in sequence — each word
 * clipped inside its own overflow-hidden box, sliding up from beneath it
 * (see [data-word] in globals.css). Reserved for genuinely important
 * editorial moments (a location name), not general body copy — used
 * everywhere it would just read as noise.
 *
 * Same IntersectionObserver-once pattern as Reveal, kept separate because
 * the per-word stagger needs its own inline --word-delay on each span
 * rather than the single --reveal-delay Reveal already owns. The space
 * between words is a plain sibling text node, not part of the clipped box —
 * inside it, an inline-block's overflow:hidden can retain trailing-space
 * width and skew the layout by a stray pixel.
 */
export default function WordReveal({ text, as, className, stagger = 70 }: WordRevealProps) {
  const Tag = (as ?? 'span') as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const words = text.split(' ');

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span
            data-word=""
            {...(shown ? { 'data-shown': '' } : {})}
            style={{ '--word-delay': `${i * stagger}ms` } as React.CSSProperties}
          >
            <span>{word}</span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
