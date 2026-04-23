const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yuta-eng.com";
const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@yuta-eng.com";

export const siteConfig = {
  name: "Yuta Eng",
  title: "Yuta Eng | 高校物理の塾・AI教材作成・EdTech学習支援",
  description:
    "高校物理の理解、AI教材作成、LaTeX教材、教育DX、GIGAスクール、学習支援Webアプリをつなぐ Yuta Eng のEdTech学習スタジオです。",
  url: siteUrl,
  author: "Yuta",
  email: contactEmail,
  locale: "ja_JP",
  keywords: [
    "高校物理 塾",
    "高校物理 オンライン塾",
    "高校物理 個別指導",
    "物理基礎 定期テスト対策",
    "大学受験 物理",
    "物理教材",
    "物理教材制作",
    "物理学習",
    "力学 苦手克服",
    "教材作成AI",
    "教材作成AI 自動",
    "AI教材作成",
    "生成AI 教材作成",
    "授業プリント AI 作成",
    "LaTeX教材作成",
    "LaTeX問題集",
    "LaTeX 問題集 自動生成",
    "教材制作",
    "EdTech",
    "教育ICT",
    "教育DX",
    "GIGAスクール",
    "AIドリル",
    "個別最適な学び",
    "学習支援Webアプリ",
    "Webアプリ開発",
    "教育ブログ",
  ],
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Apps", href: "/apps" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerSocialLinks = [
  {
    label: "SNS / Portfolio",
    href: "#",
    note: "リンク追加予定",
  },
];
