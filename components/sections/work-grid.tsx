"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useReduced } from "@/hooks/use-reduced-motion";
import { projects, categories } from "@/lib/work";
import { Still } from "@/components/motion/still";
import { Split, Reveal } from "@/components/motion/reveal";
import { springMove } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ============================================================================
   WORK INDEX — filterable contact sheet
   ----------------------------------------------------------------------------
   Laid out as a photographer's contact sheet: an irregular grid where some
   frames run wide, because a perfectly uniform grid of 16:9 rectangles is how
   you make six different films look like one stock library.

   Filtering uses layout animation, so a card that survives the filter *moves*
   to its new position rather than disappearing and reappearing somewhere else.
   That continuity is the difference between a filter that feels like a
   rearrangement and one that feels like a page reload.
   ========================================================================== */

/** Frames 1 and 4 of every six run full width — the sheet's rhythm. */
function spanFor(index: number) {
  const pattern = index % 6;
  return pattern === 0 || pattern === 3 ? "md:col-span-8" : "md:col-span-4";
}

export function WorkGrid() {
  const [filter, setFilter] = useState<string>("All");
  const reduced = useReduced();

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="px-gutter pb-24 pt-40">
      <div className="max-w-4xl">
        <Reveal>
          <span className="t-slate text-tungsten">Index — {projects.length} projects</span>
        </Reveal>
        <Split
          as="h1"
          text="The work, and what it was for."
          className="t-h1 mt-6 text-balance"
        />
        <Reveal delay={0.15}>
          <p className="t-lead mt-8 max-w-2xl text-pretty">
            Each of these opens into a full case study — the brief, the thing
            that made it difficult, and what happened after delivery. Filter by
            discipline, or read them in order.
          </p>
        </Reveal>
      </div>

      {/* --- Filter --- */}
      <div className="mt-14 flex flex-wrap gap-2" role="group" aria-label="Filter by discipline">
        {categories.map((category) => {
          const active = filter === category;
          const count =
            category === "All"
              ? projects.length
              : projects.filter((p) => p.category === category).length;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={active}
              className={cn(
                "relative rounded-full border px-4 py-2 text-sm transition-colors duration-200",
                "active:scale-[0.97] active:duration-100",
                active
                  ? "border-transparent text-negative"
                  : "border-negative-edge text-ink-2 hover:border-ink-3 hover:text-ink"
              )}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-tungsten"
                  transition={springMove}
                />
              )}
              <span className="relative z-10">
                {category}
                <span className="ml-2 opacity-55">{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* --- Sheet --- */}
      <LayoutGroup>
        <motion.ul layout className="mt-12 grid gap-x-6 gap-y-16 md:grid-cols-8">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.li
                key={project.slug}
                layout={!reduced}
                initial={{ opacity: 0, y: reduced ? 0 : 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
                transition={{
                  duration: reduced ? 0.15 : 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  layout: springMove,
                }}
                className={spanFor(i)}
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="group block"
                  data-reticle="Open"
                >
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-sm bg-negative-haze",
                      spanFor(i) === "md:col-span-8"
                        ? "aspect-[21/9]"
                        : "aspect-[4/3]"
                    )}
                  >
                    <motion.div
                      className="h-full w-full"
                      whileHover={reduced ? undefined : { scale: 1.05 }}
                      transition={{ type: "spring", bounce: 0, duration: 0.65 }}
                    >
                      <Still seed={project.seed} grade={project.grade} />
                    </motion.div>
                    <div className="frame-lines" />

                    {/* Sprocket ticks along the top edge — the sheet's one
                        piece of pure ornament, and it earns its place by
                        making the metaphor land instantly. */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 flex justify-between px-2 opacity-30"
                    >
                      {Array.from({ length: 14 }).map((_, s) => (
                        <span key={s} className="mt-1 h-1.5 w-1 rounded-[1px] bg-print" />
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h2 className="t-h3 transition-colors duration-300 group-hover:text-tungsten">
                      {project.title}
                    </h2>
                    <span className="t-slate shrink-0 text-ink-3">{project.year}</span>
                  </div>
                  <p className="t-slate mt-2 text-tungsten">
                    {project.client} · {project.category}
                  </p>
                  <p className="t-body mt-3 max-w-md">{project.line}</p>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>
    </section>
  );
}
