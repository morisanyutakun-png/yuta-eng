"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/mock-exams/icons";

interface Slide {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  subtitle: string;
  badge: string;
  ctaText: string;
  ctaHref: string;
  bgGradient: string;
  bookCovers: string[];
}

const slides: Slide[] = [
  {
    id: "slide-series",
    tag: "2027年度 新課程対応",
    tagColor: "bg-sky-400/20 text-sky-200 border-sky-400/30",
    title: "国公立二次・難関大二次 数学記述模試シリーズ",
    subtitle:
      "問題冊子・所定解答用紙5枚・模範解答・小問別加点減点表（各32p）を収録。自宅やコンビニで印刷できるA4ベクターPDF即時ダウンロード販売。",
    badge: "全3セット即時ダウンロード対応",
    ctaText: "模試ラインナップを見る",
    ctaHref: "#catalog",
    bgGradient: "from-[#0a192f] via-[#112d4e] to-[#1d3d63]",
    bookCovers: [
      "/samples/mock-exams/preview-zento-set1/cover.webp",
      "/samples/mock-exams/preview-zento-set2/cover.webp",
      "/samples/mock-exams/preview-zento-set3/cover.webp",
    ],
  },
  {
    id: "slide-rubric",
    tag: "全小問に客観的基準を明文化",
    tagColor: "bg-amber-400/20 text-amber-200 border-amber-400/30",
    title: "自己採点の精度を極める、小問別加点・減点表",
    subtitle:
      "「何が書けていれば何点加点か」「どの論理飛躍で何点引かれるか」を完全数値化。予備校記述模試と同水準の採点基準で答案作成力を徹底養成。",
    badge: "全問採点マトリクス収録",
    ctaText: "採点基準つき模試を見る",
    ctaHref: "#catalog",
    bgGradient: "from-[#141b26] via-[#1e2a3c] to-[#2b3a50]",
    bookCovers: [
      "/samples/mock-exams/preview-zento-set1/rubric.webp",
      "/samples/mock-exams/preview-zento-set2/rubric.webp",
    ],
  },
  {
    id: "slide-answersheet",
    tag: "本番形式の実戦答案作成",
    tagColor: "bg-emerald-400/20 text-emerald-200 border-emerald-400/30",
    title: "大問別所定解答用紙5枚 ＆ A4原寸ベクター印刷",
    subtitle:
      "難関大二次試験の答案用紙を実寸A4で再現。途中式の記述スペースや思考プロセスを実寸で体感し、時間内に書き切る答案力を養成。",
    badge: "所定解答用紙5枚付属",
    ctaText: "演習パッケージ一覧へ",
    ctaHref: "#catalog",
    bgGradient: "from-[#081e26] via-[#10343f] to-[#174958]",
    bookCovers: [
      "/samples/mock-exams/preview-zento-set1/answer-sheet.webp",
      "/samples/mock-exams/preview-zento-set1/problem.webp",
    ],
  },
];

export function StoreHeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const activeSlide = slides[current];

  return (
    <section
      aria-label="プロモーションカルーセル"
      className="relative w-full overflow-hidden bg-slate-950 text-white select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* スライド本体 */}
      <div
        className={`relative w-full bg-gradient-to-r ${activeSlide.bgGradient} transition-colors duration-700 ease-out py-6 sm:py-8`}
      >
        {/* 背景の幾何学パターン（学術的な方眼・格子線） */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex max-w-5xl items-center justify-between gap-6 px-4 sm:px-8">
          {/* 左側: キャッチコピー ＆ ボタン */}
          <div className="min-w-0 max-w-xl py-2">
            <div className="flex items-center gap-2">
              <span
                className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${activeSlide.tagColor}`}
              >
                {activeSlide.tag}
              </span>
              <span className="text-[11px] font-semibold text-slate-300 hidden xs:inline">
                {activeSlide.badge}
              </span>
            </div>

            <h2 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {activeSlide.title}
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-200/90 leading-relaxed line-clamp-2 sm:line-clamp-3">
              {activeSlide.subtitle}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <a
                href={activeSlide.ctaHref}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white text-slate-950 px-4 py-2 text-xs font-bold shadow-md hover:bg-slate-100 transition-all active:scale-95"
              >
                <span>{activeSlide.ctaText}</span>
                <span className="text-slate-500 font-normal">↓</span>
              </a>
              <span className="text-[11px] text-slate-300">
                A4 PDF ｜ 即時ダウンロード
              </span>
            </div>
          </div>

          {/* 右側: 3D立体書影・紙面の華やかな重なりプレビュー */}
          <div className="hidden md:flex relative h-[160px] lg:h-[180px] w-[220px] lg:w-[260px] shrink-0 items-center justify-center">
            {activeSlide.bookCovers.map((src, idx) => {
              const offsets = [
                "translate-x-0 -rotate-3 z-30 shadow-[0_12px_28px_rgba(0,0,0,0.5)] scale-100",
                "translate-x-6 rotate-4 z-20 shadow-[0_8px_20px_rgba(0,0,0,0.4)] scale-95 opacity-90",
                "translate-x-12 rotate-10 z-10 shadow-[0_6px_16px_rgba(0,0,0,0.3)] scale-90 opacity-75",
              ];
              const offsetClass = offsets[idx % offsets.length];

              return (
                <div
                  key={src}
                  className={`absolute h-full aspect-[1/1.414] overflow-hidden rounded-[2px] bg-white border border-white/20 transition-all duration-500 ${offsetClass}`}
                >
                  <Image
                    src={src}
                    alt="演習冊子見本"
                    fill
                    sizes="160px"
                    className="object-cover object-top"
                  />
                  {/* 背表紙シャドウ */}
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
                </div>
              );
            })}
          </div>
        </div>

        {/* 左右ナビゲーションボタン（ホバーで表示） */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="前のスライド"
          className="absolute left-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-black/40 text-white backdrop-blur-xs hover:bg-black/70 transition"
        >
          <ChevronLeftIcon size={16} />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="次のスライド"
          className="absolute right-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-black/40 text-white backdrop-blur-xs hover:bg-black/70 transition"
        >
          <ChevronRightIcon size={16} />
        </button>

        {/* 下部インジケーター（ピル型アクティブ表示） */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`スライド ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                current === i ? "w-6 bg-white shadow-xs" : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

