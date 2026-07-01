"use client";

import { useEffect } from "react";

/**
 * Two jobs, both progressive enhancement:
 *
 * 1. Hash-target correction. The page uses `content-visibility: auto`
 *    (.cv-defer) for fast paint. When you land on `/#features` from another
 *    page, the browser's initial jump uses the *estimated* heights of the
 *    not-yet-rendered sections, so it can land in a blank spot. We re-scroll
 *    to the real target after layout settles (and reveal it). This runs
 *    ALWAYS — even with reduced motion / no reveal.
 *
 * 2. Reveal-on-scroll. Sections fade/rise in as they enter view. The hidden
 *    start state only applies after `.reveal-ready` is added here, and only
 *    when JS + motion are OK — so content is never hidden from no-JS /
 *    reduced-motion users or crawlers.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // ── 1. Correct hash navigation (content-visibility can mis-land) ──
    const revealHashTarget = () => {
      const hash = window.location.hash;
      if (!hash || hash.length < 2) return;
      let el: HTMLElement | null = null;
      try {
        el = document.getElementById(decodeURIComponent(hash.slice(1)));
      } catch {
        return;
      }
      if (!el) return;
      el.classList.add("revealed");
      el.scrollIntoView();
    };
    // Wait two frames so content-visibility has laid out before we re-scroll.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(revealHashTarget);
    });
    window.addEventListener("hashchange", revealHashTarget);

    // ── 2. Reveal-on-scroll (only if motion is allowed) ──
    let io: IntersectionObserver | null = null;
    const motionOk =
      "IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (motionOk) {
      const els = Array.from(document.querySelectorAll<HTMLElement>(".cv-defer"));
      if (els.length > 0) {
        // Sections already in/near view are revealed BEFORE the hidden start
        // state turns on, so above-the-fold content never flashes.
        const fold = window.innerHeight * 0.9;
        for (const el of els) {
          if (el.getBoundingClientRect().top < fold) el.classList.add("revealed");
        }
        document.documentElement.classList.add("reveal-ready");

        io = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (e.isIntersecting) {
                e.target.classList.add("revealed");
                io?.unobserve(e.target);
              }
            }
          },
          { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
        );
        for (const el of els) {
          if (!el.classList.contains("revealed")) io.observe(el);
        }
      }
    }

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("hashchange", revealHashTarget);
      io?.disconnect();
    };
  }, []);

  return null;
}
