"use client";

import { motion, type Variants } from "framer-motion";
import { useReduced } from "@/hooks/use-reduced-motion";
import type { ReactNode } from "react";
import { focusPull, fadeUp, viewportOnce, staggerParent } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ============================================================================
   REVEAL — the site's entrance vocabulary
   ----------------------------------------------------------------------------
   Reduced motion is handled here, once, rather than in forty call sites. The
   reduced variant is not "no animation" — it is a short cross-fade. People who
   set that preference still need to see that something arrived; what they do
   not need is a large object travelling across their field of view.
   ========================================================================== */

const REDUCED: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** `focus` racks focus (blur → sharp). `rise` translates up. */
  mode?: "focus" | "rise";
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header" | "figure";
};

export function Reveal({
  children,
  className,
  mode = "rise",
  delay = 0,
  as = "div",
}: RevealProps) {
  const reduced = useReduced();
  const base = mode === "focus" ? focusPull : fadeUp;
  const variants = reduced ? REDUCED : base;
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Stagger a list. The children animate in sequence rather than as a block,
 * which is what makes a grid feel assembled instead of switched on.
 */
export function Stagger({
  children,
  className,
  stagger = 0.07,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "section";
}) {
  const reduced = useReduced();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={staggerParent(reduced ? 0 : stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  );
}

/** A single item inside a <Stagger>. */
export function StaggerItem({
  children,
  className,
  mode = "rise",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  mode?: "focus" | "rise";
  as?: "div" | "li" | "article";
}) {
  const reduced = useReduced();
  const base = mode === "focus" ? focusPull : fadeUp;
  const MotionTag = motion[as];

  return (
    <MotionTag className={className} variants={reduced ? REDUCED : base}>
      {children}
    </MotionTag>
  );
}

/* ----------------------------------------------------------------------------
   SPLIT — per-word reveal for headlines
   --------------------------------------------------------------------------
   Split by word, never by character. Character splitting shreds the text for
   screen readers and breaks text selection; word splitting keeps both intact
   and, at display sizes, is the more legible effect anyway.

   The real string is rendered once inside an .sr-only span so assistive tech
   reads a sentence rather than a pile of fragments.
   -------------------------------------------------------------------------- */

export function Split({
  text,
  className,
  wordClassName,
  stagger = 0.055,
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  stagger?: number;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const reduced = useReduced();
  const words = text.split(" ");

  if (reduced) {
    return (
      <Tag className={className}>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.3 }}
          className="block"
        >
          {text}
        </motion.span>
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className="inline-block"
        variants={staggerParent(stagger, delay)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {words.map((word, i) => (
          // The outer span is the mask: overflow-hidden with the inner span
          // translating out of it, so words rise from behind their own baseline.
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden pb-[0.12em] align-bottom"
          >
            <motion.span
              className={cn("inline-block", wordClassName)}
              variants={{
                hidden: { y: "108%", opacity: 0 },
                visible: {
                  y: "0%",
                  opacity: 1,
                  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
