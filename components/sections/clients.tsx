import { clients } from "@/lib/site";
import { Marquee } from "@/components/motion/marquee";

/**
 * CLIENT STRIP
 *
 * Set as text rather than logos on purpose: a wall of mismatched logo PNGs at
 * eleven different optical weights is the single ugliest element on most agency
 * sites. Names in one typeface read as a considered list. Swap in SVG logos
 * here only if they can be normalised to a single colour and cap height.
 */
export function Clients() {
  return (
    <section
      aria-label="Selected clients"
      className="border-y border-negative-edge bg-negative py-10"
    >
      <h2 className="t-slate mb-8 px-gutter">Trusted by</h2>
      <Marquee duration={52}>
        {clients.map((name) => (
          <span
            key={name}
            className="mx-7 whitespace-nowrap text-[clamp(1.1rem,2.2vw,1.75rem)] font-medium tracking-[-0.02em] text-ink-3 transition-colors duration-300 hover:text-ink"
          >
            {name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
