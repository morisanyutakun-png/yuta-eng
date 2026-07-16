import Link from "next/link";

import { Container } from "@/components/container";
import { appLoginUrl, footerNavItems, kdpAmazonUrl, siteConfig } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="bg-[#f8fafc] text-[#334155]">
      {/* スマホは下部固定 CTA バーの分だけ余白を広げる */}
      <Container className="px-6 pt-16 pb-28 sm:pt-20 sm:pb-24 lg:pb-20">
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
              高校生向けの買い切り通信添削。1回10〜20分の教材を解いて答案を提出すると、
              教材を作った本人が途中式や考え方まで添削し、アプリで返却します。
              物理・化学・数学・英語に対応。面談・授業はありません。
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
                  href="/order"
                >
                  お申し込み（買い切り）
                </Link>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-1 text-[#475569] transition hover:text-[#0d9488]"
                  href={appLoginUrl}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  受講生ログイン（公式アプリ）
                  <span aria-hidden="true" className="text-[0.7rem]">↗</span>
                </a>
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
                  『考える力を育てる』シリーズ
                  <span aria-hidden="true" className="ml-1 text-[0.7rem]">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 法的情報（特商法・プライバシー・返金/解約） */}
        <nav
          aria-label="法的情報"
          className="mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-[rgba(15,29,74,0.1)] pt-6 text-[0.8rem]"
        >
          {[
            { label: "特定商取引法に基づく表記", href: "/legal/tokushoho" },
            { label: "プライバシーポリシー", href: "/legal/privacy" },
            { label: "返金ポリシー", href: "/legal/refund" },
          ].map((item) => (
            <Link
              key={item.href}
              className="text-[#475569] transition hover:text-[#0d9488]"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-5 flex flex-col gap-2 text-[0.8rem] text-[#475569] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name} {siteConfig.division}</p>
          <p>高校生向け・買い切りの通信添削（面談・授業は行いません）</p>
        </div>
      </Container>
    </footer>
  );
}
