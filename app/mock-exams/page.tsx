import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ExamCatalog } from "@/components/mock-exams/exam-catalog";
import { StoreUtilityBar } from "@/components/mock-exams/store-feature-banner";
import { allExams } from "@/lib/mock-exams/catalog-server";
import { isStoreEnabled } from "@/lib/mock-exams/env";
import { site } from "@/lib/site";

const title = "数学記述模試『入試プレビュー』公式ストア｜国公立二次対策 PDF即日ダウンロード";
const description =
  "国公立二次・難関大二次試験対策のための数学記述模試『入試プレビュー』公式直販ストア。2027年度新課程対応（数I・A・II・B・C）。問題冊子・所定解答用紙・詳細解答解説・採点基準表（全32〜33p）を決済完了後すぐにPDFで一括ダウンロード。自宅プリンターやコンビニ複合機で即日A4実寸演習が可能です。";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  if (!isStoreEnabled()) return { robots: { index: false, follow: false } };
  return {
    title,
    description,
    keywords: [
      "数学 記述模試",
      "入試プレビュー",
      "大学別 数学 模試",
      "国公立二次 数学 対策",
      "数学 模試 PDF",
      "記述模試 採点基準",
      "数学 予想問題",
      "高校数学 過去問 演習",
      "新課程 数学C ベクトル",
      "大学別数学研究室",
    ],
    alternates: { canonical: `${site.url}/mock-exams` },
    openGraph: {
      title,
      description,
      url: `${site.url}/mock-exams`,
      siteName: "大学別数学研究室 公式ストア",
      images: [
        {
          url: `${site.url}/samples/mock-exams/preview-zento-set1/cover.webp`,
          width: 1200,
          height: 630,
          alt: "数学記述模試『入試プレビュー』公式演習ストア",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${site.url}/samples/mock-exams/preview-zento-set1/cover.webp`],
    },
  };
}

export default function MockExamsPage() {
  if (!isStoreEnabled()) notFound();
  const exams = allExams();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "数学記述模試『入試プレビュー』公式演習ストア",
    description,
    url: `${site.url}/mock-exams`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: exams.map((exam, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "Product",
          name: exam.title,
          description: exam.summary,
          image: `${site.url}/samples/mock-exams/${exam.id}/cover.webp`,
          url: `${site.url}/mock-exams/${exam.id}`,
          offers: {
            "@type": "Offer",
            price: exam.price,
            priceCurrency: "JPY",
            availability: "https://schema.org/InStock",
            url: `${site.url}/mock-exams/${exam.id}`,
          },
        },
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "大学別数学研究室",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "模試演習ストア",
        item: `${site.url}/mock-exams`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] font-sans selection:bg-slate-200 selection:text-slate-900 leading-relaxed">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* ──────────────────────────────────────────────────────────
          1. ヘッダー直下の極細ユーティリティバー（枠線バッジの代わり）
      ────────────────────────────────────────────────────────── */}
      <StoreUtilityBar />

      {/* ──────────────────────────────────────────────────────────
          2. メインエリア（箱で囲まず、余白と文字だけで組むエディトリアルデザイン）
      ────────────────────────────────────────────────────────── */}
      <main className="py-8 sm:py-9">
        <div className="mx-auto max-w-[1040px] px-4 sm:px-6">
          {/* タイトル領域：カード枠や青い線は一切使わず、余白と文字だけで組む */}
          <header className="mb-7">
            <div className="mb-2 flex items-center gap-2.5">
              <span className="rounded-[2px] bg-[#1e293b] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-white">
                2027年度 新課程対応
              </span>
              <span className="text-[13px] font-medium text-[#64748b]">
                印刷用A4 数学記述模試 直販ストア
              </span>
            </div>
            <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-[#0f172a] leading-tight">
              数学記述模試『入試プレビュー』シリーズ
            </h1>
          </header>

          {/* ──────────────────────────────────────────────────────────
              3. カタログ（タブ ＆ 商品棚）
          ────────────────────────────────────────────────────────── */}
          <Suspense fallback={<div className="py-12 text-center text-xs text-slate-400">読み込み中...</div>}>
            <ExamCatalog exams={exams} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
