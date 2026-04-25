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
    <footer
      className="relative border-t bg-[#0f1c3a] text-white"
      style={{ borderTopColor: "var(--accent-warm)", borderTopWidth: "3px" }}
    >
      {/* Hub-wide CTA band */}
      <div
        className="border-b border-white/10"
        style={{
          background:
            "radial-gradient(circle at 95% 0%, rgba(200,146,17,0.18), transparent 45%)",
        }}
      >
        <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:py-8">
          <div>
            <p className="font-serif text-[0.7rem] font-bold tracking-[0.24em] text-[#f5d68a]">
              LUMORA × 物理の森｜物理専門塾事業
            </p>
            <p className="mt-1.5 font-serif text-[1rem] font-bold leading-[1.6] text-white sm:text-[1.08rem]">
              高校物理の受講相談は、Lumora が運営する「物理の森」から。
            </p>
          </div>
          <a
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-sm bg-[var(--accent-warm)] px-5 py-3 font-serif text-[0.9rem] font-bold tracking-[0.06em] text-[#1a1a1a] transition hover:-translate-y-0.5 hover:bg-[#dca424]"
            href={siteConfig.physicsSchoolUrl}
            rel="noreferrer noopener"
            target="_blank"
          >
            物理の森（物理塾）を開く
            <span aria-hidden="true">↗</span>
          </a>
        </Container>
      </div>

      <Container className="py-10 sm:py-14">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link className="inline-flex items-center gap-3" href="/">
              <span
                aria-hidden="true"
                className="grid size-11 place-items-center rounded-sm bg-white text-slate-950"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(200,146,17,0.5)",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path d="M5 4h2.6v12.4H17V19H5V4Z" fill="#0f1c3a" />
                  <circle cx="17.5" cy="6" r="2.4" fill="#c89211" />
                </svg>
              </span>
              <span>
                <span className="block font-serif text-[1.18rem] font-bold tracking-[0.05em]">
                  {siteConfig.name}
                </span>
                <span className="mt-0.5 block font-serif text-[0.74rem] tracking-[0.18em] text-[#f5d68a]">
                  {siteConfig.brandTagline}
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm font-serif text-[0.9rem] leading-[2] text-slate-300">
              Lumora（ルモラ）は、物理専門塾「物理の森」、教材作成アプリ Eddivom、IT 学習アプリ IT Pass などの公式入口を集約する学習ハブブランドです。すべての記事は無料で公開しています。
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[0.78rem] font-bold uppercase tracking-[0.22em] text-[#f5d68a]">
              ハブ内ページ
            </h2>
            <ul className="mt-3 space-y-2 text-[0.88rem] text-slate-300">
              {navItems.map((item) => {
                const external = isExternalNav(item);
                if (external) {
                  return (
                    <li key={item.href}>
                      <a
                        className="transition hover:text-white"
                        href={item.href}
                        rel="noreferrer noopener"
                        target="_blank"
                      >
                        {item.label}
                        <span aria-hidden="true" className="ml-1 text-[0.7rem] text-[#f5d68a]">
                          ↗
                        </span>
                      </a>
                    </li>
                  );
                }
                return (
                  <li key={item.href}>
                    <Link className="transition hover:text-white" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-[0.78rem] font-bold uppercase tracking-[0.22em] text-[#f5d68a]">
              公式サービス
            </h2>
            <ul className="mt-3 space-y-2 text-[0.88rem] text-slate-300">
              {apps.map((app) => (
                <li key={app.href}>
                  <a
                    className="transition hover:text-white"
                    href={app.href}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    {app.name}
                    <span aria-hidden="true" className="ml-1 text-[0.7rem] text-[#f5d68a]">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-[0.78rem] font-bold uppercase tracking-[0.22em] text-[#f5d68a]">
              連絡先
            </h2>
            <ul className="mt-3 space-y-2 text-[0.88rem] text-slate-300">
              <li>
                <a
                  className="transition hover:text-white"
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <Link className="transition hover:text-white" href="/contact">
                  相談ページへ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-5 text-[0.8rem] text-slate-400 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name} — Learning Hub</p>
          <p className="text-slate-500">Built with Next.js · TypeScript · Tailwind CSS</p>
        </div>
      </Container>
    </footer>
  );
}
