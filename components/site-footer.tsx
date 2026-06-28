import Link from "next/link";

import { Container } from "@/components/container";
import { footerNavItems, kdpAmazonUrl, siteConfig } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="bg-[#f8fafc] text-[#334155]">
      <Container className="px-6 py-16 sm:py-20">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link className="inline-flex items-center" href="/">
              <picture>
                <source
                  type="image/avif"
                  srcSet="/brand/nobit-logo-480.avif 480w, /brand/nobit-logo-960.avif 960w"
                  sizes="220px"
                />
                <source
                  type="image/webp"
                  srcSet="/brand/nobit-logo-480.webp 480w, /brand/nobit-logo-960.webp 960w"
                  sizes="220px"
                />
                <img
                  alt="ノビットスタディ 中高部"
                  src="/brand/nobit-logo-480.webp"
                  width={1970}
                  height={375}
                  loading="lazy"
                  decoding="async"
                  className="h-10 w-auto"
                />
              </picture>
            </Link>
            <p className="mt-5 max-w-sm text-[0.9rem] leading-[1.95] text-[#475569]">
              高校物理・数学・英語を中心に、毎日演習・毎日添削で「考える力」を育てる
              オンライン添削塾。面談や授業は行わず、塾長オリジナル教材と学習管理で
              自立した学びを支えます。
            </p>
          </div>

          <div>
            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#0b1d4a]">
              メニュー
            </h2>
            <ul className="mt-4 space-y-2 text-[0.88rem]">
              {footerNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    className="text-[#475569] transition hover:text-[#0d9488]"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#0b1d4a]">
              連絡先・教材
            </h2>
            <ul className="mt-4 space-y-2 text-[0.88rem]">
              <li>
                <Link
                  className="text-[#475569] transition hover:text-[#0d9488]"
                  href="/contact"
                >
                  無料体験・相談
                </Link>
              </li>
              <li>
                <a
                  className="text-[#475569] transition hover:text-[#0d9488]"
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  className="text-[#475569] transition hover:text-[#0d9488]"
                  href={kdpAmazonUrl}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  KDP『考える力を育てる』シリーズ
                  <span aria-hidden="true" className="ml-1 text-[0.7rem]">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[rgba(15,29,74,0.1)] pt-6 text-[0.8rem] text-[#475569] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name} {siteConfig.division}</p>
          <p>添削専門のオンライン学習管理塾（面談・授業は行いません）</p>
        </div>
      </Container>
    </footer>
  );
}
