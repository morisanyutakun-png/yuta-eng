"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Container } from "@/components/container";
import { navItems } from "@/data/site";
import { cn } from "@/lib/utils";

type NavItem = (typeof navItems)[number];

function isActivePath(pathname: string, href: string) {
  if (href.startsWith("http")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isExternal(item: NavItem): boolean {
  return Boolean((item as { external?: boolean }).external);
}

function isHighlight(item: NavItem): boolean {
  return Boolean((item as { highlight?: boolean }).highlight);
}

function SolvoraLogo() {
  return (
    // SVG served directly — no /_next/image overhead (vector is already optimal).
    <img
      alt="Solvora"
      src="/brand/solvora-mark.svg"
      width={120}
      height={120}
      decoding="async"
      fetchPriority="high"
      className="h-9 w-9 sm:h-10 sm:w-10"
    />
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
    <header
      className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl"
      style={{ borderBottom: "1px solid rgba(15,29,74,0.08)" }}
    >
      <Container className="relative py-2 sm:py-3">
        <div className="flex min-h-13 items-center justify-between gap-3 sm:min-h-16 sm:gap-5">
          <Link
            className="group inline-flex min-w-0 items-center gap-2.5 sm:gap-3"
            href="/"
            onClick={handleCloseMenu}
          >
            <SolvoraLogo />
            <span className="flex min-w-0 flex-col leading-none">
              <span className="truncate text-[1.25rem] font-extrabold tracking-[0.04em] text-[#0b1d4a] sm:text-[1.4rem]">
                SOLVOR<span className="relative">A<span aria-hidden="true" className="absolute -right-1 top-0 h-1 w-1 rounded-full bg-[#38bdf8]" /></span>
              </span>
              <span className="mt-1 hidden text-[0.62rem] font-semibold tracking-[0.32em] text-[#1d4ed8] sm:block">
                SCIENCE LEARNING HUB
              </span>
            </span>
          </Link>

          <nav aria-label="Global navigation" className="hidden md:block">
            <ul className="flex flex-wrap items-center justify-end gap-1">
              {navItems.map((item) => {
                const external = isExternal(item);
                const highlight = isHighlight(item);
                const isCurrent = isActivePath(pathname, item.href);

                if (external && highlight) {
                  return (
                    <li className="ml-2" key={item.href}>
                      <a
                        className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-[#0b1d4a] px-4 py-1.5 text-[0.84rem] font-semibold tracking-[0.04em] text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white"
                        href={item.href}
                        rel="noreferrer noopener"
                        target="_blank"
                      >
                        {item.label}
                        <span aria-hidden="true" className="text-[0.7rem]">↗</span>
                      </a>
                    </li>
                  );
                }

                if (external) {
                  return (
                    <li key={item.href}>
                      <a
                        className="inline-flex min-h-10 items-center px-3.5 py-2 text-[0.86rem] font-medium tracking-[0.02em] text-[#475569] transition hover:text-[#0b1d4a]"
                        href={item.href}
                        rel="noreferrer noopener"
                        target="_blank"
                      >
                        {item.label}
                        <span aria-hidden="true" className="ml-1 text-[0.7rem]">↗</span>
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link
                      className={cn(
                        "relative inline-flex min-h-10 items-center px-3.5 py-2 text-[0.86rem] font-medium tracking-[0.02em] transition",
                        isCurrent ? "text-[#0b1d4a]" : "text-[#475569] hover:text-[#0b1d4a]",
                      )}
                      href={item.href}
                    >
                      {item.label}
                      {isCurrent ? (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-3.5 -bottom-0.5 h-0.5 bg-[#0b1d4a]"
                        />
                      ) : null}
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
            className="inline-flex min-h-10 items-center rounded-sm border border-[var(--line)] bg-white px-3.5 font-serif text-[0.82rem] font-bold tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--accent-deep)] md:hidden"
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
            className="rounded-sm border border-[var(--line)] bg-white p-2 shadow-[0_26px_65px_-45px_rgba(15,23,42,0.5)]"
            id="mobile-global-navigation"
            style={{ borderTop: "3px solid var(--accent-deep)" }}
          >
            <ul className="grid gap-1">
              {navItems.map((item) => {
                const external = isExternal(item);
                const highlight = isHighlight(item);
                const isCurrent = isActivePath(pathname, item.href);

                const sharedRow = (
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="font-serif text-[0.95rem] font-bold tracking-[0.06em]">
                      {item.label}
                    </span>
                    {external ? (
                      <span className="font-serif text-[0.68rem] tracking-[0.14em] text-[var(--ink-soft)]">
                        外部サイトへ移動
                      </span>
                    ) : null}
                  </span>
                );

                if (external && highlight) {
                  return (
                    <li key={item.href}>
                      <a
                        className="flex min-h-12 items-center gap-3 rounded-sm bg-[var(--accent-deep)] px-4 py-2.5 text-white transition hover:bg-[#16305c]"
                        href={item.href}
                        rel="noreferrer noopener"
                        target="_blank"
                        onClick={handleCloseMenu}
                      >
                        {sharedRow}
                        <span aria-hidden="true" className="text-[#f5d68a]">↗</span>
                      </a>
                    </li>
                  );
                }

                if (external) {
                  return (
                    <li key={item.href}>
                      <a
                        className="flex min-h-12 items-center gap-3 rounded-sm px-4 py-2.5 text-[var(--ink)] transition hover:bg-[#faf6ec]"
                        href={item.href}
                        rel="noreferrer noopener"
                        target="_blank"
                        onClick={handleCloseMenu}
                      >
                        {sharedRow}
                        <span aria-hidden="true" className="text-[var(--ink-soft)]">↗</span>
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link
                      className={cn(
                        "flex min-h-12 items-center justify-between rounded-sm px-4 py-2.5 font-serif text-[0.95rem] font-bold tracking-[0.06em] transition",
                        isCurrent
                          ? "bg-[#faf6ec] text-[var(--accent-deep)]"
                          : "text-[var(--ink)] hover:bg-[#faf6ec]",
                      )}
                      href={item.href}
                      onClick={handleCloseMenu}
                    >
                      <span>{item.label}</span>
                      <span
                        aria-hidden="true"
                        className={isCurrent ? "text-[var(--accent-warm)]" : "text-[var(--ink-soft)]"}
                      >
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
