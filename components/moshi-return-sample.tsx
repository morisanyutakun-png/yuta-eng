import { LogoMark } from "@/components/logo";
import { InfoDetails } from "@/components/info-details";
import { SampleViewer } from "@/components/look-inside";
import { ReturnDistribution, ReturnRadar } from "@/components/moshi-return-charts";
import { moshi, returnLine } from "@/lib/moshi/config";
import { questionScore, returnSample as report, returnStatistics, returnTotals } from "@/lib/moshi/return";
import { moshiSample, RETURN_NOTICE } from "@/lib/moshi/sample";
import { site } from "@/lib/site";

/** 個人成績表の読める概要。ブランド・得点は返却 PDF と揃える。 */
export function MoshiReturnSample() {
  const rate = ((returnTotals.score / returnTotals.max) * 100).toFixed(1);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 className="text-[1rem] font-semibold text-ink">1．受験後の返却資料</h3>
        <span className="border border-[#b9c9d6] px-2 py-0.5 text-[0.7rem] text-[#366c97]">
          A4横・表裏{moshiSample.return.pages.length}ページ・カラー
        </span>
      </div>
      <p className="prose-ja mt-2 text-[0.86rem] leading-relaxed text-ink-2">表：成績・参考判定・学習到達度。裏：講評・復習計画。採点済み答案は別添PDFで返却します。</p>
      <p className="mt-2 text-[0.75rem] leading-relaxed text-ink-3">判定は数学のみの現状評価で、合格確率ではありません。大学・受験者・成績は架空の共通見本です。</p>

      <InfoDetails title="個人成績表の内容・グラフを見る">
      <div className="border border-[#b9c9d6] bg-white px-3 py-4 sm:px-7 sm:py-7">
        <div className="flex items-start justify-between gap-3 border-b-2 border-[#183d62] pb-4">
          <div className="flex items-center gap-3">
            <LogoMark className="size-9 shrink-0 text-[#183d62]" />
            <div>
              <p className="serif text-[1.03rem] font-semibold text-[#183d62]">{site.name}</p>
              <p className="mt-0.5 text-[0.72rem] font-medium leading-relaxed text-ink-3">{moshi.title}</p>
            </div>
          </div>
          <span className="shrink-0 border border-[#183d62] px-2 py-1 text-[0.65rem] text-[#183d62]">返却見本</span>
        </div>
        <p className="mt-4 text-[0.8rem] font-semibold text-[#183d62]">
          {report.university} {report.course}・第{report.round}回
        </p>
        <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h4 className="text-[1.5rem] font-bold tracking-tight text-ink">個人成績表</h4>
          <p className="text-[0.7rem] text-ink-3">{moshi.deliverableName} / 架空の成績例</p>
        </div>
        <dl className="mt-4 grid border border-[#b9c9d6] sm:grid-cols-3">
          {[
            { label: "氏名 / 受験番号", value: report.candidate + " 様", note: report.number },
            { label: "受験日", value: report.examDate.replaceAll("-", " / ") },
            { label: "返却日", value: report.returnDate.replaceAll("-", " / ") },
          ].map((d) => (
            <div key={d.label} className="border-b border-[#b9c9d6] px-3 py-2.5 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0">
              <dt className="text-[0.65rem] text-ink-3">{d.label}</dt>
              <dd className="mt-1 text-[0.82rem] font-medium text-ink">{d.value}</dd>
              {d.note && <dd className="mt-0.5 text-[0.6rem] text-ink-3">{d.note}</dd>}
            </div>
          ))}
        </dl>

        <p className="mt-6 border-b border-[#366c97] pb-1.5 text-[0.85rem] font-semibold text-[#183d62]">01　成績概況（数学）</p>
        <dl className="mt-2 grid grid-cols-2 gap-px border border-[#b9c9d6] bg-[#b9c9d6] sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: "得点 / 配点", value: `${returnTotals.score} / ${returnTotals.max}`, note: "点" },
            { label: "平均点", value: returnStatistics.mean.toFixed(1), note: "点" },
            { label: "偏差値", value: returnStatistics.deviation.toFixed(1), note: "同じ大学の受験者内" },
            { label: "順位", value: `${returnStatistics.rank} / ${returnStatistics.count}`, note: "名" },
            { label: "得点率", value: `${rate}%`, note: "学習到達度の一つの指標" },
            { label: "合格参考判定", value: report.judgement.grade, note: "数学のみの総合評価" },
          ].map((item) => (
            <div key={item.label} className="min-w-0 bg-white px-2 py-3 text-center">
              <dt className="text-[0.67rem] text-ink-3">{item.label}</dt>
              <dd className="mt-2 text-[1.4rem] font-semibold tabular-nums text-[#183d62]">{item.value}</dd>
              <dd className="mt-1 text-[0.55rem] leading-relaxed text-ink-3">{item.note}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 text-[0.67rem] leading-relaxed text-ink-3">統計は架空の{returnStatistics.count}名から計算した見本です。実際には大学ごとの受験者が{moshi.statsMin}名以上の回に掲載します。</p>

        <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-7">
          <div>
          <table className="w-full border-collapse text-[0.75rem] tabular-nums">
            <caption className="mb-2 border-b border-[#366c97] pb-1.5 text-left text-[0.85rem] font-semibold text-[#183d62]">02　分野別成績</caption>
            <thead>
              <tr className="bg-[#eff4f8] text-[0.68rem] text-ink-3">
                <th scope="col" className="px-2 py-2 text-left font-normal">大問・分野</th>
                <th scope="col" className="px-2 py-2 text-right font-normal">得点 / 配点</th>
                <th scope="col" className="px-2 py-2 text-right font-normal">得点率</th>
              </tr>
            </thead>
            <tbody>
              {report.questions.map((q) => {
                const result = questionScore(q);
                return (
                  <tr key={q.no} className="border-b border-[#b9c9d6]">
                    <th scope="row" className="px-2 py-3 text-left font-medium">{q.no}　{q.field}</th>
                    <td className="px-2 py-3 text-right whitespace-nowrap"><span className="font-semibold text-[#183d62]">{result.score}</span> / {result.max}</td>
                    <td className="w-[32%] px-2 py-3 text-right">
                      <span>{result.rate.toFixed(0)}%</span>
                      <div aria-hidden="true" className="mt-1 h-1.5 bg-[#eff4f8]">
                        <div className="h-full bg-[#366c97]" style={{width: result.rate + "%"}} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <table className="mt-5 w-full border-collapse text-[0.75rem] tabular-nums">
            <caption className="mb-2 border-b border-[#366c97] pb-1.5 text-left text-[0.85rem] font-semibold text-[#183d62]">設問別得点 / 配点</caption>
            <thead>
              <tr className="bg-[#eff4f8] text-[0.68rem] text-ink-3">
                <th scope="col" className="px-2 py-2 text-left font-normal">大問</th>
                {[1, 2, 3].map((n) => <th key={n} scope="col" className="px-2 py-2 text-right font-normal">({n})</th>)}
              </tr>
            </thead>
            <tbody>
              {report.questions.map((q) => (
                <tr key={q.no} className="border-b border-[#b9c9d6]">
                  <th scope="row" className="px-2 py-3 text-left font-medium">{q.no}・{q.field}</th>
                  {q.subs.map((s) => <td key={s.no} className="px-2 py-3 text-right whitespace-nowrap"><span className="font-semibold text-[#183d62]">{s.score}</span> / {s.max}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div>
            <p className="border-b border-[#366c97] pb-1.5 text-[0.85rem] font-semibold text-[#183d62]">03　学習到達度・答案のバランス</p>
            <ReturnRadar />
            <p className="text-[0.66rem] leading-relaxed text-ink-3">採点者が答案を5観点で評価した架空例（各100点換算）。分野別得点率・偏差値とは別の評価です。</p>
          </div>
        </div>

        <div className="mt-6 border-t border-[#b9c9d6] pt-4">
          <p className="text-[0.85rem] font-semibold text-[#183d62]">合格参考判定（数学）　{report.judgement.grade}：{moshi.judgementLevels.find((level) => level.grade === report.judgement.grade)?.label}</p>
          <p className="prose-ja mt-2 text-[0.8rem] leading-[1.9] text-ink-2">{report.judgement.comment}</p>
          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[0.68rem] sm:grid-cols-4">
            {moshi.judgementLevels.map((level) => (
              <div key={level.grade} className={`border-l-2 pl-2 ${level.grade === report.judgement.grade ? "border-[#366c97] text-[#183d62]" : "border-[#b9c9d6] text-ink-3"}`}>
                <dt className="font-semibold">{level.grade}{level.grade === report.judgement.grade ? "　今回" : ""}</dt>
                <dd className="mt-1 leading-relaxed">{level.label}</dd>
              </div>
            ))}
          </dl>
          <p className="prose-ja mt-3 text-[0.7rem] leading-[1.9] text-ink-3">{moshi.judgementNote}</p>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-7">
          <div>
            <p className="border-b border-[#366c97] pb-1.5 text-[0.85rem] font-semibold text-[#183d62]">学習上の留意点（裏面に詳しい講評）</p>
            <p className="prose-ja mt-2 text-[0.82rem] leading-[1.9] text-ink-2">{report.summary}</p>
          </div>
          <div>
            <p className="border-b border-[#366c97] pb-1.5 text-[0.85rem] font-semibold text-[#183d62]">得点分布（架空{returnStatistics.count}名）</p>
            <ReturnDistribution />
          </div>
        </div>
        <dl className="mt-5 border border-[#b9c9d6] text-[0.76rem]">
          {[
            { label: "採点済み答案", body: "提出答案に点数・添削・コメントを書き込み、別添PDFで返却します。" },
            { label: moshi.deliverableName, body: "表面は成績・合格参考判定・学習到達度、裏面は答案講評・復習計画・得点分布。A4横の表裏2ページにまとめた成績冊子です。" },
          ].map((d) => (
            <div key={d.label} className="grid gap-x-3 gap-y-1 border-b border-[#b9c9d6] px-3 py-3 last:border-b-0 sm:grid-cols-[8rem_1fr]">
              <dt className="font-semibold text-[#183d62]">{d.label}</dt>
              <dd className="prose-ja leading-[1.8] text-ink-2">{d.body}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-[0.65rem] leading-[1.8] text-ink-3">
          全大学共通の架空例です。大学名・回次・日付・受験者・成績・統計・判定は実在のものではありません。
          第1問（数列）は公開見本に対応し、第2・3問は返却形式を示す例です。
        </p>
        <p className="mt-4 border-t border-[#b9c9d6] pt-2 text-[0.65rem] leading-relaxed text-ink-3">発行：{site.name}　制作：{site.author}　yuta-eng.com</p>
      </div>
      <p className="prose-ja mt-3 text-[0.75rem] leading-relaxed text-ink-3">{returnLine}</p>
      </InfoDetails>

      <p className="mt-4">
        <a href={moshiSample.return.pdf} target="_blank" rel="noopener" className="btn">
          返却PDFを見る（A4横・表裏{moshiSample.return.pages.length}ページ）
        </a>
      </p>
      <details className="mt-4 border border-rule px-4 py-3 sm:px-5">
        <summary className="cursor-pointer text-[0.82rem] font-semibold text-navy">A4横の表・裏をプレビューする</summary>
        <SampleViewer pages={moshiSample.return.pages} title={`${moshi.title} 共通返却サンプル`} layout="spread" />
      </details>
      <InfoDetails title="見本・印刷についての注意事項">
        <p className="prose-ja text-[0.75rem] leading-[1.9] text-ink-3">{RETURN_NOTICE}</p>
      </InfoDetails>
    </div>
  );
}
