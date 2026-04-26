"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [scrolled, setScrolled] = useState(false);
  const isMenuOpen = openedAtPath === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  function handleToggleMenu() {
    setOpenedAtPath((prev) => (prev === pathname ? null : pathname));
  }

  function handleCloseMenu() {
    setOpenedAtPath(null);
  }

  return (
    <>
      {/* Skip-to-content link (a11y + SEO) — visible only when focused */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:inline-flex focus:items-center focus:rounded-full focus:bg-[#0b1d4a] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        本文へスキップ
      </a>

      <header
        className={cn(
          "sticky top-0 z-50 transition-[box-shadow,background-color,backdrop-filter] duration-300",
          scrolled
            ? "bg-white/92 shadow-[0_10px_30px_-22px_rgba(15,29,74,0.35)] supports-[backdrop-filter]:backdrop-blur-xl supports-[backdrop-filter]:bg-white/72"
            : "bg-white/95 supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:bg-white/80",
        )}
      >
        {/* Top hairline gradient — accent stripe */}
        <div
          aria-hidden="true"
          className="h-[2px] w-full bg-[linear-gradient(90deg,#1e3a8a_0%,#1d4ed8_28%,#38bdf8_55%,#0ea5e9_78%,#1e3a8a_100%)] opacity-90"
        />

        <Container className="relative">
          <div className="flex min-h-14 items-center justify-between gap-3 py-2 sm:min-h-[68px] sm:gap-5 sm:py-2.5">
            <Link
              className="group inline-flex min-w-0 items-center gap-2.5 sm:gap-3"
              href="/"
              onClick={handleCloseMenu}
              aria-label="Solvora ホームへ"
            >
              <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-white to-[#eef4ff] ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_6px_14px_-8px_rgba(15,29,74,0.45)] transition group-hover:shadow-[0_10px_20px_-10px_rgba(29,78,216,0.55)] sm:h-10 sm:w-10">
                <SolvoraLogo />
              </span>
              <span className="flex min-w-0 flex-col leading-none">
                <span className="truncate text-[1.18rem] font-extrabold tracking-[0.04em] text-[#0b1d4a] sm:text-[1.32rem]">
                  SOLVOR
                  <span className="relative">
                    A
                    <span
                      aria-hidden="true"
                      className="absolute -right-1 top-0 h-1 w-1 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#1d4ed8] shadow-[0_0_8px_rgba(56,189,248,0.7)]"
                    />
                  </span>
                </span>
                <span className="mt-1 hidden text-[0.6rem] font-semibold tracking-[0.32em] text-transparent bg-clip-text bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] sm:block">
                  SCIENCE LEARNING HUB
                </span>
              </span>
            </Link>

            <nav aria-label="Global navigation" className="hidden md:block">
              <ul className="flex flex-wrap items-center justify-end gap-0.5">
                {navItems.map((item) => {
                  const external = isExternal(item);
                  const highlight = isHighlight(item);
                  const isCurrent = isActivePath(pathname, item.href);

                  if (external && highlight) {
                    return (
                      <li className="ml-2" key={item.href}>
                        <a
                          className="group/cta relative inline-flex min-h-10 items-center gap-1.5 overflow-hidden rounded-full px-4 py-1.5 text-[0.84rem] font-semibold tracking-[0.04em] text-white shadow-[0_8px_18px_-10px_rgba(15,29,74,0.7)] transition hover:-translate-y-px hover:shadow-[0_12px_24px_-10px_rgba(29,78,216,0.7)]"
                          href={item.href}
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-[linear-gradient(135deg,#0b1d4a_0%,#1e3a8a_55%,#1d4ed8_100%)]"
                          />
                          <span
                            aria-hidden="true"
                            className="absolute -inset-x-1 -inset-y-1 -translate-x-full bg-[linear-gradient(110deg,transparent_30%,rgba(186,230,253,0.45)_50%,transparent_70%)] transition duration-700 group-hover/cta:translate-x-full"
                          />
                          <span className="relative z-10">{item.label}</span>
                          <span aria-hidden="true" className="relative z-10 text-[0.7rem]">
                            ↗
                          </span>
                        </a>
                      </li>
                    );
                  }

                  if (external) {
                    return (
                      <li key={item.href}>
                        <a
                          className="inline-flex min-h-10 items-center rounded-full px-3.5 py-2 text-[0.86rem] font-medium tracking-[0.02em] text-[#475569] transition hover:bg-[#f1f5f9] hover:text-[#0b1d4a]"
                          href={item.href}
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          {item.label}
                          <span aria-hidden="true" className="ml-1 text-[0.7rem] text-[#94a3b8]">
                            ↗
                          </span>
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={item.href}>
                      <Link
                        aria-current={isCurrent ? "page" : undefined}
                        className={cn(
                          "relative inline-flex min-h-10 items-center rounded-full px-3.5 py-2 text-[0.86rem] font-medium tracking-[0.02em] transition",
                          isCurrent
                            ? "text-[#0b1d4a]"
                            : "text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0b1d4a]",
                        )}
                        href={item.href}
                      >
                        {item.label}
                        {isCurrent ? (
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-3.5 -bottom-px h-[2px] rounded-full bg-[linear-gradient(90deg,#1e3a8a,#1d4ed8,#38bdf8)]"
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
              aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
              className="inline-flex min-h-10 min-w-10 items-center justify-center gap-2 rounded-full border border-[rgba(15,29,74,0.12)] bg-white/90 px-3 text-[0.78rem] font-bold tracking-[0.08em] text-[#0b1d4a] shadow-[0_4px_10px_-6px_rgba(15,29,74,0.3)] transition hover:border-[rgba(29,78,216,0.45)] hover:shadow-[0_8px_18px_-8px_rgba(29,78,216,0.45)] md:hidden"
              onClick={handleToggleMenu}
              type="button"
            >
              <span
                aria-hidden="true"
                className="relative inline-flex h-3 w-4 flex-col items-end justify-between"
              >
                <span
                  className={cn(
                    "h-[2px] rounded-full bg-[#0b1d4a] transition-all duration-300",
                    isMenuOpen ? "w-4 translate-y-[5px] rotate-45" : "w-4",
                  )}
                />
                <span
                  className={cn(
                    "h-[2px] rounded-full bg-[#0b1d4a] transition-all duration-200",
                    isMenuOpen ? "w-0 opacity-0" : "w-3 opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "h-[2px] rounded-full bg-[#0b1d4a] transition-all duration-300",
                    isMenuOpen ? "w-4 -translate-y-[5px] -rotate-45" : "w-4",
                  )}
                />
              </span>
              <span>{isMenuOpen ? "閉じる" : "メニュー"}</span>
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile drawer — outside <header> for clean overlay z-stack.
          Use `inert` instead of `aria-hidden` so the closed drawer's
          focusable links/buttons are removed from the focus order entirely.
          (`aria-hidden` on a container with focusable children is a known a11y
          violation; `inert` is the modern replacement and well supported.) */}
      <div
        inert={!isMenuOpen}
        className={cn(
          "fixed inset-0 z-40 transition duration-300 md:hidden",
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <button
          type="button"
          aria-label="メニュー外をタップして閉じる"
          onClick={handleCloseMenu}
          className="absolute inset-0 bg-[rgba(15,29,74,0.45)] backdrop-blur-sm"
        />
        <nav
          aria-label="Mobile global navigation"
          className={cn(
            "absolute inset-x-3 top-[calc(env(safe-area-inset-top,0px)+62px)] overflow-hidden rounded-[20px] bg-white shadow-[0_30px_70px_-30px_rgba(15,29,74,0.6)] ring-1 ring-[rgba(15,29,74,0.08)] transition duration-300",
            isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
          )}
          id="mobile-global-navigation"
        >
          <div
            aria-hidden="true"
            className="h-[3px] w-full bg-[linear-gradient(90deg,#1e3a8a,#1d4ed8,#38bdf8)]"
          />
          <ul className="grid gap-1 p-3">
            {navItems.map((item) => {
              const external = isExternal(item);
              const highlight = isHighlight(item);
              const isCurrent = isActivePath(pathname, item.href);

              if (external && highlight) {
                return (
                  <li key={item.href}>
                    <a
                      className="relative flex min-h-12 items-center justify-between gap-3 overflow-hidden rounded-[14px] px-4 py-3 text-white shadow-[0_10px_22px_-12px_rgba(15,29,74,0.6)]"
                      href={item.href}
                      rel="noreferrer noopener"
                      target="_blank"
                      onClick={handleCloseMenu}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-[linear-gradient(135deg,#0b1d4a_0%,#1e3a8a_55%,#1d4ed8_100%)]"
                      />
                      <span className="relative flex flex-col">
                        <span className="text-[0.96rem] font-bold tracking-[0.02em]">
                          {item.label}
                        </span>
                        <span className="text-[0.66rem] font-medium tracking-[0.18em] text-[#bae6fd]">
                          外部サイトへ移動
                        </span>
                      </span>
                      <span aria-hidden="true" className="relative text-[#bae6fd]">↗</span>
                    </a>
                  </li>
                );
              }

              if (external) {
                return (
                  <li key={item.href}>
                    <a
                      className="flex min-h-12 items-center justify-between gap-3 rounded-[12px] px-4 py-3 text-[#0b1d4a] transition hover:bg-[#f1f5f9]"
                      href={item.href}
                      rel="noreferrer noopener"
                      target="_blank"
                      onClick={handleCloseMenu}
                    >
                      <span className="flex flex-col">
                        <span className="text-[0.96rem] font-semibold tracking-[0.02em]">
                          {item.label}
                        </span>
                        <span className="text-[0.66rem] font-medium tracking-[0.18em] text-[#94a3b8]">
                          外部サイトへ移動
                        </span>
                      </span>
                      <span aria-hidden="true" className="text-[#94a3b8]">↗</span>
                    </a>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    aria-current={isCurrent ? "page" : undefined}
                    className={cn(
                      "flex min-h-12 items-center justify-between gap-3 rounded-[12px] px-4 py-3 text-[0.96rem] font-semibold tracking-[0.02em] transition",
                      isCurrent
                        ? "bg-[linear-gradient(135deg,#eef4ff,#dbeafe)] text-[#0b1d4a] ring-1 ring-[rgba(29,78,216,0.2)]"
                        : "text-[#0b1d4a] hover:bg-[#f8fafc]",
                    )}
                    href={item.href}
                    onClick={handleCloseMenu}
                  >
                    <span className="flex items-center gap-2">
                      {isCurrent ? (
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#1d4ed8] to-[#38bdf8]"
                        />
                      ) : null}
                      <span>{item.label}</span>
                    </span>
                    <span aria-hidden="true" className={isCurrent ? "text-[#1d4ed8]" : "text-[#94a3b8]"}>
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
