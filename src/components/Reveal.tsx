'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

type RevealVariant = 'rise' | 'mask' | 'fade';

interface RevealProps {
  children: ReactNode;
  /** Stagger, in ms, applied as a transition-delay. */
  delay?: number;
  /** Render as a different element (default div). */
  as?: ElementType;
  className?: string;
  /**
   * 'rise' (default) — fade + gentle translateY, for body copy and lists.
   * 'mask'           — clip-path reveal + subtle scale settle, for hero
   *                     imagery and headlines that deserve a considered entrance.
   * 'fade'           — opacity only, no movement, for very large display type
   *                     where a slide would read as fussy rather than premium.
   */
  variant?: RevealVariant;
}

/**
 * Reveals its children once when scrolled into view.
 * Uses a single IntersectionObserver per element and unobserves after firing,
 * so it is cheap. The visual transition (and its suppression under
 * prefers-reduced-motion) lives entirely in CSS via the data-reveal* hooks —
 * see globals.css.
 *
 * 'mask' is a two-layer render: the *observed* element must keep its normal,
 * unclipped geometry, because `clip-path: inset(0 0 100% 0)` collapses an
 * element's effective box to zero height — and Chromium computes
 * IntersectionObserver intersection against that clipped box, so a
 * clip-hidden element can never be detected as intersecting. It would need
 * to become visible to be seen, and be seen to become visible. Splitting the
 * ref target (outer, always full-size) from the clipped/scaled presentation
 * (inner) avoids that deadlock. 'rise' and 'fade' only touch opacity/
 * translateY/opacity, none of which affect geometry, so they stay single-layer.
 */
export default function Reveal({ children, delay = 0, as, className, variant = 'rise' }: RevealProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

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

  const delayStyle = delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined;

  if (variant === 'mask') {
    return (
      <Tag ref={ref} className={className}>
        <div data-reveal-mask="" {...(shown ? { 'data-shown': '' } : {})} style={delayStyle}>
          {children}
        </div>
      </Tag>
    );
  }

  const attr = variant === 'fade' ? 'data-reveal-fade' : 'data-reveal';

  return (
    <Tag
      ref={ref}
      {...{ [attr]: '' }}
      {...(shown ? { 'data-shown': '' } : {})}
      style={delayStyle}
      className={className}
    >
      {children}
    </Tag>
  );
}
