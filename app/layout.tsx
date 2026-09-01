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
  twitter: { card: "summary" },
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
          本文へ
        </a>

        <header className="border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3 sm:px-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-[0.9rem] font-bold tracking-tight text-slate-900 dark:text-slate-100"
            >
              <span aria-hidden="true" className="grid size-6 place-items-center rounded-md bg-sky-800 text-[0.65rem] font-black text-sky-200">
                数
              </span>
              {site.name}
            </Link>
            <Link
              href="/universities"
              className="rounded-lg px-2.5 py-1.5 text-sm text-slate-600 hover:bg-slate-100 hover:text-sky-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-sky-400"
            >
              大学一覧
            </Link>
          </div>
        </header>

        <main id="main">{children}</main>

        <footer className="mt-20 border-t border-slate-200 py-9 dark:border-slate-800">
          <div className="prose-ja mx-auto max-w-3xl space-y-3 px-5 text-xs text-slate-500 sm:px-6 dark:text-slate-400">
            <p>
              本サイトの分析は各大学の公表資料および過去の出題を独自に調査したものです。
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
