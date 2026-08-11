"use client";

import { motion } from "framer-motion";
import { useReduced } from "@/hooks/use-reduced-motion";
import { Check } from "lucide-react";
import { packages } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHead } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/* ============================================================================
   PRICING
   ----------------------------------------------------------------------------
   Publishing starting prices is the single highest-leverage change most
   production studios can make to their site. It costs a handful of enquiries
   that were never going to close and it removes the awkward first call from
   every enquiry that was.

   The tiers are named after record formats because this is a music town and
   nobody has ever been excited to buy "Tier 2".
   ========================================================================== */

export function Pricing() {
  const reduced = useReduced();

  return (
    <section
      id="rates"
      aria-labelledby="pricing-heading"
      className="bg-negative px-gutter py-section"
      style={{ scrollMarginTop: "5rem" }}
    >
      <SectionHead
        index="02"
        eyebrow="Rates"
        title={<span id="pricing-heading">What it costs.</span>}
        lead="Real starting figures, not a contact form. Every project gets a fixed written quote before anyone is booked — these are the bands most work lands in."
      />

      <Stagger className="mt-16 grid gap-5 lg:grid-cols-3" stagger={0.1}>
        {packages.map((pkg) => (
          <StaggerItem key={pkg.name}>
            <motion.div
              whileHover={reduced ? undefined : { y: -6 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className={cn(
                "flex h-full flex-col rounded-xl border p-8",
                pkg.featured
                  ? "border-tungsten bg-negative-haze"
                  : "border-negative-edge bg-negative-lift"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="t-h3">{pkg.name}</h3>
                  <span className="t-slate mt-2 block text-ink-3">{pkg.format}</span>
                </div>
                {pkg.featured && (
                  <span className="t-slate rounded-full bg-tungsten px-3 py-1.5 text-negative">
                    Most booked
                  </span>
                )}
              </div>

              <p className="t-body mt-6">{pkg.line}</p>

              <div className="mt-8 flex items-baseline gap-2">
                <span className="t-slate text-ink-3">from</span>
                <span className="text-[2.75rem] font-semibold leading-none tracking-[-0.04em] text-ink">
                  ${pkg.from.toLocaleString("en-US")}
                </span>
              </div>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-tungsten"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    <span className="text-[0.9375rem] leading-relaxed text-ink-2">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="t-slate mt-8 border-t border-negative-edge pt-6 text-ink-3">
                {pkg.best}
              </p>

              <div className="mt-6">
                <Button
                  href={`/contact?package=${encodeURIComponent(pkg.name)}`}
                  variant={pkg.featured ? "primary" : "ghost"}
                  className="w-full"
                  icon={false}
                >
                  Enquire
                </Button>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.2}>
        <p className="t-body mx-auto mt-12 max-w-2xl text-center">
          Non-profit, artist-owned and first-release projects get a standing
          reduction — ask. Travel beyond three hours from Nashville is billed at
          cost with no markup, itemised on the quote.
        </p>
      </Reveal>
    </section>
  );
}
