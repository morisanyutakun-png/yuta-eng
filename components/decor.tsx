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
