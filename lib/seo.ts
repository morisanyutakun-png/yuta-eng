import type { University } from "@/lib/data";
import { yearRange } from "@/lib/data";

/**
 * 大学ページで狙う検索語。
 * 受験生が実際に打つ語（「傾向と対策」「過去問 分析」「難易度」「時間配分」）を
 * 大学名と組み合わせて、見出し・本文・FAQ に自然に散らす。
 */
export function keywords(u: University): string[] {
  const uni = u.university.replace(/大学$/, "大");
  const base = [u.name, u.university, uni].filter((v, i, a) => a.indexOf(v) === i);
  const out: string[] = [];
  for (const b of base) {
    out.push(`${b} 数学 傾向と対策`, `${b} 数学 過去問 分析`, `${b} 数学 対策`);
  }
  out.push(
    `${uni} 数学 難易度`,
    `${uni} 数学 時間配分`,
    `${uni} 数学 頻出分野`,
    `${uni} 数学 目標点`,
    `${u.university} ${u.course} 数学`,
  );
  return out.filter((v, i, a) => a.indexOf(v) === i);
}

/** 短い呼び名（「東京大学」→「東大」相当）。見出しで繰り返しても重くならない語。 */
export function shortName(u: University): string {
  // 括弧書きを先に外してから末尾の「数学」を落とす。
  // 順番を逆にすると「慶應経済数学（A方式）」が「慶應経済数学」のまま残り、
  // 「〜数学の傾向と対策」で「数学」が二重になる。
  return u.name.replace(/\s*（.*?）\s*/g, "").replace(/数学$/, "") || u.university;
}

export type Faq = { q: string; a: string };

/**
 * ページ末尾の「よくある質問」。
 * 内容はすべて抽出済みのデータから作る（推測で書かない）。
 * 検索語を含む問いの形にしてあるので、そのまま検索意図に対応する。
 */
export function buildFaq(u: University): Faq[] {
  const uni = u.university.replace(/大学$/, "大");
  const label = `${uni}${u.course && !/全学|理系|文系/.test(u.course) ? `（${u.course}）` : ""}`;
  const years = yearRange(u);
  const faq: Faq[] = [];

  const { examTime, questions, style, points } = u.facts;
  if (examTime || questions) {
    const parts = [
      examTime ? `試験時間は${examTime}分` : null,
      questions ? `大問は${questions}題` : null,
      style ? `解答形式は${style}` : null,
      points ? `配点は${points}点` : null,
    ].filter(Boolean);
    faq.push({
      q: `${label}の数学は何分で何題ですか？`,
      a: `${parts.join("、")}です。${
        examTime && questions
          ? `単純に割ると1題あたり約${Math.round(examTime / questions)}分で、見直しの時間を引くと実際にはもう少し短くなります。`
          : ""
      }`,
    });
  }

  if (u.fieldChart) {
    const top = u.fieldChart.items.slice(0, 3);
    faq.push({
      q: `${uni}の数学で頻出の分野はどこですか？`,
      a: `${years ?? "過去8年"}の出題を数えると、${top
        .map((t) => `${t.label}（${t.count}${/題|回/.test(u.fieldChart!.unit) ? "" : "題"}）`)
        .join("、")}が多く出ています。ページ内の分野別グラフで全体の偏りを確認できます。`,
    });
  }

  if (u.goal) {
    faq.push({
      q: `${uni}の数学は何点を目標にすればよいですか？`,
      a: u.goal,
    });
  }

  if (style) {
    faq.push({
      q: `${uni}の数学は記述式ですか？`,
      a:
        style === "完全記述式"
          ? `${label}の数学は完全記述式です。答えの数値だけでなく、途中の論証を最後まで書ききる力が問われます。`
          : `${label}の数学の解答形式は${style}です。`,
    });
  }

  faq.push({
    q: `${uni}の数学の過去問はどこまでさかのぼって分析すべきですか？`,
    a: `${
      years ?? "直近8年分"
    }をまとめて並べると、分野の配置や小問の型がどこまで固定されているかが見えてきます。このページはその8年分を年度別・分野別の表に整理したものです。`,
  });

  return faq;
}
