"use client";

import { useEffect } from "react";

/**
 * Reveal-on-scroll, done as a tiny progressive-enhancement island.
 *
 * Why JS (not a pure CSS scroll-timeline): the page relies on
 * `content-visibility: auto` (.cv-defer) for fast first paint, and CSS
 * view-timelines interact unreliably with it. An IntersectionObserver is
 * robust against that, and—crucially—we only opt sections into the hidden
 * start state AFTER confirming JS + motion are OK. With no JS, or with
 * prefers-reduced-motion, every section just stays fully visible.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".cv-defer"),
    );
    if (els.length === 0) return;

    // Sections already in (or near) the viewport are marked revealed BEFORE we
    // flip on the hidden start state, so above-the-fold content never flashes.
    const fold = window.innerHeight * 0.9;
    for (const el of els) {
      if (el.getBoundingClientRect().top < fold) el.classList.add("revealed");
    }
    document.documentElement.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    for (const el of els) {
      if (!el.classList.contains("revealed")) io.observe(el);
    }

    return () => io.disconnect();
  }, []);

  return null;
}
