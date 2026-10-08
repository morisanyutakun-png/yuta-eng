"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { checkBasicAuth } from "@/lib/moshi/auth";
import { deleteApplication, hasDatabase, setPaymentStatus } from "@/lib/moshi/db";

/**
 * 申込を1件消す。
 *
 * 試しに入れた申込を管理画面から片づけるためのもの。
 * 消したものは戻らないので、押す前に画面側で確かめている。
 *
 * この処理は管理画面と同じ URL へ送られるので middleware の認証を通るが、
 * matcher の書き方を変えたときに素通りにならないよう、ここでも確かめ直す。
 */
export type DeleteResult = { ok: true; name: string } | { ok: false; error: string };

export async function deleteApplicationAction(id: string): Promise<DeleteResult> {
  const h = await headers();
  if (!checkBasicAuth(h.get("authorization"))) {
    return { ok: false, error: "権限がありません。画面を開き直してください。" };
  }
  if (!hasDatabase()) return { ok: false, error: "DATABASE_URL が設定されていません。" };
  if (!/^\d+$/.test(id)) return { ok: false, error: "申込の指定が正しくありません。" };

  try {
    const gone = await deleteApplication(id);
    if (!gone) return { ok: false, error: "その申込は見つかりませんでした（すでに消えています）。" };
    revalidatePath("/moshi/admin");
    return { ok: true, name: gone.name };
  } catch {
    return { ok: false, error: "消せませんでした。時間をおいてお試しください。" };
  }
}

/**
 * 入金の記録を切り替える。
 *
 * 消すのと同じく、管理画面と同じ URL へ送られるので middleware の認証を通るが、
 * ここでも確かめ直す。入金は戻せる操作なので、画面側で尋ねることはしない。
 */
export async function setPaidAction(id: string, paid: boolean): Promise<DeleteResult> {
  const h = await headers();
  if (!checkBasicAuth(h.get("authorization"))) {
    return { ok: false, error: "権限がありません。画面を開き直してください。" };
  }
  if (!hasDatabase()) return { ok: false, error: "DATABASE_URL が設定されていません。" };
  if (!/^\d+$/.test(id)) return { ok: false, error: "申込の指定が正しくありません。" };

  try {
    const done = await setPaymentStatus(id, paid ? "paid" : "unpaid");
    if (!done) return { ok: false, error: "その申込は見つかりませんでした。" };
    revalidatePath("/moshi/admin");
    return { ok: true, name: paid ? "入金済み" : "未入金" };
  } catch {
    return { ok: false, error: "書き換えられませんでした。時間をおいてお試しください。" };
  }
}
