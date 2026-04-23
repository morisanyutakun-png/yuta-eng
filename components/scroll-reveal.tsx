"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type RevealStyle = CSSProperties & {
  "--reveal-delay": string;
  "--reveal-x": string;
  "--reveal-y": string;
};

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  x = 0,
  y = 34,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const style: RevealStyle = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-x": `${x}px`,
    "--reveal-y": `${y}px`,
  };

  return (
    <div
      className={cn("scroll-reveal", isVisible && "is-visible", className)}
      ref={elementRef}
      style={style}
    >
      {children}
    </div>
  );
}
