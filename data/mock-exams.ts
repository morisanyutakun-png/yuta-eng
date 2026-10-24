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
export type ExamFileKey = "full" | "problems" | "answer-sheets" | "solutions" | "rubric";

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
  monthLabel?: string;
  seasonTag?: string;
  targetSummary?: string;
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
    label: "基礎〜標準編",
    short: "標準",
    note: "国公立二次・難関私大の基礎固め〜標準実戦レベル。典型の誘導を最後まで論理的に書き切る答案力を測ります。",
  },
  "zento-high": {
    label: "標準〜応用・実戦編",
    short: "実戦",
    note: "旧帝大・難関国公立・理系医学部レベル。数IIIや融合題を含み、誘導の少ない論証・評価を減点されない答案に仕上げる力を測ります。",
  },
  kanmuri: {
    label: "大学別冠模試",
    short: "冠模試",
    note: "大手予備校が冠模試を出していない地方国公立・医学部を中心に、各大学の本番傾向・時間配分・解答用紙に合わせて作問した大学別冠模試です。",
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
    "id": "preview-zento-set1",
    "status": "on-sale",
    "level": "zento-standard",
    "title": "数学記述模試『入試プレビュー』第1セット［基礎〜標準・定着編］（数I・A・II・B・Cベクトル）",
    "shortTitle": "第1セット［基礎〜標準・定着編］",
    "edition": "第1セット ｜ 基礎〜標準・定着編",
    "monthLabel": "第1セット",
    "seasonTag": "基礎〜標準",
    "targetSummary": "高校1・2・3年 ｜ 国公立・上位私大の記述基礎〜標準力養成（偏差値52.5〜62.5）",
    "target": {
      "universities": "国公立大・上位私立大（二次記述式の基礎〜標準レベル）",
      "deviation": "全統記述模試 偏差値 52.5〜62.5 目安（目標得点：60点/100点以上）",
      "audience": "高校1・2・3年 ｜ 既習範囲：数I・A・II・B（数列）・C（ベクトル）修了生"
    },
    "scope": "数学I・A・II・B（数列）・C（ベクトル）",
    "minutes": 100,
    "fullMark": 100,
    "daimonCount": 5,
    "price": 1980,
    "badges": [
      "問題・解答用紙・解説・採点基準",
      "自己採点成績評価グレード表つき",
      "A4 PDF完全版（全33p）"
    ],
    "summary": "数I・A・II・B・C（ベクトル）の教科書・傍用レベルから二次記述への橋渡し。対称式・確率・3次関数の面積比・3倍角の解配置・漸化式・等面四面体を完全網羅する100分5大問。",
    "aims": [
      "【履修完了の総点検】数学I・A・II・B（数列）・C（平面ベクトル・空間ベクトル）の基礎を終えた段階で、典型的な記述誘導を最後まで独力で書き切る答案作成力を測定します。",
      "【自己採点評価表の付属】S・A・B・C・Dの5段階評価基準（志望校判定・偏差値目安・今後の学習課題）を採点基準に収録。どこまで書けば何点もらえるかを客観的に把握できます。",
      "【本番仕様のA4答案用紙】各大問に1枚ずつの専用解答用紙が付き、本番の記述枠の感覚・余白の使い方・途中式のまとめ方を実践的にトレーニングできます。"
    ],
    "structure": [
      {
        "no": 1,
        "field": "数学I・A・II（小問集合）",
        "points": 20,
        "theme": "対称式と2重根号／円に内接する四角形／条件付き確率／対数不等式と桁数・最高位"
      },
      {
        "no": 2,
        "field": "数学II（微分法・積分法）",
        "points": 20,
        "theme": "3次関数の点対称性・接線・囲まれる面積の比16:27と線分長の最大値"
      },
      {
        "no": 3,
        "field": "数学II（三角関数・高次方程式）",
        "points": 20,
        "theme": "3倍角の公式・cos(π/9)を解にもつ3次方程式の対称式・実数解の個数分類"
      },
      {
        "no": 4,
        "field": "数学B（数列）",
        "points": 20,
        "theme": "和Snと一般項anの連立漸化式・指数型漸化式・(等差)×(等比)型の和の導出"
      },
      {
        "no": 5,
        "field": "数学C（空間ベクトル）",
        "points": 20,
        "theme": "等面四面体の垂線の足・体積・対辺中点線分の直交証明と外接球の半径"
      }
    ],
    "fields": [
      "小問集合",
      "微分・積分（数II）",
      "三角関数・高次方程式",
      "数列・漸化式",
      "空間ベクトル・四面体"
    ],
    "rubricSample": {
      "label": "第2問（数学II・微分法と積分法 ／ 20点満点）より (2)・(3)",
      "problem": "関数 $f(x)=x^3-3x^2-9x+11$ のグラフを $C$ とする。(1) 極値と $x$ 軸との交点。(2) 点 $\\mathrm{A}(1,0)$ に関する対称性の証明と接線 $\\ell$。(3) 極大点における接線 $m$ と $C$ が囲む面積 $S_1$。",
      "parts": [
        {
          "no": 2,
          "full": 5,
          "answer": "対称性の証明，\\ell: y = -12x + 12",
          "plus": [
            {
              "text": "$f(1+h)+f(1-h)$ を計算し，展開または奇関数への帰着により $0$ となることを示す",
              "points": 3
            },
            {
              "text": "$f'(1)=-12$ を求め，点 $\\mathrm{A}(1,0)$ における接線 $\\ell: y=-12x+12$ を求める",
              "points": 2
            }
          ],
          "minus": [
            {
              "text": "特定の値（$h=2$ など）のみを代入して対称であると結論づけている",
              "points": -2
            },
            {
              "text": "接線の傾き $f'(1)=-12$ は正しいが，定数項の計算を誤る",
              "points": -1
            }
          ]
        },
        {
          "no": 3,
          "full": 5,
          "answer": "m: y=16,\\ \\mathrm{Q}(5, 16),\\ S_1 = 108",
          "plus": [
            {
              "text": "接線 $m: y=16$ を求め，$16-f(x)=-(x+1)^2(x-5)$ から交点 $\\mathrm{Q}(5, 16)$ を得る",
              "points": 2
            },
            {
              "text": "面積を $S_1=\\int_{-1}^{5}\\{16-f(x)\\}dx$ と立式する",
              "points": 1
            },
            {
              "text": "定積分を実行して $S_1=108$ を得る",
              "points": 2
            }
          ],
          "minus": [
            {
              "text": "1/12公式を無断で答えのみに使い，被積分関数を $(x+1)^2(5-x)$ と変形する過程がない",
              "points": -1
            }
          ]
        }
      ],
      "principles": [
        "答えのみの答案：途中の論証や計算過程が一切なく答えのみを記した答案は，原則として正答であっても 1 点以下とする。",
        "連動する誤りの救済：前問の計算ミスを引き継いで後続の小問を解いている場合，後続の小問における立式・変形の方針が正しければ，方針点（配点の半分程度）を与える。",
        "対数の真数条件（第1問(4)），3次関数の上下関係と定積分の立式（第2問），t=cosθ の対応するθの個数（第3問），n=1 の初項確認（第4問），外接球の中心の位置ベクトルの設定根拠（第5問）など，論理の飛躍がある箇所は段階的に減点する。"
      ]
    },
    "files": [
      {
        "key": "full",
        "label": "一括統合版（問題・解答用紙・解説・採点基準）",
        "note": "大扉・目次・問題冊子・A4所定解答用紙5枚・解答解説・自己採点評価表つき採点基準を1冊にまとめた完全版PDF",
        "pages": 32
      },
      {
        "key": "problems",
        "label": "問題冊子",
        "note": "A4原寸・本番形式の表紙・注意事項・問題（大問5題）・計算下書き用紙",
        "pages": 4
      },
      {
        "key": "answer-sheets",
        "label": "所定解答用紙",
        "note": "A4原寸・大問ごとに1枚（計5枚）＋受験番号・小問別採点欄・出題分野帯つき",
        "pages": 5
      },
      {
        "key": "solutions",
        "label": "解答・解説",
        "note": "A4・出題のねらい・指針・模範解答・網掛け別解つき",
        "pages": 15
      },
      {
        "key": "rubric",
        "label": "採点基準（自己採点・添削用）",
        "note": "A4・100点満点（200点換算）・S〜D評価グレード表・小問別の加点項目と減点例",
        "pages": 9
      }
    ],
    "previews": [
      {
        "src": "/samples/mock-exams/preview-zento-set1/cover.webp",
        "label": "表紙（問題冊子）",
        "width": 900,
        "height": 1273
      },
      {
        "src": "/samples/mock-exams/preview-zento-set1/problem.webp",
        "label": "問題紙（大問1サンプル）",
        "width": 900,
        "height": 1273
      },
      {
        "src": "/samples/mock-exams/preview-zento-set1/answer-sheet.webp",
        "label": "所定解答用紙（第1問）",
        "width": 900,
        "height": 1273
      },
      {
        "src": "/samples/mock-exams/preview-zento-set1/solution.webp",
        "label": "解答・解説（大問1・論述答案）",
        "width": 900,
        "height": 1273
      },
      {
        "src": "/samples/mock-exams/preview-zento-set1/rubric.webp",
        "label": "採点基準（配点一覧・加点減点表）",
        "width": 900,
        "height": 1273
      }
    ]
  },
  {
    "id": "preview-zento-set2",
    "status": "on-sale",
    "level": "zento-standard",
    "title": "数学記述模試『入試プレビュー』第2セット［実戦・数III融合編］（数I・A・II・B・C・III全範囲）",
    "shortTitle": "第2セット［実戦・数III融合編］",
    "edition": "第2セット ｜ 実戦・数III融合編",
    "monthLabel": "第2セット",
    "seasonTag": "数III実戦",
    "targetSummary": "高校3年・浪人生 ｜ 旧帝大・上位国公立理系・私立医学部志望（偏差値60.0〜67.5）",
    "target": {
      "universities": "旧帝大・上位国公立大理系・私立医学部（二次実戦レベル）",
      "deviation": "全統記述模試 偏差値 60.0〜67.5 目安（目標得点：65点/100点以上）",
      "audience": "高校3年・浪人生 ｜ 既習範囲：数I・A・II・B・C・III全範囲修了生"
    },
    "scope": "数学I・A・II・B・C（ベクトル・複素数平面・式と曲線）・III",
    "minutes": 100,
    "fullMark": 100,
    "daimonCount": 5,
    "price": 1980,
    "badges": [
      "問題・解答用紙・解説・採点基準",
      "自己採点成績評価グレード表つき",
      "数III・複素数平面含む完全版（全32p）"
    ],
    "summary": "理系記述試験の核となる数III・複素数平面を含む全範囲模試。分数漸化式と級数・一次分数変換の像と除外点・球面上の内積と四面体体積・(log x)/x の回転体を100分5大問で解き切る実戦演習。",
    "aims": [
      "【理系全範囲の完成度測定】数III微積分・極限および数C複素数平面を修了した受験生が、難関国公立・私立医学部の二次記述で合格点を確保できるかを判定します。",
      "【厳密な論証力の養成】一次分数変換における除外点の処理、無限級数の部分和極限の明記、空間図形における内積の分解など、理系記述模試で合否を分ける急所を網羅しています。",
      "【自己採点評価表の付属】S・A・B・C・Dの5段階評価基準（旧帝大・国公立医学部・地方国公立理系判定目安）を採点基準に収録。減点箇所を即座に補強できます。"
    ],
    "structure": [
      {
        "no": 1,
        "field": "数学I・A・II・III（小問集合）",
        "points": 20,
        "theme": "1次不定方程式の正整数解／対称型三角関数の最大最小／数列と関数の極限／定積分関数方程式"
      },
      {
        "no": 2,
        "field": "数学B・III（数列と無限級数）",
        "points": 20,
        "theme": "分数係数漸化式の階差への帰着・一般項の極限・部分分数分解と無限級数の和"
      },
      {
        "no": 3,
        "field": "数学C（複素数平面）",
        "points": 20,
        "theme": "一次分数変換 w=(2z-1)/(z-2) による単位円と虚軸の像・除外点・偏角tanθの最大値"
      },
      {
        "no": 4,
        "field": "数学C（空間ベクトルと球面）",
        "points": 20,
        "theme": "球面と平面の交円・円周上の動点の内積最大最小・球面上の動点がつくる四面体の体積最大"
      },
      {
        "no": 5,
        "field": "数学III（微分法・積分法）",
        "points": 20,
        "theme": "y=(log x)/x の増減凹凸・原点からの接線と不等式証明・囲まれる面積・x軸回転体体積"
      }
    ],
    "fields": [
      "小問集合（数III）",
      "数列・無限級数",
      "複素数平面",
      "空間ベクトル・球面",
      "微分・積分（数III）"
    ],
    "rubricSample": {
      "label": "第3問（数学C・複素数平面 ／ 20点満点）より (2)・(4)",
      "problem": "複素数平面上で $z\\neq 2$ を満たす複素数 $z$ に対して $w=\\frac{2z-1}{z-2}$ とおく。(1) $z$ を $w$ で表し $|z|=1$ の像を求める。(2) 点 $z$ が虚軸全体を動くときの点 $w$ の軌跡と図示。(4) 点 $z$ が虚軸の負の部分（$z=ti, t<0$）を動くときの $w$ の偏角 $\\theta$ に対する $\\tan\\theta$ の最大値。",
      "parts": [
        {
          "no": 2,
          "full": 5,
          "answer": "点 \\frac{5}{4} を中心とする半径 \\frac{3}{4} の円（ただし点 2 を除く）",
          "plus": [
            {
              "text": "虚軸上の条件 $z+\\bar{z}=0$ に $z=\\frac{2w-1}{w-2}$ を代入する",
              "points": 1
            },
            {
              "text": "展開・整理して $\\left|w-\\frac{5}{4}\\right|=\\frac{3}{4}$ を導く",
              "points": 2
            },
            {
              "text": "除外点 $w\\neq 2$ を明記し，中心 $\\frac{5}{4}$・半径 $\\frac{3}{4}$・点 $2$（白丸）を図示する",
              "points": 2
            }
          ],
          "minus": [
            {
              "text": "除外点 $w\\neq 2$（点 $2$ を除くこと）を記述・図示ともに落としている",
              "points": -2
            }
          ]
        },
        {
          "no": 4,
          "full": 6,
          "answer": "\\tan\\theta \\text{ の最大値 } \\frac{3}{4}\\ \\left(w=\\frac{4+3i}{5},\\ z=-i\\right)",
          "plus": [
            {
              "text": "$z=ti\\ (t<0)$ から $w=\\frac{2(t^2+1)-3ti}{t^2+4}$ と表し，$\\tan\\theta=\\frac{-3t}{2(t^2+1)}$ を導く（または円への接線条件を立てる）",
              "points": 2
            },
            {
              "text": "相加・相乗平均の関係（または直角三角形）から最大値 $\\frac{3}{4}$ を求める",
              "points": 2
            },
            {
              "text": "等号成立時の $z=-i$ および $w=\\frac{4+3i}{5}$ を求める",
              "points": 2
            }
          ],
          "minus": [
            {
              "text": "$t<0$ の符号処理を誤り，$\\tan\\theta=-\\frac{3}{4}$ としている",
              "points": -2
            }
          ]
        }
      ],
      "principles": [
        "答えのみの答案：途中の論証や計算過程が一切なく答えのみを記した答案は，原則として正答であっても 1 点以下とする。",
        "無限級数の和（第2問(3)(4)）では，必ず第 N 部分和 S_N を求めてから N→∞ の極限をとる過程を明記すること。",
        "一次分数変換における除外点 w≠2 の処理（第3問(2)(3)）や，不等式の微分による証明（第5問(2)）など，論理の根拠を欠く答案は減点する。"
      ]
    },
    "files": [
      {
        "key": "full",
        "label": "一括統合版（問題・解答用紙・解説・採点基準）",
        "note": "大扉・目次・問題冊子・A4所定解答用紙5枚・解答解説・自己採点評価表つき採点基準を1冊にまとめた完全版PDF",
        "pages": 32
      },
      {
        "key": "problems",
        "label": "問題冊子",
        "note": "A4原寸・本番形式の表紙・注意事項・問題（大問5題）・計算下書き用紙",
        "pages": 4
      },
      {
        "key": "answer-sheets",
        "label": "所定解答用紙",
        "note": "A4原寸・大問ごとに1枚（計5枚）＋受験番号・小問別採点欄・出題分野帯つき",
        "pages": 5
      },
      {
        "key": "solutions",
        "label": "解答・解説",
        "note": "A4・出題のねらい・指針・模範解答・網掛け別解つき",
        "pages": 14
      },
      {
        "key": "rubric",
        "label": "採点基準（自己採点・添削用）",
        "note": "A4・100点満点（200点換算）・S〜D評価グレード表・小問別の加点項目と減点例",
        "pages": 9
      }
    ],
    "previews": [
      {
        "src": "/samples/mock-exams/preview-zento-set2/cover.webp",
        "label": "表紙（問題冊子）",
        "width": 900,
        "height": 1273
      },
      {
        "src": "/samples/mock-exams/preview-zento-set2/problem.webp",
        "label": "問題紙（大問1サンプル）",
        "width": 900,
        "height": 1273
      },
      {
        "src": "/samples/mock-exams/preview-zento-set2/answer-sheet.webp",
        "label": "所定解答用紙（第1問）",
        "width": 900,
        "height": 1273
      },
      {
        "src": "/samples/mock-exams/preview-zento-set2/solution.webp",
        "label": "解答・解説（大問1・論述答案）",
        "width": 900,
        "height": 1273
      },
      {
        "src": "/samples/mock-exams/preview-zento-set2/rubric.webp",
        "label": "採点基準（配点一覧・加点減点表）",
        "width": 900,
        "height": 1273
      }
    ]
  },
  {
    "id": "preview-zento-set3",
    "status": "on-sale",
    "level": "zento-high",
    "title": "数学記述模試『入試プレビュー』第3セット［難関・発展総合編］（全範囲・難関大二次実戦）",
    "shortTitle": "第3セット［難関・発展総合編］",
    "edition": "第3セット ｜ 難関・発展総合編",
    "monthLabel": "第3セット",
    "seasonTag": "難関・発展",
    "targetSummary": "高校3年・浪人生 ｜ 東大・京大・難関国公立・難関医学部志望（偏差値65.0〜72.5+）",
    "target": {
      "universities": "最難関国公立大（東大・京大・東工・阪大等）・難関大医学部",
      "deviation": "全統記述模試 偏差値 65.0〜72.5+ 目安（目標得点：60点/100点以上）",
      "audience": "高校3年・浪人生 ｜ 既習範囲：全範囲修了・冠模試や難関大二次を見据えた発展総合演習期"
    },
    "scope": "数学I・A・II・B・C・III（全範囲・分野融合）",
    "minutes": 120,
    "fullMark": 100,
    "daimonCount": 5,
    "price": 2480,
    "badges": [
      "問題・解答用紙・解説・採点基準",
      "自己採点成績評価グレード表つき",
      "冠模試・最難関大実戦120分（全32p）"
    ],
    "summary": "名大オープン等の大学別冠模試や難関大二次を見据えた120分完全記述式模試。整数の剰余と平方数否定・正三角柱のランダムウォーク・二次曲線の直交接線と回転体・空間立体の2方向断面・定積分漸化式とはさみうちを収録。",
    "aims": [
      "【冠模試・難関大二次レベルの実戦力測定】名大オープン等の大学別冠模試や最難関国公立二次試験を突破するために必要な、思考力と高度な記述力を120分5大問で測定します。",
      "【融合題・発展題の論理構築】整数数列の最大公約数・合同式による平方数否定（第1問）、正三角柱上の空間ランダムウォーク（第2問）、立体断面と回転体（第4問）、定積分漸化式と交代級数（第5問）など、合否を分ける差のつく重要テーマを網羅。",
      "【自己採点評価表の付属】S・A・B・C・Dの5段階評価基準（東大・京大・名大・旧帝医学部判定目安）を採点基準に収録。自分の到達水準と弱点を客観的に把握できます。"
    ],
    "structure": [
      {
        "no": 1,
        "field": "数学A・B（整数の性質・数列）",
        "points": 20,
        "theme": "指数数列 an=5^n+2^(n+1) の剰余周期性・最大公約数・mod 5, 8 による平方数の背理否定"
      },
      {
        "no": 2,
        "field": "数学A・B・III（確率と漸化式・極限）",
        "points": 20,
        "theme": "正三角柱 ABC-DEF 上のランダムウォーク・対称性縮約・連立確率漸化式と固有値極限"
      },
      {
        "no": 3,
        "field": "数学II・C・III（二次曲線と微積分・回転体）",
        "points": 20,
        "theme": "放物線 y=x^2/2 の準線からの直交接線・焦点を通過する弦・面積比・x軸/y軸回転体"
      },
      {
        "no": 4,
        "field": "数学III（空間図形と積分・最短距離）",
        "points": 20,
        "theme": "連立不等式立体 x^2+y+z<=1 の2方向の断面・曲面上の最短距離・x軸回転体体積"
      },
      {
        "no": 5,
        "field": "数学III（定積分漸化式・極限・無限級数）",
        "points": 20,
        "theme": "定積分 In=∫[0,1] x^n/(x+3) dx の漸化式・はさみうち lim nIn・交代級数の望遠鏡和"
      }
    ],
    "fields": [
      "整数・指数数列",
      "確率漸化式・ランダムウォーク",
      "二次曲線・接線・回転体",
      "空間図形・断面・体積",
      "定積分漸化式・極限・級数"
    ],
    "rubricSample": {
      "label": "第1問（数学A・B・整数の性質 ／ 20点満点）より (3)・(4)",
      "problem": "自然数 $n$ に対して $a_{n}=5^{n}+2^{n+1}$ と定める。(1) $3$ の倍数であることの証明。(2) $a_{n+2}=7a_{n+1}-10a_{n}$ と $9$ の倍数条件。(3) $a_{n+1}-2a_{n}, 5a_{n}-a_{n+1}$ と隣接 $2$ 項の最大公約数。(4) $a_{n}$ が平方数となる自然数 $n$。",
      "parts": [
        {
          "no": 3,
          "full": 5,
          "answer": "a_{n+1}-2a_{n}=3\\cdot 5^n,\\ 5a_{n}-a_{n+1}=3\\cdot 2^{n+1},\\ \\text{最大公約数は } 3",
          "plus": [
            {
              "text": "$a_{n+1}-2a_n=3\\cdot 5^n$ および $5a_n-a_{n+1}=3\\cdot 2^{n+1}$ をともに正しく求める",
              "points": 2
            },
            {
              "text": "最大公約数 $g$ が $3$ の倍数かつ $3\\cdot 5^n, 3\\cdot 2^{n+1}$ の公約数であることを指摘する",
              "points": 2
            },
            {
              "text": "$\\gcd(5^n, 2^{n+1})=1$ から $g=3$ を導く",
              "points": 1
            }
          ],
          "minus": [
            {
              "text": "$g=3$ であることを具体的な $n=1,2$ から類推したのみで一般の $n$ について論証していない",
              "points": -3
            }
          ]
        },
        {
          "no": 4,
          "full": 6,
          "answer": "n = 1",
          "plus": [
            {
              "text": "$n=1$ で $a_1=9=3^2$（平方数）であることを確認する",
              "points": 1
            },
            {
              "text": "$n$ が偶数のとき $\\bmod 5$（または $\\bmod 8$）で平方数の余りと矛盾することを示す",
              "points": 2
            },
            {
              "text": "$n$ が奇数（$n\\geqq 3$）のとき $\\bmod 8$（または $\\bmod 9$）で平方数の余りと矛盾することを示す",
              "points": 2
            },
            {
              "text": "以上より $n=1$ のみであることを結論づける",
              "points": 1
            }
          ],
          "minus": [
            {
              "text": "偶数の場合または奇数の場合の一方の検討が欠落している",
              "points": -3
            }
          ]
        }
      ],
      "principles": [
        "答えのみの答案：途中の論証や計算過程が一切なく答えのみを記した答案は，原則として正答であっても 1 点以下とする。",
        "平方数の剰余の検討（第1問(4)）や、連立漸化式における対称性の根拠（第2問）、回転体の軸と断面図形の包含関係（第4問(4)）など、論理の骨格を成す条件を明記すること。",
        "定積分漸化式におけるはさみうちの原理（第5問(3)）では、両側の不等式評価の厳密性を点検する。"
      ]
    },
    "files": [
      {
        "key": "full",
        "label": "一括統合版（問題・解答用紙・解説・採点基準）",
        "note": "大扉・目次・問題冊子・A4所定解答用紙5枚・解答解説・自己採点評価表つき採点基準を1冊にまとめた完全版PDF",
        "pages": 32
      },
      {
        "key": "problems",
        "label": "問題冊子",
        "note": "A4原寸・本番形式の表紙・注意事項・問題（大問5題）・計算下書き用紙",
        "pages": 4
      },
      {
        "key": "answer-sheets",
        "label": "所定解答用紙",
        "note": "A4原寸・大問ごとに1枚（計5枚）＋受験番号・小問別採点欄・出題分野帯つき",
        "pages": 5
      },
      {
        "key": "solutions",
        "label": "解答・解説",
        "note": "A4・出題のねらい・指針・模範解答・網掛け別解つき",
        "pages": 14
      },
      {
        "key": "rubric",
        "label": "採点基準（自己採点・添削用）",
        "note": "A4・100点満点（200点換算）・S〜D評価グレード表・小問別の加点項目と減点例",
        "pages": 9
      }
    ],
    "previews": [
      {
        "src": "/samples/mock-exams/preview-zento-set3/cover.webp",
        "label": "表紙（問題冊子）",
        "width": 900,
        "height": 1273
      },
      {
        "src": "/samples/mock-exams/preview-zento-set3/problem.webp",
        "label": "問題紙（大問1サンプル）",
        "width": 900,
        "height": 1273
      },
      {
        "src": "/samples/mock-exams/preview-zento-set3/answer-sheet.webp",
        "label": "所定解答用紙（第1問）",
        "width": 900,
        "height": 1273
      },
      {
        "src": "/samples/mock-exams/preview-zento-set3/solution.webp",
        "label": "解答・解説（大問1・論述答案）",
        "width": 900,
        "height": 1273
      },
      {
        "src": "/samples/mock-exams/preview-zento-set3/rubric.webp",
        "label": "採点基準（配点一覧・加点減点表）",
        "width": 900,
        "height": 1273
      }
    ]
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
  }
];

export const storeSeller = {
  storeName: "大学別数学研究室 公式ストア",
  seller: "森 祐太",
  responsible: "森 祐太",
  address: "請求があった場合には遅滞なく開示いたします。",
  phone: "請求があった場合には遅滞なく開示いたします。",
  email: "info@yuta-eng.com",
  /** 購入後に PDF を再ダウンロードできる日数（lib/mock-exams/access.ts が読む既定値・1年間有効） */
  accessDays: 365,
} as const;

