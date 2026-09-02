import Image from "next/image";

import type { University } from "@/lib/data";
import { summarize, yearRange } from "@/lib/data";
import { shortName } from "@/lib/seo";

type Stat = { label: string; value: string; sub?: string };

function stats(u: University): Stat[] {
  const out: Stat[] = [];
  const { examTime, questions, style, points } = u.facts;
  if (examTime) out.push({ label: "試験時間", value: String(examTime), sub: "分" });
  if (questions) out.push({ label: "大問数", value: String(questions), sub: "題" });
  if (examTime && questions) {
    out.push({ label: "1題あたり", value: String(Math.round(examTime / questions)), sub: "分" });
  }
  if (points) out.push({ label: "配点", value: String(points), sub: "点" });
  if (style) out.push({ label: "解答形式", value: style });
  return out.slice(0, 4);
}

/**
 * 大学ページの最初の画面。
 * 見出しだけで終わらせず、表紙・要点の数字・頻出分野の上位を同時に見せて、
 * 「何が分かるページか」をスクロールなしで伝える。
 */
export function UnivHero({ u }: { u: University }) {
  const short = shortName(u);
  const years = yearRange(u);
  const cover = u.books[0];
  const top = u.fieldChart?.items.slice(0, 3) ?? [];
  const max = top.length ? Math.max(...top.map((t) => t.count)) : 1;
  const denomMatch = u.fieldChart?.unit.match(/(\d+)\s*([^\d]*?)中/);
  const denom = denomMatch ? `${denomMatch[1]}${denomMatch[2] || "題"}` : "";
  const rows = stats(u);

  return (
    <header className="pb-2 pt-4">
      <p className="text-[0.72rem] font-semibold tracking-wide text-navy">
        {u.university}
        {u.course && `・${u.course}`}
      </p>

      {/*
        モバイルは「見出し＋表紙」を横並びにし、リード文はその下に全幅で置く。
        画面が広いときは表紙を2行ぶん跨がせ、リード文を表紙の左に回り込ませる。
      */}
      <div className="mt-2.5 grid grid-cols-[1fr_auto] gap-x-4">
        <div className="col-start-1 min-w-0">
          <h1 className="serif text-[1.7rem] leading-[1.35] text-ink sm:text-[2.15rem]">
            {short}数学の
            <br />
            傾向と対策
          </h1>
          <p className="mt-2.5 text-[0.74rem] tabular-nums text-ink-3">
            {years ? `${years}・過去問8年分の分析` : "過去問の分析"}
          </p>
        </div>

        {/* 表紙。読み物の入口で、そのまま購入導線にもなる */}
        <a
          href={cover.amazonUrl}
          rel="noopener nofollow sponsored"
          target="_blank"
          className="group col-start-2 row-start-1 w-[92px] shrink-0 sm:row-span-2 sm:w-[124px]"
          aria-label={`${cover.title}をAmazonで見る`}
        >
          <Image
            src={`/covers/${cover.asin}.webp`}
            alt={`${cover.title}の表紙`}
            width={310}
            height={438}
            priority
            sizes="(max-width: 640px) 92px, 124px"
            className="w-full rounded-[2px] border border-rule shadow-[0_2px_8px_rgba(26,29,33,0.18)] transition-shadow group-hover:shadow-[0_3px_14px_rgba(26,29,33,0.26)]"
          />
          <span className="mt-1.5 block text-center text-[0.62rem] leading-tight text-ink-3">
            分析からつくった
            <br />
            予想問題集
          </span>
        </a>

        {u.summary && (
          <p className="prose-ja col-span-2 col-start-1 mt-5 text-[0.95rem] text-ink-2 sm:col-span-1">
            {summarize(u, 120)}
          </p>
        )}
      </div>

      {/* 要点の数字 */}
      {rows.length >= 2 && (
        <dl className="mt-6 grid grid-cols-4 gap-x-2 border-y border-rule py-4">
          {rows.map((r) => (
            <div key={r.label}>
              <dt className="text-[0.63rem] leading-tight text-ink-3">{r.label}</dt>
              <dd className="serif mt-1 leading-none text-ink">
                <span className={r.value.length <= 3 && r.sub ? "text-[1.45rem] tabular-nums" : "text-[0.92rem]"}>
                  {r.value}
                </span>
                {r.sub && <span className="ml-0.5 font-sans text-[0.66rem] font-normal text-ink-3">{r.sub}</span>}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {/* 頻出分野の上位3つ。ページの中身を最初の画面で予告する */}
      {top.length === 3 && (
        <div className="mt-4">
          <p className="text-[0.63rem] text-ink-3">
            よく出る分野{denom && `（${denom}のうち）`}
          </p>
          <ul className="mt-2 space-y-1.5">
            {top.map((t) => (
              <li key={t.label} className="flex items-center gap-2.5">
                <span className="w-[7.5rem] shrink-0 truncate text-[0.76rem] text-ink sm:w-[10rem]">
                  {t.label.replace(/（.*?）/g, "")}
                </span>
                <span className="h-1 flex-1 overflow-hidden rounded-full bg-paper-2">
                  <span
                    className="block h-full rounded-full bg-navy"
                    style={{ width: `${Math.round((t.count / max) * 100)}%` }}
                  />
                </span>
                <span className="serif w-6 shrink-0 text-right text-[0.85rem] tabular-nums text-navy">
                  {t.count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
