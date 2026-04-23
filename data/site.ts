const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yuta-eng.com";
const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@yuta-eng.com";

export const siteConfig = {
  name: "Yuta Eng",
  title: "Yuta Eng | 物理教材・LaTeX教材作成・学習支援Webアプリ開発",
  description:
    "物理教材、LaTeX教材作成、教育ICT、学習支援Webアプリ開発を横断し、学びの導線を設計する yuta-eng.com の公式サイトです。",
  url: siteUrl,
  author: "Yuta",
  email: contactEmail,
  locale: "ja_JP",
  keywords: [
    "物理教材",
    "物理教材制作",
    "物理学習",
    "LaTeX教材作成",
    "LaTeX問題集",
    "教材制作",
    "教育ICT",
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
