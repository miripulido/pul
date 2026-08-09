'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * A restrained fade+rise on the content area for every route change.
 *
 * No animation library and no scroll/route interception — Next's router
 * still owns navigation entirely. `key={pathname}` simply gives React a
 * fresh node per route, which replays the `.enter-rise` CSS animation
 * (see globals.css) exactly once per navigation. Nav and Footer live
 * outside this wrapper in the layout, so they never re-animate.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="enter-rise">
      {children}
    </div>
  );
}
