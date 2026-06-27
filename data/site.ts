const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yuta-eng.com";
const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@yuta-eng.com";

// KDP で販売している教材シリーズへの補助導線。正式な商品 URL が決まったら
// この定数を差し替えるだけで、トップ・教材ページ・フッターに反映される。
export const kdpAmazonUrl =
  "https://www.amazon.co.jp/s?k=%E8%80%83%E3%81%88%E3%82%8B%E5%8A%9B%E3%82%92%E8%82%B2%E3%81%A6%E3%82%8B%E9%AB%98%E6%A0%A1%E7%89%A9%E7%90%86";

export const siteConfig = {
  name: "ノビットスタディ",
  shortName: "ノビットスタディ",
  latinName: "Nobit Study",
  division: "中高部",
  brandTagline: "考える力を育てるオンライン学習",
  title:
    "ノビットスタディ 中高部｜高校物理・数学の毎日添削オンライン塾（考える力を育てる）",
  description:
    "ノビットスタディ 中高部は、高校物理・数学・英語を中心に「毎日演習・毎日添削」で考える力を育てるオンライン添削塾です。面談や授業は行わず、塾長オリジナル教材と独自の学習管理システムで、自分のペースの自立した学びと、記述答案・途中式・考え方の力を伸ばします。塾としては安価に、毎日プロの添削が受けられます。無料体験受付中。",
  url: siteUrl,
  author: "森 祐太",
  email: contactEmail,
  locale: "ja_JP",
  kdpAmazonUrl,
  keywords: [
    // primary — 検索意図の主軸
    "高校物理 添削",
    "高校物理 オンライン塾",
    "記述答案 添削",
    "物理 記述 添削",
    "オンライン添削塾",
    "毎日添削",
    "高校数学 添削",
    // supporting — サービス特徴
    "考える力を育てる",
    "学習管理 オンライン",
    "自立学習 オンライン",
    "高校物理 個別 オンライン",
    "難関大 物理 記述",
    "名大 物理 対策",
    "高校生 添削指導",
    "高校 英語 添削",
    "理系 オンライン塾",
    // 教材
    "考える力を育てる高校物理",
    "ノビット公式演習本",
    "高校物理 教材",
    // brand
    "ノビットスタディ",
    "ノビットスタディ 中高部",
    "Nobit Study",
    "ノビット 添削",
  ],
};

// グローバルナビ。ノビットスタディ中心のため、トップページ内の各セクションへの
// アンカーと、無料体験・相談（/contact）への CTA に絞る。
export const navItems = [
  { label: "特徴", href: "/#features" },
  { label: "学習の流れ", href: "/#flow" },
  { label: "教材", href: "/#materials" },
  { label: "料金・無料体験", href: "/#pricing" },
  { label: "よくある質問", href: "/#faq" },
  { label: "無料体験・相談", href: "/contact", highlight: true },
];

export const footerNavItems = [
  { label: "サービスの特徴", href: "/#features" },
  { label: "学習の流れ", href: "/#flow" },
  { label: "教材・実績", href: "/#materials" },
  { label: "料金・無料体験", href: "/#pricing" },
  { label: "よくある質問", href: "/#faq" },
  { label: "塾について", href: "/about" },
  { label: "無料体験・相談", href: "/contact" },
];
