import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

// お試し → 本契約アップグレード用の署名付きトークン。
// アプリ側（生徒がお試し済みで、まだ本契約していない場合）が NOBIT_REGISTER_SECRET で
// 署名して発行し、yuta-eng の /apply?u=<token> で受け取る。yuta-eng は署名と有効期限を
// 検証し、本契約の請求額から TRIAL_CREDIT を差し引く。
//
// 形式（JWTライクなコンパクト形式・依存追加なし）:
//   base64url(JSON payload) + "." + base64url(HMAC-SHA256(payload))
//
// payload: {
//   s:  string   本契約するフル教材の Subject.id（例 "math-1a"）
//   jti: string  一意な発行ID（単回消し込みのキー）
//   exp: number  失効時刻（UNIX 秒）
//   c?: string   Stripe Customer ID（任意・記録用）
// }

export type UpgradeTokenPayload = {
  s: string;
  jti: string;
  exp: number;
  c?: string;
};

function b64urlEncode(buf: Buffer): string {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlToBuffer(s: string): Buffer {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

function sign(payloadPart: string, secret: string): string {
  return b64urlEncode(createHmac("sha256", secret).update(payloadPart).digest());
}

/** サーバー側で発行（テスト・自前導線用）。本番の発行はアプリ側が担当してよい。 */
export function createUpgradeToken(
  payload: UpgradeTokenPayload,
  secret: string,
): string {
  const payloadPart = b64urlEncode(Buffer.from(JSON.stringify(payload), "utf8"));
  return `${payloadPart}.${sign(payloadPart, secret)}`;
}

export type UpgradeTokenResult =
  | { ok: true; payload: UpgradeTokenPayload }
  | { ok: false; reason: "malformed" | "bad_signature" | "expired" | "no_secret" };

/** 署名と有効期限を検証。now はテスト用に注入可能（既定は現在時刻）。 */
export function verifyUpgradeToken(
  token: string | null | undefined,
  secret: string | undefined,
  nowSec: number = Math.floor(Date.now() / 1000),
): UpgradeTokenResult {
  if (!secret) return { ok: false, reason: "no_secret" };
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return { ok: false, reason: "malformed" };
  }

  const [payloadPart, sigPart] = token.split(".");
  if (!payloadPart || !sigPart) return { ok: false, reason: "malformed" };

  const expected = sign(payloadPart, secret);
  const a = b64urlToBuffer(sigPart);
  const b = b64urlToBuffer(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return { ok: false, reason: "bad_signature" };
  }

  let payload: UpgradeTokenPayload;
  try {
    payload = JSON.parse(b64urlToBuffer(payloadPart).toString("utf8"));
  } catch {
    return { ok: false, reason: "malformed" };
  }

  if (
    typeof payload?.s !== "string" ||
    typeof payload?.jti !== "string" ||
    typeof payload?.exp !== "number"
  ) {
    return { ok: false, reason: "malformed" };
  }
  if (payload.exp < nowSec) return { ok: false, reason: "expired" };

  return { ok: true, payload };
}
