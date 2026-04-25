const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yuta-eng.com";
const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@yuta-eng.com";

export const physicsSchoolUrl = "https://physics.yuta-eng.com";
export const eddivomUrl = "https://eddivom.yuta-eng.com";
export const itPassUrl = "https://itpass.yuta-eng.com";

export const siteConfig = {
  name: "Lumora",
  shortName: "Lumora",
  brandTagline: "Science Learning Hub",
  title: "Lumora｜理系の学びを、もう一段深く。",
  description:
    "Lumora（ルモラ）は、物理・数学・情報・教材設計など、理系の学びを深めるための記事と専門サービスをまとめるサイトです。",
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
      role: "Science Learning Hub",
    },
    physicsSchool: {
      name: "物理の森",
      tagline: "高校物理 専門塾",
      url: physicsSchoolUrl,
      role: "Lumora が運営する高校物理のオンライン専門塾",
    },
  },
  keywords: [
    "Lumora",
    "ルモラ",
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
