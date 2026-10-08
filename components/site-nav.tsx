"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import moshiData from "@/data/moshi.json";
import { sections } from "@/lib/sections";

/**
 * サイト内のナビゲーション。
 *
 * 画面の広いときは横に並べ、狭いときは1つのボタンにまとめて開かせる。
 *
 * 開いたメニューは、次のどれでも閉じる。
 *   ・項目を選んだとき（移った先でメニューが残らない）
 *   ・メニューの外側を押したとき
 *   ・Esc を押したとき
 * 閉じる手間を利用者に押しつけない。以前は `<details>` だけで作っていたので
 * JavaScript は要らなかったが、項目を選んでも開いたままで、
 * 自分で閉じないと先のページが見えなかった。
 *
 * 並びは「何を見に来たか」の順。分析・解答・教材・診断がこのサイトの4本柱で、
 * 先生向けはその次に置く。横並びのときも折りたたみのときも**同じ項目**を出す。
 * 画面が狭いと消える項目がある、という状態にしない。
 *
 * いま見ているページは、どちらの並べ方でも印を付ける。
 */

type Item = { href: string; label: string; note: string };

/** 折りたたみでは説明も出す。横並びでは label だけ使う。 */
function navItems(hasSolutions: boolean): Item[] {
  return [
    { href: "/universities", label: "大学別分析", note: "大学ごとの出題傾向と対策" },
    ...(hasSolutions
      ? [{ href: "/kaisetsu", label: "過去問解答", note: "当サイト独自の解答・解説" }]
      : []),
    { href: "/moshi", label: sections.moshi.eyebrow, note: `${moshiData.title}・オンラインで受験` },
    { href: "/kansei", label: "完成演習", note: "過去問の前に解く分野別演習" },
    { href: "/shindan", label: "志望校診断", note: "いまの実力から受かる大学を探す" },
    { href: "/books", label: "教材一覧", note: "刊行している全冊を学習段階順に" },
    { href: "/educators", label: "学校・法人", note: "学校・塾・法人の教材・団体受験" },
  ];
}

export function SiteNav({ hasSolutions }: { hasSolutions: boolean }) {
  const items = navItems(hasSolutions);
  const box = useRef<HTMLDivElement>(null);
  const path = usePathname();

  /**
   * 開いているかどうかは真偽値ではなく「どのページで開いたか」で持つ。
   * こうすると、行き先が変わった時点で `open` がひとりでに false になり、
   * 移動のたびに閉じ直す処理が要らない。戻る・進むでも同じに効く。
   */
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt !== null && openedAt === path;
  const close = () => setOpenedAt(null);

  /** 下の階層にいるときも、その柱を現在地として示す */
  const here = (href: string) => path === href || path.startsWith(`${href}/`);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: Event) => {
      if (!box.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    // pointerdown にするのは、指で画面を触った時点で閉じたいため。
    // click まで待つと、閉じるのが一拍遅れて反応が鈍く感じる。
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* 広い画面：横に並べる */}
      <nav aria-label="サイト内" className="hidden items-center gap-5 text-[0.8rem] text-ink-2 lg:flex">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            aria-current={here(it.href) ? "page" : undefined}
            className={
              here(it.href)
                ? "font-semibold text-navy"
                : "transition-colors hover:text-navy"
            }
          >
            {it.label}
          </Link>
        ))}
      </nav>

      {/* 狭い画面：ボタンひとつにまとめる */}
      <div ref={box} className="relative lg:hidden">
        <button
          type="button"
          onClick={() => setOpenedAt(open ? null : path)}
          aria-expanded={open}
          aria-controls="site-menu"
          className="flex min-h-11 items-center gap-1.5 pl-3 text-ink-2"
        >
          <span className="sr-only">{open ? "メニューを閉じる" : "メニューを開く"}</span>
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? (
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            ) : (
              <path d="M3 5.5h14M3 10h14M3 14.5h14" strokeLinecap="round" />
            )}
          </svg>
        </button>

        {open && (
          <nav
            id="site-menu"
            aria-label="サイト内"
            className="absolute right-0 top-[calc(100%+0.6rem)] z-40 w-[17.5rem] border border-rule bg-paper shadow-[0_4px_16px_rgba(21,24,28,0.14)]"
          >
            <ul className="divide-y divide-rule">
              {items.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    // いま見ているページの項目を押したときは移動が起きない。
                    // 行き先の変化だけに任せず、押した時点でも閉じる。
                    onClick={close}
                    aria-current={here(it.href) ? "page" : undefined}
                    className="block px-4 py-3 transition-colors hover:bg-paper-2"
                  >
                    <span
                      className={`block text-[0.9rem] font-semibold ${here(it.href) ? "text-navy" : "text-ink"}`}
                    >
                      {it.label}
                    </span>
                    <span className="mt-0.5 block text-[0.74rem] leading-snug text-ink-3">{it.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </>
  );
}
