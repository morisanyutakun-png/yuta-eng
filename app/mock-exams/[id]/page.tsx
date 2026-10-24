import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BoothGallery } from "@/components/mock-exams/booth-gallery";
import { DaimonAccordion } from "@/components/mock-exams/daimon-accordion";
import { DetailActionButtons } from "@/components/mock-exams/detail-action-buttons";
import { ExamCard } from "@/components/mock-exams/exam-card";
import { FaqAccordion } from "@/components/mock-exams/faq-accordion";
import { FileTextIcon } from "@/components/mock-exams/icons";
import { RubricSample } from "@/components/mock-exams/rubric-sample";
import { StickyCta } from "@/components/mock-exams/sticky-cta";
import { isOnSale } from "@/lib/mock-exams/catalog";
import { allExams, getExam } from "@/lib/mock-exams/catalog-server";
import { isStoreEnabled } from "@/lib/mock-exams/env";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return allExams().map((e) => ({ id: e.id }));
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  if (!isStoreEnabled()) return { robots: { index: false, follow: false } };
  const { id } = await params;
  const exam = getExam(id);
  if (!exam) return {};
  const cleanShortName = exam.shortTitle || exam.title;
  const title = `${cleanShortName}｜数学記述模試『入試プレビュー』公式ストア`;
  const description = `${exam.summary}（制限時間${exam.minutes}分・大問${exam.daimonCount}題・${exam.fullMark}点満点／問題冊子・所定解答用紙・詳細解答解説・小問別採点基準表のA4 PDF 4点セット完全収録）。決済後すぐにダウンロードして自宅やコンビニで印刷演習できます。`;
  const canonicalUrl = `${site.url}/mock-exams/${exam.id}`;
  const ogImage = `${site.url}/samples/mock-exams/${exam.id}/cover.webp`;

  return {
    title,
    description,
    keywords: [
      exam.title,
      cleanShortName,
      "数学 記述模試",
      "入試プレビュー",
      "国公立二次 数学 対策",
      "模試 問題冊子",
      "記述 解答用紙",
      "数学 採点基準",
      "小問別配点",
      "A4 PDF演習",
      "大学別数学研究室",
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "大学別数学研究室 公式ストア",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: exam.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function MockExamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!isStoreEnabled()) notFound();
  const { id } = await params;
  const exam = getExam(id);
  if (!exam) notFound();

  const onSale = isOnSale(exam);
  const totalPages =
    exam.files.find((f) => f.key === "full")?.pages ??
    (exam.files.reduce((acc, f) => acc + (f.pages ?? 0), 0) || 32);
  const otherExams = allExams().filter((e) => e.id !== exam.id);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: exam.title,
    description: exam.summary,
    image: `${site.url}/samples/mock-exams/${exam.id}/cover.webp`,
    brand: {
      "@type": "Brand",
      name: "大学別数学研究室",
    },
    offers: {
      "@type": "Offer",
      url: `${site.url}/mock-exams/${exam.id}`,
      priceCurrency: "JPY",
      price: exam.price,
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "大学別数学研究室",
      },
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
      {
        "@type": "ListItem",
        position: 3,
        name: exam.shortTitle || exam.title,
        item: `${site.url}/mock-exams/${exam.id}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900 pb-20 font-sans leading-relaxed selection:bg-slate-200 selection:text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mx-auto max-w-[1040px] px-4 py-6 sm:px-6 sm:py-8">
        {/* ──────────────────────────────────────────────────────────
            1. パンくずリスト（hidamariスタイル）
        ────────────────────────────────────────────────────────── */}
        <nav aria-label="パンくずリスト" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            <li>
              <Link href="/" className="hover:text-slate-900 transition-colors">
                研究室トップ
              </Link>
            </li>
            <li>
              <span className="text-slate-300">›</span>
            </li>
            <li>
              <Link href="/mock-exams" className="hover:text-slate-900 transition-colors">
                模試PDFストア
              </Link>
            </li>
            <li>
              <span className="text-slate-300">›</span>
            </li>
            <li>
              <span className="font-semibold text-slate-800">{exam.shortTitle}</span>
            </li>
          </ol>
        </nav>

        {/* ──────────────────────────────────────────────────────────
            2. メイン商品カード（hidamari型：大型ビジュアル ＋ スペック購入パネル）
        ────────────────────────────────────────────────────────── */}
        <section className="w-full min-w-0 overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-2xs lg:grid lg:grid-cols-12">
          {/* 左側: サンプル画像ギャラリー（lg:col-span-7） */}
          <div className="relative bg-slate-50/80 p-4 sm:p-6 lg:col-span-7 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-100">
            <BoothGallery previews={exam.previews || []} title={exam.title} exam={exam} />
          </div>

          {/* 右側: タイトル・価格・スペック・購入ボタン（lg:col-span-5） */}
          <div className="min-w-0 p-5 sm:p-6 lg:col-span-5 lg:flex lg:flex-col">
            {/* 商品区分バッジ */}
            <div className="flex items-center gap-2 text-xs pb-1">
              <span className="rounded bg-slate-900 text-white font-bold px-2 py-0.5 text-[10px] tracking-wide">
                A4 PDF直販
              </span>
              <span className="font-bold text-[#1b3a63]">
                {exam.edition || exam.monthLabel}
              </span>
            </div>

            {/* 商品タイトル */}
            <h1 className="mt-1 text-xl sm:text-2xl font-bold leading-snug tracking-tight text-slate-900">
              {exam.title}
            </h1>

            {/* 価格表示 */}
            <p className="mt-3 tabular-nums">
              <span className="text-2xl sm:text-3xl font-extrabold leading-none text-slate-900">
                ¥{exam.price.toLocaleString("ja-JP")}
              </span>
              <span className="ml-1.5 text-xs text-slate-500">（税込） / 買い切り</span>
            </p>

            {/* スペック定義DLリスト */}
            <dl className="mt-4 divide-y divide-slate-100 border-y border-slate-100 text-xs">
              <div className="flex justify-between py-2.5">
                <dt className="text-slate-500 font-medium">試験構成</dt>
                <dd className="font-semibold text-slate-800 text-right">
                  {exam.minutes}分・大問{exam.daimonCount}題（{exam.fullMark}点）
                </dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-slate-500 font-medium">出題範囲</dt>
                <dd className="font-semibold text-slate-800 text-right">{exam.scope}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-slate-500 font-medium">納品形式</dt>
                <dd className="font-semibold text-slate-800 text-right">
                  A4ベクターPDF（全{totalPages}p）
                </dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-slate-500 font-medium">納品方法</dt>
                <dd className="font-semibold text-slate-800 text-right">
                  決済完了後、即時ダウンロード
                </dd>
              </div>
            </dl>

            {/* 購入アクションボタン */}
            <div className="mt-5 space-y-2.5">
              <DetailActionButtons exam={exam} />
            </div>

            {/* 安心シグナル */}
            <div className="mt-3 flex items-center justify-center gap-3 text-[11px] text-slate-500 text-center">
              <span>領収書PDF自動発行</span>
              <span>•</span>
              <span>購入者限定・いつでも再DL可能</span>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────
            3. 模試について（出題のねらいと同梱ファイル）
        ────────────────────────────────────────────────────────── */}
        <section className="mt-6 rounded-xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-2xs">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            出題のねらいと演習パッケージの特徴
          </h2>
          <p className="mt-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {exam.summary}
          </p>

          {/* 出題方針の箇条書き */}
          {exam.aims && exam.aims.length > 0 && (
            <ul className="mt-4 space-y-2 text-xs text-slate-700 leading-relaxed bg-slate-50/70 p-4 rounded-xl border border-slate-100">
              {exam.aims.map((aim, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-bold text-[#1b3a63] shrink-0 mt-0.5">•</span>
                  <span>{aim}</span>
                </li>
              ))}
            </ul>
          )}

          {/* 同梱されるファイル一覧 */}
          <div className="mt-6 border-t border-slate-100 pt-5">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-3">
              <FileTextIcon size={14} className="text-[#1b3a63]" />
              <span>購入後にダウンロードできる4大演習ファイル（全{totalPages}ページ）</span>
            </h3>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {exam.files.map((file, i) => (
                <div key={file.key} className="rounded-lg border border-slate-200/80 bg-white p-3 text-xs shadow-2xs">
                  <div className="flex items-center justify-between font-bold text-slate-900 mb-0.5">
                    <span>{i + 1}. {file.label}</span>
                    {file.pages && (
                      <span className="text-[10px] rounded bg-slate-100 px-1.5 py-0.5 text-slate-600 font-normal">
                        {file.pages}p
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {file.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────
            4. 出題構成（目次） ＆ 採点基準サンプル（2カラムレイアウト）
        ────────────────────────────────────────────────────────── */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2 items-start">
          {/* 左側: 大問構成・出題テーマ */}
          <section className="rounded-xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xs">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2.5">
              出題構成と大問別テーマ
            </h2>
            <p className="mt-2 text-xs text-slate-500">
              各大問をクリックすると配点と詳細な出題分野が展開されます。
            </p>
            <div className="mt-4">
              <DaimonAccordion
                structure={exam.structure}
                minutes={exam.minutes}
                fullMark={exam.fullMark}
              />
            </div>
          </section>

          {/* 右側: 採点基準のサンプル抜粋 */}
          <section className="rounded-xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xs">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2.5">
              採点基準の見本（加点・減点マトリクス抜粋）
            </h2>
            <p className="mt-2 text-xs text-slate-500">
              すべての小問について「何が書けていれば何点加点か」「どの論理飛躍で何点引かれるか」を客観的に数値化しています。
            </p>
            <div className="mt-4">
              {exam.rubricSample ? (
                <RubricSample sample={exam.rubricSample} />
              ) : (
                <p className="text-xs text-slate-400">採点基準サンプル準備中</p>
              )}
            </div>
          </section>
        </div>

        {/* ──────────────────────────────────────────────────────────
            5. よくあるご質問 FAQ
        ────────────────────────────────────────────────────────── */}
        <section className="mt-6 rounded-xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xs">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2.5 mb-4">
            よくあるご質問
          </h2>
          <FaqAccordion />
        </section>

        {/* ──────────────────────────────────────────────────────────
            6. シリーズの他の模試セット（関連一覧）
        ────────────────────────────────────────────────────────── */}
        {otherExams.length > 0 && (
          <section className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                シリーズの他の模試セット
              </h3>
              <Link
                href="/mock-exams"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                全商品一覧を見る ({allExams().length}) →
              </Link>
            </div>
            <div className="space-y-4">
              {otherExams.map((other) => (
                <ExamCard key={other.id} exam={other} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* スクロール追従 Sticky CTA */}
      <StickyCta
        title={exam.title}
        price={exam.price}
        onSale={onSale}
        exam={exam}
      />
    </div>
  );
}
