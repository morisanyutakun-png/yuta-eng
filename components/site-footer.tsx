import Link from "next/link";

import { Container } from "@/components/container";
import { apps } from "@/data/apps";
import { navItems, siteConfig } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <Container className="py-10 sm:py-14">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link className="inline-flex items-center gap-3" href="/">
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-2xl bg-white text-slate-950"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path d="M5 4h2.6v12.4H17V19H5V4Z" fill="#0b1220" />
                  <circle cx="17.5" cy="6" r="2.4" fill="#fbbf24" />
                </svg>
              </span>
              <span>
                <span className="block font-serif text-[1.05rem] font-bold">
                  {siteConfig.name}
                </span>
                <span className="block text-[0.78rem] text-slate-400">
                  {siteConfig.brandTagline}
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-[0.88rem] leading-[1.85] text-slate-300">
              高校物理の理解、AI教材作成、学習支援アプリの設計を一本の動線でつなぐ EdTech スタジオです。すべての記事を無料で公開しています。
            </p>
          </div>

          <div>
            <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-slate-400">
              サイト
            </h2>
            <ul className="mt-3 space-y-2 text-[0.88rem] text-slate-300">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link className="transition hover:text-white" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-slate-400">
              関連アプリ
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
                    <span aria-hidden="true" className="ml-1 text-[0.7rem] text-slate-500">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-slate-400">
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
          <p>© {new Date().getFullYear()} {siteConfig.name} — All rights reserved.</p>
          <p className="text-slate-500">Built with Next.js · TypeScript · Tailwind CSS</p>
        </div>
      </Container>
    </footer>
  );
}
