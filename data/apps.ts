export type AppItem = {
  name: string;
  comparison: string;
  description: string;
  audience: string;
  category: string;
  href: string;
  ctaLabel: string;
  status: string;
};

export const apps: AppItem[] = [
  {
    name: "Eddivom",
    comparison: "AI と LaTeX で教材作成を一気通貫で進めたい人へ。",
    description:
      "Eddivom は、生成AIで作った下書きを LaTeX に流し込み、小テスト・類題・解答PDFまでをワンストップで出力できる学習支援Webアプリです。Lumora が公式に紹介しています。",
    audience: "塾講師・教材制作者・物理や数学のプリントを作りたい教育関係者",
    category: "Education / Material Creation",
    href: "https://eddivom.yuta-eng.com",
    ctaLabel: "Eddivom を開く",
    status: "おすすめ",
  },
  {
    name: "IT Pass",
    comparison: "ITの基礎知識と試験対策を短時間で積み上げたい人へ。",
    description:
      "IT Pass は、基本情報処理や IT パスポート系の試験対策を、スキマ時間で繰り返し学べる学習アプリです。短い演習を積み上げたい入口として使えます。",
    audience: "IT 基礎を学び直したい学習者・試験対策中の社会人や学生",
    category: "IT Learning / Exam Support",
    href: "https://itpass.yuta-eng.com",
    ctaLabel: "IT Pass を開く",
    status: "外部アプリ",
  },
  {
    name: "Physics",
    comparison: "物理の概念理解と演習を行き来したい人へ。",
    description:
      "Physics は、高校物理の概念解説と演習をひとつの画面で行き来できる学習アプリです。Lumora の記事で整理した考え方を、実際に問題で確かめるための実践導線として案内しています。",
    audience: "物理を学ぶ高校生・受験生・物理教材を扱う教員",
    category: "Physics / Study Tools",
    href: "https://physics.yuta-eng.com",
    ctaLabel: "Physics を開く",
    status: "外部アプリ",
  },
];
