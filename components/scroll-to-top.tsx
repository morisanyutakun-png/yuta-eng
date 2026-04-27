"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

/**
 * Forces a scroll-to-(0, 0) on every route change. Combined with the inline
 * script in `app/layout.tsx` that flips `history.scrollRestoration` to
 * "manual" *before* hydration runs, this guarantees readers always land at
 * the top of the article — never mid-page from a leftover scroll position.
 *
 * `useLayoutEffect` is used instead of `useEffect` so the scroll happens
 * synchronously before the browser paints the new route, killing the
 * brief "open mid-page then jump" flash that `useEffect` allowed.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Use `instant` to bypass any `scroll-behavior: smooth` applied via CSS
    // — readers must not see a visible scroll animation on route entry.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
