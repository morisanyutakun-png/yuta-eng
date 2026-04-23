"use client";

import { Children, type ReactNode } from "react";

import { ScrollReveal } from "@/components/scroll-reveal";
import { cn } from "@/lib/utils";

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  step?: number;
};

export function StaggerReveal({
  children,
  className,
  itemClassName,
  step = 90,
}: StaggerRevealProps) {
  return (
    <div className={className}>
      {Children.toArray(children).map((child, index) => (
        <ScrollReveal
          className={cn("h-full", itemClassName)}
          delay={index * step}
          key={index}
          y={42}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}
