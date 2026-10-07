import { NextResponse } from "next/server";

import { countApplications, hasDatabase, recordMailResult, saveApplication } from "@/lib/moshi/db";
import { sendAdminNotice, sendConfirmation } from "@/lib/moshi/mail";
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

  // メールが送れなくても申込は保存済み。申込自体は失敗にしない。
  // 申込者への確認と、運営への知らせは**別のメール**にする。
  // 同じ1通を bcc で回していたときは、2つの宛先が同じだと1通しか届かなかった。
  //
  // 2通は順番に送る。Resend は毎秒2通までなので、同時に投げると上限ぎりぎりになる。
  // 先に送るのは申込者への確認。運営への知らせが落ちても、申込は管理画面で見られる。
  // 間を空けて待たせることはしない（上限に当たった実例はなく、
  // 当たったときは postToResend が一度だけ送り直す）。
  const confirmation = await sendConfirmation(parsed.value.email, parsed.value.name, result.all);

  const total = await countApplications();
  const admin = await sendAdminNotice({
    name: parsed.value.name,
    email: parsed.value.email,
    grade: parsed.value.grade,
    faculty: parsed.value.faculty,
    added: result.added,
    all: result.all,
    returning: result.returning,
    total,
  });

  // 届いたかどうかを申込に書いておく。管理画面で1件ずつ確かめられるようにする。
  // 書けなくても申込は失敗にしない。
  await recordMailResult(parsed.value.email, confirmation.detail, admin.detail);

  const mailed = confirmation.ok;

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
