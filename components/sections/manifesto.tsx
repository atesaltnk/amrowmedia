"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReduced } from "@/hooks/use-reduced-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

/* ============================================================================
   MANIFESTO — scroll-scrubbed line highlight
   ----------------------------------------------------------------------------
   A statement of position, revealed a line at a time as the section passes
   through the viewport. Each line brightens from near-invisible to full as it
   crosses the middle of the screen, so the reader's attention is led rather
   than dumped.

   This is the one place on the site where the motion IS the content: the
   sentence is short enough to read at a glance, so the pacing is what makes
   anyone actually read it instead of skimming past.
   ========================================================================== */

const LINES = [
  "Most production companies",
  "sell you a camera package.",
  "We sell you the reason",
  "someone should care.",
];

const NUMBERS = [
  { value: "7 yrs", label: "Shooting in Nashville" },
  { value: "260+", label: "Films delivered" },
  { value: "94%", label: "Clients who book again" },
  { value: "2 wks", label: "Typical delivery" },
];

function Line({
  text,
  index,
  total,
  progress,
}: {
  text: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const reduced = useReduced();

  // Lines light up in sequence across the middle 70% of the scroll range,
  // overlapping slightly so there is never a moment with nothing happening.
  const start = 0.12 + (index / total) * 0.62;
  const end = start + 0.24;

  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  const x = useTransform(progress, [start, end], [-14, 0]);

  return (
    <motion.span
      className="block"
      style={reduced ? { opacity: 1 } : { opacity, x }}
    >
      {text}
    </motion.span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      aria-labelledby="manifesto-heading"
      className="relative bg-negative px-gutter py-section"
    >
      <div ref={ref} className="mx-auto max-w-5xl">
        <h2 id="manifesto-heading" className="t-h1 text-balance">
          <span className="sr-only">{LINES.join(" ")}</span>
          <span aria-hidden="true">
            {LINES.map((line, i) => (
              <Line
                key={line}
                text={line}
                index={i}
                total={LINES.length}
                progress={scrollYProgress}
              />
            ))}
          </span>
        </h2>

        <Reveal delay={0.1}>
          <p className="t-lead mt-12 max-w-2xl text-pretty">
            A film that looks expensive and says nothing is the most expensive
            thing you can buy. We start every project by working out the
            argument it has to win — and if the honest answer is that you do not
            need a film, we will tell you that on the first call, for free.
          </p>
        </Reveal>

        <div className="rule mt-16" />

        <Stagger
          as="ul"
          className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4"
          stagger={0.08}
        >
          {NUMBERS.map((n) => (
            <StaggerItem as="li" key={n.label}>
              <span className="block text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-none tracking-[-0.035em] text-tungsten">
                {n.value}
              </span>
              <span className="t-slate mt-3 block text-ink-2">{n.label}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
