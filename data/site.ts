const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yuta-eng.com";
const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@yuta-eng.com";

export const physicsSchoolUrl = "https://physics.yuta-eng.com";
export const eddivomUrl = "https://eddivom.yuta-eng.com";
export const itPassUrl = "https://itpass.yuta-eng.com";

export const siteConfig = {
  name: "Solvora",
  shortName: "Solvora",
  brandTagline: "Science Learning Hub",
  title: "高校物理オンライン塾と教材作成AIをまとめる学習ハブ - Solvora",
  description:
    "高校物理を理解で解くための解説記事、AI×LaTeXによる教材作成、物理専門オンライン塾「物理の森」までをまとめた理系学習ハブ Solvora（ソルヴォラ）の公式サイト。",
  url: siteUrl,
  physicsSchoolUrl,
  eddivomUrl,
  itPassUrl,
  author: "森 祐太",
  email: contactEmail,
  locale: "ja_JP",
  brand: {
    hub: {
      name: "Solvora",
      role: "Science Learning Hub",
    },
    physicsSchool: {
      name: "物理の森",
      tagline: "高校物理 専門塾",
      url: physicsSchoolUrl,
      role: "Solvora が運営する高校物理のオンライン専門塾",
    },
  },
  keywords: [
    "Solvora",
    "ソルヴォラ",
    "理系 学習",
    "高校物理",
    "物理の森",
    "物理 オンライン塾",
    "高校物理 個別指導",
    "教材作成 AI",
    "LaTeX 教材作成",
    "学習デザイン",
    "EdTech",
  ],
};

export const navItems = [
  { label: "ホーム", href: "/" },
  { label: "学ぶ", href: "/blog" },
  {
    label: "物理の森",
    href: physicsSchoolUrl,
    external: true,
    highlight: true,
  },
  { label: "サービス", href: "/apps" },
  { label: "About", href: "/about" },
  { label: "相談", href: "/contact" },
];

export const footerSocialLinks = [
  {
    label: "更新情報",
    href: "/blog",
    note: "最新記事はブログから",
  },
];
