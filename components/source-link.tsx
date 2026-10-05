import { NOT_OFFICIAL } from "@/lib/solutions";
import type { Source } from "@/lib/solutions/types";

/**
 * 原典（大学公式の問題公開ページ）への案内。
 *
 * ・問題文はこのサイトに置かない。見たい人は大学の公開ページへ行ってもらう
 * ・ふつうの文字リンクで出す。iframe で埋め込んだり、PDF をこちらへ写したりしない
 * ・大学のロゴは使わない。公式・公認と誤解されないよう、リンクの文言で行き先を示す
 */
export function SourceLink({ source, division }: { source: Source; division?: string }) {
  return (
    <section aria-labelledby="source" className="mt-6 border border-rule bg-paper-2/60 px-5 py-4">
      <h2 id="source" className="text-[0.78rem] font-bold tracking-wide text-ink-2">
        問題文について
      </h2>
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
          className="inline-flex min-h-11 items-center gap-1.5 text-[0.9rem] font-semibold text-navy underline underline-offset-4"
        >
          問題文を見る（{source.publisher}公式・外部サイト{source.kind === "pdf" ? "・PDF" : ""}）
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 4h9v9M16 4 6 14" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </p>
      <p className="mt-1.5 text-[0.72rem] leading-relaxed text-ink-3">
        掲載ページ名「{source.pageTitle}」／{source.checked.replace(/-/g, "/")}に当サイトでリンク先を確認。
        公開年度は大学側の都合で入れ替わることがあります。
      </p>
    </section>
  );
}
