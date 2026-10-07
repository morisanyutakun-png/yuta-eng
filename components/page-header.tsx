import { SectionMark } from "@/components/section-mark";
import { sections, type SectionKey } from "@/lib/sections";

/**
 * ページの見出し。
 *
 * 柱ごとに形をそろえる。上端に柱の色で細い線、その下にラベル・見出し・
 * 1〜2行の説明、右に記号。最初の画面に置くのはこれだけにして、
 * 細かい前置きは下の節へ送る。詰め込むと、何のページなのかが沈む。
 *
 * ラベルと記号は同じ柱の色になる（色はページ側の `--sec` から読む）。
 * 色だけで区別させず、ラベルの文字をかならず出す。
 *
 * `meta` には年度や冊数のような短い数字を渡す。説明文の続きではなく、
 * 「どれだけあるか」を一目で示す行として使う。
 */
export function PageHeader({
  section,
  title,
  lead,
  meta,
}: {
  section: SectionKey;
  title: React.ReactNode;
  lead?: React.ReactNode;
  meta?: React.ReactNode;
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

        {/* 記号。狭い画面では文字の場所を奪うので出さない */}
        <p className="sec-tint hidden size-[5.5rem] shrink-0 items-center justify-center sm:flex lg:size-[6.5rem]">
          <SectionMark section={section} className="size-12 lg:size-14" />
        </p>
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
