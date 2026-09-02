import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
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
          <div className="mx-auto flex max-w-[46rem] items-center justify-between px-5 py-3.5 sm:px-6">
            <Link href="/" className="serif text-[0.95rem] tracking-tight text-ink">
              大学別 数学入試分析
            </Link>
            <Link href="/universities" className="text-[0.82rem] text-ink-2 transition-colors hover:text-navy">
              大学一覧
            </Link>
          </div>
        </header>

        <main id="main">{children}</main>

        <footer className="mt-20 border-t border-rule py-9">
          <div className="prose-ja mx-auto max-w-[46rem] space-y-3 px-5 text-[0.72rem] text-ink-3 sm:px-6">
            <p>
              本サイトの分析は、各大学の公表資料と実際の問題冊子にあたって独自に調査したものです。
              出題形式・分野構成の分析であり、問題文の転載は行っていません。各大学とは関係のない非公式サイトです。
            </p>
            <p>掲載書籍は Amazon.co.jp で販売しています。価格・在庫は Amazon の表示が優先されます。</p>
            <p className="pt-1">© {new Date().getFullYear()} {site.author}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
