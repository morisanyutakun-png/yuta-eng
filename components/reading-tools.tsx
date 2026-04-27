"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mobile-first reading utilities for article pages:
 *  1. A slim reading-progress bar fixed to the very top of the viewport,
 *     showing how far into the article the reader has scrolled.
 *  2. A "back to top" pill that fades in once the reader is past ~30% of the
 *     page and disappears near the top — saves a lot of mobile scroll fatigue
 *     on long posts.
 *
 * Both are inert until the browser is idle to keep them off the LCP path.
 * Listeners are passive + rAF-throttled so they don't compete for the main
 * thread on slow Android devices.
 */
export function ReadingTools() {
  const barRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    // Defer mounting until after first paint so the article hero LCP isn't
    // blocked by mounting/measuring decorative chrome.
    const t = window.setTimeout(() => setMounted(true), 600);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let frame = 0;

    function update() {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        const y = window.scrollY;
        const progress = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0;
        barRef.current?.style.setProperty(
          "--reading-progress",
          progress.toString(),
        );
        setShowTop(y > window.innerHeight * 0.6);
      });
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [mounted]);

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior:
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
    });
  }

  if (!mounted) return null;

  return (
    <>
      <div
        aria-hidden="true"
        ref={barRef}
        className="reading-progress-bar"
      />

      <button
        type="button"
        aria-label="ページの先頭へ戻る"
        onClick={scrollTop}
        className={
          "fixed bottom-5 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0b1d4a] text-white shadow-[0_18px_40px_-18px_rgba(15,29,74,0.55)] ring-1 ring-white/10 transition duration-300 hover:bg-[#1d4ed8] sm:bottom-8 sm:right-8 sm:h-14 sm:w-14 " +
          (showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0")
        }
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
