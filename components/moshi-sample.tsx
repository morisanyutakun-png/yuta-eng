import { SampleViewer } from "@/components/look-inside";
import { SAMPLE_NOTICE, moshiSample, sampleMeta } from "@/lib/moshi/sample";

/**
 * 模試の見本。
 *
 * 申し込む前に確かめたいのは「どんな問題か」「どう採点されるのか」の2つ。
 * 文章で「記述式です」「人の手で採点します」と書くより、本番と同じ体裁の
 * 冊子を1ページずつ見せるほうが早い。
 *
 * 見せ方は書籍の試し読みとそろえてある。画像を押すと拡大でき、
 * まとめて読みたい人には PDF をそのまま渡す。
 */
export function MoshiSample({ title = "大学別オンライン数学模試 見本" }: { title?: string }) {
  const { pages, pdf } = moshiSample;

  return (
    <div className="mt-6">
      <dl className="flex flex-wrap gap-x-8 gap-y-3 border-y border-rule py-3.5">
        {[
          { k: "収めた問題", v: "大問1題", u: sampleMeta.field },
          { k: "配点", v: `${sampleMeta.points}点`, u: "この1題ぶん" },
          { k: "解答時間の目安", v: `${sampleMeta.minutes}分` },
          { k: "収録", v: "問題・解答と解説・採点基準" },
        ].map((x) => (
          <div key={x.k}>
            <dt className="text-[0.68rem] text-ink-3">{x.k}</dt>
            <dd className="mt-0.5 text-[0.92rem] font-semibold text-ink">
              {x.v}
              {x.u && <span className="ml-1.5 text-[0.7rem] font-normal text-ink-3">{x.u}</span>}
            </dd>
          </div>
        ))}
      </dl>

      <p className="prose-ja mt-4 text-[0.88rem] leading-[1.9] text-ink-2">
        本模試で出す問題の体裁・解説の書き方・採点のしかたを、{pages.length}ページそのまま載せています。
        画像を押すと拡大できます。
      </p>

      <SampleViewer pages={pages} title={title} />

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2.5">
        <a
          href={pdf}
          target="_blank"
          rel="noopener"
          className="btn"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 2.5h6l4 4v11H5z" strokeLinejoin="round" />
            <path d="M11 2.5v4h4" strokeLinejoin="round" />
          </svg>
          見本をPDFでまとめて見る
        </a>
      </div>

      <p className="prose-ja mt-4 text-[0.78rem] leading-[1.9] text-ink-3">{SAMPLE_NOTICE}</p>
    </div>
  );
}
