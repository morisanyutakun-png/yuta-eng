"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Container } from "@/components/container";
import { navItems, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function LumoraLogo() {
  return (
    <span
      aria-hidden="true"
      className="grid size-9 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-slate-950 to-sky-900 text-white shadow-lg shadow-slate-900/20 sm:size-10"
    >
      <svg
        className="h-5 w-5 sm:h-[1.4rem] sm:w-[1.4rem]"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5 4h2.6v12.4H17V19H5V4Z" fill="#f8fafc" />
        <circle cx="17.5" cy="6" r="2.4" fill="#fbbf24" />
      </svg>
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [openedAtPath, setOpenedAtPath] = useState<string | null>(null);
  const isMenuOpen = openedAtPath === pathname;

  function handleToggleMenu() {
    setOpenedAtPath((prev) => (prev === pathname ? null : pathname));
  }

  function handleCloseMenu() {
    setOpenedAtPath(null);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <Container className="relative py-2 sm:py-3">
        <div className="flex min-h-13 items-center justify-between gap-3 sm:min-h-16 sm:gap-5">
          <Link
            className="group inline-flex min-w-0 items-center gap-2.5 sm:gap-3"
            href="/"
            onClick={handleCloseMenu}
          >
            <LumoraLogo />
            <span className="flex min-w-0 flex-col leading-none">
              <span className="truncate font-serif text-[1.05rem] font-bold tracking-[-0.01em] text-slate-950 sm:text-[1.15rem]">
                {siteConfig.name}
              </span>
              <span className="mt-1 hidden text-[0.7rem] font-medium text-slate-500 sm:block">
                {siteConfig.brandTagline}
              </span>
            </span>
          </Link>

          <nav aria-label="Global navigation" className="hidden md:block">
            <ul className="flex flex-wrap items-center justify-end gap-1 text-sm font-medium text-slate-600">
              {navItems.map((item) => {
                const isCurrent = isActivePath(pathname, item.href);

                return (
                  <li key={item.href}>
                    <Link
                      className={cn(
                        "inline-flex min-h-10 items-center rounded-full px-3.5 py-2 text-[0.88rem] font-semibold transition",
                        isCurrent
                          ? "bg-slate-950 text-white"
                          : "hover:bg-slate-100 hover:text-slate-950",
                      )}
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            aria-controls="mobile-global-navigation"
            aria-expanded={isMenuOpen}
            aria-label="メニューを開閉"
            className="inline-flex min-h-10 items-center rounded-full border border-slate-200 bg-white px-3.5 text-[0.82rem] font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 md:hidden"
            onClick={handleToggleMenu}
            type="button"
          >
            {isMenuOpen ? "閉じる" : "メニュー"}
          </button>
        </div>

        <div
          className={cn(
            "absolute inset-x-0 top-full px-4 pb-3 pt-2 transition duration-200 md:hidden",
            isMenuOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0",
          )}
        >
          <nav
            aria-label="Mobile global navigation"
            className="rounded-3xl border border-slate-200 bg-white/97 p-2 shadow-[0_26px_65px_-45px_rgba(15,23,42,0.65)] backdrop-blur"
            id="mobile-global-navigation"
          >
            <ul className="grid gap-1">
              {navItems.map((item) => {
                const isCurrent = isActivePath(pathname, item.href);

                return (
                  <li key={item.href}>
                    <Link
                      className={cn(
                        "flex min-h-12 items-center justify-between rounded-2xl px-4 py-2.5 text-[0.92rem] font-bold transition",
                        isCurrent
                          ? "bg-slate-950 text-white"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
                      )}
                      href={item.href}
                      onClick={handleCloseMenu}
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true" className={isCurrent ? "text-amber-300" : "text-slate-400"}>
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
