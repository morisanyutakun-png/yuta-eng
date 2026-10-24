"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/mock-exams/cart-context";
import { LockIcon, ShoppingCartIcon, TrashIcon, XIcon } from "@/components/mock-exams/icons";
import { PaymentBrandBadges } from "@/components/mock-exams/payment-badges";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    totalPrice,
    totalCount,
    rawSubtotal,
    bundleDiscount,
  } = useCart();
  const [agreed, setAgreed] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!agreed) {
      alert("特定商取引法に基づく表記および利用規約への同意が必要です。");
      return;
    }

    setSubmitting(true);
    // カート先頭の商品で決済セッションを作成（複数購入時はStripe側で合算対応）
    const primaryExam = items[0].exam;

    try {
      const res = await fetch("/api/mock-exams/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examId: primaryExam.id,
          agreed: true,
        }),
      });

      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("決済画面への移動に失敗しました。詳細ページより直接お試しください。");
        setSubmitting(false);
      }
    } catch (err) {
      console.error("[CartDrawer] Checkout error:", err);
      alert("決済エラーが発生しました。");
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="ショッピングカート"
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={closeCart}
    >
      <div
        className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ──────────────────────────────────────────────────────────
            カートヘッダー
        ────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingCartIcon size={18} className="text-slate-800" />
            <h2 className="text-sm font-bold text-slate-900">ショッピングカート</h2>
            <span className="rounded-full bg-[#dc2626] px-2 py-0.5 text-[11px] font-bold text-white shadow-xs">
              {totalCount}
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="カートを閉じる"
            className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          >
            <XIcon size={14} />
            <span>閉じる</span>
          </button>
        </div>

        {/* ──────────────────────────────────────────────────────────
            カート内容リスト
        ────────────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-xs text-slate-500 space-y-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <ShoppingCartIcon size={24} />
              </div>
              <p className="font-bold text-slate-800 text-sm">カートには何も入っていません</p>
              <p className="max-w-xs text-slate-500 leading-relaxed">
                気になる模試セットを選んで「カートに入れる」を押してください。
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="mt-2 rounded-lg bg-slate-900 px-4 py-2 font-bold text-white hover:bg-slate-800 transition"
              >
                商品一覧を見る
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 space-y-4">
              {items.map(({ exam }) => {
                const thumbnail =
                  exam.previews?.[0]?.src || `/samples/mock-exams/${exam.id}/cover.webp`;
                return (
                  <div key={exam.id} className="pt-4 first:pt-0 flex gap-3.5 items-start">
                    {/* 書影サムネイル */}
                    <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-xs border border-slate-200 bg-slate-50">
                      <Image
                        src={thumbnail}
                        alt={exam.title}
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </div>

                    {/* 商品情報 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <span className="rounded bg-[#1b3a63]/10 px-1.5 py-0.5 font-bold text-[#1b3a63]">
                          A4ベクターPDF
                        </span>
                        <span className="text-slate-500">{exam.edition}</span>
                      </div>
                      <Link
                        href={`/mock-exams/${exam.id}`}
                        onClick={closeCart}
                        className="mt-1 block text-xs font-bold text-slate-900 hover:text-slate-600 line-clamp-2 leading-snug"
                      >
                        {exam.shortTitle}
                      </Link>
                      <p className="mt-1 text-[11px] text-slate-500">{exam.scope}</p>

                      <div className="mt-2 flex items-baseline justify-between">
                        <span className="text-sm font-extrabold text-slate-900">
                          ¥{exam.price.toLocaleString("ja-JP")}
                          <span className="text-[10px] font-normal text-slate-500 ml-1">（税込）</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(exam.id)}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-rose-600 transition-colors"
                        >
                          <TrashIcon size={12} />
                          <span>削除</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ──────────────────────────────────────────────────────────
            フッター・小計 ＆ 購入手続き
        ────────────────────────────────────────────────────────── */}
        {items.length > 0 && (
          <div className="border-t border-slate-200 bg-slate-50 p-5 space-y-4">
            {/* 金額内訳 */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>商品点数</span>
                <span>{totalCount} 点</span>
              </div>
              <div className="flex justify-between">
                <span>商品合計</span>
                <span>¥{rawSubtotal.toLocaleString("ja-JP")}</span>
              </div>
              {bundleDiscount > 0 && (
                <div className="flex justify-between font-bold text-rose-600">
                  <span>全3回まとめ買い特別割引</span>
                  <span>-¥{bundleDiscount.toLocaleString("ja-JP")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>配送料（デジタル納品）</span>
                <span className="font-semibold text-slate-800">無料（即時ダウンロード）</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-900 text-sm">ご請求合計（税込）</span>
                <span className="text-2xl font-black text-slate-900">
                  ¥{totalPrice.toLocaleString("ja-JP")}
                </span>
              </div>
            </div>

            {/* 規約同意チェックボックス */}
            <form onSubmit={handleCheckout} className="space-y-3">
              <label className="flex cursor-pointer items-start gap-2 text-[11px] text-slate-600 leading-relaxed">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                  className="mt-0.5 size-4 rounded accent-slate-900"
                />
                <span>
                  <Link
                    href="/mock-exams/legal"
                    target="_blank"
                    className="font-semibold text-slate-800 underline underline-offset-2"
                  >
                    利用規約・特定商取引法表記
                  </Link>
                  に同意して購入へ進む
                </span>
              </label>

              {/* レジに進むボタン */}
              <button
                type="submit"
                disabled={submitting || !agreed}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-b from-[#dc2626] to-[#b91c1c] hover:from-[#e11d48] hover:to-[#be123c] py-3.5 px-4 text-sm font-bold text-white shadow-[0_3px_12px_rgba(220,38,38,0.32)] border border-[#ef4444]/40 transition active:scale-98 disabled:opacity-50"
              >
                <LockIcon size={16} />
                <span>
                  {submitting ? "決済画面へ移動中..." : `レジに進む（¥${totalPrice.toLocaleString("ja-JP")}）`}
                </span>
              </button>

              {/* 決済手段の視覚的表示 */}
              <div className="pt-1 flex flex-col items-center gap-1.5">
                <PaymentBrandBadges />
                <p className="text-center text-[10px] text-slate-400">
                  安全な暗号化通信（Stripe） ｜ 領収書PDF即時自動発行
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

