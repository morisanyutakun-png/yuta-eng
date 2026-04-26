"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { navItems } from "@/data/site";
import { cn } from "@/lib/utils";

type NavItem = (typeof navItems)[number];

function isExternal(item: NavItem): boolean {
  return Boolean((item as { external?: boolean }).external);
}

function isHighlight(item: NavItem): boolean {
  return Boolean((item as { highlight?: boolean }).highlight);
}

/**
 * Small client island for the mobile drawer. Hydrates only the hamburger
 * button and the panel; the rest of the header is server-rendered. The
 * drawer's DOM only mounts when the menu is opened the first time, so cold
 * loads don't pay for it (saves a chunk of TBT and DOM nodes).
 */
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function toggle() {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) setHasOpenedOnce(true);
      return next;
    });
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        aria-controls="mobile-global-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        className="inline-flex min-h-10 min-w-10 items-center justify-center gap-2 rounded-full border border-[rgba(15,29,74,0.12)] bg-white/90 px-3 text-[0.78rem] font-bold tracking-[0.08em] text-[#0b1d4a] shadow-[0_4px_10px_-6px_rgba(15,29,74,0.3)] transition hover:border-[rgba(29,78,216,0.45)] hover:shadow-[0_8px_18px_-8px_rgba(29,78,216,0.45)] md:hidden"
        onClick={toggle}
        type="button"
      >
        <span
          aria-hidden="true"
          className="relative inline-flex h-3 w-4 flex-col items-end justify-between"
        >
          <span
            className={cn(
              "h-[2px] rounded-full bg-[#0b1d4a] transition-all duration-300",
              isOpen ? "w-4 translate-y-[5px] rotate-45" : "w-4",
            )}
          />
          <span
            className={cn(
              "h-[2px] rounded-full bg-[#0b1d4a] transition-all duration-200",
              isOpen ? "w-0 opacity-0" : "w-3 opacity-100",
            )}
          />
          <span
            className={cn(
              "h-[2px] rounded-full bg-[#0b1d4a] transition-all duration-300",
              isOpen ? "w-4 -translate-y-[5px] -rotate-45" : "w-4",
            )}
          />
        </span>
        <span>{isOpen ? "閉じる" : "メニュー"}</span>
      </button>

      {/* Drawer is mounted only after the first open — keeps the closed-page
          DOM small and skips the rendering work entirely on cold visits. */}
      {hasOpenedOnce ? (
        <div
          inert={!isOpen}
          className={cn(
            "fixed inset-0 z-40 transition duration-300 md:hidden",
            isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <button
            type="button"
            aria-label="メニュー外をタップして閉じる"
            onClick={close}
            className="absolute inset-0 bg-[rgba(15,29,74,0.45)] backdrop-blur-sm"
          />
          <nav
            aria-label="Mobile global navigation"
            className={cn(
              "absolute inset-x-3 top-[calc(env(safe-area-inset-top,0px)+62px)] overflow-hidden rounded-[20px] bg-white shadow-[0_30px_70px_-30px_rgba(15,29,74,0.6)] ring-1 ring-[rgba(15,29,74,0.08)] transition duration-300",
              isOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
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

                if (external && highlight) {
                  return (
                    <li key={item.href}>
                      <a
                        className="relative flex min-h-12 items-center justify-between gap-3 overflow-hidden rounded-[14px] px-4 py-3 text-white shadow-[0_10px_22px_-12px_rgba(15,29,74,0.6)]"
                        href={item.href}
                        rel="noreferrer noopener"
                        target="_blank"
                        onClick={close}
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
                        onClick={close}
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
                      className="flex min-h-12 items-center justify-between gap-3 rounded-[12px] px-4 py-3 text-[0.96rem] font-semibold tracking-[0.02em] text-[#0b1d4a] transition hover:bg-[#f8fafc]"
                      href={item.href}
                      onClick={close}
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true" className="text-[#94a3b8]">→</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}
