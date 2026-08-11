"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useReduced } from "@/hooks/use-reduced-motion";
import { Plus } from "lucide-react";
import { services } from "@/lib/site";
import { Still } from "@/components/motion/still";
import { SectionHead } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { springSheet } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ============================================================================
   SERVICES — hover-preview list
   ----------------------------------------------------------------------------
   A list of rows, not a grid of cards. Six cards means six competing
   rectangles; six rows means a legible index the eye reads top to bottom in
   one pass.

   On desktop, hovering a row brings up a still in the negative space beside
   it — the preview is anchored to the row that summoned it, so the spatial
   relationship stays obvious. On touch, where there is no hover, the rows
   expand in place on tap instead. Same information, different affordance.
   ========================================================================== */

export function ServicesList() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const reduced = useReduced();

  const active = services.find((s) => s.slug === hovered) ?? null;

  return (
    <section
      aria-labelledby="services-heading"
      className="relative bg-negative px-gutter py-section"
    >
      <SectionHead
        index="02"
        eyebrow="What we make"
        title={<span id="services-heading">Five things, done properly.</span>}
        lead="Deliberately not a full-service anything. This is the list, and everything on it is something I shoot often enough to be genuinely good at."
      />

      <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* --- The list --- */}
        <div className="lg:col-span-7">
          <ul className="border-t border-negative-edge">
            {services.map((service, i) => {
              const isOpen = expanded === service.slug;
              return (
                <Reveal as="li" key={service.slug} delay={i * 0.04}>
                  <div
                    className="group border-b border-negative-edge"
                    onMouseEnter={() => setHovered(service.slug)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded((cur) => (cur === service.slug ? null : service.slug))
                      }
                      aria-expanded={isOpen}
                      aria-controls={`service-panel-${service.slug}`}
                      className="flex w-full items-center gap-5 py-7 text-left"
                    >
                      <span className="t-slate w-6 shrink-0 text-tungsten">
                        {service.index}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="t-h2 block transition-colors duration-300 group-hover:text-tungsten">
                          {service.title}
                        </span>
                        <span className="t-body mt-1.5 block">{service.line}</span>
                      </span>

                      <motion.span
                        className="shrink-0"
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={springSheet}
                      >
                        <Plus
                          className="h-5 w-5 text-ink-3 transition-colors group-hover:text-tungsten"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`service-panel-${service.slug}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={
                            reduced ? { duration: 0.15 } : { ...springSheet, opacity: { duration: 0.2 } }
                          }
                          className="overflow-hidden"
                        >
                          <div className="pb-8 pl-11 pr-4">
                            {/* The preview image only appears inline on small
                                screens — on desktop it lives in the panel to
                                the right and would be a duplicate here. */}
                            <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-sm lg:hidden">
                              <Still seed={i * 17 + 3} grade={service.grade} />
                              <div className="frame-lines" />
                            </div>

                            <p className="t-body max-w-xl">{service.body}</p>

                            <ul className="mt-6 flex flex-wrap gap-2">
                              {service.deliverables.map((d) => (
                                <li
                                  key={d}
                                  className="t-slate rounded-full border border-negative-edge px-3 py-1.5 text-ink-2"
                                >
                                  {d}
                                </li>
                              ))}
                            </ul>

                            <Link
                              href={`/services#${service.slug}`}
                              className="t-slate-lg mt-6 inline-block text-tungsten hover:underline"
                            >
                              Rates & scope →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>

        {/* --- Hover preview, desktop only --- */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-negative-haze">
              <AnimatePresence mode="wait">
                {active ? (
                  <motion.div
                    key={active.slug}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: reduced ? 0.15 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Still
                      seed={services.findIndex((s) => s.slug === active.slug) * 17 + 3}
                      grade={active.grade}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-negative to-transparent p-6">
                      <span className="t-slate text-tungsten">{active.index}</span>
                      <p className="t-h3 mt-1.5">{active.title}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span className="t-slate text-ink-3">
                      Hover a service
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className={cn("frame-lines")} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
