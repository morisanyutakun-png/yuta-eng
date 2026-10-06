import { NextResponse, type NextRequest } from "next/server";

/**
 * 管理画面の保護。
 *
 * 申込者の氏名とメールアドレスが並ぶ画面なので、誰でも開ける場所に置かない。
 * URL に合言葉を載せる方式は、履歴やログに残るので採らない。
 * ブラウザ標準の Basic 認証で、利用者名と合言葉は環境変数から読む。
 *
 * 環境変数が未設定のときは、開けずに 503 を返す。
 * 「設定し忘れたまま誰でも見られる」状態を作らないため。
 */
export const config = { matcher: ["/moshi/admin/:path*"] };

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;

  if (!user || !pass) {
    // まだ合言葉が決まっていない段階。ここは誰でも開けるので、
    // 値は出さず「どの環境変数が足りないか」という名前だけを知らせる。
    // 設定が済めばこの下の認証に入り、この画面自体が見えなくなる。
    const missing = [
      !process.env.ADMIN_USER && "ADMIN_USER",
      !process.env.ADMIN_PASSWORD && "ADMIN_PASSWORD",
      !process.env.DATABASE_URL && "DATABASE_URL",
      !process.env.RESEND_API_KEY && "RESEND_API_KEY",
      !process.env.MOSHI_MAIL_FROM && "MOSHI_MAIL_FROM",
    ].filter((v): v is string => Boolean(v));

    const body = [
      "管理画面はまだ設定されていません。",
      "",
      "未設定の環境変数:",
      ...missing.map((m) => `  - ${m}`),
      "",
      "Vercel のプロジェクト設定 → Environment Variables に入れ、",
      "そのあと一度だけ次を実行してテーブルを作ってください。",
      "",
      "  DATABASE_URL='...' npm run moshi:setup",
      "",
      "ADMIN_USER と ADMIN_PASSWORD を入れると、この画面は",
      "利用者名と合言葉を聞くようになります。",
    ].join("\n");

    return new NextResponse(body, {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  const header = req.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    let decoded = "";
    try {
      decoded = atob(header.slice(6));
    } catch {
      decoded = "";
    }
    const i = decoded.indexOf(":");
    const u = i < 0 ? "" : decoded.slice(0, i);
    const p = i < 0 ? "" : decoded.slice(i + 1);
    // 文字数の違いで早く抜けないよう、長さをそろえてから全文字を比べる
    if (u.length === user.length && p.length === pass.length) {
      let diff = 0;
      for (let k = 0; k < u.length; k++) diff |= u.charCodeAt(k) ^ user.charCodeAt(k);
      for (let k = 0; k < p.length; k++) diff |= p.charCodeAt(k) ^ pass.charCodeAt(k);
      if (diff === 0) return NextResponse.next();
    }
  }

  return new NextResponse("認証が必要です。", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="moshi-admin", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}
