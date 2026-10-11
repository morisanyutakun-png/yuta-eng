import type { Metadata } from "next";
import Link from "next/link";

import { LogoMark } from "@/components/logo";
import { SiteNav } from "@/components/site-nav";
import { hasSolutions } from "@/lib/solutions";
import { moshi } from "@/lib/moshi/config";
import { sections } from "@/lib/sections";
import { site } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  creator: site.author,
  publisher: site.author,
  title: {
    default: `${site.name}｜${site.tagline}`,
    template: `%s｜${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "ja_JP",
    url: site.url,
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", images: ["/og/home.jpg"] },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:bg-navy focus:px-3 focus:py-2 focus:text-white"
        >
          本文へ
        </a>

        <header className="border-b border-rule">
          <div className="mx-auto flex max-w-[46rem] items-center justify-between px-5 py-3.5 sm:px-6 lg:max-w-[74rem] lg:px-8">
            <Link href="/" className="flex min-h-11 items-center gap-2.5 text-ink">
              <LogoMark className="size-7 shrink-0 text-navy" />
              <span className="serif text-[0.97rem] leading-tight tracking-tight">
                {site.name}
              </span>
            </Link>
            <SiteNav hasSolutions={hasSolutions} />
          </div>
        </header>

        <main id="main">{children}</main>

        {/*
          足もとは濃紺の面にする。白のまま細い罫で区切るだけだと、
          どこでページが終わったのかが分からず、全体がのっぺり見える。
          白文字との明暗比は 11.5:1 あり、薄い字でも 7:1 を下回らない。
        */}
        <footer className="mt-20 bg-navy py-10 text-white">
          <div className="prose-ja mx-auto max-w-[46rem] space-y-4 px-5 text-[0.8rem] leading-relaxed text-white/75 sm:px-6 lg:max-w-[74rem] lg:px-8">
            <p className="flex items-center gap-2.5 pb-1 text-white">
              <LogoMark
                className="size-6 shrink-0"
                style={{ "--logo-ink": "#1b3a63" } as React.CSSProperties}
              />
              <span className="serif text-[0.97rem] tracking-tight">{site.name}</span>
            </p>
            <p>{site.author}が制作・運営する、各大学とは関係のない非公式サイトです。</p>
            <nav aria-label="サイトのご案内">
              <ul className="grid grid-cols-2 gap-x-5 gap-y-1 sm:grid-cols-3">
                {[
                  { href: "/universities", label: "大学別の出題分析" },
                  ...(hasSolutions ? [{ href: "/kaisetsu", label: "過去問の解答・解説" }] : []),
                  { href: "/moshi", label: `${sections.moshi.eyebrow}（${moshi.title}）` },
                  { href: "/books", label: "教材一覧" },
                  { href: "/educators", label: "学校・塾・法人の方へ" },
                  { href: "/moshi/privacy", label: "模試の個人情報の取り扱い" },
                  { href: "/kaisetsu/policy", label: "解答・解説の掲載方針" },
                  ...(site.contact ? [{ href: `mailto:${site.contact}`, label: "お問い合わせ" }] : []),
                ].map((item) => <li key={item.href}><Link href={item.href} className="flex min-h-11 items-center border-b border-white/15 py-2 text-white hover:text-white/80">{item.label}</Link></li>)}
              </ul>
            </nav>
            <details className="border-y border-white/20 py-2">
              <summary className="min-h-11 cursor-pointer py-3 font-semibold text-white">分析・教材の利用について</summary>
            <p className="prose-ja">
              本サイトの分析は、各大学の公表資料と実際の問題冊子にあたって独自に調査したものです。
              対象年度は大学によって異なり、各ページの冒頭に明記しています。
              出題形式・分野構成の分析であり、問題文の転載は行っていません。各大学とは関係のない非公式サイトです。
            </p>
            <p className="prose-ja mt-3">
              掲載書籍（「合格答案をつくる」シリーズ・「過去問の前に」シリーズ）は Amazon.co.jp で販売しています。
              価格・在庫は Amazon の表示が優先されます。
              <Link href="/books" className="ml-1 text-white underline underline-offset-4 hover:text-white/80">
                教材一覧
              </Link>
            </p>
            </details>
            <p className="pt-2 text-white/55">© {new Date().getFullYear()} {site.author}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
