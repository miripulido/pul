'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Stagger, in ms, applied as a transition-delay. */
  delay?: number;
  /** Render as a different element (default div). */
  as?: ElementType;
  className?: string;
}

/**
 * Reveals its children once when scrolled into view.
 * Uses a single IntersectionObserver per element and unobserves after firing,
 * so it is cheap. The visual transition (and its suppression under
 * prefers-reduced-motion) lives entirely in CSS via the [data-reveal] hook.
 */
export default function Reveal({ children, delay = 0, as, className }: RevealProps) {
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

  return (
    <Tag
      ref={ref}
      data-reveal=""
      {...(shown ? { 'data-shown': '' } : {})}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
