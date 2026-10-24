"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { MockExam } from "@/data/mock-exams";
import { CheckIcon } from "@/components/mock-exams/icons";

export interface CartItem {
  exam: MockExam;
  addedAt: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (exam: MockExam, openDrawer?: boolean) => void;
  addMultipleToCart: (exams: MockExam[], openDrawer?: boolean) => void;
  removeFromCart: (examId: string) => void;
  clearCart: () => void;
  isInCart: (examId: string) => boolean;
  totalCount: number;
  totalPrice: number;
  rawSubtotal: number;
  bundleDiscount: number;
  isBundleEligible: boolean;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  notification: string | null;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "mock_exams_booth_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.error("[CartProvider] Failed to load cart:", e);
    }
  }, []);

  const saveItems = (newItems: CartItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    } catch (e) {
      console.error("[CartProvider] Failed to save cart:", e);
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  const addToCart = (exam: MockExam, openDrawer: boolean = true) => {
    if (items.some((item) => item.exam.id === exam.id)) {
      showNotification(`「${exam.shortTitle}」はすでにカートに入っています`);
      if (openDrawer) setIsCartOpen(true);
      return;
    }
    const newItems = [...items, { exam, addedAt: Date.now() }];
    saveItems(newItems);
    showNotification(`「${exam.shortTitle}」をカートに追加しました`);
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const addMultipleToCart = (examsToAdd: MockExam[], openDrawer: boolean = true) => {
    let addedCount = 0;
    const updated = [...items];
    for (const ex of examsToAdd) {
      if (!updated.some((item) => item.exam.id === ex.id)) {
        updated.push({ exam: ex, addedAt: Date.now() });
        addedCount++;
      }
    }
    saveItems(updated);
    if (addedCount > 0) {
      showNotification(`全3回セット（${addedCount}点）をカートに追加しました（セット割引適用）`);
    } else {
      showNotification(`全3回セットはすでにカートに入っています`);
    }
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (examId: string) => {
    const target = items.find((item) => item.exam.id === examId);
    const newItems = items.filter((item) => item.exam.id !== examId);
    saveItems(newItems);
    if (target) {
      showNotification(`「${target.exam.shortTitle}」をカートから削除しました`);
    }
  };

  const clearCart = () => {
    saveItems([]);
  };

  const isInCart = (examId: string) => {
    return items.some((item) => item.exam.id === examId);
  };

  const totalCount = mounted ? items.length : 0;
  const isBundleEligible =
    items.some((i) => i.exam.id === "preview-zento-set1") &&
    items.some((i) => i.exam.id === "preview-zento-set2") &&
    items.some((i) => i.exam.id === "preview-zento-set3");

  const rawSubtotal = mounted
    ? items.reduce((sum, item) => sum + (item.exam.price || 0), 0)
    : 0;

  // 全3回がカートに入っている場合は ¥1,460 引き（¥6,440 → ¥4,980）
  const bundleDiscount = isBundleEligible ? 1460 : 0;
  const totalPrice = Math.max(0, rawSubtotal - bundleDiscount);

  return (
    <CartContext.Provider
      value={{
        items: mounted ? items : [],
        addToCart,
        addMultipleToCart,
        removeFromCart,
        clearCart,
        isInCart,
        totalCount,
        totalPrice,
        rawSubtotal,
        bundleDiscount,
        isBundleEligible,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        notification,
      }}
    >
      {children}

      {/* カート追加・削除通知トースト */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-xs font-semibold text-white shadow-xl animate-in slide-in-from-bottom-2 duration-200">
          <CheckIcon size={14} className="text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

