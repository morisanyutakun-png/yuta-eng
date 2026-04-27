"use client";

import { useEffect } from "react";

type Props = { measurementId: string };

/**
 * Loads GA4 (gtag) only after the first user interaction or 8 s of idle time
 * — whichever comes first. The `<script>` is ~150 KB and Lighthouse repeatedly
 * flagged it as the largest source of "unused JavaScript" during initial page
 * load. By gating it behind real interaction we keep first-visit perf clean
 * while still capturing analytics for any user who actually engages.
 *
 * Why this and not `next/script` with `strategy="lazyOnload"`:
 *   • lazyOnload still queues the request right after `window.load`, so on
 *     slow 4G it still competes with LCP work and counts as "unused JS at
 *     LCP" in Lighthouse.
 *   • We delay strictly until either real interaction or a long idle window,
 *     which removes it from the LCP critical path entirely.
 */
export function GoogleAnalyticsLoader({ measurementId }: Props) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    let loaded = false;

    function load() {
      if (loaded) return;
      loaded = true;
      cleanup();

      // Initialize the dataLayer + gtag shim before the script arrives so any
      // queued events from this page replay correctly once GA boots.
      const w = window as unknown as {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
      };
      w.dataLayer = w.dataLayer || [];
      w.gtag =
        w.gtag ||
        function (...args: unknown[]) {
          (w.dataLayer as unknown[]).push(args);
        };
      w.gtag("js", new Date());
      w.gtag("config", measurementId, { send_page_view: true });

      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(s);
    }

    const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    function onInteraction() {
      load();
    }
    for (const e of events) {
      window.addEventListener(e, onInteraction, {
        once: true,
        passive: true,
        capture: true,
      });
    }
    // Hard fallback: if the user never interacts (e.g. SEO crawler-style
    // visit), still load GA after 8 s so analytics aren't completely missed.
    const timer = window.setTimeout(load, 8000);

    function cleanup() {
      window.clearTimeout(timer);
      for (const e of events) {
        window.removeEventListener(e, onInteraction, { capture: true });
      }
    }

    return cleanup;
  }, [measurementId]);

  return null;
}
