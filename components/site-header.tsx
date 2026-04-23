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
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/88 backdrop-blur-xl">
      <Container className="relative py-2.5 sm:py-3">
        <div className="flex min-h-14 items-center justify-between gap-3 sm:min-h-16 sm:gap-5">
          <Link
            className="group inline-flex min-w-0 items-center gap-2.5 sm:gap-3"
            href="/"
            onClick={handleCloseMenu}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-2xl bg-slate-950 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 sm:size-10">
              YE
            </span>
            <span className="flex min-w-0 flex-col leading-none">
              <span className="truncate font-semibold tracking-[-0.03em] text-slate-950">
                {siteConfig.name}
              </span>
              <span className="mt-1 hidden text-xs text-slate-500 sm:block">
                Education / Physics / Web
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
                        "inline-flex min-h-11 items-center rounded-full px-3.5 py-2 transition",
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
            className="inline-flex min-h-11 items-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 md:hidden"
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
            className="rounded-3xl border border-slate-200 bg-white/95 p-2 shadow-[0_26px_65px_-45px_rgba(15,23,42,0.65)] backdrop-blur"
            id="mobile-global-navigation"
          >
            <ul className="grid gap-1">
              {navItems.map((item) => {
                const isCurrent = isActivePath(pathname, item.href);

                return (
                  <li key={item.href}>
                    <Link
                      className={cn(
                        "flex min-h-11 items-center justify-between rounded-2xl px-4 py-2 text-sm font-semibold transition",
                        isCurrent
                          ? "bg-slate-950 text-white"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
                      )}
                      href={item.href}
                      onClick={handleCloseMenu}
                    >
                      <span>{item.label}</span>
                      {isCurrent ? <span aria-hidden="true">●</span> : null}
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
