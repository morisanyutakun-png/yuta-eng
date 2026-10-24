import Image from "next/image";

interface BookMockup3DProps {
  coverSrc: string;
  peekSrc?: string;
  title: string;
  badge?: string;
  edition?: string;
  totalPages?: number;
  obiText?: string;
}

/**
 * 日本の技術書・受験問題集（翔泳社・Zenn・技術書典）を思わせる、
 * 本の「帯（おび）」と紙面チラ見せを備えた立体3D書影モックアップ。
 */
export function BookMockup3D({
  coverSrc,
  peekSrc = "/samples/mock-exams/preview-zento-set1/problem.webp",
  title,
  edition = "2027年度入試最新課程対応",
  totalPages = 32,
  obiText = "【小問別加点・減点表つき】 所定解答用紙5枚付属・A4原寸印刷用PDF",
}: BookMockup3DProps) {
  return (
    <div className="relative mx-auto flex w-full max-w-md items-center justify-center py-6 select-none">
      {/* 接地シャドウ（柔らかな影） */}
      <div className="absolute -bottom-1 h-6 w-3/4 rounded-full bg-slate-900/15 blur-lg transform scale-x-95" />

      {/* 3D パースペクティブコンテナ */}
      <div className="relative flex items-center justify-center [perspective:1400px]">
        {/* ──────────────────────────────────────────────────────────
            背後のチラ見せ紙面（中身の問題用紙・解答用紙サンプル）
        ────────────────────────────────────────────────────────── */}
        <div
          className="absolute -right-5 -top-3 sm:-right-8 sm:-top-5 z-0 w-48 sm:w-60 aspect-[1/1.414] rounded-sm bg-white shadow-md border border-slate-200 overflow-hidden transform [transform:rotateY(10deg)_rotateZ(3deg)_scale(0.94)] transition-transform duration-300 hover:[transform:rotateY(5deg)_rotateZ(1deg)_scale(0.97)]"
          aria-hidden="true"
        >
          <div className="relative h-full w-full bg-slate-50">
            <Image
              src={peekSrc}
              alt="収録問題・解答用紙見本"
              fill
              sizes="(max-width: 640px) 190px, 240px"
              className="object-cover object-top opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-white/10" />
            <div className="absolute top-2 right-2 rounded bg-slate-900/90 px-2 py-0.5 text-[10px] font-semibold text-white shadow-2xs">
              立ち読みサンプル
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            前面のメイン問題冊子（表紙 ＋ 日本の出版物らしい「帯」）
        ────────────────────────────────────────────────────────── */}
        <div className="relative z-10 w-52 sm:w-64 aspect-[1/1.414] rounded-sm bg-white shadow-[0_16px_36px_-12px_rgba(15,23,42,0.22)] border border-slate-300/90 overflow-hidden transform [transform:rotateY(-8deg)_rotateZ(-1deg)] transition-all duration-300 hover:[transform:rotateY(-3deg)_rotateZ(0deg)_scale(1.02)]">
          <div className="relative h-full w-full bg-slate-50">
            <Image
              src={coverSrc}
              alt={title}
              fill
              priority
              sizes="(max-width: 640px) 210px, 260px"
              className="object-cover object-top"
            />

            {/* 背表紙の光沢・折り目シャドウ（左端） */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 via-black/5 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-1 w-px bg-white/40" />

            {/* 本の「帯（おび）」イメージ（下部に配置された日本の書籍らしい帯） */}
            <div className="absolute bottom-0 left-0 right-0 bg-slate-900/90 text-white p-2.5 backdrop-blur-xs border-t border-white/20">
              <span className="block text-[9px] font-semibold text-slate-300 tracking-wider">
                {edition}
              </span>
              <p className="mt-0.5 text-[10px] font-bold leading-tight line-clamp-2">
                {obiText}
              </p>
              <div className="mt-1 flex items-center justify-between text-[9px] text-slate-300 border-t border-white/10 pt-1">
                <span>A4版・全{totalPages}ページ</span>
                <span className="text-emerald-400 font-bold">即時ダウンロード</span>
              </div>
            </div>
          </div>

          {/* 小口（右端のページ厚み表現） */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1 bg-gradient-to-l from-slate-300 to-transparent" />
        </div>
      </div>
    </div>
  );
}
