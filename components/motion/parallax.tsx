"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { useReduced } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/* ============================================================================
   SCROLL-LINKED MOTION
   ----------------------------------------------------------------------------
   Everything here is driven by scroll progress rather than by a timer, which
   means it is inherently interruptible: the user's scroll *is* the playhead,
   so reversing direction reverses the animation with no special handling and
   no seam. That is the cheapest correct implementation of interruptibility
   there is.

   All of it animates `transform` and `opacity` only, so it stays on the
   compositor. Nothing here triggers layout.
   ========================================================================== */

/** Smooth a raw scroll MotionValue without adding perceptible lag. */
function useSmooth(value: MotionValue<number>, enabled: boolean) {
  const smoothed = useSpring(value, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.0005,
  });
  return enabled ? smoothed : value;
}

/**
 * Vertical parallax. `speed` is the fraction of the travel distance the element
 * moves against the scroll — 0.2 is a background, 0.05 is a whisper.
 * Keep it under ~0.3 or the element visibly detaches from the page.
 */
export function Parallax({
  children,
  className,
  speed = 0.15,
  smooth = true,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  smooth?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReduced();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothed = useSmooth(scrollYProgress, smooth && !reduced);
  const y = useTransform(smoothed, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={reduced ? undefined : { y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * APERTURE — the site's section transition.
 * A frame that opens from a slot into full bleed as it enters the viewport,
 * the way an iris opens. Width and radius animate together so it reads as one
 * physical mechanism rather than two independent tweens.
 */
export function Aperture({
  children,
  className,
  /** Starting width as a percentage of the container. */
  from = 62,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReduced();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const smoothed = useSmooth(scrollYProgress, !reduced);

  const width = useTransform(smoothed, [0, 1], [`${from}%`, "100%"]);
  const radius = useTransform(smoothed, [0, 1], ["28px", "0px"]);
  const brightness = useTransform(smoothed, [0, 0.85], [0.55, 1]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  return (
    <div ref={ref} className={cn("flex w-full justify-center", className)}>
      <motion.div
        style={
          reduced
            ? { width: "100%" }
            : { width, borderRadius: radius, filter, overflow: "hidden" }
        }
        className="relative overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * FOCUS PULL ON SCROLL — content that resolves from soft to sharp as it rises.
 * Distinct from the entrance variant: this one is scrubbed, so scrolling back
 * up throws it out of focus again. It is the single most "camera" thing on the
 * page and it costs one compositor filter.
 */
export function ScrollFocus({
  children,
  className,
  maxBlur = 10,
}: {
  children: ReactNode;
  className?: string;
  maxBlur?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReduced();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const smoothed = useSmooth(scrollYProgress, !reduced);
  const blur = useTransform(smoothed, [0, 1], [maxBlur, 0]);
  const filter = useTransform(blur, (b) => `blur(${Math.max(b, 0).toFixed(2)}px)`);
  const opacity = useTransform(smoothed, [0, 0.5], [0.35, 1]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { filter, opacity }}>
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Scroll-scrubbed scale. Used on the hero frame: the shot pushes in slightly as
 * you leave it, which is what a real slow push looks like and what stops a
 * static hero from feeling like a photograph of a website.
 */
export function ScrollScale({
  children,
  className,
  from = 1,
  to = 1.14,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReduced();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [from, to]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        style={reduced ? undefined : { scale }}
        className="h-full w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
