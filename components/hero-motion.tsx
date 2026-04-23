"use client";

import type { PropsWithChildren } from "react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type HeroMotionProps = PropsWithChildren<{
  className?: string;
}>;

export function HeroMotion({ children, className }: HeroMotionProps) {
  const stageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const stageElement = stageRef.current as HTMLElement | null;

    if (!stageElement) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const isCompactViewport = window.matchMedia("(max-width: 1023px)").matches;

    if (prefersReducedMotion || isTouchDevice || isCompactViewport) {
      stageElement.style.setProperty("--pointer-x", "0");
      stageElement.style.setProperty("--pointer-y", "0");
      stageElement.style.setProperty("--scroll-depth", "0");
      return;
    }

    let pointerX = 0;
    let pointerY = 0;
    let scrollDepth = 0;
    let animationFrame = 0;

    function commitMotion() {
      animationFrame = 0;
      stageElement!.style.setProperty("--pointer-x", pointerX.toFixed(3));
      stageElement!.style.setProperty("--pointer-y", pointerY.toFixed(3));
      stageElement!.style.setProperty("--scroll-depth", scrollDepth.toFixed(3));
    }

    function scheduleMotion() {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(commitMotion);
      }
    }

    function handlePointerMove(event: PointerEvent) {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
      scheduleMotion();
    }

    function handleScroll() {
      scrollDepth = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
      scheduleMotion();
    }

    handleScroll();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <section className={cn("motion-stage", className)} ref={stageRef}>
      {children}
    </section>
  );
}
