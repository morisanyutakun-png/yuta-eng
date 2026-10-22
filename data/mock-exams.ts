/**
 * 模試演習ストア（/mock-exams）の商品定義。
 *
 * 商品を足す・直すときは、このファイルだけを触る。一覧・詳細・決済・
 * ダウンロードのすべてがここを読む。コード側に商品名や価格を書かない。
 *
 * ── 守ること ────────────────────────────────────────────────
 * ・`id` は Stripe の決済記録（metadata.examId）と PDF の置き場所に残る。
 *   公開後は変えない。
 * ・`price` は**画面に出す税込価格**であり、Price ID を使わないときは
 *   そのまま決済額になる。Price ID を入れたときは Stripe 側の金額と必ず揃える
 *   （揃っていないと Webhook がログに警告を出す）。
 * ・このリポジトリは公開されている。有料の問題文・解答・採点基準の全文を
 *   ここに書かない。ここに置けるのは「購入前に公開してよい一部」だけ。
 *   PDF 本体は lib/mock-exams/files.ts が読む非公開の置き場所に置く。
 * ・`status: "upcoming"` の商品は購入ボタンを出さず、決済 API も受け付けない。
 *   冠模試のアーカイブは、本番（入試プレビュー）の実施・返却が終わるまで
 *   販売しない。先に売ると、本番の問題が受験前に出回る。
 */

/** 一覧の絞り込みに使う区分。画面の呼び名は `examLevels` で決める */
export type ExamLevel = "zento-standard" | "zento-high" | "kanmuri";

export type ExamStatus = "on-sale" | "upcoming";

/** 購入者に渡す PDF の種類。置き場所のファイル名（`<id>/<key>.pdf`）にもなる */
export type ExamFileKey = "problems" | "answer-sheets" | "solutions" | "rubric";

export type RubricLine = { text: string; points: number };

/**
 * 購入前に公開する採点基準の一部（大問1題の、小問1〜2つ分）。
 * 文中の `$…$` は数式として組まれる。
 */
export type RubricSample = {
  /** 何の大問の、どの小問か（見出しに出す） */
  label: string;
  /** その大問の問題文の公開部分。全文を載せる必要はない */
  problem: string;
  parts: {
    no: number;
    full: number;
    /** 正解 */
    answer: string;
    plus: RubricLine[];
    /** 減点（points は負の数で書く） */
    minus: RubricLine[];
  }[];
  /** 共通の採点原則（PDF の「共通に見るところ」の抜粋） */
  principles: string[];
};

export type MockExam = {
  id: string;
  status: ExamStatus;
  level: ExamLevel;
  /** 一覧・決済画面・領収メールに出す正式名 */
  title: string;
  /** パンくずやボタンに出す短い名前 */
  shortTitle: string;
  edition: string;
  /** 対象（大学・偏差値帯・学年） */
  target: {
    universities: string;
    deviation: string;
    audience: string;
  };
  scope: string;
  minutes: number;
  fullMark: number;
  daimonCount: number;
  /** 税込・円 */
  price: number;
  /**
   * Stripe の Price ID（任意）。テストと本番で ID が違うので分けて持つ。
   * どちらを使うかは STRIPE_SECRET_KEY が sk_test_ か sk_live_ かで決まる。
   * 空なら `price` と `title` から決済時に価格を組み立てる。
   */
  stripePriceId?: { test?: string; live?: string };
  badges: string[];
  /** 一覧のカードに出す1〜2行の説明 */
  summary: string;
  /** 詳細ページ「この模試の狙い」 */
  aims: string[];
  /** 大問構成 */
  structure: { no: number; field: string; points: number; theme: string }[];
  /** 頻出分野（タグ） */
  fields: string[];
  rubricSample: RubricSample;
  /** 収録 PDF。pages は組み上がりの目安（見本の組版から更新する） */
  files: { key: ExamFileKey; label: string; note: string; pages?: number }[];
  /**
   * 公開してよい見本ページの画像（public/samples/mock-exams/<id>/ 以下）。
   * 有料版のページは置かない。見本版（大問1のみ）から作ったものだけ。
   */
  previews?: { src: string; label: string; width: number; height: number }[];
  /** 本番の入試プレビュー（/moshi/<id>）で対応する大学。あれば CTA をその大学に向ける */
  moshiId?: string;
  /** upcoming のときに出す販売開始の目安 */
  availableNote?: string;
};

export const examLevels: Record<ExamLevel, { label: string; short: string; note: string }> = {
  "zento-standard": {
    label: "全統標準",
    short: "標準",
    note: "全統記述模試で偏差値50〜60を目指す層向け。典型の誘導を最後まで書き切る力を測ります。",
  },
  "zento-high": {
    label: "全統ハイレベル",
    short: "ハイレベル",
    note: "偏差値60〜70超を狙う層向け。誘導の少ない論証・評価を、減点されない答案に仕上げる力を測ります。",
  },
  kanmuri: {
    label: "大学別冠模試",
    short: "冠模試",
    note: "大手予備校が冠模試を出していない地方国公立・医学部を中心に、本番の形式に合わせて作問した大学別の模試です。",
  },
};

/** 全商品に共通で付くもの（詳細ページの「収録物」） */
const standardFiles: MockExam["files"] = [
  { key: "problems", label: "問題冊子", note: "表紙・注意事項つき。本番と同じ問題紙の体裁" },
  { key: "answer-sheets", label: "所定解答用紙", note: "大問ごとに1枚。受験番号・得点欄・小問別の採点欄つき" },
  { key: "solutions", label: "解答・解説", note: "答案としてそのまま書ける論述形式。別解・確かめつき" },
  { key: "rubric", label: "採点基準", note: "全小問に加点行・減点行。自己採点の手順と共通原則つき" },
];

export const mockExams: MockExam[] = [
  {
    id: "kijutsu-standard-01",
    status: "on-sale",
    level: "zento-standard",
    title: "全統記述レベル 実戦模試 数学 標準編 第1回",
    shortTitle: "標準編 第1回",
    edition: "2027年度入試向け",
    target: {
      universities: "地方国公立・中堅私大（理系・文系共通）",
      deviation: "偏差値 50〜60",
      audience: "高2〜高3・既卒",
    },
    scope: "数学I・II・A・B・C",
    minutes: 100,
    fullMark: 100,
    daimonCount: 4,
    price: 1280,
    badges: ["自己採点用 採点基準つき", "所定解答用紙つき"],
    summary:
      "典型の誘導に乗って最後まで書き切れるかを測る100分・4題。部分点がどこで付き、どこで落ちるかを採点基準で確かめられます。",
    aims: [
      "全統記述模試の標準レベルに合わせ、教科書の例題から一段上の「誘導つき記述問題」を4題そろえました。どれも小問を順に積み上げれば完答できる構成です。",
      "狙いは、解けた問題で点を落とさないこと。場合分けの境界、増減表の根拠、必要十分の確認など、答えが合っていても減点される箇所を採点基準で一行ずつ示しています。",
      "本番と同じく、答案は所定の解答用紙に書いてください。枠の大きさ自体が「どこまで書けば足りるか」の目安になります。",
    ],
    structure: [
      { no: 1, field: "微分法（数学II）", points: 25, theme: "3次関数の極値と、区間における最小値の場合分け" },
      { no: 2, field: "確率（数学A）", points: 25, theme: "操作の繰り返しと条件つき確率" },
      { no: 3, field: "ベクトル（数学C）", points: 25, theme: "平面ベクトルによる交点の位置と面積比" },
      { no: 4, field: "数列（数学B）", points: 25, theme: "漸化式と和の計算・数学的帰納法" },
    ],
    fields: ["微分法", "確率", "ベクトル", "数列", "場合分け"],
    rubricSample: {
      label: "大問1（微分法）の (1)・(2)",
      problem:
        "$a$ を正の定数とし，$f(x)=x^3-3ax^2+4$ とする。(1) $f(x)$ の極値を求めよ。(2) 方程式 $f(x)=0$ が異なる3つの実数解をもつような $a$ の値の範囲を求めよ。（(3) は製品版に収録）",
      parts: [
        {
          no: 1,
          full: 8,
          answer: "$x=0$ で極大値 $4$，$x=2a$ で極小値 $4-4a^3$",
          plus: [
            { text: "$f'(x)=3x(x-2a)$ と因数分解できている", points: 2 },
            { text: "$a>0$ より $0<2a$ であることに触れ，増減表を正しく書いている", points: 2 },
            { text: "極大値 $4$（$x=0$）", points: 2 },
            { text: "極小値 $4-4a^3$（$x=2a$）", points: 2 },
          ],
          minus: [
            { text: "$0$ と $2a$ の大小に触れずに増減表を書いている", points: -1 },
            { text: "極値をとる $x$ の値を書いていない", points: -1 },
          ],
        },
        {
          no: 2,
          full: 7,
          answer: "$a>1$",
          plus: [
            { text: "「異なる3つの実数解 $\\iff$ 極大値 $>0$ かつ 極小値 $<0$」を，グラフと $x$ 軸の共有点の個数として説明している", points: 3 },
            { text: "$4-4a^3<0$ を立式している", points: 2 },
            { text: "$a>1$ を $a>0$ との共通部分として答えている", points: 2 },
          ],
          minus: [
            { text: "同値性の説明なしに条件だけを書いている", points: -2 },
            { text: "極大値 $>0$ の確認が抜けている", points: -1 },
          ],
        },
      ],
      principles: [
        "過程を書かず結論だけの答案は，その小問の満点の $30\\%$ を上限とする。",
        "前小問の答えが誤っていても，その値を正しく使っていれば過程の加点は行う（結論の加点は行わない）。",
        "本書にない解法でも，論理が通っていれば満点とする。採点表の段階に読み替えて採点する。",
      ],
    },
    files: [
      { key: "problems", label: "問題冊子", note: "表紙・注意事項つき。本番と同じ問題紙の体裁", pages: 2 },
      { key: "answer-sheets", label: "所定解答用紙", note: "大問ごとに1枚。受験番号・得点欄・小問別の採点欄つき", pages: 4 },
      { key: "solutions", label: "解答・解説", note: "答案としてそのまま書ける論述形式。別解・確かめつき", pages: 4 },
      { key: "rubric", label: "採点基準", note: "全小問に加点行・減点行。自己採点の手順と共通原則つき", pages: 3 },
    ],
    previews: [
      { src: "/samples/mock-exams/kijutsu-standard-01/cover.webp", label: "表紙（問題冊子）", width: 900, height: 1273 },
      { src: "/samples/mock-exams/kijutsu-standard-01/problem.webp", label: "問題紙（大問1）", width: 900, height: 1273 },
      { src: "/samples/mock-exams/kijutsu-standard-01/answer-sheet.webp", label: "所定解答用紙（第1問）", width: 900, height: 1273 },
      { src: "/samples/mock-exams/kijutsu-standard-01/solution.webp", label: "解答・解説（論述答案）", width: 900, height: 1273 },
      { src: "/samples/mock-exams/kijutsu-standard-01/rubric.webp", label: "採点基準（加点・減点表）", width: 900, height: 1273 },
    ],
  },
  {
    id: "kijutsu-high-01",
    status: "on-sale",
    level: "zento-high",
    title: "全統記述レベル 実戦模試 数学 ハイレベル編 第1回",
    shortTitle: "ハイレベル編 第1回",
    edition: "2027年度入試向け",
    target: {
      universities: "旧帝大・医学部医学科・難関国公立（理系）",
      deviation: "偏差値 60〜70超",
      audience: "高3・既卒",
    },
    scope: "数学I・II・III・A・B・C",
    minutes: 120,
    fullMark: 200,
    daimonCount: 5,
    price: 1680,
    badges: ["数学III含む", "自己採点用 採点基準つき", "所定解答用紙つき"],
    summary:
      "誘導の少ない評価・論証を、減点されない答案に仕上げる120分・5題。はさみうち・帰納法・存在証明の「書き方」で差がつきます。",
    aims: [
      "全統記述模試の上位層・難関大の2次試験を想定し、誘導を最小限にした5題で構成しました。方針が立っても、答案として通るかどうかは別の問題です。",
      "採点基準は「極限を取る前に不等式を示したか」「帰納法の仮定をどこで使ったか」のように、上位層で実際に差がつく記述を加点・減点の行に分けています。",
      "医学部・旧帝大の本番で求められる密度の答案を、所定の解答用紙の枠内で書き切る練習ができます。",
    ],
    structure: [
      { no: 1, field: "積分法（数学III）", points: 40, theme: "定積分で表された数列の漸化式と極限" },
      { no: 2, field: "整数", points: 40, theme: "不定方程式の解の存在と個数" },
      { no: 3, field: "複素数平面（数学C）", points: 40, theme: "回転と拡大で動く点の軌跡" },
      { no: 4, field: "確率・漸化式", points: 40, theme: "推移の確率と極限" },
      { no: 5, field: "空間図形・ベクトル", points: 40, theme: "四面体の体積の最大" },
    ],
    fields: ["積分法", "極限", "整数", "複素数平面", "確率漸化式", "空間ベクトル"],
    rubricSample: {
      label: "大問1（積分法）の (2)・(3)",
      problem:
        "$n=0,1,2,\\ldots$ に対し $I_n=\\displaystyle\\int_0^1 x^n e^x\\,dx$ とする。(1) $I_{n+1}=e-(n+1)I_n$ を示せ。(2) $0<I_n\\leqq\\dfrac{e}{n+1}$ を示せ。(3) $\\displaystyle\\lim_{n\\to\\infty}nI_n$ を求めよ。",
      parts: [
        {
          no: 2,
          full: 12,
          answer: "$0\\leqq x\\leqq1$ で $0\\leqq x^ne^x\\leqq e\\,x^n$（等号は恒等的には成り立たない）から示される",
          plus: [
            { text: "$0<x\\leqq1$ で $x^ne^x>0$ であることから $I_n>0$ を述べている", points: 4 },
            { text: "$0\\leqq x\\leqq1$ で $e^x\\leqq e$ を根拠に $x^ne^x\\leqq e\\,x^n$ と評価している", points: 4 },
            { text: "$\\displaystyle\\int_0^1 e\\,x^n\\,dx=\\frac{e}{n+1}$ を計算して結論を述べている", points: 4 },
          ],
          minus: [
            { text: "$e^x\\leqq e$ の根拠（区間 $0\\leqq x\\leqq1$）を書いていない", points: -2 },
            { text: "被積分関数の大小から積分の大小に移る理由（区間で連続・積分の単調性）に触れていない", points: -1 },
          ],
        },
        {
          no: 3,
          full: 16,
          answer: "$\\displaystyle\\lim_{n\\to\\infty}nI_n=e$",
          plus: [
            { text: "(1) から $nI_n=\\dfrac{n}{n+1}\\left(e-I_{n+1}\\right)$ と変形している", points: 5 },
            { text: "(2) より $0<I_{n+1}\\leqq\\dfrac{e}{n+2}$ を用い，$I_{n+1}\\to0$ をはさみうちの原理で示している", points: 6 },
            { text: "$\\dfrac{n}{n+1}\\to1$ と合わせて極限 $e$ を求めている", points: 5 },
          ],
          minus: [
            { text: "はさみうちの原理を明示せずに $I_{n+1}\\to0$ としている", points: -3 },
            { text: "極限が存在することを示す前に $\\lim$ の式変形を始めている", points: -2 },
          ],
        },
      ],
      principles: [
        "極限・不等式の問題では，評価の根拠（区間・符号）を書いていない段階には加点しない。",
        "前小問の結果を使うときは「(2) より」のように出典を明示する。明示がない場合は該当行の加点を半分とする。",
        "本書にない解法でも，論理が通っていれば満点とする。採点表の段階に読み替えて採点する。",
      ],
    },
    files: standardFiles,
  },
  {
    id: "kanmuri-mie-rikei-01",
    status: "upcoming",
    level: "kanmuri",
    title: "三重大学 理系数学 入試プレビュー 第1回（アーカイブ版）",
    shortTitle: "三重大 理系数学 第1回",
    edition: "2027年度入試向け",
    target: {
      universities: "三重大学（医学部医学科・工学部ほか）",
      deviation: "三重大志望（共通テスト後の2次対策にも）",
      audience: "高3・既卒",
    },
    scope: "数学I・II・III・A・B・C",
    minutes: 120,
    fullMark: 100,
    daimonCount: 3,
    price: 1980,
    badges: ["大学別冠模試", "本番形式（120分・3題）", "所定解答用紙つき"],
    summary:
      "添削付きで実施する「入試プレビュー」三重大 第1回の問題・解答・採点基準を、自己採点用にまとめたアーカイブ版。本番の実施・返却後に販売します。",
    aims: [
      "三重大学の2次試験（理系数学）の形式に合わせ、試験時間120分・大問3題（35点・30点・35点）で作問した冠模試です。大手予備校の冠模試がない大学の、本番の形式で解く機会を作るためのものです。",
      "当サイトの出題分析（年度別の大問構成・頻出分野）にもとづいて書き下ろしています。過去問の転載や、大学の公表していない配点・採点基準を大学のものとして示すことはしていません。",
      "本番で添削を受けた方の講評に使っているものと同じ採点基準を収録しています。自己採点で減点箇所を洗い出し、次回の添削付き本番で答案の完成度を確かめる、という使い方を想定しています。",
    ],
    structure: [
      { no: 1, field: "小問集合", points: 35, theme: "図形と方程式・三角関数・指数・ベクトル・複素数平面" },
      { no: 2, field: "確率・漸化式", points: 30, theme: "球の入れかえ操作と確率の漸化式" },
      { no: 3, field: "微分積分（数学III）", points: 35, theme: "分数関数のグラフ・面積・定積分の漸化式" },
    ],
    fields: ["小問集合", "確率漸化式", "微分積分", "三角関数", "ベクトル"],
    rubricSample: {
      label: "全大学共通の見本問題（数列）の (2)",
      problem:
        "数列 $\\{a_n\\}$ の初項から第 $n$ 項までの和を $S_n$ とする。すべての自然数 $n$ に対して $S_n=2a_n-3n$ が成り立つ。(2) $a_{n+1}$ を $a_n$ を用いて表し，一般項を求めよ。（本番の問題は販売開始まで公開しません。採点基準の書き方の見本です）",
      parts: [
        {
          no: 2,
          full: 8,
          answer: "$a_{n+1}=2a_n+3$，$a_n=3\\left(2^n-1\\right)$",
          plus: [
            { text: "$a_{n+1}=S_{n+1}-S_n$ を使うと述べている", points: 2 },
            { text: "差をとって $a_{n+1}=2a_n+3$ まで整理できている", points: 2 },
            { text: "$a_n+3$ が等比数列になることを使い，初項を $a_1+3=6$ と正しく取っている", points: 2 },
            { text: "一般項が合っている", points: 2 },
          ],
          minus: [
            { text: "$a_n=S_n-S_{n-1}$ を $n\\geqq2$ の断りなしに $n=1$ でも使っている", points: -1 },
            { text: "等比数列の初項を $a_1=3$ としてしまい，$+3$ の分だけずれている", points: -2 },
            { text: "漸化式は出せたが，一般項まで解ききれていない", points: -2 },
          ],
        },
      ],
      principles: [
        "定義域・真数条件・分母 $\\ne0$ の断りを落とした答案は，その小問の最後に $-1$〜$-2$ 点。",
        "場合分けを立てながら境界（等号）をどちらに入れるかが書かれていない場合，$-1$ 点。",
        "本書にない解法でも，論理が通っていれば満点とする。採点表の段階に読み替えて採点する。",
      ],
    },
    files: standardFiles,
    moshiId: "mie-rikei",
    availableNote: "入試プレビュー第1回の実施・答案返却が終わりしだい販売を始めます。",
  },
];

/**
 * 販売者の表示（特定商取引法に基づく表記）。
 *
 * 住所・電話番号は、請求があれば遅滞なく開示する扱いにしている
 * （消費者庁の通信販売の広告表示の考え方に沿った省略）。
 * 開示する場合や事業者情報が変わった場合はここを直す。
 */
export const storeSeller = {
  storeName: "大学別数学研究室 模試演習ストア",
  seller: "森 祐太",
  responsible: "森 祐太",
  address: "請求があった場合には遅滞なく開示いたします。",
  phone: "請求があった場合には遅滞なく開示いたします。",
  email: "info@yuta-eng.com",
  /** 購入後に PDF を再ダウンロードできる日数（lib/mock-exams/access.ts が読む既定値） */
  accessDays: 90,
} as const;

