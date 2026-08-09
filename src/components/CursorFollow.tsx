'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface CursorFollowProps {
  label: string;
  children: ReactNode;
  className?: string;
}

/**
 * A small circular label that follows the pointer, shown only while
 * hovering its children. Scoped deliberately — wrap only genuinely
 * clickable photography with this, never the whole page.
 *
 * Fine-pointer only (`hover: hover` + `pointer: fine`, checked in JS since
 * Tailwind's hover: variant alone doesn't gate `cursor: none`). On touch
 * devices `capable` never flips true, so the native cursor and tap
 * behaviour are completely untouched — nothing to disable, nothing to undo.
 */
export default function CursorFollow({ label, children, className }: CursorFollowProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    setCapable(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  useEffect(() => {
    if (!capable) return;
    const wrap = wrapRef.current;
    const label = labelRef.current;
    if (!wrap || !label) return;

    let raf = 0;
    let x = 0;
    let y = 0;

    const move = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          label.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
          raf = 0;
        });
      }
    };

    wrap.addEventListener('mousemove', move);
    return () => {
      wrap.removeEventListener('mousemove', move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [capable]);

  return (
    <div
      ref={wrapRef}
      className={`relative ${capable ? 'cursor-none' : ''} ${className ?? ''}`}
      onMouseEnter={() => capable && setActive(true)}
      onMouseLeave={() => capable && setActive(false)}
    >
      {children}
      {capable && (
        <div
          ref={labelRef}
          aria-hidden
          className={`pointer-events-none absolute left-0 top-0 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-ink text-paper text-eyebrow uppercase tracking-label transition-opacity duration-fast ease-arch ${
            active ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {label}
        </div>
      )}
    </div>
  );
}
