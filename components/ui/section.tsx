import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

/**
 * SECTION — consistent rhythm, one place.
 *
 * Every section on the site is the same object with different contents, which
 * is what makes the page scan as a single document rather than a stack of
 * templates. Vertical padding scales with the viewport but has a floor, so it
 * never collapses on a short screen.
 */
export function Section({
  children,
  className,
  id,
  grade = "negative",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  /** `print` flips to the warm paper grade to interrupt the dark. */
  grade?: "negative" | "print" | "lift";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative px-gutter py-section",
        grade === "print" && "bg-print text-ink-inverse",
        grade === "lift" && "bg-negative-lift",
        className
      )}
      // Anchored sections need to clear the fixed header when jumped to.
      style={id ? { scrollMarginTop: "5rem" } : undefined}
    >
      {children}
    </section>
  );
}

/**
 * SECTION HEADER — the numbered slate + title pattern used throughout.
 * Consistency here is load-bearing: it is how the reader knows, without
 * thinking, that they have arrived somewhere new.
 */
export function SectionHead({
  index,
  eyebrow,
  title,
  lead,
  className,
  inverse = false,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  className?: string;
  inverse?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Reveal>
        <div className="mb-6 flex items-center gap-3">
          {index && (
            <span
              className={cn("t-slate", inverse ? "text-ink-inverse-2" : "text-tungsten")}
            >
              {index}
            </span>
          )}
          <span className="h-px w-8 bg-current opacity-25" />
          <span className={cn("t-slate", inverse && "text-ink-inverse-2")}>
            {eyebrow}
          </span>
        </div>
      </Reveal>

      <Reveal mode="focus">
        <h2 className="t-h1 text-balance">{title}</h2>
      </Reveal>

      {lead && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "t-lead mt-6 max-w-2xl text-pretty",
              inverse && "text-ink-inverse-2"
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
