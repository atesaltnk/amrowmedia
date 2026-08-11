"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReduced } from "@/hooks/use-reduced-motion";

/* ============================================================================
   RETICLE — the cursor
   ----------------------------------------------------------------------------
   A camera's autofocus box, not a blob. It sits *under* the real cursor
   position with a slight lag, brackets whatever is hoverable, and snaps to a
   focus-locked state over interactive elements — the same visual language as a
   viewfinder acquiring a subject.

   Rules it obeys:
   · Pointer-fine devices only. Never on touch.
   · Disabled entirely under prefers-reduced-motion — a lagging object that
     tracks your hand is exactly the kind of motion that setting exists for.
   · Rendered above everything but `pointer-events: none`, so it can never
     intercept a click.
   · Hidden until the first real mouse move, so it does not flash at 0,0 on load.
   ========================================================================== */

export function Reticle() {
  const reduced = useReduced();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [locked, setLocked] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Fast enough to feel attached, damped enough to read as a mechanism
  // tracking a subject rather than a sticker glued to the pointer.
  const sx = useSpring(x, { stiffness: 900, damping: 42, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 900, damping: 42, mass: 0.35 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    function onMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const el = e.target as HTMLElement | null;
      const hit = el?.closest<HTMLElement>(
        "a, button, [role='button'], input, textarea, select, summary, [data-reticle]"
      );
      setLocked(Boolean(hit));
      setLabel(hit?.dataset.reticle ?? null);
    }

    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced, visible, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block"
      style={{ x: sx, y: sy }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="relative -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: locked ? 1 : 0.55 }}
        transition={{ type: "spring", bounce: 0, duration: 0.32 }}
      >
        {/* Four corner brackets. They spread apart on lock, the way a focus box
            expands when it acquires a subject. */}
        <div className="relative h-11 w-11">
          {(
            [
              ["left-0 top-0", "border-l border-t"],
              ["right-0 top-0", "border-r border-t"],
              ["left-0 bottom-0", "border-l border-b"],
              ["right-0 bottom-0", "border-r border-b"],
            ] as const
          ).map(([pos, borders], i) => (
            <motion.span
              key={i}
              className={`absolute h-2.5 w-2.5 ${pos} ${borders}`}
              style={{
                borderColor: locked ? "var(--color-tungsten)" : "var(--color-print)",
              }}
              animate={{ opacity: locked ? 1 : 0.75 }}
              transition={{ duration: 0.2 }}
            />
          ))}

          {/* Centre dot — the actual pointer position. */}
          <motion.span
            className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: locked ? "var(--color-tungsten)" : "var(--color-print)",
            }}
            animate={{ scale: locked ? 0 : 1 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
          />
        </div>

        {label && (
          <motion.span
            className="t-slate absolute left-1/2 top-[calc(100%+8px)] -translate-x-1/2 whitespace-nowrap text-tungsten"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
