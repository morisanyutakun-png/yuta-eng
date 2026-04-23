import Link from "next/link";

import { Container } from "@/components/container";
import { navItems, siteConfig } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <Container className="flex min-h-16 items-center justify-between gap-5 py-3">
        <Link className="group inline-flex items-center gap-3" href="/">
          <span className="grid size-10 place-items-center rounded-2xl bg-slate-950 text-sm font-semibold text-white shadow-lg shadow-slate-900/15">
            YE
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-semibold tracking-[-0.03em] text-slate-950">
              {siteConfig.name}
            </span>
            <span className="mt-1 text-xs text-slate-500">
              Education / Physics / Web
            </span>
          </span>
        </Link>
        <nav aria-label="Global navigation">
          <ul className="flex flex-wrap items-center justify-end gap-1 text-sm font-medium text-slate-600">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
