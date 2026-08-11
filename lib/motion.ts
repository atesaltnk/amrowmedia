import type { Transition, Variants } from "framer-motion";

/* ============================================================================
   SPRING VOCABULARY
   ----------------------------------------------------------------------------
   Apple describes springs with two designer-facing parameters — damping ratio
   and response — rather than mass/stiffness/damping. Framer Motion's
   `bounce` + `duration` maps onto them almost exactly:

     bounce 0    ≈ damping 1.0  (critically damped, no overshoot)
     bounce 0.2  ≈ damping 0.8  (slight overshoot)
     duration    ≈ response     (time to reach target, not a fixed duration —
                                 a spring's settle time emerges from the params)

   The rule that matters: overshoot is earned by momentum. A card the user
   flicked may bounce. A menu that simply appeared may not.
   ========================================================================== */

/** The default for everything the user did not throw. */
export const springCalm: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.45,
};

/** Reposition — Apple ships damping 1.0 / response 0.4 for this. */
export const springMove: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.4,
};

/** Momentum-carrying interactions only: drag release, flick, drawer. */
export const springMomentum: Transition = {
  type: "spring",
  bounce: 0.22,
  duration: 0.4,
};

/** Sheets and drawers — Apple: damping 0.8 / response 0.3. */
export const springSheet: Transition = {
  type: "spring",
  bounce: 0.2,
  duration: 0.3,
};

/** Large surfaces settle slower; a big object with a snappy spring reads cheap. */
export const springHeavy: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.7,
};

/* ============================================================================
   ENTRANCE VARIANTS
   ----------------------------------------------------------------------------
   Entrances are not gestural, so a tuned bezier is honest here and cheaper than
   a spring. Every variant below has a reduced-motion twin that keeps the
   opacity change (it aids comprehension) and drops the translation (it does not).
   ========================================================================== */

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_OUT_QUINT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_QUINT } },
};

/**
 * Focus pull — the signature entrance of this site.
 * A camera does not fade a subject in. It racks the focus ring until the
 * subject resolves. Blur + a hair of scale reproduces that, and it is the one
 * motion on the site that says "this was made by people who shoot."
 */
export const focusPull: Variants = {
  hidden: { opacity: 0, filter: "blur(14px)", scale: 1.02 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 1.05, ease: EASE_OUT_QUINT },
  },
};

/** Reduced-motion equivalents: gentler, non-vestibular, still informative. */
export const fadeUpReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
};

export const staggerParent = (stagger = 0.07, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/**
 * Viewport defaults. `once: true` because a section that re-animates every time
 * it scrolls back into view is noise, not craft. The negative bottom margin
 * means an element starts moving slightly before it is fully on screen, so the
 * motion has finished by the time the eye arrives.
 */
export const viewportOnce = { once: true, margin: "0px 0px -12% 0px" } as const;

/* ============================================================================
   MOMENTUM PROJECTION
   ----------------------------------------------------------------------------
   Apple's exponential-decay projection from the Designing Fluid Interfaces
   sample code. Note this is *not* the physics-textbook v²/(2·a) form.
   Use it to decide where a flick is going, then snap to the nearest target to
   the projected point — never to the nearest target to the release point.
   ========================================================================== */
export function project(initialVelocity: number, decelerationRate = 0.998) {
  return ((initialVelocity / 1000) * decelerationRate) / (1 - decelerationRate);
}
