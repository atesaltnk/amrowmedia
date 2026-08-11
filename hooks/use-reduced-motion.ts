"use client";

import { useEffect, useState } from "react";

/**
 * useReduced — hydration-safe reduced-motion preference.
 *
 * Framer Motion's own `useReducedMotion` reads the media query during render,
 * which means a component that branches on it produces different markup on the
 * server (where the query is always false) than on a client that has the
 * preference set. React then throws a hydration mismatch and discards the
 * server HTML for that subtree.
 *
 * This returns `false` on the server *and* on the first client render, so the
 * two always agree, then flips to the real value in an effect. Nothing is lost
 * by the one-frame delay: every entrance on this site starts from a hidden
 * state and is triggered by scroll or interaction, both of which happen well
 * after the effect has run — so a reduced-motion user never sees a frame of
 * motion they asked not to see.
 *
 * It also subscribes to changes, so toggling the OS setting updates the page
 * live rather than requiring a reload.
 */
export function useReduced() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
