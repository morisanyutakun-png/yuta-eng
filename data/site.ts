const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yuta-eng.com";
const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@yuta-eng.com";

// KDP で販売している『考える力を育てる』シリーズへの補助導線。正式な商品 URL が
// 決まったら、この定数を差し替えるだけでトップ・教材・フッターに反映される。
export const kdpAmazonUrl =
  "https://www.amazon.co.jp/s?k=" + encodeURIComponent("考える力を育てる 森祐太");

export const siteConfig = {
  name: "ノビットスタディ",
  shortName: "ノビットスタディ",
  latinName: "Nobit Study",
  division: "中高部",
  brandTagline: "考える力を育てるオンライン学習",
  title:
    "ノビットスタディ 中高部｜理系の毎日添削オンライン塾（物理・化学・数学・英語）",
  description:
    "ノビットスタディ 中高部は、物理・化学・数学・英語を中心に「毎日演習・毎日添削」で考える力を育てる、授業をしないオンライン添削塾。教材を書いた塾長が答案を添削し、公式アプリで進捗を見える化、保護者も安心。教科ごとに選べて月¥4,980〜、いまなら初月半額・入会金/教材費0円。",
  url: siteUrl,
  author: "森 祐太",
  email: contactEmail,
  locale: "ja_JP",
  kdpAmazonUrl,
  keywords: [
    // primary — 検索意図の主軸
    "オンライン添削塾",
    "理系 オンライン塾",
    "記述答案 添削",
    "毎日添削",
    "高校物理 添削",
    "高校化学 添削",
    "高校数学 添削",
    "高校 英語 添削",
    // supporting — サービス特徴
    "添削 アプリ",
    "学習管理 アプリ 保護者",
    "考える力を育てる",
    "自立学習 オンライン",
    "難関大 記述 対策",
    "名大 物理 対策",
    "物理 化学 数学 添削",
    "高校生 添削指導",
    // 教材
    "考える力を育てる 森祐太",
    "ノビット公式演習本",
    // brand
    "ノビットスタディ",
    "ノビットスタディ 中高部",
    "Nobit Study",
    "ノビット 添削 アプリ",
  ],
};

// グローバルナビ。ノビットスタディ中心のため、トップページ内の各セクションへの
// アンカーと、無料体験・相談（/contact）への CTA に絞る。
export const navItems = [
  { label: "特徴", href: "/#features" },
  { label: "アプリ", href: "/#app" },
  { label: "料金・科目", href: "/#pricing" },
  { label: "教材", href: "/#materials" },
  { label: "よくある質問", href: "/#faq" },
  { label: "申し込む", href: "/apply", highlight: true },
];

export const footerNavItems = [
  { label: "サービスの特徴", href: "/#features" },
  { label: "公式アプリ", href: "/#app" },
  { label: "学習の流れ", href: "/#flow" },
  { label: "教材・実績", href: "/#materials" },
  { label: "料金・対応科目", href: "/#pricing" },
  { label: "よくある質問", href: "/#faq" },
  { label: "塾について", href: "/about" },
  { label: "お申し込み（初月半額）", href: "/apply" },
  { label: "質問・相談", href: "/contact" },
];
