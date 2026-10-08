'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * On phones the cards sit side by side in a swipeable row with back and next buttons,
 * so long lists do not need endless vertical scrolling. From md up it is a normal grid.
 */
export default function MobileSlider({ children, desktopClass, itemClass = 'max-md:w-[78vw] max-md:max-w-[340px]' }: { children: React.ReactNode; desktopClass: string; itemClass?: string }) {
  const items = React.Children.toArray(children);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const kids = Array.from(el.children) as HTMLElement[];
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    kids.forEach((k, i) => {
      const d = Math.abs(k.offsetLeft + k.offsetWidth / 2 - mid);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    onScroll();
  }, [onScroll]);

  const go = (dir: -1 | 1) => {
    const el = track.current;
    if (!el) return;
    const next = Math.min(items.length - 1, Math.max(0, active + dir));
    const kid = el.children[next] as HTMLElement | undefined;
    if (kid) el.scrollTo({ left: kid.offsetLeft - (el.clientWidth - kid.offsetWidth) / 2, behavior: 'smooth' });
  };

  return (
    <div>
      <div
        ref={track}
        onScroll={onScroll}
        className={`flex gap-4 overflow-x-auto snap-x snap-mandatory max-md:-mx-5 max-md:px-5 max-md:pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-visible md:snap-none ${desktopClass}`}
      >
        {items.map((child, i) => (
          <div key={i} className={`${itemClass} max-md:shrink-0 max-md:snap-center md:w-auto md:min-w-0 h-full`}>
            {child}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <div className="md:hidden mt-5 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => go(-1)}
            disabled={active === 0}
            className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center cursor-pointer transition-opacity disabled:opacity-25"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-[#b38848]' : 'w-1.5 bg-slate-300'}`} />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next"
            onClick={() => go(1)}
            disabled={active === items.length - 1}
            className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center cursor-pointer transition-opacity disabled:opacity-25"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
