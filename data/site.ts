const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yuta-eng.com";
const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@yuta-eng.com";

export const physicsSchoolUrl = "https://physics.yuta-eng.com";
export const eddivomUrl = "https://eddivom.yuta-eng.com";
export const itPassUrl = "https://itpass.yuta-eng.com";

export const siteConfig = {
  name: "Solvora",
  shortName: "Solvora",
  brandTagline: "STEM Learning Hub for Japan",
  title: "理系人材育成のEdTechハブ｜AI教材・学習アプリ・物理塾を集約 - Solvora",
  description:
    "Solvora（ソルヴォラ）は、AI教材作成 Eddivom・学習支援アプリ Solvora Physics／IT Pass・物理専門オンライン塾「物理の森」を集約した理系人材育成 EdTech ハブ。GIGAスクール構想後の高校・大学・社会人の理系学習をつなぐ教材設計とサービス公式入口、深く学べる解説ブログをまとめています。",
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
      role: "STEM Learning Hub｜理系人材育成EdTech",
    },
    physicsSchool: {
      name: "物理の森",
      tagline: "高校物理 専門塾",
      url: physicsSchoolUrl,
      role: "Solvora が運営する高校物理のオンライン専門塾",
    },
  },
  keywords: [
    "理系人材育成",
    "理系 教育",
    "STEM教育",
    "EdTech",
    "EdTech 日本",
    "GIGAスクール",
    "GIGAスクール構想",
    "教育DX",
    "AI 教材作成",
    "教材作成 AI",
    "LaTeX 教材作成",
    "学習支援アプリ",
    "学習デザイン",
    "Eddivom",
    "Solvora Physics",
    "IT Pass",
    "物理の森",
    "高校物理 オンライン塾",
    "Solvora",
    "ソルヴォラ",
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
