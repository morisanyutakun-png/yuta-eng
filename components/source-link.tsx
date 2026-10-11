import { NOT_OFFICIAL } from "@/lib/solutions";
import type { Source } from "@/lib/solutions/types";

/**
 * 問題をどこで見るかの案内。
 *
 * このサイトは問題文・図・表を1つも載せない。載せないかぎり、大学の入試問題を
 * 複製も公衆送信もしていないので、各大学が「2次利用」に付けている条件を踏まない。
 * だからここでやるのは、公式の公開先があればふつうの文字リンクを張る、それだけ。
 *
 * ・iframe で公式ページや PDF を埋め込まない
 * ・問題 PDF を自分のサーバーへ写さない
 * ・大学のロゴを使わない（公式・公認と誤解されないため）
 * ・公式以外の、問題を転載しているサイトへはリンクしない
 */
export function SourceLink({ source, division }: { source: Source; division?: string }) {
  return (
    <section aria-labelledby="source" className="mt-6 border border-rule bg-paper-2/60 px-5 py-4">
      <h2 id="source" className="text-[0.8rem] font-bold tracking-wide text-ink-2">
        問題文について
      </h2>

      {source.kind === "official" ? (
        <>
          <p className="prose-ja mt-1.5 text-[0.86rem] leading-[1.9] text-ink-2">
            {NOT_OFFICIAL}
            {division && `${division}の`}問題文は{source.publisher}が公開しています。
          </p>
          <p className="mt-2.5">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              data-outbound="source"
              className="inline-flex min-h-11 items-center gap-1.5 text-[0.93rem] font-semibold text-navy underline underline-offset-4"
            >
              問題文を見る（{source.publisher}公式・外部サイト{source.target === "pdf" ? "・PDF" : ""}）
              <svg aria-hidden="true" viewBox="0 0 20 20" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 4h9v9M16 4 6 14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </p>
          <p className="mt-1.5 text-[0.75rem] leading-relaxed text-ink-3">
            掲載ページ名「{source.pageTitle}」／{source.checked.replace(/-/g, "/")}に当サイトでリンク先を確認。
            公開年度は大学側の都合で入れ替わることがあります。
          </p>
        </>
      ) : (
        <>
          <p className="prose-ja mt-1.5 text-[0.86rem] leading-[1.9] text-ink-2">
            {NOT_OFFICIAL}
            {division && `${division}の`}問題文は、この年度については大学が公開していません
            （{source.checked.replace(/-/g, "/")}時点）。お手元の過去問集・赤本などでご確認ください。
          </p>
          <p className="mt-1.5 text-[0.75rem] leading-relaxed text-ink-3">
            問題を転載している非公式サイトへのリンクは、当サイトでは行っていません。
          </p>
        </>
      )}
    </section>
  );
}
