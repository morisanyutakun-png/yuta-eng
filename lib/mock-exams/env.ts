import { createHmac, timingSafeEqual } from "node:crypto";

import type { ExamFileKey } from "@/data/mock-exams";
import { site } from "@/lib/site";

/**
 * ストアの設定値と、ダウンロード用の署名つきトークン。
 */

/**
 * 模試演習ストアを公開するかどうか。
 *
 * Stripe の環境変数（STRIPE_SECRET_KEY）が設定されるまでは、本番にデプロイしても
 * /mock-exams 配下はすべて 404（非公開）として振る舞う。
 * Stripe の鍵を環境変数に設定した時点で自動的にストアが出現する。
 *
 * ・緊急時にすぐ閉じたい場合は STORE_ENABLED=false で強制非公開にできる。
 * ・手元の next dev で鍵を入れる前に見た目だけ確認したい場合は STORE_PREVIEW=1 で開ける。
 */
export function isStoreEnabled(): boolean {
  const flag = process.env.STORE_ENABLED?.trim().toLowerCase();
  if (flag === "false" || flag === "0") return false;
  if (Boolean(process.env.STRIPE_SECRET_KEY?.trim())) return true;
  if (process.env.NODE_ENV !== "production" && process.env.STORE_PREVIEW === "1") return true;
  return false;
}

/**
 * 決済後に戻ってくる URL の土台。
 *
 * 本番ではリクエストの Host を信用しない（偽の Host を送られると、
 * 決済後の戻り先を他所のサイトに向けられる）。環境変数か、サイトの正式 URL を使う。
 * 手元の開発中だけ、開いているオリジン（localhost:3000 など）をそのまま使う。
 */
export function baseUrl(req: Request): string {
  const fromEnv = process.env.STORE_BASE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  if (process.env.NODE_ENV === "production") return site.url;
  return new URL(req.url).origin;
}

/** 購入後に再ダウンロードできる日数 */
export function accessDays(fallback: number): number {
  const n = Number(process.env.STORE_ACCESS_DAYS);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

/** ダウンロードリンクの有効時間（秒）。画面を開き直せば新しいリンクが出る */
export const LINK_TTL_SEC = 15 * 60;

// ---------------------------------------------------------------------------
//  ダウンロード用トークン
//
//  ファイルの在りかを URL に出さず、「誰の・どの模試の・どのファイルを・いつまで」
//  を署名して渡す。サーバーは署名と期限を確かめてから、さらに決済の状態を
//  確かめ直して PDF を返す。リンクが転送されても 15 分で使えなくなる。
// ---------------------------------------------------------------------------

export class StoreConfigError extends Error {}

function signingSecret(): string {
  const s = process.env.STORE_DOWNLOAD_SECRET?.trim();
  if (!s || s.length < 32) {
    throw new StoreConfigError("STORE_DOWNLOAD_SECRET が未設定か短すぎる（32文字以上）");
  }
  return s;
}

export const hasDownloadSecret = () => (process.env.STORE_DOWNLOAD_SECRET?.trim().length ?? 0) >= 32;

export type DownloadClaims = {
  /** Stripe Checkout Session の ID */
  s: string;
  /** 模試の id */
  e: string;
  /** ファイルの種類 */
  f: ExamFileKey;
  /** 期限（UNIX 秒） */
  x: number;
};

const b64url = (buf: Buffer) => buf.toString("base64url");

export function signDownload(claims: Omit<DownloadClaims, "x">, ttlSec = LINK_TTL_SEC): string {
  const body: DownloadClaims = { ...claims, x: Math.floor(Date.now() / 1000) + ttlSec };
  const payload = b64url(Buffer.from(JSON.stringify(body), "utf8"));
  const sig = b64url(createHmac("sha256", signingSecret()).update(payload).digest());
  return `${payload}.${sig}`;
}

export function verifyDownload(token: string | null): DownloadClaims | null {
  if (!token || token.length > 2048) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;

  const expected = createHmac("sha256", signingSecret()).update(payload).digest();
  let given: Buffer;
  try {
    given = Buffer.from(sig, "base64url");
  } catch {
    return null;
  }
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;

  try {
    const c = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as DownloadClaims;
    if (typeof c.s !== "string" || typeof c.e !== "string" || typeof c.f !== "string" || typeof c.x !== "number") return null;
    if (c.x < Math.floor(Date.now() / 1000)) return null;
    return c;
  } catch {
    return null;
  }
}

