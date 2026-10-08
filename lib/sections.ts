/**
 * サイトの区分（ヘッダーに並ぶ柱）ごとの色と呼び名。
 *
 * 白地・明朝・細い罫という体裁は変えないまま、**柱ごとに色を1つ割り当てる**。
 * 予備校や教育出版社のサイトが科目や分野ごとに色を決めているのと同じ考えで、
 * 「いま何のページを見ているか」を読む前に分かるようにするためのもの。
 *
 * 色の使い方は次の3か所だけに限る。地を広く塗ることはしない。
 *   ・ページ上端の細い線
 *   ・見出しの上のラベルと、節見出しの短い罫
 *   ・ページ見出しに添える記号
 *
 * どの色も白地・薄灰地の上で 4.5:1 以上のコントラストがある
 * （navy 11.5 / 朱 5.7 / 藍緑 7.4 / 深緑 7.3 / 紫 9.1 / 琥珀 5.9 / 鉄灰 7.6）。
 * 色だけで意味を伝えることはせず、必ず文字のラベルを添える。
 */

export type SectionKey =
  | "universities"
  | "kaisetsu"
  | "moshi"
  | "kansei"
  | "shindan"
  | "books"
  | "educators";

export type SectionInfo = {
  /** 見出しの上に出す短いラベル */
  eyebrow: string;
  /** その柱の色 */
  color: string;
};

export const sections: Record<SectionKey, SectionInfo> = {
  universities: { eyebrow: "大学別分析", color: "#1b3a63" },
  kaisetsu: { eyebrow: "過去問の解答・解説", color: "#b3412f" },
  moshi: { eyebrow: "大学別数学模試", color: "#1f5f5b" },
  kansei: { eyebrow: "過去問の前にシリーズ", color: "#2f6043" },
  shindan: { eyebrow: "志望校診断模試", color: "#5a3a78" },
  books: { eyebrow: "刊行物", color: "#8a5a1c" },
  educators: { eyebrow: "学校・塾・法人の方へ", color: "#4a5563" },
};

/**
 * ページの一番外側に付ける属性。
 *
 * `--sec` を1つ置くだけで、そのページの節見出しの罫とラベルが
 * その柱の色になる（色の指定は globals.css 側で `var(--sec)` を読む）。
 */
export function sectionStyle(key: SectionKey) {
  return { "--sec": sections[key].color } as React.CSSProperties;
}
