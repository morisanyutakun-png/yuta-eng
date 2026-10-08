import { SampleViewer } from "@/components/look-inside";
import { moshi } from "@/lib/moshi/config";
import { questionScore, returnSample as report, returnTotals } from "@/lib/moshi/return";
import { moshiSample, RETURN_NOTICE } from "@/lib/moshi/sample";
import { site } from "@/lib/site";

const tones = {
  blue: { text: "text-[#327ab1]", bar: "bg-[#327ab1]" },
  teal: { text: "text-[#167e88]", bar: "bg-[#167e88]" },
  amber: { text: "text-[#986014]", bar: "bg-[#b97416]" },
};

/** PDF を開く前にも読める概要。得点と助言は PDF と同じ JSON から表示する。 */
export function MoshiReturnSample() {
  const rate = ((returnTotals.score / returnTotals.max) * 100).toFixed(1);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 className="text-[1rem] font-semibold text-ink">
          1．受験後の返却レポート「{moshi.deliverableName}」
        </h3>
        <span className="rounded-full bg-[#eaf6f6] px-3 py-1 text-[0.72rem] font-semibold text-[#167e88]">
          カラー・全{moshiSample.return.pages.length}ページ
        </span>
      </div>
      <p className="prose-ja mt-2 max-w-[42rem] text-[0.88rem] leading-[1.9] text-ink-2">
        1ページ目は得点と分野別の結果、2ページ目は答案への講評と復習プラン。
        まず結果の全体像をつかみ、次に取り組むことが分かる形でお返しします。
      </p>

      <div className="mt-5 overflow-hidden rounded-lg border border-[#dce6ec] bg-white">
        <div className="border-t-4 border-[#173d57] bg-[#f3f7fa] px-5 py-5 sm:px-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[0.7rem] font-semibold tracking-wide text-[#167e88]">{site.name}</p>
            <span className="rounded border border-[#c6dfe3] bg-white px-2 py-0.5 text-[0.68rem] font-semibold text-[#167e88]">
              架空の成績例
            </span>
          </div>
          <h4 className="mt-2 text-[1.35rem] font-bold tracking-tight text-[#173d57] sm:text-[1.55rem]">
            個人成績レポート
          </h4>
          <p className="mt-1 text-[0.78rem] text-ink-2">
            {report.university} {report.course}・第{moshi.round}回
            <span className="mx-2 text-rule-2">／</span>
            {report.candidate} 様
          </p>
        </div>

        <div className="px-5 py-6 sm:px-7 sm:py-7">
          <div className="grid gap-5 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] sm:items-center sm:gap-7">
            <div className="rounded-md bg-[#173d57] px-5 py-4 text-white sm:px-6">
              <p className="text-[0.75rem] font-semibold text-white/85">数学・総合得点</p>
              <p className="mt-1 flex items-baseline gap-2 tabular-nums">
                <span className="text-[3.2rem] font-bold leading-tight">{returnTotals.score}</span>
                <span className="text-[1.1rem] text-white/80">/ {returnTotals.max} 点</span>
              </p>
              <p className="mt-1 text-[0.78rem] text-white/85">得点率 {rate}%</p>
            </div>
            <div>
              <p className="text-[0.76rem] font-semibold text-[#167e88]">採点者からのひとこと</p>
              <p className="prose-ja mt-2 text-[0.95rem] leading-[1.9] text-[#173d57]">{report.summary}</p>
            </div>
          </div>

          <div className="mt-7 grid gap-7 lg:grid-cols-2 lg:gap-10">
            <div>
              <p className="text-[0.87rem] font-semibold text-[#173d57]">分野別の得点バランス</p>
              <ul className="mt-4 space-y-4">
                {report.questions.map((q) => {
                  const result = questionScore(q);
                  const tone = tones[q.tone];
                  return (
                    <li key={q.no}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <p className="text-[0.83rem] font-semibold text-ink">
                          {q.field}
                          <span className={`ml-2 text-[0.7rem] font-normal ${tone.text}`}>{q.status}</span>
                        </p>
                        <p className="text-[0.8rem] tabular-nums text-ink-2">
                          <span className="font-semibold text-[#173d57]">{result.score}</span> / {result.max}
                          <span className="ml-2 text-[0.7rem]">{result.rate.toFixed(0)}%</span>
                        </p>
                      </div>
                      <div aria-hidden="true" className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#e4ecf1]">
                        <div className={`h-full rounded-full ${tone.bar}`} style={{ width: `${result.rate}%` }} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <table className="w-full border-collapse text-left text-[0.77rem] tabular-nums">
                <caption className="pb-3 text-left text-[0.87rem] font-semibold text-[#173d57]">小問ごとの得点 / 配点</caption>
                <thead>
                  <tr className="bg-[#f3f7fa] text-[0.7rem] text-ink-3">
                    <th scope="col" className="px-2 py-2 font-normal">大問</th>
                    {[1, 2, 3].map((n) => <th key={n} scope="col" className="px-2 py-2 text-right font-normal">({n})</th>)}
                  </tr>
                </thead>
                <tbody>
                  {report.questions.map((q) => (
                    <tr key={q.no} className="border-b border-[#e4ecf1]">
                      <th scope="row" className="px-2 py-3 font-medium text-ink-2">{q.no}・{q.field}</th>
                      {q.subs.map((s) => (
                        <td key={s.no} className="px-2 py-3 text-right whitespace-nowrap text-ink-3">
                          <span className={`font-semibold ${tones[q.tone].text}`}>{s.score}</span> / {s.max}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {[
              { label: "今回の強み", ...report.strength, bg: "bg-[#eaf6f6]", color: "text-[#167e88]" },
              { label: "優先して復習", ...report.focus, bg: "bg-[#fff5e6]", color: "text-[#986014]" },
            ].map((p) => (
              <div key={p.label} className={`rounded-md px-4 py-3.5 ${p.bg}`}>
                <p className={`text-[0.7rem] font-semibold ${p.color}`}>{p.label}</p>
                <p className="mt-1 text-[0.88rem] font-semibold text-[#173d57]">{p.title}</p>
                <p className="prose-ja mt-1 text-[0.79rem] leading-[1.8] text-ink-2">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-[#dce6ec] pt-5">
            <p className="text-[0.87rem] font-semibold text-[#173d57]">次の2週間の復習プラン</p>
            <ol className="mt-3 grid gap-4 sm:grid-cols-3">
              {report.plan.map((p, i) => (
                <li key={p.days} className="border-l-2 border-[#b9dce0] pl-3">
                  <p className="text-[0.7rem] font-semibold text-[#167e88]">0{i + 1}<span className="ml-2">{p.days}</span></p>
                  <p className="mt-1 text-[0.83rem] font-semibold text-[#173d57]">{p.title}</p>
                  <p className="prose-ja mt-1 text-[0.76rem] leading-[1.8] text-ink-2">{p.task}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <p className="border-t border-[#dce6ec] bg-[#f3f7fa] px-5 py-3 text-[0.72rem] leading-[1.8] text-ink-3 sm:px-7">
          全3大問の架空例です。数列は公開見本の1題に対応し、ベクトル・確率は返却形式を示す例です。
          平均点・偏差値・順位分布は、大学ごとの受験者が{moshi.statsMin}名以上の回に掲載します。
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <a href={moshiSample.return.pdf} target="_blank" rel="noopener" className="btn">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 2.5h6l4 4v11H5zM11 2.5v4h4" strokeLinejoin="round" />
          </svg>
          返却サンプルPDFを見る（全{moshiSample.return.pages.length}ページ）
        </a>
        <span className="text-[0.75rem] text-ink-3">答案への講評・復習プランも収録</span>
      </div>
      <details className="mt-4 rounded-md border border-rule px-4 py-3 sm:px-5">
        <summary className="cursor-pointer text-[0.82rem] font-semibold text-navy">PDFの2ページをプレビューする</summary>
        <SampleViewer pages={moshiSample.return.pages} title="三重大学 理系数学 返却サンプル" layout="spread" />
      </details>
      <p className="prose-ja mt-3 text-[0.75rem] leading-[1.9] text-ink-3">{RETURN_NOTICE}</p>
    </div>
  );
}
