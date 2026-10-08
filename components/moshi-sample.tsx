import { SampleViewer } from "@/components/look-inside";
import { InfoDetails } from "@/components/info-details";
import { MoshiReturnSample } from "@/components/moshi-return-sample";
import { moshi } from "@/lib/moshi/config";
import { SAMPLE_NOTICE, moshiSample, sampleMeta } from "@/lib/moshi/sample";

/**
 * 模試の見本。
 *
 * 申し込む前に確かめたいのは2つ。「どんな問題が出るのか」と
 * 「受験料を払って何が返ってくるのか」。
 * 返却レポートは読める概要を先に、問題冊子はページ画像で見せる。
 *
 * PDF のプレビューは画像を押すと拡大でき、
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

      <InfoDetails title="問題・解答・採点基準のページを開く">
        <SampleViewer pages={booklet.pages} title={title} />
        <p className="prose-ja mt-3 text-[0.78rem] leading-[1.9] text-ink-3">{notice}</p>
      </InfoDetails>

      <p className="mt-4">
        <a href={booklet.pdf} target="_blank" rel="noopener" className="btn">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 2.5h6l4 4v11H5z" strokeLinejoin="round" />
            <path d="M11 2.5v4h4" strokeLinejoin="round" />
          </svg>
          {pdfLabel}
        </a>
      </p>

    </div>
  );
}

export function MoshiSample() {
  const { problem } = moshiSample;

  return (
    <div className="mt-6">
      <p className="prose-ja border-l-2 border-rule pl-3 text-[0.8rem] leading-[1.9] text-ink-3">
        全大学共通の架空サンプルです。実際の試験時間・大問数・配点は大学ごとに異なります。
      </p>
      <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-3 border-y border-rule py-3.5">
        {[
          { k: "見本の問題", v: "大問1題", u: sampleMeta.field },
          { k: "配点", v: `${sampleMeta.points}点`, u: "この1題ぶん" },
          { k: "解答時間の目安", v: `${sampleMeta.minutes}分` },
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
        <MoshiReturnSample />

        <Booklet
          heading="2．出る問題と、採点のしかた"
          lead={`${sampleMeta.field}1題・${sampleMeta.points}点・目安${sampleMeta.minutes}分。問題・解答・採点基準を全${problem.pages.length}ページで確認できます。`}
          notice={SAMPLE_NOTICE}
          booklet={problem}
          title={`${moshi.title} 共通見本問題`}
          pdfLabel="見本問題をPDFで見る"
        />
      </div>
    </div>
  );
}
