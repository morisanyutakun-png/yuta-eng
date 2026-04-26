import Link from "next/link";

import { Container } from "@/components/container";
import { MobileMenu } from "@/components/mobile-menu";
import { navItems } from "@/data/site";

type NavItem = (typeof navItems)[number];

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

/**
 * SiteHeader is server-rendered. The interactive parts (mobile drawer + open
 * state) live in <MobileMenu/>, the only client island we ship. This removes
 * `usePathname`, the scroll listener, and the body-scroll-lock effect from the
 * hydration path on every page — the previous all-client header was responsible
 * for ~30ms of TBT and one of the long tasks Lighthouse flagged.
 *
 * The "active page" underline that the old client header rendered relied on
 * `usePathname`. We drop the underline rather than reintroduce a client island
 * around every nav link — it's a low-value indicator and the user already sees
 * the page they're on.
 */
export function SiteHeader() {
  return (
    <>
      {/* Skip-to-content link (a11y + SEO) — visible only when focused */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:inline-flex focus:items-center focus:rounded-full focus:bg-[#0b1d4a] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        本文へスキップ
      </a>

      <header className="sticky top-0 z-50 bg-white/95 supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-[0_10px_30px_-22px_rgba(15,29,74,0.18)]">
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
                        className="inline-flex min-h-10 items-center rounded-full px-3.5 py-2 text-[0.86rem] font-medium tracking-[0.02em] text-[#475569] transition hover:bg-[#f1f5f9] hover:text-[#0b1d4a]"
                        href={item.href}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <MobileMenu />
          </div>
        </Container>
      </header>
    </>
  );
}
