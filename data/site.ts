const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yuta-eng.com";
const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@yuta-eng.com";

export const physicsSchoolUrl = "https://physics.yuta-eng.com";
export const eddivomUrl = "https://eddivom.yuta-eng.com";
export const itPassUrl = "https://itpass.yuta-eng.com";

export const siteConfig = {
  name: "Solvora",
  shortName: "Solvora",
  brandTagline: "EdTech SaaS for STEM Talent Development",
  title: "理系人材育成 EdTech SaaS｜AI教材・学習アプリ・物理塾の公式ハブ - Solvora",
  description:
    "Solvora（ソルヴォラ）は、理系人材育成のための EdTech SaaS を開発・運営する EdTech スタートアップ。主力 SaaS の AI×LaTeX 教材作成「Eddivom」、高校物理学習アプリ「Physics」、ITパスポート対策アプリ「IT Pass」、そして直営の物理専門オンライン塾「物理の森」を 1 つの公式ハブに集約。GIGAスクール構想後の教育DX／STEM 教育を、AI 教材作成と学習支援 SaaS で支えます。",
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
      role: "EdTech SaaS Hub｜理系人材育成 EdTech スタートアップ",
    },
    physicsSchool: {
      name: "物理の森",
      tagline: "高校物理 専門塾",
      url: physicsSchoolUrl,
      role: "Solvora 直営の高校物理オンライン専門塾（物理講座の外注はこちら経由）",
    },
  },
  keywords: [
    // primary — 検索意図の主軸
    "EdTech",
    "EdTech SaaS",
    "教育 SaaS",
    "理系人材育成",
    "理系人材 育成",
    "STEM教育",
    "STEM 人材育成",
    // supporting — Solvora の事業領域
    "EdTech スタートアップ",
    "教育系 スタートアップ",
    "AI 教材作成",
    "教材作成 AI",
    "LaTeX 教材作成",
    "学習支援アプリ",
    "学習支援 SaaS",
    "教育DX",
    "GIGAスクール",
    "GIGAスクール構想",
    // brand
    "Solvora",
    "ソルヴォラ",
    "Eddivom",
    "Physics",
    "IT Pass",
    "物理の森",
    "高校物理 オンライン塾",
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
  { label: "Contact", href: "/contact" },
];

export const footerSocialLinks = [
  {
    label: "更新情報",
    href: "/blog",
    note: "最新記事はブログから",
  },
];
