/** 本物の公式演習本ページ（PDF からレンダリングした実画像）。 */
export function PrintImage({
  base,
  alt,
  className,
  sizes = "(min-width: 1024px) 460px, 80vw",
  priority = false,
}: {
  base: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`/prints/${base}-620.avif 620w, /prints/${base}-960.avif 960w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`/prints/${base}-620.webp 620w, /prints/${base}-960.webp 960w`}
        sizes={sizes}
      />
      <img
        src={`/prints/${base}-960.webp`}
        alt={alt}
        width={1241}
        height={1754}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        className={className}
      />
    </picture>
  );
}

/**
 * ブランドイラスト（public/illust の AVIF・WebP・PNG フォールバック）。
 * `base` は scripts/convert-illustrations.mjs の出力ベース名、`widths` はその幅。
 */
export function Illust({
  base,
  widths,
  width,
  height,
  alt,
  className,
  sizes = "(min-width: 1024px) 520px, 90vw",
  priority = false,
}: {
  base: string;
  widths: [number, number];
  width: number;
  height: number;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [small, large] = widths;
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`/illust/${base}-${small}.avif ${small}w, /illust/${base}-${large}.avif ${large}w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`/illust/${base}-${small}.webp ${small}w, /illust/${base}-${large}.webp ${large}w`}
        sizes={sizes}
      />
      <img
        src={`/illust/${base}-${large}.webp`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        className={className}
      />
    </picture>
  );
}

/** マスコット「ノビットくん」（透過 PNG / AVIF・WebP）。 */
export function Mascot({ variant, className }: { variant: "wave" | "point"; className?: string }) {
  const base = variant === "wave" ? "nobit-kun-wave" : "nobit-kun-point";
  const w = variant === "wave" ? 740 : 887;
  const h = variant === "wave" ? 896 : 976;
  return (
    <picture>
      <source type="image/avif" srcSet={`/brand/${base}-240.avif 240w, /brand/${base}-480.avif 480w`} sizes="200px" />
      <source type="image/webp" srcSet={`/brand/${base}-240.webp 240w, /brand/${base}-480.webp 480w`} sizes="200px" />
      <img
        src={`/brand/${base}-480.webp`}
        alt="ノビットスタディのマスコット「ノビットくん」"
        width={w}
        height={h}
        loading="lazy"
        decoding="async"
        className={className}
      />
    </picture>
  );
}

/**
 * 各セクションの空きスペースに「立っている」マスコット。接地影＋ステージ発光で
 * 背景に馴染ませる（明るい面に貼り付いた感を出さない）。デスクトップのみ表示。
 */
export function GroundedMascot({
  variant,
  position,
  sizeClass,
}: {
  variant: "wave" | "point";
  position: string;
  sizeClass: string;
}) {
  return (
    <div className={`pointer-events-none absolute z-10 hidden lg:block ${position}`}>
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[46%] -z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(13,148,136,0.18),rgba(29,78,216,0.06)_55%,transparent)] blur-xl"
        />
        <Mascot variant={variant} className={`relative w-auto ${sizeClass}`} />
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-1/2 h-3.5 w-24 -translate-x-1/2 rounded-[50%] bg-[rgba(11,29,74,0.15)] blur-[6px]"
        />
      </div>
    </div>
  );
}

/**
 * 添削管理アプリ「ノビットスタディ」の画面を、電話フレームで再現したモック。
 * 進捗・連続日数・添削の返却・課題が一目で分かり、家庭でも同じ画面を確認できる。
 */
export function AppMock({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-[270px] shrink-0 ${className}`}>
      {/* 端末ベゼル */}
      <div className="rounded-[2.4rem] bg-[#0b1d4a] p-2.5 shadow-[0_50px_80px_-40px_rgba(11,29,74,0.7)] ring-1 ring-white/10">
        <div className="relative overflow-hidden rounded-[1.9rem] bg-[#eef3fb]">
          {/* ノッチ */}
          <div className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-[#0b1d4a]" />
          <div className="px-3 pb-4 pt-7">
            {/* ヘッダーカード */}
            <div className="relative overflow-hidden rounded-[16px] bg-[linear-gradient(120deg,#1d4ed8_0%,#0d9488_100%)] p-3.5 text-white">
              <div className="pr-12">
                <p className="text-[0.82rem] font-extrabold leading-tight">こんにちは、山田太郎 さん</p>
                <p className="mt-1 text-[0.6rem] leading-snug text-white/85">未提出の課題が2件あります。</p>
              </div>
              <img
                src="/brand/nobit-kun-wave-240.webp"
                alt=""
                width={740}
                height={896}
                loading="lazy"
                decoding="async"
                className="absolute -bottom-2 right-1 h-16 w-auto drop-shadow-[0_6px_8px_rgba(11,29,74,0.3)]"
              />
              <div className="mt-3 flex gap-1.5">
                {[
                  { t: "1日", s: "れんぞく" },
                  { t: "合格 2", s: "記録" },
                  { t: "はじめ", s: "称号" },
                ].map((c) => (
                  <div key={c.s} className="flex-1 rounded-[8px] bg-white/15 px-1.5 py-1 text-center ring-1 ring-white/20">
                    <p className="text-[0.6rem] font-bold leading-none">{c.t}</p>
                    <p className="mt-0.5 text-[0.48rem] text-white/80">{c.s}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 返却の通知 */}
            <div className="mt-2.5 flex items-center gap-2 rounded-[12px] border-l-[3px] border-[#16a34a] bg-[#eafaf0] px-2.5 py-2">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#16a34a] text-[0.7rem] text-white">✓</span>
              <p className="text-[0.62rem] font-bold leading-snug text-[#0b1d4a]">
                返却タブに添削が2件届いています
              </p>
            </div>

            {/* 今日の学習 */}
            <div className="mt-2.5 rounded-[12px] bg-white p-3 ring-1 ring-[rgba(15,29,74,0.06)]">
              <p className="text-[0.66rem] font-extrabold text-[#0b1d4a]">今日の学習</p>
              <ul className="mt-2 grid gap-1.5">
                {[
                  { s: "課題", t: "物理入門演習", c: "#1d4ed8" },
                  { s: "自己採点", t: "解答解説を確認", c: "#0d9488" },
                ].map((q) => (
                  <li key={q.s} className="flex items-center gap-2 rounded-[8px] bg-[#f8fafc] px-2 py-1.5">
                    <span
                      className="shrink-0 rounded-[5px] px-1.5 py-0.5 text-[0.5rem] font-bold text-white"
                      style={{ background: q.c }}
                    >
                      {q.s}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[0.6rem] font-semibold text-[#334155]">{q.t}</span>
                    <span className="shrink-0 rounded-full bg-[#f97316] px-2 py-0.5 text-[0.5rem] font-bold text-white">開く</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* がんばりメーター */}
            <div className="mt-2.5 rounded-[12px] bg-white p-3 ring-1 ring-[rgba(15,29,74,0.06)]">
              <div className="flex items-center justify-between">
                <p className="text-[0.66rem] font-extrabold text-[#0b1d4a]">がんばりメーター</p>
                <p className="text-[0.52rem] font-semibold text-[#0f766e]">あと1こで昇格</p>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e2e8f0]">
                <div className="h-full w-[78%] rounded-full bg-[linear-gradient(90deg,#1d4ed8,#0d9488)]" />
              </div>
              <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-center">
                {[
                  { n: "2", l: "合格", c: "#ea580c" },
                  { n: "2", l: "完了", c: "#16a34a" },
                  { n: "4", l: "今週の提出", c: "#1d4ed8" },
                ].map((s) => (
                  <div key={s.l} className="rounded-[8px] bg-[#f8fafc] py-1.5">
                    <p className="text-[0.86rem] font-extrabold leading-none" style={{ color: s.c }}>
                      {s.n}
                    </p>
                    <p className="mt-0.5 text-[0.48rem] text-[#64748b]">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
