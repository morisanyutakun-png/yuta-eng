import { CoverFan } from "@/components/cover-fan";
import { sections, type SectionKey } from "@/lib/sections";

/**
 * ページの見出し。
 *
 * 柱ごとに形をそろえる。上端に柱の色で細い線、その下にラベル・見出し・
 * 1〜2行の説明、右に記号。最初の画面に置くのはこれだけにして、
 * 細かい前置きは下の節へ送る。詰め込むと、何のページなのかが沈む。
 *
 * ラベルと上端の線は同じ柱の色になる（色はページ側の `--sec` から読む）。
 * 色だけで区別させず、ラベルの文字をかならず出す。
 *
 * 右に置くのは、そのページから辿れる**実物の表紙**。
 * 線画の記号を置いていたが、何のことか分からないうえ素っ気なく、
 * 刊行物を出しているサイトの見出しとしては弱かった。
 *
 * `meta` には年度や冊数のような短い数字を渡す。説明文の続きではなく、
 * 「どれだけあるか」を一目で示す行として使う。
 */
export function PageHeader({
  section,
  title,
  lead,
  meta,
  covers,
}: {
  section: SectionKey;
  title: React.ReactNode;
  lead?: React.ReactNode;
  meta?: React.ReactNode;
  /** 見出しの横に並べる表紙（最大3枚）。そのページから辿れる本にする */
  covers?: string[];
}) {
  return (
    <header className="border-b border-rule pb-8">
      <div className="sec-rule" />
      <div className="flex items-start gap-6 pt-7">
        <div className="min-w-0 flex-1">
          <p className="eyebrow">{sections[section].eyebrow}</p>
          <h1 className="serif h-page mt-2 text-ink">{title}</h1>
          {lead && (
            <p className="prose-ja mt-4 max-w-[38rem] text-[0.95rem] text-ink-2">{lead}</p>
          )}
        </div>

        {/* 表紙。狭い画面では文字の場所を奪うので出さない */}
        {covers?.length ? <CoverFan covers={covers} className="hidden shrink-0 pt-1 sm:flex" priority /> : null}
      </div>

      {meta && <div className="mt-6">{meta}</div>}
    </header>
  );
}

/**
 * 見出しに添える数字の並び。
 *
 * 「何大学・何年分」のような値を、単位を小さく添えて横に並べる。
 * 文章で書くと読み飛ばされ、表にすると大げさになる量のときに使う。
 */
export function HeaderStats({ items }: { items: { k: string; v: React.ReactNode; u?: string }[] }) {
  return (
    <dl className="flex flex-wrap gap-x-9 gap-y-4">
      {items.map((s) => (
        <div key={s.k}>
          <dt className="text-[0.68rem] text-ink-3">{s.k}</dt>
          <dd className="serif mt-1 leading-none text-ink">
            <span className="text-[1.6rem] tabular-nums">{s.v}</span>
            {s.u && <span className="ml-0.5 font-sans text-[0.7rem] font-normal text-ink-3">{s.u}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
