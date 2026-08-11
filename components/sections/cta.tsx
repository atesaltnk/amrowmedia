"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReduced } from "@/hooks/use-reduced-motion";
import { site } from "@/lib/site";
import { Still } from "@/components/motion/still";
import { Button } from "@/components/ui/button";
import { Split } from "@/components/motion/reveal";
import { Reveal } from "@/components/motion/reveal";

/* ============================================================================
   CTA — the aperture close
   ----------------------------------------------------------------------------
   The page opened with a letterbox retracting. It closes with an iris: a frame
   that expands from a slot to full bleed as you arrive. Same mechanism,
   mirrored — which is what makes the page feel like one continuous object
   rather than a stack of sections that happen to share a colour palette.

   One offer, one button, one alternative for people who would rather email.
   Nothing else competes.
   ========================================================================== */

export function Cta() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReduced();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const width = useTransform(scrollYProgress, [0, 1], ["58%", "100%"]);
  const radius = useTransform(scrollYProgress, [0, 1], ["24px", "0px"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.16, 1]);

  return (
    <section
      ref={ref}
      aria-labelledby="cta-heading"
      className="relative flex min-h-[92svh] items-center justify-center overflow-hidden bg-negative"
    >
      <motion.div
        className="absolute inset-y-0 overflow-hidden"
        style={
          reduced
            ? { width: "100%" }
            : { width, borderRadius: radius }
        }
      >
        <motion.div className="h-full w-full" style={reduced ? undefined : { scale }}>
          <Still seed={101} grade="night" />
        </motion.div>
        <div className="halation" />
        <div className="absolute inset-0 bg-negative/62" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-4xl px-gutter text-center">
        <Reveal>
          <span className="t-slate text-tungsten">05 — Next</span>
        </Reveal>

        <Split
          as="h2"
          text="Tell me what it has to do."
          className="t-display mt-8 text-balance"
        />

        <Reveal delay={0.15}>
          <p className="t-lead mx-auto mt-8 max-w-xl text-pretty">
            No deck, no discovery invoice, no agency runaround. You get a
            straight answer on cost and fit — including the times the honest
            answer is that you do not need me yet.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Button href="/contact" variant="primary" magnetic reticle="Book">
              Start a project
            </Button>
            <Button href={`mailto:${site.contact.email}`} variant="ghost" icon={false}>
              {site.contact.email}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <p className="t-slate mt-10 text-ink-3">
            Reply within one business day · {site.contact.email}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
