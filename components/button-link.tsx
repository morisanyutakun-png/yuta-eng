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
    "bg-slate-950 text-white shadow-[0_18px_40px_-22px_rgba(15,23,42,0.8)] hover:-translate-y-0.5 hover:bg-slate-800",
  secondary:
    "border border-slate-200 bg-white text-slate-950 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50",
  ghost:
    "text-slate-700 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-950",
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
    "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition",
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
