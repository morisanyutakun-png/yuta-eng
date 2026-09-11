import type { University } from "@/lib/data";
import { yearRange } from "@/lib/data";

/**
 * 短い呼び名（「東京大学」→「東大」相当）。見出しで繰り返しても重くならない語。
 * 機械的に作れない大学だけ scripts/university-meta.mjs の `short` で上書きする。
 */
export function shortName(u: University): string {
  if (u.short) return u.short;
  // 括弧書きを先に外してから末尾の「数学」を落とす。
  // 順番を逆にすると「慶應経済数学（A方式）」が「慶應経済数学」のまま残り、
  // 「〜数学の傾向と対策」で「数学」が二重になる。
  return u.name.replace(/\s*（.*?）\s*/g, "").replace(/数学$/, "") || u.university;
}

/**
 * ページの主題を表す語。「〜の傾向と対策」の前に置く。
 *
 * ふつうは「東大理系」＋「数学」だが、「早稲田人科 数学選抜」のように
 * 呼び名のほうに既に「数学」が入っていると「数学選抜数学」と重なるので足さない。
 */
export function subject(u: University): string {
  const short = shortName(u);
  return short.includes("数学") ? short : `${short}数学`;
}

/** ページタイトル。検索語「<大学> 数学 傾向と対策」を先頭に置く。 */
export function pageTitle(u: University): string {
  const span = u.yearCount ? `${u.yearCount}年分` : "過去問";
  return `${subject(u)}の傾向と対策｜${span}の出題分析`;
}

/**
 * 大学ページで狙う検索語。
 * 受験生が実際に打つ語（「傾向と対策」「過去問 分析」「難易度」「時間配分」）を
 * 大学名と組み合わせる。正式名称・略称・旧称の3通りを押さえる。
 */
export function keywords(u: University): string[] {
  const short = shortName(u).replace(/\s*（.*?）\s*/g, "").replace(/\s+/g, "");
  // 「東京科学大（旧東工大）」の括弧の中身も、それ自体が検索語になる
  const alias = (shortName(u).match(/（旧(.+?)）/) || [])[1];
  const names = [u.university, short, alias].filter(Boolean) as string[];

  const out: string[] = [];
  for (const n of new Set(names)) {
    out.push(`${n} 数学 傾向と対策`, `${n} 数学 過去問 分析`, `${n} 数学 対策`, `${n} 数学 難易度`);
  }
  out.push(
    `${short} 数学 時間配分`,
    `${short} 数学 頻出分野`,
    `${short} 数学 目標点`,
    `${u.university} ${u.course} 数学`,
  );
  return [...new Set(out)];
}

/**
 * 「慶應商学部（A方式）」のような、呼び名＋区分の表示。
 *
 * 呼び名にすでに入っている語を括弧へ繰り返すと
 * 「慶應商学部（商学部A方式）」「東京理科大 理学部第一部（理学部第一部）」になる。
 * 重なりを外して、残った部分だけを括弧に入れる。
 */
export function courseLabel(u: University): string {
  const short = shortName(u);
  if (!u.course) return short;

  const parts = u.course
    .split(/[\s・、]+/)
    .filter(Boolean)
    // 呼び名のほうで既に分かる区分は書かない
    .filter((part) => !/^(全学|理系|文系)$/.test(part) && !short.includes(part))
    .map((part) => {
      // 「慶應商学部」＋「商学部A方式」→ 括弧に入れるのは「A方式」だけ
      for (let i = part.length; i > 0; i--) {
        if (short.endsWith(part.slice(0, i))) {
          // 「慶應経済」＋「経済学部A方式」で「学部A方式」が残るので、
          // 切れ端になった「学部」「学科」は落とす
          return part.slice(i).replace(/^(学部|学科|部|科)+/, "");
        }
      }
      return part;
    })
    .filter(Boolean);

  return parts.length ? `${short}（${parts.join("・")}）` : short;
}

export type Faq = { q: string; a: string };

/**
 * ページ末尾の「よくある質問」。
 * 内容はすべて抽出済みのデータから作る（推測で書かない）。
 * 数字が取れていない項目は、その問い自体を出さない。
 */
export function buildFaq(u: University): Faq[] {
  const short = shortName(u);
  const label = courseLabel(u);
  const range = yearRange(u);
  const span = u.yearCount ? `${u.yearCount}年分` : null;
  const faq: Faq[] = [];

  const { examTime, questions, style, points, selective } = u.facts;

  if (examTime || questions) {
    const parts = [
      examTime ? `試験時間は${examTime}分` : null,
      questions ? `大問は${questions}題` : null,
      style ? `解答形式は${style}` : null,
      points ? `数学の配点は${points}点` : null,
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

  // 選択制は「大問数」という問いが成り立たない。方式そのものを説明する。
  if (selective) {
    faq.push({
      q: `${short}の数学は何題解くのですか？`,
      a: `${short}は1冊の問題冊子から、志望する学部・学科に指定された大問だけを解く方式です。冊子に並ぶ大問の数と、実際に解く題数は一致しません。指定は学部ごとに違うので、ページ内の一覧表で自分の学部の指定を確認してください。`,
    });
  }

  if (u.fieldChart) {
    const c = u.fieldChart;
    const top = c.items.slice(0, 3);
    const scope =
      c.kind === "question" && c.denom
        ? `${span ? `${span}・` : ""}全${c.denom}題`
        : span ?? "分析対象期間";
    faq.push({
      q: `${short}の数学で頻出の分野はどこですか？`,
      a: `${scope}の出題を分野別に数えると、${top
        .map((t) => `${t.label}（${t.count}題）`)
        .join("、")}が多く出ています。ページ内の分野別グラフで全体の偏りを確認できます。`,
    });
  }

  if (u.goal) {
    faq.push({ q: `${short}の数学は何点を目標にすればよいですか？`, a: u.goal });
  }

  if (style) {
    faq.push({
      q: `${short}の数学は記述式ですか？`,
      a:
        style === "完全記述式"
          ? `${label}の数学は完全記述式です。答えの数値だけでなく、途中の論証を最後まで書ききる力が問われます。`
          : `${label}の数学の解答形式は${style}です。`,
    });
  }

  if (range && span) {
    faq.push({
      q: `${short}の数学の過去問は何年分さかのぼるべきですか？`,
      a: `このページでは${range}の${span}を年度別・分野別の表に整理しています。まとめて並べると、分野の配置や小問の型がどこまで固定されているかが見えてきます。`,
    });
  }

  return faq;
}
