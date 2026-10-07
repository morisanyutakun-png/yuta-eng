"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { checkBasicAuth } from "@/lib/moshi/auth";
import { deleteApplication, hasDatabase } from "@/lib/moshi/db";

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
