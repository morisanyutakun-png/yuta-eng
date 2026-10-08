"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { SamplePage } from "@/lib/samples";

/** 拡大表示に要るぶんだけ。書籍の抜粋と模試の見本で同じものを使う */
type ViewerPage = Pick<SamplePage, "file" | "label" | "page" | "width" | "height">;

/**
 * 抜粋ページの拡大表示。
 *
 * 書店で手に取って見るのと同じことができればよいので、
 * 画面いっぱいに1ページを出し、左右で送れるだけにしてある。
 * JavaScript が動かない環境でも、画像そのもののリンクとして開ける。
 */
export function SampleViewer({ pages, title, layout = "thumbnails" }: {
  pages: ViewerPage[];
  title: string;
  layout?: "thumbnails" | "spread" | "compact";
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLAnchorElement | null>(null);
  const visible = open !== null;
  const close = useCallback(() => {
    setOpen(null);
    setZoomed(false);
    opener.current?.focus({ preventScroll: true });
  }, []);
  const move = useCallback(
    (d: number) => {
      setOpen((i) => (i === null ? i : (i + d + pages.length) % pages.length));
      setZoomed(false);
    },
    [pages.length],
  );

  useEffect(() => {
    if (!visible) return;
    dialog.current?.querySelector<HTMLButtonElement>('button[aria-label="閉じる"]')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "Tab") {
        const controls = dialog.current?.querySelectorAll<HTMLButtonElement>("button");
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    // 背面がスクロールしないようにする
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [visible, close, move]);

  const current = open === null ? null : pages[open];

  return (
    <>
      <ul className={layout === "spread" ? "mt-4 grid gap-4 sm:grid-cols-2" : layout === "compact" ? "mt-4 grid max-w-[42rem] grid-cols-2 gap-3" : "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3"}>
        {pages.map((p, i) => (
          <li key={p.file}>
            <a
              href={p.file}
              target="_blank"
              rel="noopener"
              onClick={(e) => {
                // 画像を直接開く代わりに、その場で拡大する
                e.preventDefault();
                opener.current = e.currentTarget;
                setZoomed(false);
                setOpen(i);
              }}
              className="group block"
              aria-label={`${p.label}を拡大して見る`}
            >
              <span className="block overflow-hidden border border-rule bg-white">
                <Image
                  src={p.file}
                  alt={`${title}の${p.label}`}
                  width={p.width}
                  height={p.height}
                  loading="lazy"
                  sizes={layout === "spread" ? "(max-width: 640px) 90vw, (max-width: 1184px) 45vw, 530px" : layout === "compact" ? "(max-width: 640px) 45vw, 330px" : "(max-width: 640px) 45vw, 220px"}
                  className="w-full transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </span>
              <span className="mt-1.5 flex items-baseline justify-between gap-2">
                <span className="text-[0.78rem] font-semibold text-ink group-hover:text-navy">{p.label}</span>
                {p.page > 0 && <span className="shrink-0 text-[0.68rem] tabular-nums text-ink-3">p.{p.page}</span>}
              </span>
            </a>
          </li>
        ))}
      </ul>

      {current && (
        <div
          role="dialog"
          ref={dialog}
          aria-modal="true"
          aria-label={`${title} ${current.label}`}
          className="sample-dialog fixed inset-0 z-50 flex flex-col bg-ink p-3 sm:p-6"
          onClick={close}
        >
          <div className="flex shrink-0 items-center justify-between gap-3 pb-2 text-white">
            <p className="min-w-0 text-[0.8rem]">
              <span className="font-semibold">{current.label}</span>
              {current.page > 0 && <span className="ml-2 tabular-nums text-white/70">p.{current.page}</span>}
              <span className="ml-2 truncate text-white/60">{title}</span>
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="閉じる"
              className="-mr-1 flex size-11 shrink-0 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white"
            >
              <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* 画像そのものは触っても閉じない（拡大して読むため） */}
          <div className="min-h-0 flex-1 overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className={zoomed ? "w-[200%] min-w-[60rem]" : "w-full"}>
            <Image
              src={current.file}
              alt={`${title}の${current.label}`}
              width={current.width}
              height={current.height}
              sizes={zoomed ? "(max-width: 480px) 960px, 200vw" : current.width > current.height ? "(max-width: 1350px) 100vw, 1280px" : "(max-width: 1024px) 100vw, 900px"}
              className={`mx-auto h-auto w-full bg-white ${zoomed ? "" : current.width > current.height ? "max-w-[80rem]" : "max-w-[52rem]"}`}
              loading="eager"
            />
            </div>
          </div>

          <div
            className="flex shrink-0 items-center justify-center gap-3 pt-2.5 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="前のページ"
              className="flex min-h-11 items-center gap-1 rounded-[4px] px-2 text-[0.82rem] hover:bg-white/10"
            >
              <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m13 4-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              前へ
            </button>
            <button type="button" onClick={() => setZoomed((z) => !z)} aria-pressed={zoomed} className="min-h-11 rounded-[4px] border border-white/30 px-2 text-[0.78rem] hover:bg-white/10">{zoomed ? "全体を表示" : "文字を拡大"}</button>
            <span className="text-[0.78rem] tabular-nums text-white/70">
              {open! + 1} / {pages.length}
            </span>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="次のページ"
              className="flex min-h-11 items-center gap-1 rounded-[4px] px-2 text-[0.82rem] hover:bg-white/10"
            >
              次へ
              <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m7 4 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
