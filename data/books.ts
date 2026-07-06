// ノビット公式教材。毎日の演習の土台となる、ノビットのために書き下ろした教材。
// 数学・化学・英語を公開中。各 ASIN は Amazon 商品ページと public/books/{asin} の表紙に対応。
export const officialBooks = [
  { asin: "B0H6ZRPLVJ", title: "ノビットの数学ⅠA 標準演習", sub: "基礎から入試標準まで。10分野・類題演習・詳しい解説。", subject: "数学IA", accent: "#16a34a" },
  { asin: "B0H71TQJYY", title: "ノビットの数学ⅡBC 標準演習", sub: "基礎から入試標準まで。11分野・類題演習・詳しい解説。", subject: "数学IIBC", accent: "#16a34a" },
  { asin: "B0H724CBBT", title: "ノビットの数学ⅢC 標準演習", sub: "基礎から入試標準まで。9分野・類題演習・詳しい解説。", subject: "数学IIIC", accent: "#16a34a" },
  { asin: "B0H7RHT1NF", title: "ノビットの化学 標準", sub: "理論・無機・有機・高分子まで。全12分野を類題反復で固める。", subject: "化学", accent: "#0d9488" },
  { asin: "B0H7LPFKN1", title: "ノビットの英語・長文 Standard", sub: "全12テーマ・36題。構文把握から全訳、設問処理まで毎日練習。", subject: "英語長文", accent: "#ea580c" },
  { asin: "B0H7LQW2W8", title: "ノビットの英語・文法 Standard", sub: "高校英文法の主要14分野を、類題反復と詳しい解説で総点検。", subject: "英文法", accent: "#ea580c" },
];

// 開発・添削担当 森祐太 が KDP（Amazon）で刊行する『考える力を育てる』シリーズ全ラインナップ。
// asin から Amazon 商品ページ（/dp/{asin}）と表紙（public/books/{asin}）に対応。
export const bookGroups = [
  {
    group: "理論・本質理解編",
    note: "現象・図・言葉・式を結びつけ、本質から理解する。",
    accent: "#1d4ed8",
    books: [
      { asin: "B0GZGBMPJG", title: "力学", sub: "運動方程式・エネルギー・運動量からケプラー・剛体まで。" },
      { asin: "B0FQ2GJY5V", title: "電磁気学", sub: "電場・電位から回路・電磁誘導まで筋道立てて。" },
      { asin: "B0GZNFFC23", title: "熱力学", sub: "気体分子運動論から熱機関・熱効率まで体系的に。" },
      { asin: "B0GZTZH5NJ", title: "波動・原子物理学", sub: "波の式・干渉・光子・原子核を現象のイメージから。" },
    ],
  },
  {
    group: "演習編",
    note: "入門 → 標準 → 発展と、無理なくステップアップ。",
    accent: "#0d9488",
    books: [
      { asin: "B0H4J34162", title: "高校物理 入門演習", sub: "公式の意味を確かめ、自分で立式できる感覚を養う。" },
      { asin: "B0H3LLW1F2", title: "高校物理 標準演習", sub: "入試標準〜難関大を分野横断で鍛える 85 題。" },
      { asin: "B0H639CPQW", title: "高校物理 発展演習", sub: "微積も駆使し、難関大の応用を攻略する 77 題。" },
      { asin: "B0H65Y6FXQ", title: "力学 解法ドリル", sub: "書き込み式・全6章。力学の解法を手で再現する。" },
      { asin: "B0H66JNR6Q", title: "高校物理 無双（全分野）", sub: "力学〜原子の全5分野・厳選60問を一冊で総点検。" },
      { asin: "B0FSCMCRDR", title: "電磁気学演習", sub: "圧倒的な演習量で、電磁気を得点源に変える。" },
    ],
  },
  {
    group: "入試対策編",
    note: "出題傾向に直結、本番でそのまま使える実戦力。",
    accent: "#ea580c",
    books: [
      { asin: "B0H4D4RZNF", title: "名大物理 予想問題集", sub: "名古屋大学に特化した実践模試 5 回分＋詳しい解説。" },
      { asin: "B0H67XF1XL", title: "名工大物理 予想問題集", sub: "名古屋工業大学に特化した実践模試 5 回分。" },
      { asin: "B0H62FCBS5", title: "共通テスト物理 予想問題集", sub: "現象を読む力を鍛える共通テスト型模試 5 回分。" },
    ],
  },
  {
    group: "総まとめ・数学編",
    note: "分野横断の総まとめと、数学の「考える力」。",
    accent: "#16a34a",
    books: [
      { asin: "B0GZKCTHT5", title: "高校物理I（力学・電磁気）", sub: "力学・電磁気を一冊に。難関国公立二次対策。" },
      { asin: "B0GZV321YZ", title: "高校物理II（熱・波動・原子）", sub: "熱・波動・原子を一冊に。難関国公立二次対策。" },
      { asin: "B0GX1ZY4Y6", title: "高校数学 高一からの因数分解", sub: "見抜く力を鍛える 1050 題。4ステップ構成。" },
    ],
  },
];
