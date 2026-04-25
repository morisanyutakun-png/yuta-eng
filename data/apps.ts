export type AppItem = {
  name: string;
  comparison: string;
  description: string;
  audience: string;
  category: string;
  href: string;
  ctaLabel: string;
  status: string;
  featured?: boolean;
};

export const apps: AppItem[] = [
  {
    name: "物理の森",
    comparison: "高校物理を「理解」で乗り越えたい高校生・受験生へ。",
    description:
      "物理の森は、Lumora が運営する高校物理専門のオンライン塾です。公式暗記ではなく、現象 → 図 → 式 の順で読み解く力を、個別カリキュラムで育てます。物理基礎・物理の通年指導、定期テスト対策、共通テスト・国公立二次・私大入試まで対応。受講相談は専門塾サイトから。",
    audience: "高校物理でつまずいている高校生・受験生・浪人生／物理を理解で解けるようになりたい方",
    category: "高校物理 専門塾",
    href: "https://physics.yuta-eng.com",
    ctaLabel: "物理の森（物理塾）を開く",
    status: "Lumora 運営",
    featured: true,
  },
  {
    name: "Eddivom",
    comparison: "AI と LaTeX で教材作成を一気通貫で進めたい人へ。",
    description:
      "Eddivom は、生成AIで作った下書きを LaTeX に流し込み、小テスト・類題・解答PDFまでをワンストップで出力できる教材作成Webアプリです。Lumora が公式に紹介しています。",
    audience: "塾講師・教材制作者・物理や数学のプリントを作りたい教育関係者",
    category: "教材作成AI / 教材制作",
    href: "https://eddivom.yuta-eng.com",
    ctaLabel: "Eddivom を開く",
    status: "公式パートナー",
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
];
