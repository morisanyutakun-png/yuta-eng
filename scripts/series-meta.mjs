// 「過去問の前に」シリーズの原稿フォルダ → サイト上のメタ情報。
// 原稿は ~/ 直下にあり、ここからは読むだけで書き換えない。
//
// slug は大学別分析（/univ/<slug>）と同じにしてある。
// 同じ大学の「分析 → 完成演習 → 合格答案をつくる」を slug 1つでつなぐため。
//
// Amazon の ASIN・価格は原稿にないので、ここではなく lib/catalog.ts に置く
// （ASIN を足すだけで公開できるよう、ビルド時に読む側に置いてある）。

/** 分野別完成演習。並びは診断模試の「8大学はどう違うか」の表と同じ。 */
export const kanseiBooks = [
  { slug: "todai-rikei", dir: "東大理系数学/東大完成演習", name: "東大理系数学", university: "東京大学", uni: "東大" },
  { slug: "kyodai-rikei", dir: "京大理系数学/京大完成演習", name: "京大理系数学", university: "京都大学", uni: "京大" },
  { slug: "handai-rikei", dir: "大阪大学数学/阪大完成演習", name: "阪大理系数学", university: "大阪大学", uni: "阪大" },
  { slug: "nagoya-rikei", dir: "名大数学/名大完成演習", name: "名大理系数学", university: "名古屋大学", uni: "名大" },
  { slug: "tohoku-rikei", dir: "東北大学理系数学/東北大完成演習", name: "東北大理系数学", university: "東北大学", uni: "東北大" },
  { slug: "kyudai-rikei", dir: "九州大理系数学/九大完成演習", name: "九大理系数学", university: "九州大学", uni: "九大" },
  { slug: "hokudai-rikei", dir: "北大理系数学/北大完成演習", name: "北大理系数学", university: "北海道大学", uni: "北大" },
  // 表紙・原稿とも「理系」を付けない（理工学系の1種類しかないため）
  { slug: "kagakudai", dir: "東工大数学/科学大完成演習", name: "東京科学大数学", university: "東京科学大学", uni: "東京科学大", alias: "旧東工大" },
];

/** 志望校診断模試。 */
export const shindanBook = {
  slug: "shindan",
  dir: "難関国公立診断模試/診断模試2027",
  name: "旧帝大・難関国公立大理系数学 志望校診断模試",
};
