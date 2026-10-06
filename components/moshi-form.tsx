"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";


import { moshi, priceLabel, roundLabel } from "@/lib/moshi/config";

/**
 * 参加申込のフォーム。
 *
 * スマホで30秒から1分で終わることを目標にしている。だから入力欄は
 * 氏名・メール・学年・大学の4つだけを必須にし、志望学部は任意にした。
 * 学年と学部は打たせずに選ばせる。打つのはメールと名前だけで済む。
 *
 * 送り先はサーバーの API ひとつで、保存も送信もそちらで行う。
 * 画面側では鍵も接続先も持たない。
 */

export function MoshiForm() {
  const base = useId();
  const router = useRouter();
  const [picked, setPicked] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const f = new FormData(e.currentTarget);
    const payload = {
      name: String(f.get("name") ?? ""),
      email: String(f.get("email") ?? ""),
      grade: String(f.get("grade") ?? ""),
      faculty: String(f.get("faculty") ?? ""),
      universityIds: picked,
    };

    if (picked.length === 0) {
      setError("参加を希望する大学を1つ以上選んでください。");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/moshi/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(typeof data?.error === "string" ? data.error : "申し込めませんでした。");
        return;
      }
      // 申し込んだ大学の控えは、API が短命の cookie に入れている。
      // この画面では何も持たずに、完了ページへ移るだけ。
      router.push("/moshi/thanks");
    } catch {
      setError("通信できませんでした。電波の良いところでお試しください。");
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-6">
      <fieldset className="border-0 p-0">
        <legend className="text-[0.95rem] font-semibold text-ink">
          参加を希望する模試
          <span className="ml-2 text-[0.74rem] font-normal text-ink-2">複数選べます</span>
        </legend>

        {/*
          10大学を縦に積むと画面が長くなるので、狭い画面でも2列に並べる。
          大学名を主役にし、模試名は小さく添える。
        */}
        <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {moshi.universities.map((u) => {
            const on = picked.includes(u.id);
            return (
              <li key={u.id}>
                <label
                  className={`flex min-h-[3.1rem] cursor-pointer items-center gap-3 border px-3.5 py-2.5 transition-colors ${
                    on ? "border-navy bg-paper-2" : "border-rule bg-white hover:border-navy"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="universityIds"
                    value={u.id}
                    checked={on}
                    onChange={() => toggle(u.id)}
                    className="size-4 shrink-0 accent-[#1b3a63]"
                  />
                  <span className="min-w-0">
                    <span className="block text-[0.93rem] font-semibold leading-snug text-ink">{u.university}</span>
                    <span className="block truncate text-[0.74rem] text-ink-2">{u.exam}</span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <p className="sm:col-span-2">
          <label htmlFor={`${base}-name`} className="block text-[0.85rem] font-semibold text-ink">
            お名前
          </label>
          <input
            id={`${base}-name`}
            name="name"
            required
            maxLength={60}
            autoComplete="name"
            className="mt-1.5 min-h-11 w-full border border-rule bg-white px-3 text-[0.95rem] text-ink focus:border-navy focus:outline-none"
          />
        </p>

        <p className="sm:col-span-2">
          <label htmlFor={`${base}-email`} className="block text-[0.85rem] font-semibold text-ink">
            メールアドレス
          </label>
          <input
            id={`${base}-email`}
            name="email"
            type="email"
            required
            maxLength={254}
            inputMode="email"
            autoComplete="email"
            className="mt-1.5 min-h-11 w-full border border-rule bg-white px-3 text-[0.95rem] text-ink focus:border-navy focus:outline-none"
          />
          <span className="mt-1 block text-[0.74rem] leading-relaxed text-ink-3">
            受験日程とお支払い方法のご案内に使います。他の目的には使いません。
          </span>
        </p>

        <p>
          <label htmlFor={`${base}-grade`} className="block text-[0.85rem] font-semibold text-ink">
            学年
          </label>
          <select
            id={`${base}-grade`}
            name="grade"
            required
            defaultValue=""
            className="mt-1.5 min-h-11 w-full border border-rule bg-white px-3 text-[0.95rem] text-ink focus:border-navy focus:outline-none"
          >
            <option value="" disabled>
              選んでください
            </option>
            {moshi.grades.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </p>

        <p>
          <label htmlFor={`${base}-faculty`} className="block text-[0.85rem] font-semibold text-ink">
            志望学部
            <span className="ml-1.5 text-[0.74rem] font-normal text-ink-3">任意</span>
          </label>
          <select
            id={`${base}-faculty`}
            name="faculty"
            defaultValue=""
            className="mt-1.5 min-h-11 w-full border border-rule bg-white px-3 text-[0.95rem] text-ink focus:border-navy focus:outline-none"
          >
            <option value="">未選択</option>
            {moshi.faculties.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </p>
      </div>

      {/*
        申し込む前に知っておくべきことを、要項と同じ作法で並べる。
        1つの段落に詰めると読み飛ばされ、色の付いた帯にすると広告に見える。
        押す直前に目が通る位置へ、項目として置く。
      */}
      <div className="mt-7 border border-rule">
        <p className="border-b border-rule bg-paper-2 px-4 py-2 text-[0.74rem] font-bold tracking-wide text-navy">
          お申し込みの前に
        </p>
        <ul className="divide-y divide-rule">
          {[
            ["料金", `参加申込の時点では料金は発生しません。受験料は${priceLabel}の予定です。`],
            ["日程", `${roundLabel}。正式な受験日程が確定したあとに、メールでご案内します。`],
            ["支払い", "お支払い方法は日程のご案内とあわせてお知らせします。期限までにご入金が確認できない場合、お申し込みは自動的に取り消しとなります。"],
          ].map(([k, v]) => (
            <li key={k} className="grid grid-cols-[4rem_1fr] gap-x-4 px-4 py-3">
              <span className="text-[0.78rem] leading-relaxed text-ink-3">{k}</span>
              <span className="prose-ja text-[0.86rem] leading-[1.9] text-ink-2">{v}</span>
            </li>
          ))}
        </ul>
      </div>

      {error && (
        <p role="alert" className="mt-4 border-l-[3px] border-accent bg-accent-bg px-4 py-3 text-[0.86rem] text-ink">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={sending} className="btn btn-primary disabled:opacity-60">
          {sending ? "送信しています…" : "参加申込"}
        </button>
        <Link href="/moshi/privacy" className="text-[0.82rem] text-navy underline underline-offset-4">
          個人情報の取り扱い
        </Link>
      </div>
    </form>
  );
}
