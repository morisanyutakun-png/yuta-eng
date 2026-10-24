import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ShelfManager } from "@/components/mock-exams/shelf-manager";
import { isStoreEnabled } from "@/lib/mock-exams/env";
import { getEnrichedShelfItems } from "@/lib/mock-exams/shelf-server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "商品棚・販売管理マネージャー（Admin）｜模試PDFストア",
  robots: { index: false, follow: false },
};

export default async function ShelfPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  if (!isStoreEnabled()) notFound();

  // 本番環境（Vercel）では外部からの不正アクセスや誤操作を防ぐため、
  // STORE_DOWNLOAD_SECRET によるアクセスキー認証を必須化（ローカル開発時はそのまま閲覧可能）
  if (process.env.NODE_ENV === "production") {
    const { key } = await searchParams;
    const secret = process.env.STORE_DOWNLOAD_SECRET;
    if (!secret || key !== secret) {
      notFound();
    }
  }

  const enriched = getEnrichedShelfItems();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-slate-200">
      <ShelfManager initialItems={enriched} />
    </div>
  );
}
