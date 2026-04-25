import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
};

const variants = {
  primary:
    "bg-[#0f1c3a] text-white shadow-[0_14px_30px_-18px_rgba(15,23,42,0.65)] hover:-translate-y-0.5 hover:bg-[#1f3a6b] hover:shadow-[0_20px_44px_-22px_rgba(15,23,42,0.7)]",
  secondary:
    "border border-[var(--line)] bg-white text-[var(--ink)] hover:-translate-y-0.5 hover:border-[var(--accent-deep)] hover:bg-[#faf6ec]",
  ghost:
    "text-[var(--ink-soft)] hover:-translate-y-0.5 hover:bg-white hover:text-[var(--ink)]",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external,
}: ButtonLinkProps) {
  const isExternal = external ?? href.startsWith("http");
  const sharedClassName = cn(
    "inline-flex min-h-12 items-center justify-center rounded-sm px-5 py-2.5 font-serif text-[0.92rem] font-bold leading-none tracking-[0.06em] transition duration-300 sm:px-6 sm:text-sm",
    variants[variant],
    className,
  );

  if (isExternal) {
    return (
      <a
        className={sharedClassName}
        href={href}
        rel="noreferrer noopener"
        target="_blank"
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={sharedClassName} href={href}>
      {children}
    </Link>
  );
}
