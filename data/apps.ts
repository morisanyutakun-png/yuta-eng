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
    comparison: "AIとLaTeXで教材作成を進めたいとき。",
    description:
      "Eddivomは、AIとLaTeXを活用して、小テスト・類題・解答PDFなどの教材作成を支援するWebアプリです。教材制作の下書きから、学習者に渡せる形へ整える流れをサポートします。",
    audience: "塾講師・教材制作者・物理や数学のプリントを作りたい教育関係者",
    category: "Education / Material Creation",
    href: "https://eddivom.yuta-eng.com",
    ctaLabel: "Eddivom を開く",
    status: "外部の既存アプリ",
  },
  {
    name: "IT Pass",
    comparison: "ITの基礎学習と試験対策を進めたいとき。",
    description:
      "IT学習や試験対策を継続しやすくするための外部アプリです。基礎を短く積み上げたいときの入口として案内します。",
    audience: "IT 基礎を学びたい学習者・試験対策中の方",
    category: "IT Learning / Exam Support",
    href: "https://itpass.yuta-eng.com",
    ctaLabel: "IT Pass を開く",
    status: "外部の既存アプリ",
  },
  {
    name: "Physics",
    comparison: "物理の理解と演習をそのままつなげたいとき。",
    description:
      "物理学習や教材制作の補助を目的とした外部アプリです。概念理解から演習へ進む流れを意識した学習導線として紹介します。",
    audience: "物理を学ぶ学生・教材を作る教育者",
    category: "Physics / Study Tools",
    href: "https://physics.yuta-eng.com",
    ctaLabel: "Physics を開く",
    status: "外部の既存アプリ",
  },
];
