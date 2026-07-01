const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://yuta-eng.com"
).replace(/\/+$/, "");
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
  brandTagline: "毎日の学習を、仕組みにする。",
  title:
    "ノビットスタディ 中高部｜毎日の学習を仕組みにするデジタル通信添削（物理・化学・数学・英語）",
  description:
    "ノビットスタディ 中高部は、塾でも参考書でもない「続く学習システム」。開発者自作のオリジナル教材を毎日1枚ずつ進め、提出した答案に毎日添削。専用アプリで習慣化し、保護者も進捗を確認できます。教材×習慣化×添削のデジタル通信添削。物理・化学・数学・英語、教科ごと月¥4,980〜・初月半額・入会金/教材費0円。",
  url: siteUrl,
  author: "森 祐太",
  email: contactEmail,
  locale: "ja_JP",
  kdpAmazonUrl,
  keywords: [
    // primary — 検索意図の主軸
    "通信添削",
    "デジタル通信添削",
    "毎日添削",
    "記述答案 添削",
    "学習習慣 アプリ",
    "オリジナル教材 添削",
    "高校物理 添削",
    "高校化学 添削",
    "高校数学 添削",
    "高校 英語 添削",
    // supporting — サービス特徴
    "添削 アプリ",
    "学習管理 アプリ 保護者",
    "勉強 習慣化",
    "考える力を育てる",
    "自立学習 オンライン",
    "難関大 記述 対策",
    "名大 物理 対策",
    "物理 化学 数学 添削",
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
  { label: "しくみ", href: "/how-it-works" },
  { label: "アプリ", href: "/app" },
  { label: "教材", href: "/materials" },
  { label: "料金・科目", href: "/apply#pricing" },
  { label: "よくある質問", href: "/#faq" },
  { label: "申し込む", href: "/apply", highlight: true },
];

export const footerNavItems = [
  { label: "ノビットのしくみ", href: "/how-it-works" },
  { label: "公式アプリ", href: "/app" },
  { label: "教材", href: "/materials" },
  { label: "料金・対応科目", href: "/apply#pricing" },
  { label: "よくある質問", href: "/#faq" },
  { label: "運営者について", href: "/about" },
  { label: "お申し込み（初月半額）", href: "/apply" },
  { label: "質問・相談", href: "/contact" },
];
