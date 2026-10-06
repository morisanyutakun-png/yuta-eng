import { NextResponse } from "next/server";

import { hasDatabase, saveApplication } from "@/lib/moshi/db";
import { sendConfirmation } from "@/lib/moshi/mail";
import { THANKS_COOKIE, parseApplication } from "@/lib/moshi/validate";

/**
 * 参加申込の受け口。
 *
 * 画面から来た値は信用せず、ここで必ず確かめ直してから保存する。
 * 保存はサーバー側だけで行い、接続文字列も鍵も画面には出さない。
 *
 * 返すのは「申し込めたかどうか」と「どの大学が加わったか」だけ。
 * 他人の申込が見える情報は一切返さない。
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "入力を読み取れませんでした。" }, { status: 400 });
  }

  const parsed = parseApplication(body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  if (!hasDatabase()) {
    // 設定前でも画面は壊さず、受け付けられない理由だけを返す
    return NextResponse.json(
      { error: "ただいま参加申込を受け付けられません。時間をおいてお試しください。" },
      { status: 503 },
    );
  }

  let result;
  try {
    result = await saveApplication(parsed.value);
  } catch {
    return NextResponse.json({ error: "保存できませんでした。時間をおいてお試しください。" }, { status: 500 });
  }

  // メールが送れなくても申込は保存済み。申込自体は失敗にしない
  const mailed = await sendConfirmation(parsed.value.email, parsed.value.name, result.all);

  const res = NextResponse.json({
    ok: true,
    universityIds: result.all,
    added: result.added,
    already: result.already,
    returning: result.returning,
    mailed,
  });

  // 完了ページに渡すための控え。大学の識別子と送信できたかだけで、
  // 氏名もメールアドレスも入れない。10分で消える。
  res.cookies.set({
    name: THANKS_COOKIE,
    value: Buffer.from(
      JSON.stringify({ u: result.all, m: mailed, r: result.returning }),
      "utf8",
    ).toString("base64url"),
    path: "/moshi",
    maxAge: 600,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
