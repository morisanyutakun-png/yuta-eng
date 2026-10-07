import Link from "next/link";

import { sectionStyle, type SectionKey } from "@/lib/sections";

/**
 * 読み物ページの土台。
 *
 * スマホは1カラムのまま（これまでと同じ）。
 * 画面が広いときだけ本文の横に固定の袖を出して、目次と購入導線を出しっぱなしにする。
 * URL はモバイルとPCで分けない。分けると同じ内容が2つのURLに散って検索評価が割れ、
 * 更新も二重になるため、1つのURLで幅に応じて組み替える。
 */
export function ArticleLayout({
  breadcrumb,
  children,
  aside,
  section,
}: {
  breadcrumb: { href?: string; label: string }[];
  children: React.ReactNode;
  /** 画面が広いときだけ右に出す袖 */
  aside?: React.ReactNode;
  /** どの柱のページか。渡すと節見出しの罫とラベルがその色になる */
  section?: SectionKey;
}) {
  return (
    <div
      className="mx-auto max-w-[38rem] px-5 sm:px-6 lg:max-w-[74rem] lg:px-8"
      style={section ? sectionStyle(section) : undefined}
    >
      <nav aria-label="パンくず" className="pt-5 text-[0.72rem] text-ink-3">
        {breadcrumb.map((b, i) => (
          <span key={b.label}>
            {i > 0 && <span className="mx-1.5 text-rule">／</span>}
            {b.href ? (
              <Link href={b.href} className="hover:text-navy">
                {b.label}
              </Link>
            ) : (
              <span className="text-ink-2">{b.label}</span>
            )}
          </span>
        ))}
      </nav>

      {/* 柱の色の線。どの柱のページかを、読み始める前に示す */}
      {section && <div className="sec-rule mt-3" />}

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start lg:gap-x-12">
        <article className="min-w-0 lg:max-w-[42rem]">{children}</article>
        {aside && (
          <aside className="hidden lg:block">
            <div className="sticky top-6 space-y-6 pt-6">{aside}</div>
          </aside>
        )}
      </div>
    </div>
  );
}

/** 袖に置く小さな箱。 */
export function AsideCard({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`border border-rule bg-white px-4 py-4 ${className}`}>
      {title && <h2 className="text-[0.7rem] font-bold tracking-wide text-ink-3">{title}</h2>}
      <div className={title ? "mt-2.5" : ""}>{children}</div>
    </section>
  );
}
