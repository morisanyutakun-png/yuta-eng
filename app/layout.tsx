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
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-white text-slate-800 antialiased dark:bg-slate-950 dark:text-slate-200">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-sky-700 focus:px-3 focus:py-2 focus:text-white"
        >
          本文へskip
        </a>

        <header className="border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3.5">
            <Link href="/" className="text-[0.95rem] font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {site.name}
            </Link>
            <Link
              href="/universities"
              className="text-sm text-slate-600 hover:text-sky-700 dark:text-slate-400 dark:hover:text-sky-400"
            >
              大学一覧
            </Link>
          </div>
        </header>

        <main id="main">{children}</main>

        <footer className="mt-20 border-t border-slate-200 py-8 dark:border-slate-800">
          <div className="mx-auto max-w-4xl space-y-3 px-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            <p>
              本サイトの分析は各大学の公表資料および過去の出題を独自に調査したものです。出題形式・分野構成の分析であり、
              問題文の転載は行っていません。各大学とは関係のない非公式サイトです。
            </p>
            <p>
              掲載書籍は Amazon.co.jp で販売しています。リンク先の価格・在庫は Amazon の表示が優先されます。
            </p>
            <p className="pt-1">© {new Date().getFullYear()} {site.author}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
