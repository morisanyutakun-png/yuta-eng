const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yuta-eng.com";
const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@yuta-eng.com";

export const siteConfig = {
  name: "Lumora",
  shortName: "Lumora",
  brandTagline: "物理専門塾 × 教材作成AI × EdTech",
  title: "Lumora｜高校物理の専門塾と教材作成AIのEdTechスタジオ",
  description:
    "Lumora（ルモラ）は、高校物理に特化した専門塾と、AI・LaTeX を活かした教材作成、学習支援アプリの設計を一本の動線でつなぐ EdTech スタジオです。物理を「理解」で乗り越え、教材作成を「ラク」に続けるための場所。",
  url: siteUrl,
  author: "森 祐太",
  email: contactEmail,
  locale: "ja_JP",
  keywords: [
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
    "EdTech",
    "教育ICT",
    "教育DX",
    "GIGAスクール",
    "AIドリル",
    "個別最適な学び",
    "学習支援Webアプリ",
    "Lumora",
  ],
};

export const navItems = [
  { label: "ホーム", href: "/" },
  { label: "ブログ", href: "/blog" },
  { label: "アプリ", href: "/apps" },
  { label: "プロフィール", href: "/about" },
  { label: "相談", href: "/contact" },
];

export const footerSocialLinks = [
  {
    label: "更新情報",
    href: "/blog",
    note: "ブログから最新の記事を確認できます",
  },
];
