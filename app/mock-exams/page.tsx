import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ExamCatalog } from "@/components/mock-exams/exam-catalog";
import { PreviewCta } from "@/components/mock-exams/preview-cta";
import { storeSeller } from "@/data/mock-exams";
import { allExams } from "@/lib/mock-exams/catalog";
import { isStoreEnabled } from "@/lib/mock-exams/env";

const title = "模試演習ストア｜大学別冠模試・全統記述レベル実戦模試（PDF）";
const description =
  "記述数学の「詳細な減点・採点基準」と「本番そっくりの所定解答用紙」が付く、印刷用A4 PDFの模試演習ストア。全統記述レベルの標準・ハイレベル実戦模試と、大学別冠模試（入試プレビュー）のアーカイブを販売しています。";

export function generateMetadata(): Metadata {
  if (!isStoreEnabled()) return { robots: { index: false, follow: false } };
  return {
    title,
    description,
    alternates: { canonical: "/mock-exams" },
    openGraph: { title, description, url: "/mock-exams" },
  };
}

const packageItems = [
  {
    no: "01",
    title: "問題冊子（A4・印刷用）",
    body: "表紙・注意事項・問題紙を、本番の試験冊子および既刊『合格答案をつくる』シリーズと同じ体裁で組んでいます。余白は下書きに使えます。",
  },
  {
    no: "02",
    title: "所定解答用紙（A4・大問別）",
    body: "大問ごとに1枚の記述用解答用紙が付きます。受験番号・氏名・得点欄に加え、小問ごとの採点欄を備えており、本番と同じ枠の感覚で書く練習ができます。",
  },
  {
    no: "03",
    title: "解答・解説（論述答案＋別解）",
    body: "試験場で解答用紙にそのまま書き写せる論述形式の答案を先に示し、続けて別解と検算（確かめ）を載せています。",
  },
  {
    no: "04",
    title: "詳細な加点・減点つき採点基準",
    body: "すべての小問に「どこまで書けば何点加点されるか」「何を落とすと何点減点されるか（×行）」を表形式で明記。自己採点でも減点箇所が浮き彫りになります。",
  },
];

export default function MockExamsPage() {
  if (!isStoreEnabled()) notFound();
  const exams = allExams();

  return (
    <div className="page page-wide mobile-compact">
      <nav aria-label="パンくず" className="breadcrumb pt-3 text-[0.75rem] text-ink-3">
        <Link href="/" className="hover:text-navy">
          トップ
        </Link>
        <span className="mx-1.5 text-rule">／</span>
        <span className="text-ink-2">模試演習ストア</span>
      </nav>

      <div className="sec-rule mt-3" />

      <header className="border-b border-rule pb-8 pt-6">
        <p className="eyebrow">印刷用A4 PDF・即時ダウンロード</p>
        <h1 className="serif h-page mt-1.5 text-ink">模試演習ストア</h1>
        <p className="serif mt-2 text-[1.08rem] font-semibold text-[var(--sec)]">
          大学別冠模試・全統記述レベル実戦模試（問題・所定解答用紙・解説・採点基準）
        </p>
        <p className="prose-ja mt-4 text-[1rem] leading-[1.95] text-ink-2 sm:text-[1.03rem]">
          大手予備校がカバーしない地方国公立・医学部の冠模試（入試プレビュー過去問アーカイブ）と、
          記述レベル別のオリジナル実戦模試を、<strong className="font-semibold text-ink">印刷用A4 PDF（4点セット）</strong>
          として販売する公式演習ストアです。既刊「合格答案をつくる」シリーズと同じ組版で、
          すべての小問に加点・減点の採点基準が付きます。
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href="#lineup" className="btn btn-primary">
            模試一覧から選ぶ
          </a>
          <a href="#package" className="btn">
            収録PDFの4点セットを見る
          </a>
        </div>
      </header>

      <section id="lineup" aria-labelledby="lineup-heading" className="mt-12 scroll-mt-20">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="lineup-heading" className="rule-mark serif h-sect text-ink">
            模試ラインナップ
          </h2>
          <p className="text-[0.82rem] text-ink-3">
            各カードから大問構成・頻出分野・採点基準のサンプルをご確認いただけます
          </p>
        </div>

        <div className="mt-5">
          <ExamCatalog exams={exams} />
        </div>
      </section>

      <section id="package" aria-labelledby="package-heading" className="mt-16 scroll-mt-20">
        <h2 id="package-heading" className="rule-mark serif h-sect text-ink">
          購入後にすぐ届く 4つの印刷用A4 PDF
        </h2>
        <p className="prose-ja mt-3 text-[0.93rem] leading-[1.9] text-ink-2">
          決済完了後、その場の画面から4つのPDFをすぐにダウンロードできます（購入から{storeSeller.accessDays}日間は何度でも再ダウンロード可能）。
          自宅やコンビニでA4原寸で印刷し、時間を計って所定の解答用紙に書いてから採点基準で自己採点してください。
        </p>

        <ol className="mt-6 grid gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-2">
          {packageItems.map((it) => (
            <li key={it.no} className="bg-white p-5 sm:p-6">
              <p className="serif text-[0.82rem] text-[var(--sec)]">PDF {it.no}</p>
              <h3 className="mt-1 text-[0.98rem] font-semibold text-ink">{it.title}</h3>
              <p className="prose-ja mt-2 text-[0.88rem] leading-[1.85] text-ink-2">{it.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="flow-heading" className="mt-16">
        <h2 id="flow-heading" className="rule-mark serif h-sect text-ink">
          受験から自己採点・本番への流れ
        </h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            {
              step: "1. 購入前に採点基準の見本を確認",
              body: "各模試ページに、大問構成・出題分野と、大問1問分の採点基準サンプル・紙面見本を公開しています。",
            },
            {
              step: "2. 決済後すぐにA4印刷して演習",
              body: "Stripe Checkout での決済完了後、問題冊子・所定解答用紙・解答解説・採点基準の4つのPDFを即時ダウンロードできます。",
            },
            {
              step: "3. 自己採点から添削付き本番へ",
              body: "加点行・減点行（×）に沿って自己採点し、自分の答案の弱点が見えたら、人力添削付きの『入試プレビュー』本番で完成度を確かめます。",
            },
          ].map((s) => (
            <li key={s.step} className="border border-rule bg-white p-5">
              <h3 className="text-[0.93rem] font-semibold text-ink">{s.step}</h3>
              <p className="prose-ja mt-2 text-[0.86rem] leading-[1.85] text-ink-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <PreviewCta className="mt-16" />
    </div>
  );
}

