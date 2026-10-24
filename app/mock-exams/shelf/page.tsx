import type { Metadata } from "next";
import { cookies } from "next/headers";
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

  const { key } = await searchParams;
  const secret = process.env.STORE_DOWNLOAD_SECRET;
  const cookieStore = await cookies();
  const cookieKey = cookieStore.get("store_admin_key")?.value;

  const currentKey = key || cookieKey || "";
  const isAuthorized =
    process.env.NODE_ENV !== "production" ||
    !secret ||
    currentKey === secret;

  const enriched = getEnrichedShelfItems();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-slate-200">
      <ShelfManager
        initialItems={enriched}
        adminKey={currentKey}
        isAuthorized={isAuthorized}
      />
    </div>
  );
}
