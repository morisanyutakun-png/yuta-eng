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
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* やわらかい光のオーブ */}
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,0.2),rgba(13,148,136,0.1)_55%,transparent)] blur-2xl sm:h-[26rem] sm:w-[26rem]" />
      {/* 塗りのソフト円・楕円 */}
      <div className="absolute right-[2%] top-[8%] h-44 w-56 -rotate-12 rounded-[50%] bg-[rgba(124,58,237,0.06)]" />
      <div className="absolute -left-10 bottom-[8%] h-40 w-40 rounded-full bg-[rgba(13,148,136,0.07)]" />
      {/* アウトラインのリング（真円・楕円） */}
      <div className="absolute right-[3%] top-[3%] h-44 w-44 rounded-full border-2 border-[rgba(124,58,237,0.16)] sm:h-56 sm:w-56" />
      <div className="absolute -left-4 bottom-[6%] h-28 w-44 rotate-[18deg] rounded-[50%] border-2 border-[rgba(13,148,136,0.2)]" />
      <div className="absolute right-[18%] bottom-[2%] h-16 w-16 rounded-full border border-dashed border-[rgba(29,78,216,0.22)]" />
      {/* 半円（見切れ） */}
      <div className="absolute -right-8 top-1/2 h-32 w-16 -translate-y-1/2 rounded-l-full border-2 border-r-0 border-[rgba(56,189,248,0.28)]" />
      <div className="absolute left-[6%] top-[6%] h-12 w-24 rounded-t-full border-2 border-b-0 border-[rgba(249,115,22,0.22)]" />
      {/* 点在するドット */}
      <span className="absolute left-[8%] top-[24%] h-2.5 w-2.5 rounded-full bg-[#7c3aed]/60" />
      <span className="absolute right-[10%] top-[42%] h-2 w-2 rounded-full bg-[#0d9488]/70" />
      <span className="absolute left-[15%] bottom-[18%] h-2 w-2 rounded-full bg-[#f97316]/70" />
      <span className="absolute right-[26%] top-[12%] h-1.5 w-1.5 rounded-full bg-[#1d4ed8]/60" />
      <span className="absolute left-[3%] top-[62%] h-1.5 w-1.5 rounded-full bg-[#38bdf8]/70" />
      {/* きらめき */}
      <Spark className="absolute left-[3%] top-[46%] h-6 w-6 text-[#f97316]/70" />
      <Spark className="absolute right-[5%] top-[64%] h-5 w-5 text-[#38bdf8]/70" />
      <Spark className="absolute left-[22%] top-[9%] h-4 w-4 text-[#7c3aed]/60" />
    </div>
  );
}

/**
 * ダークなセクション（濃紺の帯）用の装飾。大きな半円・楕円・同心円・光を
 * 白/ティールの低透明度で敷き、広がりと設計された印象を出す。
 * overflow-hidden な relative 親（＝暗いセクション）に置く。
 */
export function DarkSectionDecor() {
  const Spark = ({ className }: { className: string }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 1.5 L14 9.2 L21.8 11.2 L14 13.2 L12 21 L10 13.2 L2.2 11.2 L10 9.2 Z" />
    </svg>
  );
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* 右上：同心円（見切れ） */}
      <div className="absolute -right-40 -top-44 h-[26rem] w-[26rem] rounded-full border border-white/10" />
      <div className="absolute -right-56 -top-60 h-[38rem] w-[38rem] rounded-full border border-white/[0.06]" />
      {/* 左下：ソフトなティールの楕円ブロブ */}
      <div className="absolute -left-24 bottom-[-25%] h-80 w-[40rem] rounded-[50%] bg-[radial-gradient(closest-side,rgba(94,234,212,0.16),transparent)] blur-2xl" />
      {/* 有機的なブロブ（暗い帯にも色のうねりを） */}
      <Blob fill="#5eead4" className="absolute -bottom-20 -left-16 h-80 w-80 opacity-[0.12]" />
      <Blob fill="#818cf8" className="absolute -top-24 right-[4%] h-72 w-72 opacity-[0.14]" />
      {/* 左上：見切れの半円（塗り） */}
      <div className="absolute -left-28 top-[12%] h-56 w-56 rounded-full bg-white/[0.035]" />
      {/* 下中央：大きな半円のアウトライン（上向き） */}
      <div className="absolute -bottom-24 left-1/2 h-48 w-[30rem] -translate-x-1/2 rounded-t-full border border-white/[0.08]" />
      {/* 右：小さめ楕円 */}
      <div className="absolute right-[8%] bottom-[16%] h-20 w-36 rotate-[-16deg] rounded-[50%] border border-[rgba(94,234,212,0.22)]" />
      {/* ドット・きらめき */}
      <span className="absolute left-[10%] top-[20%] h-2 w-2 rounded-full bg-[#5eead4]/50" />
      <span className="absolute right-[14%] top-[26%] h-1.5 w-1.5 rounded-full bg-white/40" />
      <span className="absolute left-[24%] bottom-[18%] h-1.5 w-1.5 rounded-full bg-[#7dd3fc]/50" />
      <Spark className="absolute right-[20%] top-[16%] h-5 w-5 text-[#5eead4]/45" />
      <Spark className="absolute left-[8%] bottom-[26%] h-4 w-4 text-white/35" />
    </div>
  );
}

/** 有機的なブロブ形（きれいな円ではない“手で描いた塊”）。色のインパクト用。 */
export function Blob({ className = "", fill }: { className?: string; fill: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <path
        fill={fill}
        transform="translate(100 100)"
        d="M54,-62C68,-49,76,-30,78,-10C80,10,76,31,64,47C52,63,32,74,11,77C-11,80,-33,75,-51,63C-69,51,-83,32,-85,12C-87,-8,-77,-30,-63,-46C-49,-62,-31,-72,-11,-74C9,-76,28,-75,54,-62Z"
      />
    </svg>
  );
}

/** CTAの脇に添える手描きの誘導（手書き調メモ＋採点ペン風矢印）。relative な CTA 親に置く。 */
export function CtaDoodle({ label = "まずは、ここから！" }: { label?: string }) {
  return (
    <div aria-hidden="true" className="absolute -right-2 -top-14 hidden items-end gap-1 lg:flex">
      <span
        className="-rotate-6 text-[1.05rem] font-extrabold text-[#ea580c]"
        style={{ fontFamily: "'Hiragino Mincho ProN','YuMincho',serif" }}
      >
        {label}
      </span>
      <MarkerArrow className="h-11 w-12 -scale-x-100 rotate-[8deg] text-[#ea580c]" />
    </div>
  );
}

/** 採点ペン風の手描き矢印（曲線＋矢じり）。人の手の気配を出す。 */
export function MarkerArrow({ className = "", color = "#f97316" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 120 96" fill="none" aria-hidden="true" className={className}>
      {/* 曲線：終点(96,58)へ、接線は右下向き（16,40）で入る */}
      <path d="M10 8 C 44 4, 80 18, 96 58" stroke={color} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* 矢じり：接線の逆向き（左上）へ左右対称に開くV字。先端(96,58)で連結 */}
      <path d="M79 44 L96 58 L98 36" stroke={color} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
