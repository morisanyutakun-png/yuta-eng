"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer mount until the browser is idle so we don't compete with LCP
    // paint on slow devices. The scroll bar is decorative; rendering it 1
    // frame later has no visible cost.
    const t = window.setTimeout(() => setMounted(true), 800);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let animationFrame = 0;

    function updateProgress() {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress =
          scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
        progressRef.current?.style.setProperty(
          "--scroll-progress",
          progress.toString(),
        );
      });
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [mounted]);

  if (!mounted) return null;
  return <div aria-hidden="true" className="scroll-progress" ref={progressRef} />;
}
