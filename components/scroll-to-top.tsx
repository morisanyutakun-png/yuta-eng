"use client";

import { useEffect } from "react";

/**
 * Resets the scroll position to (0, 0) on mount.
 *
 * Why: Browsers (and Next.js App Router under some conditions) restore the
 * previous page's scroll position on navigation, so when a reader scrolls
 * partway down /blog and clicks an article card, the article opens already
 * scrolled — the title is offscreen. Mounting this on the article page forces
 * a top-of-page start every time the route renders.
 *
 * `scrollRestoration = "manual"` tells the browser not to restore on its own,
 * and the explicit `scrollTo(0, 0)` covers cases where the navigation already
 * landed mid-page before this effect ran.
 */
export function ScrollToTop() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
