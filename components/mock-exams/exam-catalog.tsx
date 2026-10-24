"use client";

import { useState } from "react";
import { BundleExamCard } from "@/components/mock-exams/bundle-card";
import { ExamCard } from "@/components/mock-exams/exam-card";
import type { MockExam } from "@/data/mock-exams";

interface Props {
  exams: MockExam[];
}

export function ExamCatalog({ exams }: Props) {
  const [selectedLevel, setSelectedLevel] = useState<"all" | "zento-standard" | "zento-high">("all");
  const [sortOrder, setSortOrder] = useState<"series" | "level" | "price-asc">("series");

  const standardCount = exams.filter((e) => e.level === "zento-standard").length;
  const highCount = exams.filter((e) => e.level === "zento-high").length;

  // ソート処理
  let sorted = [...exams];
  if (sortOrder === "level") {
    // 標準（zento-standard）を優先、次に実戦（zento-high）
    sorted.sort((a, b) => (a.level === "zento-standard" ? -1 : 1));
  } else if (sortOrder === "price-asc") {
    sorted.sort((a, b) => a.price - b.price);
  } else {
    // 実施時期・シリーズ順: set1 → set2 → set3
    sorted.sort((a, b) => a.id.localeCompare(b.id));
  }

  const filteredExams =
    selectedLevel === "all"
      ? sorted
      : sorted.filter((e) => e.level === selectedLevel);

  return (
    <section id="catalog" aria-label="模試一覧">
      {/* ──────────────────────────────────────────────────────────
          1. コントロールバー（カテゴリータブ ＆ 並び替えセレクター）
      ────────────────────────────────────────────────────────── */}
      <nav
        aria-label="商品カテゴリー"
        className="mb-6 flex flex-wrap items-end justify-between gap-y-3 border-b border-[#cbd5e1] overflow-visible"
      >
        {/* 左側: カテゴリー切り替えタブ */}
        <div className="flex gap-6 sm:gap-7 overflow-x-auto overflow-y-hidden sm:overflow-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => setSelectedLevel("all")}
            className={`cursor-pointer pb-3 text-sm whitespace-nowrap bg-transparent transition-colors ${
              selectedLevel === "all"
                ? "border-b-2 border-[#0f172a] -mb-px font-bold text-[#0f172a]"
                : "border-b-2 border-transparent -mb-px font-medium text-[#64748b] hover:text-[#0f172a]"
            }`}
          >
            すべて ({exams.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedLevel("zento-standard")}
            className={`cursor-pointer pb-3 text-sm whitespace-nowrap bg-transparent transition-colors ${
              selectedLevel === "zento-standard"
                ? "border-b-2 border-[#0f172a] -mb-px font-bold text-[#0f172a]"
                : "border-b-2 border-transparent -mb-px font-medium text-[#64748b] hover:text-[#0f172a]"
            }`}
          >
            国公立二次・標準 ({standardCount})
          </button>
          <button
            type="button"
            onClick={() => setSelectedLevel("zento-high")}
            className={`cursor-pointer pb-3 text-sm whitespace-nowrap bg-transparent transition-colors ${
              selectedLevel === "zento-high"
                ? "border-b-2 border-[#0f172a] -mb-px font-bold text-[#0f172a]"
                : "border-b-2 border-transparent -mb-px font-medium text-[#64748b] hover:text-[#0f172a]"
            }`}
          >
            難関大選抜・実戦 ({highCount})
          </button>
        </div>

        {/* 右側: 件数表示 ＆ 並び替えセレクター */}
        <div className="flex items-center gap-3 pb-2.5">
          <span className="text-xs text-[#64748b] whitespace-nowrap font-medium">
            全{filteredExams.length}件表示
          </span>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <label htmlFor="catalog-sort" className="hidden sm:inline text-slate-400 text-[11px] whitespace-nowrap">
              並び替え:
            </label>
            <div className="relative">
              <select
                id="catalog-sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                aria-label="模試一覧の並び替え"
                className="appearance-none rounded-md border border-slate-300 bg-white py-1 pl-2.5 pr-6 text-xs font-medium text-slate-800 shadow-2xs hover:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 cursor-pointer"
              >
                <option value="series">実施時期・シリーズ順</option>
                <option value="level">難易度順（標準 → 実戦）</option>
                <option value="price-asc">価格順（安い順）</option>
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
                ▾
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* ──────────────────────────────────────────────────────────
          2. 商品カード一覧（単品カード）
      ────────────────────────────────────────────────────────── */}
      <div className="space-y-4 sm:space-y-5 pb-8">
        {filteredExams.map((exam, index) => (
          <ExamCard key={exam.id} exam={exam} priority={index === 0} />
        ))}
      </div>

      {/* ──────────────────────────────────────────────────────────
          3. セット購入枠（全3回コンプリートパッケージ割引）
      ────────────────────────────────────────────────────────── */}
      <div className="pt-2 pb-20">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-px flex-1 bg-amber-200/80" />
          <span className="text-xs font-bold tracking-wider text-amber-900/80 uppercase">
            特別割引パッケージ
          </span>
          <div className="h-px flex-1 bg-amber-200/80" />
        </div>
        <BundleExamCard exams={exams} />
      </div>
    </section>
  );
}
