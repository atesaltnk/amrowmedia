"use client";

import { useEffect, useState } from "react";
import { useReduced } from "@/hooks/use-reduced-motion";

/**
 * FILM GRAIN
 *
 * A single fixed noise tile over the whole page. Two reasons it earns its place
 * on a production studio's site: it is the correct texture for the subject, and
 * it genuinely stops large flat blacks from banding on 6-bit panels.
 *
 * It does not animate. An animated grain is a per-frame repaint of the entire
 * viewport for a texture nobody consciously sees — the worst performance-to-
 * perception ratio available on the web. Static costs one composited layer.
 */
export function Grain() {
  const reduced = useReduced();
  const [mounted, setMounted] = useState(false);

  // Client-only: the tile is decorative, and rendering it server-side just
  // ships bytes that the reduced-motion user is going to discard anyway.
  useEffect(() => setMounted(true), []);

  if (!mounted || reduced) return null;
  return <div className="film-grain" aria-hidden="true" />;
}
