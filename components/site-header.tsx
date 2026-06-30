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

/**
 * Brand lockup — the official Nobit Study logo (full lockup incl. 中高部 badge
 * + Nobit Study sub-label). Served as optimized AVIF/WebP; the header logo is
 * a likely LCP element so it loads with high priority.
 */
export function NobitBrand() {
  return (
    <Link
      className="group inline-flex min-w-0 items-center"
      href="/"
      aria-label="ノビットスタディ 中高部 ホームへ"
    >
      <picture>
        <source
          type="image/avif"
          srcSet="/brand/nobit-logo-480.avif 480w, /brand/nobit-logo-960.avif 960w"
          sizes="200px"
        />
        <source
          type="image/webp"
          srcSet="/brand/nobit-logo-480.webp 480w, /brand/nobit-logo-960.webp 960w"
          sizes="200px"
        />
        <img
          alt="ノビットスタディ 中高部"
          src="/brand/nobit-logo-480.webp"
          width={1970}
          height={375}
          decoding="async"
          fetchPriority="high"
          className="h-8 w-auto sm:h-9"
        />
      </picture>
    </Link>
  );
}

/**
 * SiteHeader is server-rendered. The interactive parts (mobile drawer + open
 * state) live in <MobileMenu/>, the only client island we ship.
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
        {/* The brand top stripe now lives in the global scroll-progress bar
            (app/layout.tsx) so it doubles as a reading-progress indicator. */}
        <Container className="relative">
          <div className="flex min-h-14 items-center justify-between gap-3 py-2 sm:min-h-[68px] sm:gap-5 sm:py-2.5">
            <NobitBrand />

            <nav aria-label="Global navigation" className="hidden md:block">
              <ul className="flex flex-wrap items-center justify-end gap-0.5">
                {navItems.map((item) => {
                  const external = isExternal(item);
                  const highlight = isHighlight(item);

                  if (highlight) {
                    return (
                      <li className="ml-2" key={item.href}>
                        <Link
                          className="group/cta relative inline-flex min-h-10 items-center gap-1.5 overflow-hidden rounded-full px-5 py-1.5 text-[0.84rem] font-bold tracking-[0.02em] text-white shadow-[0_8px_18px_-10px_rgba(234,88,12,0.8)] transition hover:-translate-y-px hover:shadow-[0_12px_24px_-10px_rgba(234,88,12,0.8)]"
                          href={item.href}
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-[linear-gradient(135deg,#f97316_0%,#ea580c_100%)]"
                          />
                          <span
                            aria-hidden="true"
                            className="absolute -inset-x-1 -inset-y-1 -translate-x-full bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.45)_50%,transparent_70%)] transition duration-700 group-hover/cta:translate-x-full"
                          />
                          <span className="relative z-10">{item.label}</span>
                          <span aria-hidden="true" className="relative z-10 text-[0.7rem]">
                            →
                          </span>
                        </Link>
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
