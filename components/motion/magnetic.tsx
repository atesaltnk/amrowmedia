"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReduced } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/* ============================================================================
   MAGNETIC
   ----------------------------------------------------------------------------
   The element leans toward the pointer while it is nearby, then springs home
   when it leaves. Two things make this feel right rather than gimmicky:

   · The pull is a *fraction* of the pointer offset, not 1:1. The element is
     acknowledging the pointer, not being dragged by it.
   · The return is critically damped (bounce 0). Nothing was thrown, so nothing
     should overshoot — the pointer simply left.

   Pointer-fine only. On touch there is no hover state to respond to, and the
   transform would fight the tap.
   ========================================================================== */

export function Magnetic({
  children,
  className,
  /** How much of the pointer offset the element adopts. */
  strength = 0.32,
  /** Extra pull radius beyond the element's own bounds, in px. */
  padding = 24,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  padding?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReduced();
  const [engaged, setEngaged] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Independent springs on X and Y. A single spring driving a 2D distance
  // desyncs the moment the two axes carry different velocities.
  const springConfig = { stiffness: 340, damping: 26, mass: 0.6 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
    if (!engaged) setEngaged(true);
  }

  function release() {
    x.set(0);
    y.set(0);
    setEngaged(false);
  }

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={cn("relative inline-block", className)}
      style={{ x: sx, y: sy, padding }}
      onPointerMove={onPointerMove}
      onPointerLeave={release}
      onPointerCancel={release}
      // Feedback on press, not on release — waiting for the click feels dead.
      whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
      animate={{ scale: engaged ? 1.03 : 1 }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
