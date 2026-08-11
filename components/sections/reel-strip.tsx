"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useReduced } from "@/hooks/use-reduced-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/work";
import { Still } from "@/components/motion/still";
import { SectionHead } from "@/components/ui/section";

/* ============================================================================
   REEL STRIP — pinned horizontal scroll
   ----------------------------------------------------------------------------
   The signature scroll moment. A tall section is pinned to the viewport and
   the vertical scroll inside it drives a horizontal track — so the page turns
   into a film strip being pulled past a gate.

   Why this and not a carousel: a carousel needs a decision (which arrow, how
   many are left). A scroll-driven strip needs nothing. The user keeps doing
   the one thing they were already doing and the work moves past them. It also
   inherits interruptibility for free — the scroll *is* the playhead, so
   reversing is instant and seamless with no code.

   Falls back to a normal vertical stack under reduced motion and on touch
   widths, where pinning fights the browser's own scroll physics.
   ========================================================================== */

export function ReelStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReduced();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Damped so the strip has a little inertia rather than being welded to the
  // wheel. restDelta is tight — a lazy spring here shows as smearing.
  const eased = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 42,
    restDelta: 0.0004,
  });

  // Travel: total track width minus one viewport. Expressed in vw so it holds
  // at any screen size without measuring in JS.
  const x = useTransform(eased, [0, 1], ["2vw", `-${projects.length * 62 - 76}vw`]);

  return (
    <section aria-labelledby="work-heading" className="relative bg-negative">
      <div className="px-gutter pt-section">
        <SectionHead
          index="01"
          eyebrow="Selected work"
          title={
            <span id="work-heading">
              Six projects that had a<br className="hidden sm:block" /> job to do.
            </span>
          }
          lead="Every one of these is a case study — the brief, the constraint that made it hard, and what happened afterwards. Pretty frames are table stakes."
        />
      </div>

      {/* ---- Desktop: pinned horizontal track ---- */}
      <div
        ref={ref}
        className="relative hidden md:block"
        style={{ height: `${projects.length * 78}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div
            className="flex gap-[3vw] will-change-transform"
            style={reduced ? { x: "2vw" } : { x }}
          >
            {projects.map((project, i) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group relative block w-[59vw] shrink-0"
                data-reticle="Open"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-negative-haze">
                  <motion.div
                    className="h-full w-full"
                    whileHover={reduced ? undefined : { scale: 1.04 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                  >
                    <Still seed={project.seed} grade={project.grade} />
                  </motion.div>

                  <div className="frame-lines" />

                  {/* Slate strip, bottom-left — exactly where a real one sits. */}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-negative/90 to-transparent p-6">
                    <div>
                      <span className="t-slate text-tungsten">
                        {String(i + 1).padStart(2, "0")} · {project.category}
                      </span>
                      <h3 className="t-h2 mt-2 text-ink">{project.title}</h3>
                    </div>
                    <span className="t-slate mb-1 hidden text-ink-2 lg:block">
                      {project.client} · {project.year}
                    </span>
                  </div>

                  {/* The arrow only materialises on hover — the card is already
                      obviously a link, so this is confirmation, not signage. */}
                  <div className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-tungsten opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight
                      className="h-5 w-5 text-negative"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <p className="t-body mt-5 max-w-md">{project.line}</p>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Progress: how much strip is left. Answers "should I keep scrolling". */}
        <div className="pointer-events-none sticky bottom-10 z-10 mx-gutter hidden lg:block">
          <div className="h-px w-full bg-negative-edge">
            <motion.div
              className="h-full origin-left bg-tungsten"
              style={{ scaleX: reduced ? 0 : eased }}
            />
          </div>
        </div>
      </div>

      {/* ---- Mobile: plain vertical stack ---- */}
      <div className="grid gap-12 px-gutter py-16 md:hidden">
        {projects.map((project, i) => (
          <Link key={project.slug} href={`/work/${project.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Still seed={project.seed} grade={project.grade} />
              <div className="frame-lines" />
            </div>
            <div className="mt-4">
              <span className="t-slate text-tungsten">
                {String(i + 1).padStart(2, "0")} · {project.category}
              </span>
              <h3 className="t-h3 mt-2">{project.title}</h3>
              <p className="t-body mt-2">{project.line}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
