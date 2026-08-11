"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useReduced } from "@/hooks/use-reduced-motion";
import { toTimecode } from "@/lib/utils";

/* ============================================================================
   HUD — the scroll indicator, as a camera readout
   ----------------------------------------------------------------------------
   Every site has a scroll progress bar. This one reports position as SMPTE
   timecode and a frame count, because the audience is a film crew and they
   read that fluently. It is a progress bar that also says what kind of studio
   this is — the same information, in the client's own dialect.

   Cheap by construction: the bar is a scaleX on a MotionValue (compositor
   only), and the timecode text updates from a subscription rather than React
   state on every scroll event.
   ========================================================================== */

export function Hud() {
  const reduced = useReduced();
  const { scrollYProgress } = useScroll();
  const [timecode, setTimecode] = useState("00:00:00:00");
  const [rolling, setRolling] = useState(false);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 320,
    damping: 40,
    restDelta: 0.001,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const unsub = scrollYProgress.on("change", (v) => {
      setTimecode(toTimecode(v));
      setRolling(true);
      clearTimeout(timer);
      // The REC dot stops blinking a beat after scrolling stops — the page is
      // "recording" only while it is actually moving.
      timer = setTimeout(() => setRolling(false), 260);
    });

    return () => {
      unsub();
      clearTimeout(timer);
    };
  }, [scrollYProgress]);

  return (
    <>
      {/* Progress bar, hairline, pinned to the very top edge. */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[65] h-px origin-left bg-tungsten"
        style={{ scaleX, opacity: reduced ? 1 : opacity }}
      />

      {/* Readout. Hidden on small screens — a phone has no room for a HUD. */}
      <motion.div
        aria-hidden="true"
        className="fixed bottom-5 left-gutter z-[65] hidden select-none items-center gap-3 lg:flex"
        style={{ opacity: reduced ? 1 : opacity }}
      >
        <span className="flex items-center gap-1.5">
          <motion.span
            className="block h-1.5 w-1.5 rounded-full bg-tungsten"
            animate={{ opacity: rolling && !reduced ? [1, 0.25, 1] : 0.35 }}
            transition={
              rolling && !reduced
                ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.2 }
            }
          />
          <span className="t-slate text-ink-3">rec</span>
        </span>
        <span className="h-3 w-px bg-negative-edge" />
        <span className="t-slate text-ink-2">{timecode}</span>
      </motion.div>
    </>
  );
}
