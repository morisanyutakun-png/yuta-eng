import Link from "next/link";

import { Container } from "@/components/container";
import { apps } from "@/data/apps";
import { footerSocialLinks, navItems, siteConfig } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link className="inline-flex items-center gap-3" href="/">
              <span className="grid size-10 place-items-center rounded-2xl bg-white text-sm font-semibold text-slate-950">
                YE
              </span>
              <span>
                <span className="block font-semibold">{siteConfig.name}</span>
                <span className="block text-sm text-slate-400">
                  Official hub for learning tools and essays.
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
              教育、物理、LaTeX、教材制作、学習支援Webアプリをつなぐ公式サイトです。
              ブログと既存アプリへの導線を通じて、学びの設計を発信します。
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Site</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
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
            <h2 className="text-sm font-semibold text-white">Apps</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {apps.map((app) => (
                <li key={app.href}>
                  <a
                    className="transition hover:text-white"
                    href={app.href}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    {app.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Links</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {footerSocialLinks.map((link) => (
                <li key={link.label}>
                  <span className="text-slate-300">{link.label}</span>
                  <span className="block text-xs text-slate-500">{link.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Built with Next.js, TypeScript, and Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}
