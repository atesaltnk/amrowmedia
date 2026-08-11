"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReduced } from "@/hooks/use-reduced-motion";
import { ArrowDown } from "lucide-react";
import { site } from "@/lib/site";
import { Still } from "@/components/motion/still";
import { Button } from "@/components/ui/button";

/* ============================================================================
   HERO
   ----------------------------------------------------------------------------
   The whole section is a shot. Three things carry it:

   1. LETTERBOX OPEN. Two black bars retract from the centre on load, the way a
      projector masks to aspect. It buys about a second of anticipation and it
      tells the visitor what kind of company this is before a word is read.

   2. THE SLOW PUSH. The frame scales up as you scroll away from it. Real
      cinematography almost never holds perfectly still; a locked-off web hero
      reads as a photograph of a website.

   3. VIEWFINDER CHROME. Corner metadata in mono — aperture, stock, location.
      It is honest information presented in the client's own dialect.

   The headline is the studio's actual positioning line, set as large as the
   viewport can carry it. Nothing above the fold competes with it.
   ========================================================================== */

/* ⚠️ Drafted headline — see `site.promise` in lib/site.ts for the reasoning.
   Split into lines by hand so the break points are deliberate rather than
   whatever the container width happens to produce. The final word is the one
   that carries the accent colour, so it has to be the word worth stressing. */
const WORDS = ["I get", "the shot", "when the room", "is chaos."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReduced();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Content leaves faster than the frame behind it — that speed difference is
  // the entire illusion of depth.
  const frameScale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-42%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentBlur = useTransform(scrollYProgress, [0, 0.5], [0, 8]);
  const contentFilter = useTransform(contentBlur, (b) => `blur(${b.toFixed(2)}px)`);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden"
      aria-label="Introduction"
    >
      {/* --- The frame ------------------------------------------------------ */}
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { scale: frameScale, opacity: frameOpacity }}
      >
        <Still seed={7} grade="tungsten" priority />
        <div className="halation" />
        <div className="vignette absolute inset-0" />
        {/* A floor under the type so the copy never fights the image for contrast. */}
        <div className="absolute inset-0 bg-gradient-to-t from-negative via-negative/55 to-negative/35" />
      </motion.div>

      {/* --- Letterbox ------------------------------------------------------
          Retracts on load. Enter and exit share one path, so if it is ever
          reversed it will read as the same mechanism closing. */}
      {[
        { edge: "top-0", from: "-100%" },
        { edge: "bottom-0", from: "100%" },
      ].map(({ edge, from }) => (
        <motion.div
          key={edge}
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 ${edge} z-20 h-[14vh] bg-negative`}
          initial={reduced ? { y: from } : { y: "0%" }}
          animate={{ y: from }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        />
      ))}

      {/* --- Viewfinder chrome ---------------------------------------------- */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 hidden px-gutter py-24 lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="flex justify-between">
            <span className="t-slate text-ink-2">
              {site.contact.city
                ? `${site.contact.city}, ${site.contact.region}`
                : site.motto}
            </span>
            <span className="t-slate text-ink-2">Photo · Video</span>
          </div>
          <div className="flex justify-between">
            <span className="t-slate text-ink-2">ƒ/1.4 · 1/250 · ISO 3200</span>
            <span className="t-slate text-ink-2">One operator</span>
          </div>
        </div>
      </motion.div>

      {/* --- Copy ------------------------------------------------------------ */}
      <motion.div
        className="relative z-10 flex h-full flex-col justify-end px-gutter pb-[16vh]"
        style={
          reduced ? undefined : { y: contentY, opacity: contentOpacity, filter: contentFilter }
        }
      >
        <motion.p
          className="t-slate mb-8 text-tungsten"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {site.tagline}
        </motion.p>

        <h1 className="t-display max-w-[16ch] text-balance">
          <span className="sr-only">{site.promise}</span>
          <span aria-hidden="true">
            {WORDS.map((word, i) => (
              <span
                key={word}
                className="block overflow-hidden pb-[0.06em]"
              >
                <motion.span
                  className="block"
                  initial={reduced ? { opacity: 0 } : { y: "110%" }}
                  animate={reduced ? { opacity: 1 } : { y: "0%" }}
                  transition={{
                    duration: 1.15,
                    ease: [0.16, 1, 0.3, 1],
                    // Each line follows the one above it out of the mask.
                    delay: reduced ? 0.3 : 0.45 + i * 0.11,
                  }}
                >
                  {i === WORDS.length - 1 ? (
                    <>
                      {word.replace("chaos.", "")}
                      <span className="text-tungsten">chaos.</span>
                    </>
                  ) : (
                    word
                  )}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button href="/work" variant="primary" magnetic reticle="View">
            See the work
          </Button>
          <Button href="/contact" variant="ghost" icon={false}>
            Start a project
          </Button>
        </motion.div>
      </motion.div>

      {/* --- Scroll cue ------------------------------------------------------ */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={reduced ? undefined : { opacity: contentOpacity }}
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="t-slate text-ink-3">Scroll</span>
          <ArrowDown className="h-3.5 w-3.5 text-ink-3" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
