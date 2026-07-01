"use client";

import { useEffect } from "react";

/**
 * Hash-target correction (progressive enhancement, cannot hide content).
 *
 * When arriving on `/#features` etc. from another page, the browser's initial
 * jump can land slightly off (sticky header offset, late-loading images). We
 * re-scroll to the real target once layout settles, and also handle in-page
 * anchor clicks via `hashchange`. This never changes visibility — it only
 * scrolls — so it can never blank the page.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash || hash.length < 2) return;
      let el: HTMLElement | null = null;
      try {
        el = document.getElementById(decodeURIComponent(hash.slice(1)));
      } catch {
        return;
      }
      el?.scrollIntoView();
    };

    // Two frames so images/layout settle before we correct the position.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(scrollToHash);
    });
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return null;
}
