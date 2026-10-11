import type { Metadata } from "next";
import Link from "next/link";

import { universityCount } from "@/lib/data";

// 404 を検索結果に載せない
export const metadata: Metadata = {
  title: "ページが見つかりません",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[38rem] px-5 py-20 sm:px-6">
      <h1 className="serif text-[1.6rem] leading-snug text-ink sm:text-[2rem]">
        ページが見つかりません
      </h1>
      <p className="prose-ja mt-4 text-[0.93rem] text-ink-2">
        URL が変わったか、削除された可能性があります。
        大学ごとの数学の傾向と対策は、下の一覧からたどれます。
      </p>
      <p className="mt-7">
        <Link
          href="/universities"
          className="inline-flex min-h-11 items-center border border-navy bg-navy px-5 text-[0.93rem] font-semibold text-white transition-colors hover:bg-navy/90"
        >
          {universityCount()}大学の一覧を見る
        </Link>
      </p>
    </div>
  );
}
