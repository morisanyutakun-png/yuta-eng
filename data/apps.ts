export type AppItem = {
  name: string;
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
    description:
      "教育コンテンツや学習支援の導線を扱う既存アプリです。yuta-eng.com では紹介カードとして掲載し、アプリ本体へ案内します。",
    audience: "教材制作や学習環境を整理したい学習者・教育関係者",
    category: "Education / Learning Support",
    href: "https://eddivom.yuta-eng.com",
    ctaLabel: "Eddivom を開く",
    status: "外部の既存アプリ",
  },
  {
    name: "IT Pass",
    description:
      "IT 学習や試験対策の入口として運用されている既存アプリです。基礎学習を継続しやすい外部サービスとして案内します。",
    audience: "IT 基礎を学びたい学習者・試験対策中の方",
    category: "IT Learning / Exam Support",
    href: "https://itpass.yuta-eng.com",
    ctaLabel: "IT Pass を開く",
    status: "外部の既存アプリ",
  },
  {
    name: "Physics",
    description:
      "物理学習や教材制作の補助を目的とした既存アプリです。概念理解と演習への接続を意識した学習導線として紹介します。",
    audience: "物理を学ぶ学生・教材を作る教育者",
    category: "Physics / Study Tools",
    href: "https://physics.yuta-eng.com",
    ctaLabel: "Physics を開く",
    status: "外部の既存アプリ",
  },
];
