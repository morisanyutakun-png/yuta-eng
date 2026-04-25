import Link from "next/link";

import { Container } from "@/components/container";
import { apps } from "@/data/apps";
import { navItems, siteConfig } from "@/data/site";

type NavItem = (typeof navItems)[number];

function isExternalNav(item: NavItem): boolean {
  return Boolean((item as { external?: boolean }).external);
}

export function SiteFooter() {
  return (
    <footer className="bg-[#f8fafc] text-[#334155]">
      <Container className="px-6 py-16 sm:py-20">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link className="inline-flex items-center gap-3" href="/">
              <img
                alt="Solvora"
                src="/brand/solvora-mark.svg"
                width={120}
                height={120}
                loading="lazy"
                decoding="async"
                className="h-10 w-10"
              />
              <span>
                <span className="block text-[1.2rem] font-extrabold tracking-[0.04em] text-[#0b1d4a]">
                  SOLVORA
                </span>
                <span className="mt-0.5 block text-[0.66rem] font-semibold tracking-[0.28em] text-[#1d4ed8]">
                  SCIENCE LEARNING HUB
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-[0.9rem] leading-[1.95] text-[#475569]">
              理系の学びを深めるための記事と、専門サービスをまとめるサイトです。
            </p>
          </div>

          <div>
            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#0b1d4a]">
              ページ
            </h2>
            <ul className="mt-4 space-y-2 text-[0.88rem]">
              {navItems.map((item) => {
                const external = isExternalNav(item);
                if (external) {
                  return (
                    <li key={item.href}>
                      <a
                        className="text-[#475569] transition hover:text-[#0b1d4a]"
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
                      className="text-[#475569] transition hover:text-[#0b1d4a]"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#0b1d4a]">
              サービス
            </h2>
            <ul className="mt-4 space-y-2 text-[0.88rem]">
              {apps.map((app) => (
                <li key={app.href}>
                  <a
                    className="text-[#475569] transition hover:text-[#0b1d4a]"
                    href={app.href}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    {app.name}
                    <span aria-hidden="true" className="ml-1 text-[0.7rem]">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#0b1d4a]">
              連絡先
            </h2>
            <ul className="mt-4 space-y-2 text-[0.88rem]">
              <li>
                <a
                  className="text-[#475569] transition hover:text-[#0b1d4a]"
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <Link
                  className="text-[#475569] transition hover:text-[#0b1d4a]"
                  href="/contact"
                >
                  相談ページ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[rgba(15,29,74,0.1)] pt-6 text-[0.8rem] text-[#94a3b8] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}</p>
          <p>Built with Next.js · TypeScript · Tailwind CSS</p>
        </div>
      </Container>
    </footer>
  );
}
