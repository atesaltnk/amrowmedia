"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReduced } from "@/hooks/use-reduced-motion";
import { testimonials } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";
import { springMove } from "@/lib/motion";

/* ============================================================================
   TESTIMONIALS
   ----------------------------------------------------------------------------
   One quote at a time, at display size. A grid of three small testimonial
   cards gets skimmed and believed by nobody; a single quote set large enough
   to be unavoidable actually gets read.

   Manual advance only — no autoplay. A carousel that moves on its own takes
   control away from the reader mid-sentence, which is the exact opposite of
   what a testimonial is for.
   ========================================================================== */

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduced = useReduced();
  const current = testimonials[index];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative bg-print px-gutter py-section text-ink-inverse"
    >
      <h2 id="testimonials-heading" className="sr-only">
        What clients say
      </h2>

      <div className="mx-auto max-w-5xl">
        <Reveal>
          <span className="t-slate text-ink-inverse-2">
            04 — In their words
          </span>
        </Reveal>

        <div className="relative mt-10 min-h-[clamp(18rem,32vh,24rem)]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -18, filter: "blur(8px)" }}
              transition={{ duration: reduced ? 0.18 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="t-h2 text-balance text-ink-inverse">
                <span aria-hidden="true" className="text-tungsten-deep">
                  “
                </span>
                {current.quote}
                <span aria-hidden="true" className="text-tungsten-deep">
                  ”
                </span>
              </p>
              <footer className="mt-8">
                <cite className="not-italic">
                  <span className="block font-medium text-ink-inverse">
                    {current.name}
                  </span>
                  <span className="t-slate mt-1 block text-ink-inverse-2">
                    {current.role}
                  </span>
                </cite>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Segment controls. Each is a real button with a real label. */}
        <div className="mt-10 flex items-center gap-3">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Read the quote from ${t.name}`}
              aria-current={i === index}
              className="group relative h-8 w-16 focus-visible:outline-offset-4"
            >
              <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-print-edge" />
              {i === index && (
                <motion.span
                  layoutId="testimonial-indicator"
                  className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-ink-inverse"
                  transition={springMove}
                />
              )}
            </button>
          ))}
          <span className="t-slate ml-2 text-ink-inverse-2">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
