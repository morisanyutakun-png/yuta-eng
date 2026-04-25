const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yuta-eng.com";
const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@yuta-eng.com";

export const physicsSchoolUrl = "https://physics.yuta-eng.com";
export const eddivomUrl = "https://eddivom.yuta-eng.com";
export const itPassUrl = "https://itpass.yuta-eng.com";

export const siteConfig = {
  name: "Lumora",
  shortName: "Lumora",
  brandTagline: "Learning Hub｜教育・物理・教材作成AI",
  title: "Lumora｜物理の森や教材作成AIをつなぐ学習ハブ",
  description:
    "yuta-eng.com（Lumora）は、Lumora が運営する学習ハブです。物理専門塾「物理の森」、教材作成アプリ Eddivom、IT 学習アプリ IT Pass など、各事業の公式入口を1つにまとめ、ブログで考え方を発信しています。",
  url: siteUrl,
  physicsSchoolUrl,
  eddivomUrl,
  itPassUrl,
  author: "森 祐太",
  email: contactEmail,
  locale: "ja_JP",
  brand: {
    hub: {
      name: "Lumora",
      role: "学習ハブ（運営ブランド）",
    },
    physicsSchool: {
      name: "物理の森",
      tagline: "高校物理 専門塾",
      url: physicsSchoolUrl,
      role: "Lumora が運営する物理専門塾事業",
    },
  },
  keywords: [
    "Lumora",
    "学習ハブ",
    "EdTech",
    "教育ブランド",
    "物理の森",
    "高校物理 専門塾",
    "物理専門塾",
    "物理 オンライン塾",
    "高校物理 個別指導",
    "物理 苦手克服",
    "物理基礎 定期テスト対策",
    "大学受験 物理",
    "共通テスト 物理 対策",
    "二次試験 物理 対策",
    "力学 苦手 高校生",
    "電磁気 苦手 克服",
    "教材作成AI",
    "AI教材作成",
    "生成AI 教材作成",
    "授業プリント AI 作成",
    "LaTeX 教材作成",
    "LaTeX 問題集 自動生成",
    "教材制作",
    "教育ICT",
    "教育DX",
    "GIGAスクール",
    "AIドリル",
    "個別最適な学び",
    "学習支援Webアプリ",
  ],
};

export const navItems = [
  { label: "ホーム", href: "/" },
  { label: "ブログ", href: "/blog" },
  {
    label: "物理の森",
    href: physicsSchoolUrl,
    external: true,
    highlight: true,
  },
  { label: "事業一覧", href: "/apps" },
  { label: "Lumora とは", href: "/about" },
  { label: "相談", href: "/contact" },
];

export const footerSocialLinks = [
  {
    label: "更新情報",
    href: "/blog",
    note: "ブログから最新の記事を確認できます",
  },
];
