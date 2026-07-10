import { AppScreen } from "@/components/app-screens";

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
  return <AppScreen variant="home" className={className} />;
}
