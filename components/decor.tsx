/** セクションに奥行きを出すやわらかい光（装飾）。overflow-hidden な relative 親に置く。 */
export function SectionGlow({
  className = "",
  color = "rgba(13,148,136,0.14)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-0 h-80 w-80 rounded-full blur-3xl ${className}`}
      style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
    />
  );
}

/**
 * ヒーローのスマホ背面に敷く装飾クラスター（リング・ドット・きらめき・光）。
 * relative な親に置き、スマホ本体は z-10 以上にする。
 */
export function PhoneBackdrop() {
  const Spark = ({ className }: { className: string }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 1.5 L14 9.2 L21.8 11.2 L14 13.2 L12 21 L10 13.2 L2.2 11.2 L10 9.2 Z" />
    </svg>
  );
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      {/* やわらかい光のオーブ */}
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,0.2),rgba(13,148,136,0.1)_55%,transparent)] blur-2xl sm:h-[26rem] sm:w-[26rem]" />
      {/* アウトラインのリング */}
      <div className="absolute right-[4%] top-[4%] h-40 w-40 rounded-full border-2 border-[rgba(124,58,237,0.16)] sm:h-52 sm:w-52" />
      <div className="absolute -left-2 bottom-[10%] h-28 w-28 rounded-full border-2 border-[rgba(13,148,136,0.2)]" />
      <div className="absolute right-[16%] bottom-[4%] h-16 w-16 rounded-full border border-dashed border-[rgba(29,78,216,0.22)]" />
      {/* 点在するドット */}
      <span className="absolute left-[8%] top-[22%] h-2.5 w-2.5 rounded-full bg-[#7c3aed]/60" />
      <span className="absolute right-[10%] top-[42%] h-2 w-2 rounded-full bg-[#0d9488]/70" />
      <span className="absolute left-[14%] bottom-[16%] h-2 w-2 rounded-full bg-[#f97316]/70" />
      <span className="absolute right-[24%] top-[10%] h-1.5 w-1.5 rounded-full bg-[#1d4ed8]/60" />
      {/* きらめき */}
      <Spark className="absolute left-[4%] top-[46%] h-6 w-6 text-[#f97316]/70" />
      <Spark className="absolute right-[6%] top-[62%] h-5 w-5 text-[#38bdf8]/70" />
      <Spark className="absolute left-[20%] top-[8%] h-4 w-4 text-[#7c3aed]/60" />
    </div>
  );
}

/** ゆるやかな曲線の区切り（上に凸）。暗い/明るいセクションの境目に立体感を出す。 */
export function CurveDivider({ fill, flip = false }: { fill: string; flip?: boolean }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 ${flip ? "bottom-0 rotate-180" : "top-0"} leading-[0]`}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="h-[36px] w-full sm:h-[52px]">
        <path d="M0,60 C360,0 1080,0 1440,60 L1440,0 L0,0 Z" fill={fill} />
      </svg>
    </div>
  );
}
