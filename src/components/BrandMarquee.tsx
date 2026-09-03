interface BrandMarqueeProps {
  brands: string[];
}

/**
 * An infinite horizontal scroll of brand marks — enters from one side,
 * exits the other, no start or end. Pure CSS (translateX keyframe on a
 * doubled track), so it needs no client JS. The doubled list is what makes
 * the loop seamless: at -50% the second copy sits exactly where the first
 * started. Marked aria-hidden — these are placeholder wordmarks, not
 * content a screen reader needs announced twice.
 */
export default function BrandMarquee({ brands }: BrandMarqueeProps) {
  const track = [...brands, ...brands];

  return (
    <div className="relative overflow-hidden border-y border-line py-8 sm:py-10" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center gap-16 sm:gap-24">
        {track.map((brand, i) => (
          <span
            key={i}
            className="whitespace-nowrap text-h2 font-medium tracking-tighter text-muted/60"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}
