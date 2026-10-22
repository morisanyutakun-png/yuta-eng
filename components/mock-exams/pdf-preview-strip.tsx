"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { MockExam } from "@/data/mock-exams";

/**
 * 印刷用 A4 PDF（表紙・問題紙・所定解答用紙・解答解説・採点基準）の紙面プレビュー。
 *
 * 購入前に「実際にどのような組版・解答用紙・採点表の PDF が手に入るか」を
 * 視覚的に確かめられるようにする。サムネイルを押すとその場で拡大表示でき、
 * 左右キー・Esc でも操作できる。
 */
export function PdfPreviewStrip({
  previews,
  title,
}: {
  previews: NonNullable<MockExam["previews"]>;
  title: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLAnchorElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    setZoomed(false);
    opener.current?.focus({ preventScroll: true });
  }, []);

  const move = useCallback(
    (d: number) => {
      setOpen((i) => (i === null ? i : (i + d + previews.length) % previews.length));
      setZoomed(false);
    },
    [previews.length],
  );

  useEffect(() => {
    if (open === null) return;
    dialog.current?.querySelector<HTMLButtonElement>('button[aria-label="閉じる"]')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, move]);

  const current = open === null ? null : previews[open];

  return (
    <>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {previews.map((p, i) => (
          <li key={p.src}>
            <a
              href={p.src}
              target="_blank"
              rel="noopener"
              onClick={(e) => {
                e.preventDefault();
                opener.current = e.currentTarget;
                setZoomed(false);
                setOpen(i);
              }}
              className="group block"
              aria-label={`${p.label}の紙面見本を拡大して見る`}
            >
              <span className="block overflow-hidden border border-rule bg-white">
                <Image
                  src={p.src}
                  alt={`${title}：${p.label}（見本）`}
                  width={p.width}
                  height={p.height}
                  loading="lazy"
                  sizes="(max-width: 640px) 45vw, 200px"
                  className="w-full transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </span>
              <span className="mt-1.5 block text-[0.8rem] font-semibold text-ink group-hover:text-navy">
                {p.label}
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
            <p className="min-w-0 text-[0.86rem]">
              <span className="font-semibold">{current.label}</span>
              <span className="ml-2 truncate text-white/60">{title}（見本）</span>
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

          <div className="min-h-0 flex-1 overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className={zoomed ? "w-[180%] min-w-[54rem]" : "w-full"}>
              <Image
                src={current.src}
                alt={`${title}：${current.label}（見本）`}
                width={current.width}
                height={current.height}
                sizes={zoomed ? "180vw" : "(max-width: 1024px) 100vw, 860px"}
                className={`mx-auto h-auto w-full bg-white ${zoomed ? "" : "max-w-[50rem]"}`}
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
              className="flex min-h-11 items-center gap-1 border border-white/30 px-3.5 text-[0.84rem] hover:bg-white/10"
            >
              ← 前へ
            </button>
            <button
              type="button"
              onClick={() => setZoomed((z) => !z)}
              className="flex min-h-11 items-center border border-white/30 px-3.5 text-[0.84rem] hover:bg-white/10"
            >
              {zoomed ? "全体に戻す" : "文字を拡大"}
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="次のページ"
              className="flex min-h-11 items-center gap-1 border border-white/30 px-3.5 text-[0.84rem] hover:bg-white/10"
            >
              次へ →
            </button>
          </div>
        </div>
      )}
    </>
  );
}

