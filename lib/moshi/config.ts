import raw from "@/data/moshi.json";

import { getUniversity } from "@/lib/data";

/**
 * 模試の開催内容。
 *
 * 大学・回次・期間・価格はすべて data/moshi.json に置いてある。
 * 日程が決まったときに JSON の1行を直すだけで、画面・確認メール・
 * 構造化データのすべてが追従する。コード側に大学名や日付を書かない。
 */
export type MoshiUniversity = {
  /** 申込データに保存する識別子。あとから変えない */
  id: string;
  university: string;
  exam: string;
  /** 既存の大学分析ページの slug。あれば「出題分析を見る」でつなぐ */
  slug?: string;
};

export type Moshi = {
  title: string;
  season: string;
  round: number;
  period: string;
  price: number;
  universities: MoshiUniversity[];
  grades: string[];
  faculties: string[];
};

export const moshi = raw as Moshi;

/** 第1回：2026年11月下旬〜12月上旬開催予定、のような1行 */
export const roundLabel = `第${moshi.round}回：${moshi.period}開催予定`;

export const priceLabel = `${moshi.price.toLocaleString()}円（税込）`;

export const moshiUniversity = (id: string) => moshi.universities.find((u) => u.id === id);

/** 申込に来た id が実在するものだけかを確かめる。画面の値をそのまま信じない */
export const validIds = (ids: unknown): string[] => {
  if (!Array.isArray(ids)) return [];
  const known = new Set(moshi.universities.map((u) => u.id));
  return [...new Set(ids.filter((x): x is string => typeof x === "string" && known.has(x)))];
};

/** 大学別の案内ページ。id は data/moshi.json のもので、あとから変えない */
export const moshiPath = (u: MoshiUniversity) => `/moshi/${u.id}`;

export const moshiById = (id: string) => moshi.universities.find((u) => u.id === id);

/** その大学の分析ページがサイトにあるかを確かめてから繋ぐ */
export const analysisHref = (u: MoshiUniversity) =>
  u.slug && getUniversity(u.slug) ? `/univ/${u.slug}` : null;
