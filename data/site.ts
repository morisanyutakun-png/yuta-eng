const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yuta-eng.com";
const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@yuta-eng.com";

export const siteConfig = {
  name: "Lumora",
  shortName: "Lumora",
  brandTagline: "Physics × AI Materials × EdTech",
  title: "Lumora｜高校物理の理解と教材作成AIをつなぐEdTechスタジオ",
  description:
    "Lumora（ルモラ）は、高校物理を理解で乗り越えたい人と、AI・LaTeXで教材を作る人のための EdTech 学習スタジオです。読む・解く・つなぐが一本の動線で完結します。",
  url: siteUrl,
  author: "森 祐太",
  email: contactEmail,
  locale: "ja_JP",
  keywords: [
    "高校物理",
    "高校物理 わかりやすい",
    "高校物理 オンライン",
    "高校物理 個別指導",
    "物理基礎 定期テスト対策",
    "大学受験 物理",
    "物理 苦手克服",
    "力学 苦手 高校生",
    "教材作成AI",
    "教材作成AI 自動",
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
    "高校物理 教材",
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
