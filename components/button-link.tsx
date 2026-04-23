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
    "bg-slate-950 text-white shadow-[0_18px_46px_-22px_rgba(15,23,42,0.82)] hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-[0_24px_70px_-34px_rgba(14,165,233,0.75)]",
  secondary:
    "border border-white/80 bg-white/80 text-slate-950 shadow-[0_16px_45px_-36px_rgba(15,23,42,0.65)] backdrop-blur-xl hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white",
  ghost:
    "text-slate-700 hover:-translate-y-0.5 hover:bg-white/70 hover:text-slate-950",
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
    "inline-flex min-h-12 items-center justify-center rounded-full px-4 py-2.5 text-[0.92rem] font-semibold leading-none transition duration-300 sm:px-5 sm:text-sm",
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
