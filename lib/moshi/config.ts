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

/** 受験後にお返しするもの。画面・メール・先生向けの案内で同じものを使う */
export type Deliverable = { h: string; body: string };

/** 学校・塾でまとめて申し込むときの決まり */
export type GroupPolicy = {
  /** 団体として承る最少人数 */
  min: number;
  /** 1つの団体で承る上限人数 */
  max: number;
  /** 先生あての全体のまとめを付ける最少人数 */
  reportMin: number;
  /** 請求書の発行日から支払期限までの日数 */
  paymentDays: number;
  /**
   * 適格請求書発行事業者の登録があるか。
   * 登録したらここを true にする。画面の書き方がこの1語で切り替わり、
   * 登録していないのに「インボイスを出せます」と書くことがなくなる。
   */
  invoiceRegistered: boolean;
};

/** 日程のうち、こちらで決められるもの。空にすると「確定しだい」と出る */
export type MoshiSchedule = {
  applyDeadline: string;
  submitDeadline: string;
  returnWithin: string;
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
  schedule: MoshiSchedule;
  /** 受験料が決まっているか。false のあいだは「予定」と添える */
  priceFixed: boolean;
  /** この模試では出さないもの。期待の食い違いを先に止める */
  notProvided: string[];
  /** 数学単体・答案の総合評価。統計的な合格確率とは区別する */
  judgementNote: string;
  judgementLevels: { grade: string; label: string }[];
  /** 平均点・偏差値・順位を出す最少の受験者数 */
  statsMin: number;
  /** その条件を1文で書いたもの */
  statsNote: string;
  deliverables: Deliverable[];
  /** 採点結果・講評・学習の助言をまとめた冊子の呼び名。採点済み答案は別添 */
  deliverableName: string;
  group: GroupPolicy;
};

export const moshi = raw as Moshi;

/** 第1回：2026年11月下旬〜12月上旬開催予定、のような1行 */
export const roundLabel = `第${moshi.round}回：${moshi.period}開催予定`;

export const priceLabel = `${moshi.price.toLocaleString()}円（税込）${moshi.priceFixed ? "" : "・予定"}`;

/** 採点済み答案も含む返却資料の一覧 */
export const deliverableLine = moshi.deliverables.map((d) => d.h).join("・");

/** 成績冊子と採点済み答案を区別した、画面・確認メール共通の返却案内 */
export const returnLine =
  `採点済み答案と、採点結果・数学の合格参考判定・学習到達度・答案講評・学習の助言をまとめた「${moshi.deliverableName}」を、受験者お一人ごとにPDFでお返しします。`;

/**
 * お支払いについての言い方。
 *
 * 団体は受験後の人数をもとに個別請求。個人用の固定額決済リンクへは流さない。
 * Stripe請求書のカード・日本の銀行振込はサービスとして対応しているが、
 * 当アカウントでの有効化・個別請求書の準備まではサイトから確認できない。
 * 団体向けには相談可能な方法として案内し、自動決済の導入済みとは書かない。
 *
 * 取り消しも機械的に切らない。期限を過ぎたら即取り消し、と書いてあると、
 * 事情のある人が黙って離れてしまう。まず連絡をもらう形にする。
 */
export const groupPaymentLine =
  "団体は銀行振込（請求書払い・受験後払い）を承ります。Stripe経由のカード決済・銀行振込もご相談いただけます。社内・校内の手続きに合わせた支払期限をご相談ください。";

export const paymentLine =
  `個人のお支払いはクレジットカードによるオンライン決済です。日程のご案内時に支払方法をお知らせします。学校・塾・法人の団体申込については、${groupPaymentLine}`;

export const paymentShortLine = "個人はオンライン決済。学校・塾・法人の団体は、請求書払いなどを個別にご案内します。";

export const cancelLine =
  "お支払いの期限を過ぎてもご連絡がない場合は、お申し込みを取り消すことがあります。ご事情があればご相談ください。";

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

/* ───── お支払い ───── */

/**
 * 個人のお支払いに使う Stripe の決済リンク。
 *
 * 鍵を持つ実装（Checkout Session を作って webhook で受ける）は、
 * 受験者がこの規模のうちは割に合わない。Stripe の決済リンクを1本用意して
 * 環境変数に入れておけば、カード決済はそれで足りる。
 * 入金は Stripe の画面で分かるので、管理画面では人が記録する。
 *
 * 設定がないあいだはボタンを出さない。押せない導線を置かない。
 */
export const payUrl = () => process.env.NEXT_PUBLIC_MOSHI_PAY_URL?.trim() || null;

/** 個人のお支払い方法。決済リンクの設定があるかどうかで書き方を変える */
export const payLineFor = (hasCard: boolean) =>
  hasCard
    ? "お支払いはクレジットカード（オンライン決済）です。受験日程のご案内のときに、お支払いのご案内をお送りします。"
    : "お支払いは銀行振込です。受験日程のご案内のときに、振込先と期限を個別にご相談します。";
