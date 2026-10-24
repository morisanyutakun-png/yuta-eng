"use client";

import { useEffect, useState } from "react";
import { HeartFilledIcon, HeartIcon } from "@/components/mock-exams/icons";

interface BoothLikeButtonProps {
  examId: string;
  initialCount?: number;
  variant?: "card" | "detail";
}

const DEFAULT_COUNTS: Record<string, number> = {
  "preview-zento-set1": 64,
  "preview-zento-set2": 48,
  "preview-zento-set3": 52,
};

export function BoothLikeButton({
  examId,
  initialCount,
  variant = "card",
}: BoothLikeButtonProps) {
  const baseCount = initialCount ?? DEFAULT_COUNTS[examId] ?? 30;
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(baseCount);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(`booth_like_${examId}`);
      if (stored === "true") {
        setLiked(true);
        setCount(baseCount + 1);
      }
    } catch {
      // localStorage unavailable (SSR or private mode)
    }
  }, [examId, baseCount]);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const nextLiked = !liked;
    setLiked(nextLiked);
    setCount((prev) => (nextLiked ? prev + 1 : prev - 1));

    try {
      if (nextLiked) {
        localStorage.setItem(`booth_like_${examId}`, "true");
      } else {
        localStorage.removeItem(`booth_like_${examId}`);
      }
    } catch {
      // ignore
    }
  };

  if (!mounted) {
    // SSR fallback to avoid hydration mismatch
    if (variant === "card") {
      return (
        <span className="inline-flex items-center gap-1 text-slate-400 text-xs">
          <HeartIcon size={14} />
          <span className="font-medium tabular-nums">{baseCount}</span>
        </span>
      );
    }
    return (
      <button
        type="button"
        disabled
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs"
      >
        <HeartIcon size={16} />
        <span>スキ！</span>
        <span className="tabular-nums font-semibold text-slate-500">{baseCount}</span>
      </button>
    );
  }

  if (variant === "card") {
    return (
      <button
        type="button"
        onClick={toggleLike}
        aria-label={liked ? "スキ！を取り消す" : "スキ！をつける"}
        className={`group/like inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-all ${
          liked
            ? "text-rose-600 bg-rose-50 hover:bg-rose-100"
            : "text-slate-500 hover:text-rose-600 hover:bg-slate-100"
        }`}
      >
        {liked ? (
          <HeartFilledIcon size={14} className="text-rose-500 animate-in zoom-in-75 duration-200" />
        ) : (
          <HeartIcon size={14} className="group-hover/like:text-rose-500 transition-colors" />
        )}
        <span className="tabular-nums text-[11px]">{count}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleLike}
      aria-label={liked ? "スキ！を取り消す" : "スキ！をつける"}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-bold transition-all shadow-2xs active:scale-95 ${
        liked
          ? "border-rose-300 bg-rose-50/70 text-rose-600 hover:bg-rose-100"
          : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50 hover:text-rose-600"
      }`}
    >
      {liked ? (
        <HeartFilledIcon size={16} className="text-rose-500 animate-in zoom-in-75 duration-200" />
      ) : (
        <HeartIcon size={16} className="text-slate-500 transition-colors" />
      )}
      <span>スキ！</span>
      <span className="tabular-nums font-semibold text-slate-600">{count}</span>
    </button>
  );
}

