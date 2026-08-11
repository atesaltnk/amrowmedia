"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReduced } from "@/hooks/use-reduced-motion";
import { process } from "@/lib/site";
import { SectionHead } from "@/components/ui/section";

/* ============================================================================
   PROCESS — sticky card stack
   ----------------------------------------------------------------------------
   Each step pins as it arrives and the next one slides over it, so the steps
   physically stack up the way a schedule does. The card underneath scales down
   and dims slightly as it is covered — the same "push the parent back" move a
   stacked sheet makes on iOS, and it is what stops the stack from reading as
   a flat pile of divs.

   The section answers the question a first-time client actually has. Not "what
   camera do you shoot on" but "what is going to happen to me, and when".
   ========================================================================== */

function Step({
  step,
  index,
  total,
  progress,
}: {
  step: (typeof process)[number];
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const reduced = useReduced();

  // Each card owns a slice of the section's scroll. Within its own slice it is
  // the front card; past it, it is being covered.
  const start = index / total;
  const end = (index + 1) / total;

  const scale = useTransform(progress, [start, end], [1, 0.92]);
  const opacity = useTransform(progress, [start, end], [1, 0.42]);
  const y = useTransform(progress, [start, end], [0, -22]);

  const isLast = index === total - 1;

  return (
    <motion.article
      className="sticky mx-auto w-full max-w-4xl"
      style={{
        // Stagger the pin points so the stacked edges stay visible.
        top: `calc(18vh + ${index * 14}px)`,
        ...(reduced || isLast ? {} : { scale, opacity, y }),
      }}
    >
      <div className="material-card overflow-hidden rounded-xl p-8 md:p-12">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <span className="t-slate text-tungsten">Step {step.step}</span>
          <span className="t-slate text-ink-3">{step.duration}</span>
        </div>

        <h3 className="t-h1 mt-6">{step.title}</h3>
        <p className="t-lead mt-5 max-w-2xl text-pretty">{step.body}</p>

        {/* Progress through the whole process, drawn as a bar of segments. */}
        <div className="mt-10 flex gap-1.5" aria-hidden="true">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-0.5 flex-1 rounded-full ${
                i <= index ? "bg-tungsten" : "bg-negative-edge"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function ProcessStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      aria-labelledby="process-heading"
      className="relative bg-negative-lift px-gutter py-section"
    >
      <SectionHead
        index="03"
        eyebrow="How it goes"
        title={<span id="process-heading">Five steps. No surprises.</span>}
        lead="The most common reason a production goes wrong is that nobody agreed what it was before the crew was booked. So we sell the plan first and the crew second."
      />

      <div ref={ref} className="relative mt-20" style={{ height: `${process.length * 88}vh` }}>
        {process.map((step, i) => (
          <Step
            key={step.step}
            step={step}
            index={i}
            total={process.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
