"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useReduced } from "@/hooks/use-reduced-motion";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { springSheet, springMove } from "@/lib/motion";

/* ============================================================================
   HEADER
   ----------------------------------------------------------------------------
   Translucent chrome with content scrolling underneath, not an opaque bar that
   permanently consumes a strip of the viewport. It retracts when you scroll
   down (you are reading, it is in the way) and returns the instant you scroll
   up (you are looking for it). The threshold means a 3px jitter never triggers
   either.
   ========================================================================== */

export function Header() {
  const pathname = usePathname();
  const reduced = useReduced();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const delta = latest - previous;
    setScrolled(latest > 24);
    if (menuOpen) return;
    if (Math.abs(delta) < 6) return;
    setHidden(delta > 0 && latest > 160);
  });

  // Close the menu on navigation, and lock the page behind it while open.
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50",
          scrolled && !menuOpen && "material-chrome"
        )}
        initial={false}
        animate={{ y: hidden && !reduced ? "-105%" : "0%" }}
        transition={springMove}
      >
        <div className="flex items-center justify-between px-gutter py-4">
          <Link
            href="/"
            className="group relative z-10 flex items-baseline gap-2.5"
            aria-label={`${site.name} — home`}
          >
            <span className="t-slate-lg font-semibold tracking-[0.2em] text-ink">
              AMROW
            </span>
            <span className="t-slate hidden text-ink-3 sm:inline">
              {site.contact.city ? `${site.contact.city} · ` : ""}Photo &amp; Video
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {nav.map((item) => {
              // Active on the section root and on any page beneath it, so a
              // case study still lights up "Work".
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[0.9375rem] tracking-[-0.01em] transition-colors duration-200",
                    active ? "text-negative" : "text-ink-2 hover:text-ink"
                  )}
                >
                  {/* The pill is a shared layout element, so it slides between
                      items instead of cross-fading in place. */}
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-tungsten"
                      transition={springMove}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="relative z-10 flex h-10 w-10 items-center justify-center md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="relative block h-3.5 w-6">
              <motion.span
                className="absolute left-0 block h-px w-full bg-ink"
                animate={menuOpen ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
                transition={springSheet}
              />
              <motion.span
                className="absolute left-0 block h-px w-full bg-ink"
                animate={
                  menuOpen ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }
                }
                transition={springSheet}
              />
            </span>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu. It enters and exits along the same path — down in, up out
          — because something that arrives one way and leaves another reads as
          two unrelated events. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-end bg-negative px-gutter pb-16 pt-28 md:hidden"
            initial={{ opacity: 0, y: "-8%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-8%" }}
            transition={springSheet}
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-1">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, ...springMove }}
                    className="border-b border-negative-edge"
                  >
                    <Link
                      href={item.href}
                      className="flex items-baseline gap-4 py-5"
                    >
                      <span className="t-slate text-tungsten">{item.index}</span>
                      <span className="t-h2">{item.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="mt-10 flex flex-col gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <a href={`mailto:${site.contact.email}`} className="t-body text-ink">
                {site.contact.email}
              </a>
              <a href={site.contact.phoneHref} className="t-body text-ink">
                {site.contact.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
