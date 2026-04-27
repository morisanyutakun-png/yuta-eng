"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

// Disable browser scroll-restoration as soon as this module is evaluated on
// the client — earlier than any effect would fire. This is the first defense
// against the "article opens mid-page" issue when navigating from a scrolled
// /blog into an article.
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

/**
 * Forces a scroll-to-(0, 0) on every route change. `useLayoutEffect` keeps the
 * scroll synchronous and pre-paint, so readers never see a brief mid-page flash
 * before being snapped to the top.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
