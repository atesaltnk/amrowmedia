"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReduced } from "@/hooks/use-reduced-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/site";
import { SectionHead } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { springSheet } from "@/lib/motion";

/* ============================================================================
   FAQ
   ----------------------------------------------------------------------------
   These are the eight questions that otherwise become the first email, and
   answering them in public does two jobs: it shortens the sales cycle, and the
   FAQPage structured data below makes the answers eligible to appear directly
   in search results and AI answers.

   Answered honestly, including the parts that are constraints. "Three to four
   weeks" builds more trust than "get in touch to discuss timing".
   ========================================================================== */

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReduced();

  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-negative-lift px-gutter py-section"
      style={{ scrollMarginTop: "5rem" }}
    >
      <div className="mx-auto max-w-4xl">
        <SectionHead
          index="03"
          eyebrow="Before you ask"
          title={<span id="faq-heading">The usual questions.</span>}
        />

        <ul className="mt-14 border-t border-negative-edge">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={faq.q} delay={i * 0.03}>
                <div className="border-b border-negative-edge">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      className="group flex w-full items-start gap-5 py-6 text-left"
                    >
                      <span className="flex-1 text-[1.0625rem] font-medium tracking-[-0.015em] text-ink transition-colors group-hover:text-tungsten">
                        {faq.q}
                      </span>
                      <motion.span
                        className="mt-1 shrink-0"
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={springSheet}
                      >
                        <Plus
                          className="h-4 w-4 text-ink-3"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={
                          reduced
                            ? { duration: 0.15 }
                            : { ...springSheet, opacity: { duration: 0.2 } }
                        }
                        className="overflow-hidden"
                      >
                        <p className="t-body max-w-2xl pb-7 pr-10">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
      />
    </section>
  );
}
