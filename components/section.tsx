import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { ScrollReveal } from "@/components/scroll-reveal";
import { cn } from "@/lib/utils";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  headerAction?: ReactNode;
};

export function Section({
  eyebrow,
  title,
  description,
  children,
  headerAction,
  className,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-14 sm:py-20 lg:py-24", className)} {...props}>
      {(eyebrow || title || description || headerAction) && (
        <ScrollReveal className="mb-8 sm:mb-10 md:mb-12" y={30}>
          <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              {eyebrow ? (
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-3xl md:text-4xl">
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:mt-4 sm:text-base sm:leading-8 md:text-lg">
                  {description}
                </p>
              ) : null}
            </div>
            {headerAction ? (
              <div className="w-full shrink-0 sm:w-auto">{headerAction}</div>
            ) : null}
          </div>
        </ScrollReveal>
      )}
      <ScrollReveal delay={80} y={38}>
        {children}
      </ScrollReveal>
    </section>
  );
}
