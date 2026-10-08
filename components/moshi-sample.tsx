import { SampleViewer } from "@/components/look-inside";
import { RETURN_NOTICE, SAMPLE_NOTICE, moshiSample, sampleMeta } from "@/lib/moshi/sample";
import { moshi } from "@/lib/moshi/config";

/**
 * 模試の見本。
 *
 * 申し込む前に確かめたいのは2つ。「どんな問題が出るのか」と
 * 「受験料を払って何が返ってくるのか」。
 * どちらも文章で説明するより、本番と同じ体裁の冊子を見せるほうが早い。
 *
 * 見せ方は書籍の試し読みとそろえてある。画像を押すと拡大でき、
 * まとめて読みたい人には PDF をそのまま渡す。
 */
function Booklet({
  heading,
  lead,
  notice,
  booklet,
  title,
  pdfLabel,
}: {
  heading: string;
  lead: React.ReactNode;
  notice: string;
  booklet: { pdf: string; pages: { file: string; label: string; page: number; width: number; height: number }[] };
  title: string;
  pdfLabel: string;
}) {
  return (
    <div className="mt-8 first:mt-0">
      <h3 className="text-[1rem] font-semibold text-ink">{heading}</h3>
      <p className="prose-ja mt-2 max-w-[42rem] text-[0.88rem] leading-[1.9] text-ink-2">{lead}</p>

      <SampleViewer pages={booklet.pages} title={title} />

      <p className="mt-4">
        <a href={booklet.pdf} target="_blank" rel="noopener" className="btn">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 2.5h6l4 4v11H5z" strokeLinejoin="round" />
            <path d="M11 2.5v4h4" strokeLinejoin="round" />
          </svg>
          {pdfLabel}
        </a>
      </p>

      <p className="prose-ja mt-3 text-[0.78rem] leading-[1.9] text-ink-3">{notice}</p>
    </div>
  );
}

export function MoshiSample({ title = "大学別オンライン数学模試" }: { title?: string }) {
  const { problem, ret } = { problem: moshiSample.problem, ret: moshiSample.return };

  return (
    <div className="mt-6">
      <dl className="flex flex-wrap gap-x-8 gap-y-3 border-y border-rule py-3.5">
        {[
          { k: "見本の問題", v: "大問1題", u: sampleMeta.field },
          { k: "配点", v: `${sampleMeta.points}点`, u: "この1題ぶん" },
          { k: "解答時間の目安", v: `${sampleMeta.minutes}分` },
          { k: "公開しているもの", v: "問題・解答と解説・採点基準・返却見本" },
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

      <div className="mt-6 space-y-10">
        <Booklet
          heading="1．出る問題と、採点のしかた"
          lead={`本番と同じ体裁で組んだ冊子を${problem.pages.length}ページ載せています。問題紙・解答と解説・採点基準まで、そのままご覧いただけます。画像を押すと拡大できます。`}
          notice={SAMPLE_NOTICE}
          booklet={problem}
          title={`${title} 見本問題`}
          pdfLabel="見本問題をPDFで見る"
        />

        <Booklet
          heading={`2．受験後に返ってくるもの ──「${moshi.deliverableName}」`}
          lead="採点して終わりにはしません。どこで何点落としたか、答案の書き方の何を直すか、次の2週間で何をするかまで書いてお返しします。その現物です。"
          notice={RETURN_NOTICE}
          booklet={ret}
          title={`${title} 返却見本`}
          pdfLabel="返却見本をPDFで見る"
        />
      </div>
    </div>
  );
}
