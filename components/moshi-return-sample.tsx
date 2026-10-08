import { LogoMark } from "@/components/logo";
import { SampleViewer } from "@/components/look-inside";
import { moshi, returnLine } from "@/lib/moshi/config";
import { questionScore, returnSample as report, returnTotals } from "@/lib/moshi/return";
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
          成績冊子はカラー・全{moshiSample.return.pages.length}ページ
        </span>
      </div>
      <p className="prose-ja mt-2 max-w-[44rem] text-[0.88rem] leading-[1.9] text-ink-2">{returnLine}</p>

      <div className="mt-5 border border-[#b9c9d6] bg-white px-5 py-6 sm:px-7 sm:py-7">
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

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-7">
          <table className="w-full border-collapse border border-[#b9c9d6] text-center tabular-nums">
            <caption className="mb-2 border-b border-[#366c97] pb-1.5 text-left text-[0.85rem] font-semibold text-[#183d62]">01　成績概況</caption>
            <thead>
              <tr className="bg-[#eff4f8] text-[0.7rem] text-ink-3">
                {["教科", "得点", "配点", "得点率"].map((label) => <th key={label} scope="col" className="border border-[#b9c9d6] px-2 py-2 font-normal">{label}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="border border-[#b9c9d6] px-2 py-3 text-[0.86rem] font-medium">数学</th>
                <td className="border border-[#b9c9d6] px-2 py-3 text-[2rem] font-semibold leading-none text-[#183d62]">{returnTotals.score}</td>
                <td className="border border-[#b9c9d6] px-2 py-3 text-[1.05rem]">{returnTotals.max}</td>
                <td className="border border-[#b9c9d6] px-2 py-3 text-[0.95rem]">{rate}%</td>
              </tr>
            </tbody>
          </table>
          <p className="prose-ja text-[0.73rem] leading-[1.9] text-ink-3">
            平均点・偏差値・順位は、大学ごとの受験者が{moshi.statsMin}名以上の回に掲載します。
            本模試では合否判定を行いません。
          </p>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-7">
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
          <table className="w-full border-collapse text-[0.75rem] tabular-nums">
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

        <div className="mt-6">
          <p className="border-b border-[#366c97] pb-1.5 text-[0.85rem] font-semibold text-[#183d62]">学習上の留意点</p>
          <p className="prose-ja mt-2 text-[0.82rem] leading-[1.9] text-ink-2">{report.summary}</p>
        </div>
        <dl className="mt-5 border border-[#b9c9d6] text-[0.76rem]">
          {[
            { label: "採点済み答案", body: "提出答案に点数・添削・コメントを書き込み、別添PDFで返却します。" },
            { label: moshi.deliverableName, body: "個人成績表、答案講評、分野別の結果、今後の学習の助言をまとめた成績冊子です。" },
          ].map((d) => (
            <div key={d.label} className="grid gap-x-3 gap-y-1 border-b border-[#b9c9d6] px-3 py-3 last:border-b-0 sm:grid-cols-[8rem_1fr]">
              <dt className="font-semibold text-[#183d62]">{d.label}</dt>
              <dd className="prose-ja leading-[1.8] text-ink-2">{d.body}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-[0.65rem] leading-[1.8] text-ink-3">
          全大学共通の架空例です。大学名・回次・日付・受験者・成績は実在のものではありません。
          第1問（数列）は公開見本に対応し、第2・3問は返却形式を示す例です。
        </p>
        <p className="mt-4 border-t border-[#b9c9d6] pt-2 text-[0.65rem] leading-relaxed text-ink-3">発行：{site.name}　制作：{site.author}　yuta-eng.com</p>
      </div>

      <p className="mt-4">
        <a href={moshiSample.return.pdf} target="_blank" rel="noopener" className="btn">
          成績表・答案講評のPDFを見る（全{moshiSample.return.pages.length}ページ）
        </a>
      </p>
      <details className="mt-4 border border-rule px-4 py-3 sm:px-5">
        <summary className="cursor-pointer text-[0.82rem] font-semibold text-navy">PDFの2ページをプレビューする</summary>
        <SampleViewer pages={moshiSample.return.pages} title={`${moshi.title} 共通返却サンプル`} layout="spread" />
      </details>
      <p className="prose-ja mt-3 text-[0.75rem] leading-[1.9] text-ink-3">{RETURN_NOTICE}</p>
    </div>
  );
}
