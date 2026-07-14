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
    "ノビットスタディ 中高部は、高校生向けの買い切り通信添削。1回10〜20分の教材を解いて答案を提出すると、途中式や考え方まで人が添削し、解答解説PDFと次の範囲が届きます。物理・化学・数学・英語、1教材（約100回分・添削込み）通常¥14,800／2026年8月6日まで開講記念¥9,800、入会金・月額料金・追加費用0円。",
  url: siteUrl,
  author: "森 祐太",
  email: contactEmail,
  locale: "ja_JP",
  kdpAmazonUrl,
  keywords: [
    // primary — 検索意図の主軸
    "通信添削",
    "デジタル通信添削",
    "答案添削",
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
  { label: "仕組み", href: "/#how" },
  { label: "添削例", href: "/#samples" },
  { label: "料金", href: "/#pricing" },
  { label: "よくある質問", href: "/#faq" },
  { label: "教材を選ぶ", href: "/apply#form", highlight: true },
];

export const footerNavItems = [
  { label: "ノビットのしくみ", href: "/how-it-works" },
  { label: "公式アプリ", href: "/app" },
  { label: "購入後の流れ", href: "/after-purchase" },
  { label: "教材", href: "/materials" },
  { label: "料金・対応教材", href: "/apply#pricing" },
  { label: "よくある質問", href: "/#faq" },
  { label: "運営者について", href: "/about" },
  { label: "お申し込み（買い切り）", href: "/apply" },
  { label: "質問・相談", href: "/contact" },
];
