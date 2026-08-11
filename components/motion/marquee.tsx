"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
} from "framer-motion";
import { useReduced } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/* ============================================================================
   MARQUEE
   ----------------------------------------------------------------------------
   The CSS animation does the looping (free, compositor-only, survives the main
   thread being busy). Scroll velocity only *skews* it — a small input producing
   a big, legible output. The strip leans into the direction you are scrolling,
   which makes the page feel like it has mass.
   ========================================================================== */

export function Marquee({
  children,
  className,
  duration = 40,
  reverse = false,
  /** Skew the strip with scroll velocity. Off for text you need to read. */
  velocitySkew = true,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  reverse?: boolean;
  velocitySkew?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReduced();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);

  // Damped so a flick does not snap the strip sideways, then clamped to ±7°
  // because past that it stops reading as momentum and starts reading as a bug.
  const smoothVelocity = useSpring(velocity, {
    stiffness: 300,
    damping: 60,
    restDelta: 0.01,
  });
  const skew = useTransform(smoothVelocity, [-2500, 0, 2500], [-7, 0, 7], {
    clamp: true,
  });

  const active = velocitySkew && !reduced;

  return (
    <div ref={ref} className={cn("relative w-full overflow-hidden", className)}>
      <motion.div style={active ? { skewY: skew } : undefined}>
        <div
          className={cn(
            "marquee-track flex w-max items-center",
            reverse && "[animation-direction:reverse]"
          )}
          style={{ ["--marquee-duration" as string]: `${duration}s` }}
        >
          {/* Rendered twice: the track translates exactly -50%, so the second
              copy is in position the instant the first leaves. */}
          <div className="flex shrink-0 items-center" aria-hidden={false}>
            {children}
          </div>
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
