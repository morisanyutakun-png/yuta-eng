import { universities } from "@/lib/data";

/**
 * 原稿ごとに書き方の違う分野名（81 通りあった）を、大まかな分野にまとめる。
 * 上から順に見て、最初に当たったものを採る。順序に意味があるので入れ替えないこと。
 */
const RULES: { name: string; test: RegExp }[] = [
  { name: "複素数平面", test: /複素数/ },
  { name: "微分積分", test: /微[分積]|積分/ },
  { name: "確率・場合の数", test: /確率|場合の数/ },
  { name: "整数", test: /整数/ },
  { name: "数列", test: /数列|漸化式|級数/ },
  { name: "空間図形・ベクトル", test: /空間|ベクトル/ },
  { name: "図形と方程式", test: /図形と方程式|領域|軌跡/ },
  { name: "2次曲線", test: /2次曲線|二次曲線/ },
  { name: "三角関数", test: /三角関数|三角比|図形と計量/ },
  { name: "指数・対数", test: /指数|対数/ },
  { name: "平面図形", test: /平面図形|図形/ },
  { name: "式と証明・論証", test: /式と証明|整式|論証|帰納法|方程式/ },
  { name: "データの分析", test: /データ|統計/ },
];

export function canonicalField(label: string): string | null {
  const base = label.replace(/（.*?）/g, "").replace(/\s+/g, "");
  for (const r of RULES) if (r.test.test(base)) return r.name;
  return null;
}

export type FieldShare = { name: string; universities: number };

/**
 * 「その分野を頻出として挙げている大学が何校あるか」を数える。
 * 大学ごとに分母（8年中／40題中…）が違うので回数は足さず、校数で見る。
 */
export function fieldsAcrossUniversities(limit = 8): {
  items: FieldShare[];
  covered: number;
} {
  const count = new Map<string, Set<string>>();
  let covered = 0;

  for (const u of universities) {
    if (!u.fieldChart) continue;
    covered++;
    // 出題が確認できた分野だけを対象にする
    for (const it of u.fieldChart.items) {
      if (it.count <= 0) continue;
      const name = canonicalField(it.label);
      if (!name) continue;
      if (!count.has(name)) count.set(name, new Set());
      count.get(name)!.add(u.slug);
    }
  }

  const items = [...count.entries()]
    .map(([name, set]) => ({ name, universities: set.size }))
    .sort((a, b) => b.universities - a.universities)
    .slice(0, limit);

  return { items, covered };
}
