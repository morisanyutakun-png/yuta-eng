import Image from "next/image";

import { moshiSample } from "@/lib/moshi/sample";

/** 架空の装飾ではなく、公開中の返却PDFそのものを見せる。 */
export function MoshiReportCover({ className = "" }: { className?: string }) {
  const front = moshiSample.return.pages[0];
  return (
    <figure className={className}>
      <a href={moshiSample.return.pdf} target="_blank" rel="noopener" className="group block border border-rule bg-white p-2 shadow-[0_3px_12px_rgba(27,58,99,0.08)]" aria-label="返却資料の共通見本をPDFで見る">
        <Image src={front.file} alt="返却見本の個人成績表。得点・参考判定・学習到達度のチャートを掲載（架空の成績）" width={front.width} height={front.height} sizes="(max-width: 1184px) 90vw, 416px" loading="lazy" className="h-auto w-full" />
        <span className="mt-2 flex items-center justify-between gap-2 border-t border-rule px-2 pt-2 text-[0.75rem] font-semibold text-navy">返却資料の共通見本<span aria-hidden="true">↗</span></span>
      </a>
      <figcaption className="mt-2 text-[0.75rem] leading-relaxed text-ink-3">A4横・表裏2ページ。大学・受験者・成績は架空です。</figcaption>
    </figure>
  );
}
