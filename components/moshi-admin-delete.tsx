"use client";

import { useState, useTransition } from "react";

import { deleteApplicationAction } from "@/app/moshi/admin/actions";

/**
 * 申込を1件消すボタン。
 *
 * 消したものは戻らないので、押したら必ず誰を消すのかを聞く。
 * 聞かずに消せると、一覧を眺めている途中の誤操作がそのまま失われる。
 *
 * 結果はその場に文字で出す。画面が切り替わるだけだと、
 * 消えたのか失敗したのかが分からない。
 */
export function DeleteApplicant({ id, name }: { id: string; name: string }) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <span className="whitespace-nowrap">
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          setError(null);
          if (!window.confirm(`${name} 様の申込を消します。元に戻せません。よろしいですか？`)) return;
          start(async () => {
            const r = await deleteApplicationAction(id);
            if (!r.ok) setError(r.error);
          });
        }}
        className="min-h-9 border border-rule px-2.5 text-[0.74rem] font-semibold text-accent transition-colors hover:border-accent/50 hover:bg-accent-bg disabled:opacity-50"
      >
        {pending ? "消しています…" : "取り消す"}
      </button>
      {error && <span className="ml-2 block pt-1 text-[0.72rem] text-accent">{error}</span>}
    </span>
  );
}
