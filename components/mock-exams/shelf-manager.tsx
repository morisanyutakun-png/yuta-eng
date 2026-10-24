"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import type { ExamLevel, ExamStatus, MockExam } from "@/data/mock-exams";
import { examPath, levelLabel, yen } from "@/lib/mock-exams/catalog";
import {
  CheckIcon,
  FileTextIcon,
  FolderIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
} from "@/components/mock-exams/icons";
import type { ShelfInfo } from "@/lib/mock-exams/shelf-server";

type ItemWithShelf = MockExam & { shelf?: ShelfInfo };

interface Props {
  initialItems: ItemWithShelf[];
  adminKey?: string;
  isAuthorized?: boolean;
}

interface ExamPreset {
  name: string;
  badge: string;
  level: ExamLevel;
  title: string;
  shortTitle: string;
  scope: string;
  minutes: number;
  fullMark: number;
  daimonCount: number;
  universities: string;
  deviation: string;
  audience: string;
  price: number;
}

const PRESETS: ExamPreset[] = [
  {
    name: "第1セット型［基礎〜標準］",
    badge: "基礎〜標準",
    level: "zento-standard",
    title: "数学記述模試『入試プレビュー』 第1セット［基礎〜標準・定着編］",
    shortTitle: "第1セット［基礎〜標準・定着編］",
    scope: "数学I・A・II・B（数列）・C（ベクトル）",
    minutes: 100,
    fullMark: 100,
    daimonCount: 5,
    universities: "国公立大・中堅〜難関私大",
    deviation: "全統記述 偏差値 52.5〜62.5 目安",
    audience: "高校1〜3年生・既習修了生",
    price: 1980,
  },
  {
    name: "第2セット型［実戦・数III］",
    badge: "実戦・数III",
    level: "zento-high",
    title: "数学記述模試『入試プレビュー』 第2セット［実戦・数III融合編］",
    shortTitle: "第2セット［実戦・数III融合編］",
    scope: "数学I・A・II・B・C・III 全範囲",
    minutes: 100,
    fullMark: 100,
    daimonCount: 5,
    universities: "国公立大・難関私大・理系学部",
    deviation: "全統記述 偏差値 57.5〜67.5 目安",
    audience: "高校3年生・浪人生",
    price: 1980,
  },
  {
    name: "第3セット型［難関・発展］",
    badge: "難関・発展",
    level: "zento-high",
    title: "数学記述模試『入試プレビュー』 第3セット［難関・発展総合編］",
    shortTitle: "第3セット［難関・発展総合編］",
    scope: "数学I・A・II・B・C・III 全範囲（分野横断総合・難関大二次実戦）",
    minutes: 120,
    fullMark: 100,
    daimonCount: 5,
    universities: "難関国公立大・早慶上理・医学部医学科",
    deviation: "全統記述 偏差値 62.5以上 目安",
    audience: "難関大二次実戦期・高3浪人生",
    price: 2480,
  },
  {
    name: "大学別 冠模試型［二次記述］",
    badge: "冠模試",
    level: "kanmuri",
    title: "入試プレビュー 大学別対策模試［二次直前実戦］",
    shortTitle: "大学別対策模試",
    scope: "数学I・A・II・B・C・III 各大学個別出題形式準拠",
    minutes: 150,
    fullMark: 150,
    daimonCount: 6,
    universities: "旧帝大・難関国公立大学",
    deviation: "全統記述 偏差値 65.0以上 目安",
    audience: "個別試験受験生・高3浪人生",
    price: 2480,
  },
];

function getThumbTheme(id: string) {
  if (id.includes("set1")) {
    return {
      stripeBg: "bg-sky-600",
      badgeText: "第1回",
    };
  }
  if (id.includes("set2")) {
    return {
      stripeBg: "bg-amber-600",
      badgeText: "第2回",
    };
  }
  if (id.includes("set3")) {
    return {
      stripeBg: "bg-purple-600",
      badgeText: "第3回",
    };
  }
  return {
    stripeBg: "bg-slate-700",
    badgeText: "模試",
  };
}

export function ShelfManager({
  initialItems,
  adminKey = "",
  isAuthorized = true,
}: Props) {
  const [items, setItems] = useState<ItemWithShelf[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [msg, setMsg] = useState<{ text: string; error?: boolean } | null>(null);

  // 認証状態（STORE_DOWNLOAD_SECRET）
  const [key, setKey] = useState<string>(adminKey || "");
  const [authorized, setAuthorized] = useState<boolean>(isAuthorized);
  const [authKeyInput, setAuthKeyInput] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authError, setAuthError] = useState("");

  // マウント時に URL や sessionStorage から管理者キーを自動復元
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlKey = new URLSearchParams(window.location.search).get("key");
      const storedKey = window.sessionStorage.getItem("store_admin_key");
      const activeKey = adminKey || urlKey || storedKey || "";
      if (activeKey && activeKey !== key) {
        setKey(activeKey);
      }
      if (activeKey) {
        window.sessionStorage.setItem("store_admin_key", activeKey);
        document.cookie = `store_admin_key=${encodeURIComponent(activeKey)}; path=/; max-age=2592000; SameSite=Lax`;
      }
    }
  }, [adminKey, key]);

  // 認証付き fetch ラッパー
  const authFetch = async (url: string, init?: RequestInit): Promise<Response> => {
    const activeKey =
      key ||
      (typeof window !== "undefined"
        ? window.sessionStorage.getItem("store_admin_key") || ""
        : "");
    const headers = new Headers(init?.headers);
    if (activeKey) {
      headers.set("Authorization", `Bearer ${activeKey}`);
    }
    const sep = url.includes("?") ? "&" : "?";
    const targetUrl = activeKey ? `${url}${sep}key=${encodeURIComponent(activeKey)}` : url;

    const res = await fetch(targetUrl, { ...init, headers });
    if (res.status === 401) {
      setAuthorized(false);
      setAuthModalOpen(true);
      throw new Error(
        "管理者認証が必要です（401 Unauthorized）。パスコードを入力してログインしてください。",
      );
    }
    return res;
  };

  // 管理者パスコード送信ハンドラー
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = authKeyInput.trim();
    if (!clean) return;
    setAuthError("");
    try {
      const res = await fetch(`/api/mock-exams/shelf?key=${encodeURIComponent(clean)}`);
      if (res.ok) {
        setKey(clean);
        setAuthorized(true);
        setAuthModalOpen(false);
        setAuthKeyInput("");
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem("store_admin_key", clean);
          document.cookie = `store_admin_key=${encodeURIComponent(clean)}; path=/; max-age=2592000; SameSite=Lax`;
        }
        setMsg({ text: "管理者として認証されました。すべての編集・保存が有効です。" });
      } else {
        setAuthError("キーが一致しません。正しい STORE_DOWNLOAD_SECRET を入力してください。");
      }
    } catch {
      setAuthError("認証通信エラーが発生しました。");
    }
  };

  // インライン価格編集用状態
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [editingPriceVal, setEditingPriceVal] = useState<string>("");

  // テストメール送信状態
  const [sendingTestMailId, setSendingTestMailId] = useState<string | null>(null);

  // 右側スライドオーバー（ドロワー）状態
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"add" | "edit">("add");
  const [drawerSubmitting, setDrawerSubmitting] = useState(false);

  // ドロワー内のフォーム入力値
  const [formId, setFormId] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formShortTitle, setFormShortTitle] = useState("");
  const [formLevel, setFormLevel] = useState<ExamLevel>("zento-standard");
  const [formStatus, setFormStatus] = useState<ExamStatus>("on-sale");
  const [formEdition, setFormEdition] = useState("2027年度対策");
  const [formScope, setFormScope] = useState("");
  const [formMinutes, setFormMinutes] = useState("100");
  const [formFullMark, setFormFullMark] = useState("100");
  const [formDaimonCount, setFormDaimonCount] = useState("5");
  const [formPrice, setFormPrice] = useState("1980");
  const [formUniversities, setFormUniversities] = useState("国公立大・難関私大");
  const [formDeviation, setFormDeviation] = useState("全統記述 偏差値 55〜65 目安");
  const [formAudience, setFormAudience] = useState("高校生・浪人生");
  const [formSummary, setFormSummary] = useState("入試プレビュー演習パッケージ");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [existingPdfInfo, setExistingPdfInfo] = useState<{ sizeFormatted: string; mtime: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ESCキーでドロワーを閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && drawerOpen) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [drawerOpen]);

  // サーバーの最新データを再同期
  const refreshItems = async () => {
    setRefreshing(true);
    setMsg(null);
    try {
      const res = await authFetch("/api/mock-exams/shelf", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data?.items && Array.isArray(data.items)) {
          setItems(data.items);
          setMsg({ text: "最新の商品棚データと同期しました。" });
        }
      }
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : String(err);
      setMsg({ text, error: true });
    } finally {
      setRefreshing(false);
    }
  };

  // 新規追加ドロワーを開く
  const openAddDrawer = (initialPdf?: File) => {
    // 既存IDの最大番号を推測して自動設定
    const existingSets = items
      .map((it) => {
        const match = it.id.match(/set(\d+)/);
        return match ? Number(match[1]) : 0;
      })
      .filter((n) => n > 0);
    const nextSetNum = existingSets.length > 0 ? Math.max(...existingSets) + 1 : 4;

    setDrawerMode("add");
    setFormId(`preview-zento-set${nextSetNum}`);
    setFormTitle(`数学記述模試『入試プレビュー』 第${nextSetNum}セット［直前実戦編］`);
    setFormShortTitle(`第${nextSetNum}セット［直前実戦編］`);
    setFormLevel("zento-standard");
    setFormStatus("on-sale");
    setFormEdition("2027年度対策");
    setFormScope("数学I・A・II・B・C・III 全範囲");
    setFormMinutes("100");
    setFormFullMark("100");
    setFormDaimonCount("5");
    setFormPrice("1980");
    setFormUniversities("国公立大・難関私大");
    setFormDeviation("全統記述 偏差値 55〜65 目安");
    setFormAudience("高校生・浪人生");
    setFormSummary("入試プレビュー演習パッケージ");
    setPdfFile(initialPdf || null);
    setExistingPdfInfo(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setDrawerOpen(true);
  };

  // 編集ドロワーを開く
  const openEditDrawer = (item: ItemWithShelf) => {
    setDrawerMode("edit");
    setFormId(item.id);
    setFormTitle(item.title);
    setFormShortTitle(item.shortTitle || item.title);
    setFormLevel(item.level);
    setFormStatus(item.status);
    setFormEdition(item.edition || "2027年度対策");
    setFormScope(item.scope || "");
    setFormMinutes(String(item.minutes || 100));
    setFormFullMark(String(item.fullMark || 100));
    setFormDaimonCount(String(item.daimonCount || 5));
    setFormPrice(String(item.price || 1980));
    setFormUniversities(item.target?.universities || "");
    setFormDeviation(item.target?.deviation || "");
    setFormAudience(item.target?.audience || "");
    setFormSummary(item.summary || "");
    setPdfFile(null);
    if (item.shelf?.fullPdf) {
      setExistingPdfInfo({
        sizeFormatted: item.shelf.fullPdf.sizeFormatted,
        mtime: item.shelf.fullPdf.mtime,
      });
    } else {
      setExistingPdfInfo(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
    setDrawerOpen(true);
  };

  // プリセット適用
  const applyPreset = (preset: ExamPreset) => {
    const existingSets = items
      .map((it) => {
        const match = it.id.match(/set(\d+)/);
        return match ? Number(match[1]) : 0;
      })
      .filter((n) => n > 0);
    const nextSetNum = existingSets.length > 0 ? Math.max(...existingSets) + 1 : 4;
    const isSet = preset.name.includes("セット");

    if (drawerMode === "add") {
      setFormId(isSet ? `preview-zento-set${nextSetNum}` : "preview-custom-01");
      setFormTitle(
        isSet
          ? preset.title.replace("第1セット", `第${nextSetNum}セット`).replace("第2セット", `第${nextSetNum}セット`).replace("第3セット", `第${nextSetNum}セット`)
          : preset.title,
      );
      setFormShortTitle(
        isSet
          ? preset.shortTitle.replace("第1セット", `第${nextSetNum}セット`).replace("第2セット", `第${nextSetNum}セット`).replace("第3セット", `第${nextSetNum}セット`)
          : preset.shortTitle,
      );
    }
    setFormLevel(preset.level);
    setFormScope(preset.scope);
    setFormMinutes(String(preset.minutes));
    setFormFullMark(String(preset.fullMark));
    setFormDaimonCount(String(preset.daimonCount));
    setFormUniversities(preset.universities);
    setFormDeviation(preset.deviation);
    setFormAudience(preset.audience);
    setFormPrice(String(preset.price));
  };

  // 公開・準備中トグルスイッチ
  const toggleStatus = async (item: ItemWithShelf) => {
    const nextStatus: ExamStatus = item.status === "on-sale" ? "upcoming" : "on-sale";
    // 楽観的UI更新
    setItems((prev) =>
      prev.map((it) => (it.id === item.id ? { ...it, status: nextStatus } : it)),
    );
    try {
      const res = await authFetch("/api/mock-exams/shelf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: item.id,
          status: nextStatus,
        }),
      });
      if (!res.ok) throw new Error("ステータス変更に失敗しました");
      setMsg({
        text: `「${item.title.split("（")[0]}」を${
          nextStatus === "on-sale" ? "公開中" : "準備中"
        }にしました。`,
      });
    } catch (err: unknown) {
      // ロールバック
      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, status: item.status } : it)),
      );
      const text = err instanceof Error ? err.message : String(err);
      setMsg({ text, error: true });
    }
  };

  // インライン価格の保存
  const saveInlinePrice = async (item: ItemWithShelf) => {
    const newPrice = Number(editingPriceVal);
    setEditingPriceId(null);
    if (Number.isNaN(newPrice) || newPrice < 0 || newPrice === item.price) return;

    // 楽観的UI更新
    setItems((prev) =>
      prev.map((it) => (it.id === item.id ? { ...it, price: newPrice } : it)),
    );
    try {
      const res = await authFetch("/api/mock-exams/shelf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: item.id,
          price: newPrice,
        }),
      });
      if (!res.ok) throw new Error("価格更新に失敗しました");
      setMsg({ text: `「${item.title.split("（")[0]}」の価格を ${yen(newPrice)} に改定しました。` });
    } catch (err: unknown) {
      // ロールバック
      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, price: item.price } : it)),
      );
      const text = err instanceof Error ? err.message : String(err);
      setMsg({ text, error: true });
    }
  };

  // ドロワー内の保存ハンドラー
  const handleDrawerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = formId.trim().toLowerCase();
    if (!cleanId || !formTitle.trim()) {
      alert("模試IDとタイトルは必須です。");
      return;
    }
    if (!/^[a-z0-9][a-z0-9-]{1,60}$/.test(cleanId)) {
      alert("模試IDは半角英小文字・数字・ハイフン（2〜60文字）で入力してください。");
      return;
    }

    setDrawerSubmitting(true);
    setMsg(null);
    try {
      const formData = new FormData();
      formData.append("id", cleanId);
      formData.append("title", formTitle.trim());
      formData.append("shortTitle", formShortTitle.trim() || formTitle.trim());
      formData.append("level", formLevel);
      formData.append("status", formStatus);
      formData.append("edition", formEdition.trim() || "2027年度対策");
      formData.append("scope", formScope.trim() || "数学I・A・II・B・C・III");
      formData.append("minutes", formMinutes);
      formData.append("fullMark", formFullMark);
      formData.append("daimonCount", formDaimonCount);
      formData.append("price", formPrice);
      formData.append("universities", formUniversities.trim());
      formData.append("deviation", formDeviation.trim());
      formData.append("audience", formAudience.trim());
      formData.append("summary", formSummary.trim());

      if (pdfFile) {
        formData.append("fullPdf", pdfFile);
      }

      const res = await authFetch("/api/mock-exams/shelf", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "保存に失敗しました");

      if (data.exam) {
        setItems((prev) => {
          const exists = prev.some((it) => it.id === data.exam.id);
          if (exists) {
            return prev.map((it) => (it.id === data.exam.id ? data.exam : it));
          }
          return [data.exam, ...prev];
        });
      }
      setMsg({
        text: `「${(data.exam?.title || formTitle).split("（")[0]}」を${
          pdfFile ? "PDFファイルと共に" : ""
        }保存しました。`,
      });

      setDrawerOpen(false);
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : String(err);
      setMsg({ text, error: true });
    } finally {
      setDrawerSubmitting(false);
    }
  };

  // 商品削除
  const handleDelete = async (item: ItemWithShelf) => {
    const ok = confirm(
      `商品「${item.title.split("（")[0]}」（ID: ${item.id}）を削除しますか？\n※ sales/mock-exams/${item.id}/ 内のファイルも完全に削除されます。`,
    );
    if (!ok) return;

    try {
      const res = await authFetch(`/api/mock-exams/shelf?id=${encodeURIComponent(item.id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "削除に失敗しました");

      setItems((prev) => prev.filter((it) => it.id !== item.id));
      setMsg({ text: `「${item.title.split("（")[0]}」を削除しました。` });
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : String(err);
      setMsg({ text, error: true });
    }
  };

  // テスト購入メール即時送信（管理者アドレス宛・1通のみ）
  const handleSendTestMail = async (item: ItemWithShelf) => {
    const cleanTitle = item.title.split("（")[0] || item.title;
    const ok = confirm(
      `「${cleanTitle}」の購入完了メール（透かし刻印PDF添付）を、管理者アドレス（morisan.yutakun@gmail.com）へ1通テスト送信しますか？`,
    );
    if (!ok) return;

    setSendingTestMailId(item.id);
    setMsg(null);
    try {
      const res = await authFetch("/api/mock-exams/test-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examId: item.id,
          customerEmail: "morisan.yutakun@gmail.com",
          sendCustomer: true,
          sendAdmin: false, // 送信は1通のみ（重複防止）
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || data.customer?.detail || "送信に失敗しました");
      }
      setMsg({
        text: `✓ 「${cleanTitle}」の購入完了メール（透かし刻印PDF添付）を morisan.yutakun@gmail.com へ送信しました（1通）。`,
      });
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : String(err);
      setMsg({ text: `テスト送信エラー: ${text}`, error: true });
    } finally {
      setSendingTestMailId(null);
    }
  };

  // ドラッグ＆ドロップで新規作成
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.name.endsWith(".pdf") || file.type === "application/pdf") {
        openAddDrawer(file);
      } else {
        alert("PDFファイル（.pdf）をドラッグ＆ドロップしてください。");
      }
    }
  };

  // フィルタリング
  const filteredItems = items.filter((it) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      it.title.toLowerCase().includes(q) ||
      it.id.toLowerCase().includes(q) ||
      it.scope.toLowerCase().includes(q)
    );
  });

  const totalItems = items.length;
  const onSaleItems = items.filter((i) => i.status === "on-sale").length;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans text-xs antialiased pb-20">
      {/* ──────────────────────────────────────────────────────────
          1. 48px 極細 Admin 専用ダークヘッダー（Shopify / Linear スタイル）
      ────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 h-12 bg-[#0f172a] border-b border-slate-800 text-white px-4 sm:px-6 flex items-center justify-between shadow-xs">
        {/* 左側: ブランドロゴ + 1行ステータスバー */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-[10px] font-black text-white shadow-2xs">
              A
            </span>
            <span className="font-bold text-white text-xs tracking-tight">
              大学別数学研究室 Admin
            </span>
            <span className="text-slate-600">|</span>
          </div>

          {/* 1行ステータスバー（ダーク背景に映えるピル型バッジ群） */}
          <div className="hidden md:flex items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/60 px-2.5 py-0.5 font-medium text-emerald-300 border border-emerald-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Stripe決済 正常稼働中</span>
            </span>
            <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 font-medium text-slate-200 border border-white/10">
              公開中: {onSaleItems} / {totalItems}件
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-slate-300 border border-white/10 text-[11px]">
              <FolderIcon size={12} className="text-slate-400 shrink-0" />
              <span>sales/mock-exams/</span>
            </span>
          </div>
        </div>

        {/* 右側: アクション（重複なしの厳選配置） */}
        <div className="flex items-center gap-2">
          {!authorized && (
            <button
              type="button"
              onClick={() => {
                setAuthError("");
                setAuthModalOpen(true);
              }}
              className="inline-flex items-center gap-1 rounded bg-amber-500 hover:bg-amber-400 px-2.5 py-1 text-xs font-bold text-slate-950 shadow-2xs transition"
            >
              <span>🔒 ログイン</span>
            </button>
          )}
          <Link
            href="/mock-exams"
            target="_blank"
            className="inline-flex items-center gap-1 rounded border border-white/20 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-200 hover:bg-white/15 hover:text-white transition shadow-2xs"
          >
            <span>ストアを見る ↗</span>
          </Link>
          <button
            type="button"
            onClick={() => openAddDrawer()}
            className="inline-flex items-center gap-1 rounded bg-blue-600 hover:bg-blue-500 px-3 py-1 text-xs font-semibold text-white shadow-2xs transition"
          >
            <span>＋ 新規模試を追加</span>
          </button>
        </div>
      </header>

      {/* 認証案内バー（未認証時） */}
      {!authorized && (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-3">
          <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 flex flex-wrap items-center justify-between gap-2 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold">⚠️ 管理者認証が必要です:</span>
              <span>商品の編集やステータス変更を保存するには、管理者パスコードによる認証が必要です。</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setAuthError("");
                setAuthModalOpen(true);
              }}
              className="rounded bg-amber-800 px-3 py-1 font-bold text-white hover:bg-amber-700 transition"
            >
              パスコードを入力してログイン
            </button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          通知メッセージ
      ────────────────────────────────────────────────────────── */}
      {msg && (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-3">
          <div
            className={`rounded-md px-3.5 py-2 text-xs border flex items-center justify-between ${
              msg.error
                ? "border-rose-200 bg-rose-50 text-rose-800"
                : "border-emerald-200 bg-emerald-50 text-emerald-800"
            }`}
          >
            <span className="font-medium">{msg.text}</span>
            <button
              type="button"
              onClick={() => setMsg(null)}
              className="text-slate-400 hover:text-slate-700 ml-4 font-bold"
            >
              <XIcon size={13} />
            </button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          メインコンテンツ（作業エリアが即座に始まる）
      ────────────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-6xl px-4 py-5 sm:px-6 space-y-3.5">
        {/* ツールバー: 件数見出し ＆ 検索 ＆ 再同期 */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-slate-900">模試商品一覧</h1>
            <span className="rounded-full bg-slate-100 px-2 py-0.2 text-[11px] font-bold text-slate-600 border border-slate-200">
              {totalItems}件
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* 検索ボックス */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="タイトル・出題範囲で検索..."
                className="w-48 sm:w-60 rounded border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-800 placeholder-slate-400 focus:border-slate-900 focus:outline-hidden shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1.5 text-slate-400 hover:text-slate-600"
                >
                  <XIcon size={12} />
                </button>
              )}
            </div>

            {/* 再同期ボタン */}
            <button
              type="button"
              onClick={refreshItems}
              disabled={refreshing}
              className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 transition shadow-2xs disabled:opacity-50"
              title="ローカルフォルダ sales/mock-exams/ と再同期"
            >
              <span>{refreshing ? "同期中..." : "↻ フォルダ再同期"}</span>
            </button>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            Shopify / Linear 風 高密度横1行テーブル（リスト表示メイン）
        ────────────────────────────────────────────────────────── */}
        <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-2xs">
          <table className="w-full border-collapse text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/80 text-slate-500 font-semibold text-[11px]">
              <tr>
                <th className="w-12 px-3 py-2.5">画像</th>
                <th className="px-3 py-2.5">商品名 / 出題範囲</th>
                <th className="px-3 py-2.5 w-36">PDF状態</th>
                <th className="px-3 py-2.5 w-28">価格 (税込)</th>
                <th className="px-3 py-2.5 w-28">公開状態</th>
                <th className="px-3 py-2.5 text-right w-36">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => {
                const onSale = item.status === "on-sale";
                const shelf = item.shelf;
                const hasFullPdf = Boolean(shelf?.fullPdf);
                const cleanTitle = item.title.split("（")[0] || item.title;
                const thumbnail =
                  item.previews?.[0]?.src || `/samples/mock-exams/${item.id}/cover.webp`;
                const theme = getThumbTheme(item.id);

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/70 transition-colors group"
                  >
                    {/* 1. 小さなサムネイル（40px × 56px）：ストア同色のカラー帯＆影を反映 */}
                    <td className="px-3 py-3 align-middle">
                      <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-[3px] border border-slate-200/90 bg-white shadow-[0_2px_5px_rgba(0,0,0,0.12)] flex flex-col group/thumb">
                        {/* 上部カラー帯（青・オレンジ・紫） */}
                        <div className={`h-1.5 w-full shrink-0 ${theme.stripeBg}`} />
                        {/* ミニ帯ヘッダー */}
                        <div className="bg-slate-900 text-white px-0.5 py-[1px] flex items-center justify-between text-[6px] font-black tracking-tighter shrink-0 select-none">
                          <span>2027</span>
                          <span className="text-[5.5px] text-amber-300 font-bold">{theme.badgeText}</span>
                        </div>
                        {/* 表紙画像本体 */}
                        <div className="relative flex-1 w-full overflow-hidden bg-white">
                          {item.previews?.length ? (
                            <Image
                              src={thumbnail}
                              alt={cleanTitle}
                              fill
                              sizes="40px"
                              className="object-contain"
                            />
                          ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center p-0.5 text-center">
                              <span className="text-[7px] font-bold text-slate-600 leading-tight">
                                {item.shortTitle?.slice(0, 4) || "模試"}
                              </span>
                            </div>
                          )}
                          {/* 背表紙シャドウ */}
                          <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-r from-black/25 to-transparent" />
                          {/* 小口シャドウ */}
                          <div className="pointer-events-none absolute inset-y-0 right-0 w-0.5 bg-gradient-to-l from-slate-300 to-transparent" />
                        </div>
                      </div>
                    </td>

                    {/* 2. 商品名 / 出題範囲（全行ピシッと2行に統一） */}
                    <td className="px-3 py-3 align-middle">
                      {/* 1行目: タイトル + レベルバッジ + コードID */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-bold text-slate-900 group-hover:text-blue-900 text-xs">
                          {cleanTitle}
                        </span>
                        <span className="rounded bg-sky-50 px-1.5 py-0.5 text-[10px] text-sky-700 border border-sky-200/70 font-semibold whitespace-nowrap">
                          {levelLabel(item.level)}
                        </span>
                        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-500 border border-slate-200/60 whitespace-nowrap">
                          {item.id}
                        </code>
                      </div>

                      {/* 2行目: 出題範囲 ・ 時間 ・ 満点 ・ 大問数 */}
                      <div className="mt-1 text-[11px] text-slate-500 flex items-center gap-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
                        <span className="font-medium text-slate-700">{item.scope}</span>
                        <span className="text-slate-300">・</span>
                        <span>{item.minutes}分</span>
                        <span className="text-slate-300">・</span>
                        <span>{item.fullMark}点</span>
                        <span className="text-slate-300">・</span>
                        <span>大問{item.daimonCount}題</span>
                      </div>
                    </td>

                    {/* 3. PDF状態（PDF登録済・未登録とサイズ表記） */}
                    <td className="px-3 py-3 align-middle whitespace-nowrap">
                      {hasFullPdf ? (
                        <div
                          className="inline-flex items-center gap-1.5 whitespace-nowrap"
                          title={`納品用PDF full.pdf (${shelf?.fullPdf?.sizeFormatted}) - 最終更新: ${shelf?.fullPdf?.mtime}`}
                        >
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800 border border-emerald-200/80 whitespace-nowrap">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <span>PDF登録済</span>
                          </span>
                          {shelf?.fullPdf?.sizeFormatted && (
                            <span className="font-mono text-[11px] text-slate-500 font-medium tabular-nums">
                              {shelf.fullPdf.sizeFormatted}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 border border-slate-200/80 whitespace-nowrap">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                          <span>PDF未登録</span>
                        </span>
                      )}
                    </td>

                    {/* 4. 価格（等幅フォント tabular-nums ＆ インライン直接編集） */}
                    <td className="px-3 py-3 align-middle whitespace-nowrap">
                      {editingPriceId === item.id ? (
                        <div className="flex items-center gap-1">
                          <span className="font-mono text-slate-400 font-semibold">¥</span>
                          <input
                            type="number"
                            autoFocus
                            value={editingPriceVal}
                            onChange={(e) => setEditingPriceVal(e.target.value)}
                            onBlur={() => saveInlinePrice(item)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveInlinePrice(item);
                              if (e.key === "Escape") setEditingPriceId(null);
                            }}
                            className="w-20 rounded border border-slate-900 bg-white px-2 py-0.5 text-xs font-mono font-bold text-slate-900 tabular-nums focus:outline-hidden"
                          />
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingPriceId(item.id);
                            setEditingPriceVal(String(item.price));
                          }}
                          className="font-mono font-semibold text-sm tabular-nums text-slate-900 hover:text-blue-600 cursor-pointer group/price flex items-center gap-1 transition"
                          title="クリックして価格を直接編集"
                        >
                          <span>¥{item.price.toLocaleString("ja-JP")}</span>
                          <span className="opacity-0 group-hover/price:opacity-100 text-[10px] text-slate-400 font-normal">
                            ✎
                          </span>
                        </button>
                      )}
                    </td>

                    {/* 5. 公開トグルスイッチ（iOS / Shopify風） */}
                    <td className="px-3 py-3 align-middle">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={onSale}
                          onClick={() => toggleStatus(item)}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                            onSale ? "bg-emerald-600" : "bg-slate-300"
                          }`}
                          title={onSale ? "クリックして準備中に変更" : "クリックして販売開始"}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                              onSale ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                        <span
                          className={`text-[11px] font-medium ${
                            onSale ? "text-emerald-700" : "text-slate-400"
                          }`}
                        >
                          {onSale ? "公開中" : "準備中"}
                        </span>
                      </div>
                    </td>

                    {/* 6. 操作（絵文字なしの洗練されたボタン） */}
                    <td className="px-3 py-3 align-middle text-right space-x-1.5 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => openEditDrawer(item)}
                        className="rounded border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition shadow-2xs"
                      >
                        編集
                      </button>
                      {hasFullPdf && (
                        <a
                          href={`/api/mock-exams/shelf?download=1&id=${item.id}&file=full.pdf${
                            key ? `&key=${encodeURIComponent(key)}` : ""
                          }`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block rounded border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition shadow-2xs"
                          title="PDFを新しいタブで確認"
                        >
                          ↗
                        </a>
                      )}
                      <button
                        type="button"
                        disabled={sendingTestMailId === item.id}
                        onClick={() => handleSendTestMail(item)}
                        className="rounded border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition shadow-2xs disabled:opacity-50"
                        title="管理者アドレス宛てに透かし刻印PDF添付メールを1通テスト送信"
                      >
                        {sendingTestMailId === item.id ? "送信中..." : "✉ 送信テスト"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        className="rounded p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition inline-block align-middle"
                        title="模試を削除"
                      >
                        <TrashIcon size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ──────────────────────────────────────────────────────────
            5. 独立したドラッグ＆ドロップゾーン（Linear / Stripe スタイル）
        ────────────────────────────────────────────────────────── */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => openAddDrawer()}
          className={`mt-4 rounded-xl border-[1.5px] border-dashed p-6 text-center cursor-pointer transition-all duration-200 group ${
            isDragOver
              ? "border-blue-500 bg-blue-50/70 shadow-sm"
              : "border-slate-300 hover:border-blue-400 bg-[#f8fafc] hover:bg-[#f0f9ff]"
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100/70 text-blue-600 border border-blue-200/60 shadow-2xs group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
              <UploadCloudIcon size={20} />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-slate-800 group-hover:text-blue-900 transition-colors">
                新しい模試のPDF（<code className="font-mono text-slate-600 bg-white/80 px-1 py-0.5 rounded border border-slate-200 text-[11px]">full.pdf</code>）をドラッグ＆ドロップして新規作成
              </p>
              <p className="text-[11px] text-slate-500">
                またはここをクリックしてファイルを選択（sales/mock-exams/ 配下に自動登録・ひな形作成されます）
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ──────────────────────────────────────────────────────────
          右側スライドオーバー（ドロワー / Linear・Shopify スタイル）
      ────────────────────────────────────────────────────────── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* バックドロップ */}
          <div
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-2xs transition-opacity"
          />

          {/* スライドパネル本体 */}
          <aside className="relative z-10 w-full max-w-xl bg-white shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-200 border-l border-slate-200">
            {/* ドロワーヘッダー */}
            <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between bg-slate-50/80">
              <div>
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider block">
                  {drawerMode === "add" ? "新規模試の追加" : `ID: ${formId}`}
                </span>
                <h2 className="text-sm font-bold text-slate-900 mt-0.5">
                  {drawerMode === "add" ? "新しい模試を登録する" : "模試の編集・PDF差し替え"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
              >
                <XIcon size={16} />
              </button>
            </div>

            {/* スクロール可能なフォーム本体 */}
            <form
              onSubmit={handleDrawerSubmit}
              className="flex-1 overflow-y-auto px-6 py-5 space-y-5"
            >
              {/* プリセット自動入力 */}
              <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3">
                <span className="text-[11px] font-bold text-slate-700 block mb-2">
                  ワンクリック自動入力（選ぶと各項目が自動補完されます）:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PRESETS.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => applyPreset(p)}
                      className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition shadow-2xs"
                    >
                      <span className="rounded bg-indigo-50 px-1 py-0.2 text-[9px] font-bold text-indigo-700">
                        {p.badge}
                      </span>
                      <span>{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 基本情報 */}
              <div className="space-y-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-xs">
                    模試ID（フォルダ名・半角英数小文字ハイフン）<span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    disabled={drawerMode === "edit"}
                    value={formId}
                    onChange={(e) => setFormId(e.target.value)}
                    placeholder="例: preview-zento-set4"
                    className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:border-slate-900 focus:outline-hidden disabled:bg-slate-100 disabled:text-slate-500"
                  />
                  <span className="text-[10px] text-slate-400">
                    `sales/mock-exams/{formId || "<id>"}/` が保存先になります。
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-xs">
                    正式タイトル（PDF表紙と完全一致させてください）<span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="例: 数学記述模試『入試プレビュー』 第4セット［直前実戦編］"
                    className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:border-slate-900 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-xs">短縮タイトル</label>
                    <input
                      type="text"
                      value={formShortTitle}
                      onChange={(e) => setFormShortTitle(e.target.value)}
                      placeholder="例: 第4セット［直前実戦編］"
                      className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:border-slate-900 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-xs">難易度区分</label>
                    <select
                      value={formLevel}
                      onChange={(e) => setFormLevel(e.target.value as ExamLevel)}
                      className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:border-slate-900 focus:outline-hidden"
                    >
                      <option value="zento-standard">基礎〜標準編</option>
                      <option value="zento-high">実戦・発展編</option>
                      <option value="kanmuri">大学別冠模試</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-xs">出題範囲</label>
                  <input
                    type="text"
                    value={formScope}
                    onChange={(e) => setFormScope(e.target.value)}
                    placeholder="例: 数学I・A・II・B・C・III 全範囲"
                    className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:border-slate-900 focus:outline-hidden"
                  />
                </div>

                {/* 時間・満点・大問数 */}
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-xs">試験時間（分）</label>
                    <input
                      type="number"
                      value={formMinutes}
                      onChange={(e) => setFormMinutes(e.target.value)}
                      className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:border-slate-900 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-xs">満点（点）</label>
                    <input
                      type="number"
                      value={formFullMark}
                      onChange={(e) => setFormFullMark(e.target.value)}
                      className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:border-slate-900 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-xs">大問数（題）</label>
                    <input
                      type="number"
                      value={formDaimonCount}
                      onChange={(e) => setFormDaimonCount(e.target.value)}
                      className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:border-slate-900 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* 価格 & 販売状態 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-xs">
                      税込価格（円）<span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:border-slate-900 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-xs">販売状態</label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as ExamStatus)}
                      className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:border-slate-900 focus:outline-hidden"
                    >
                      <option value="on-sale">公開中（即時購入受付）</option>
                      <option value="upcoming">準備中（非公開・販売停止）</option>
                    </select>
                  </div>
                </div>

                {/* 納品用PDFアップロード */}
                <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block font-bold text-slate-800 text-xs">
                      納品用統合版PDF（full.pdf）
                    </label>
                    {existingPdfInfo && drawerMode === "edit" && (
                      <a
                        href={`/api/mock-exams/shelf?download=1&id=${formId}&file=full.pdf${
                          key ? `&key=${encodeURIComponent(key)}` : ""
                        }`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-semibold text-indigo-700 hover:underline inline-flex items-center gap-1"
                      >
                        <span>現在のファイルを開く ({existingPdfInfo.sizeFormatted}) ↗</span>
                      </a>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    購入者への自動送信メールに添付される完全版PDFです（問題＋解答用紙＋解説＋採点基準）。
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) setPdfFile(f);
                    }}
                    className="text-xs text-slate-600 file:mr-3 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 cursor-pointer"
                  />
                  {pdfFile && (
                    <div className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-800 border border-emerald-200">
                      <CheckIcon size={12} />
                      <span>{pdfFile.name} ({(pdfFile.size / 1024 / 1024).toFixed(2)} MB) 選択済</span>
                    </div>
                  )}
                </div>
              </div>

              {/* ドロワー下部固定アクションバー */}
              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="rounded border border-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  disabled={drawerSubmitting}
                  className="rounded bg-slate-900 px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800 disabled:opacity-50 transition"
                >
                  {drawerSubmitting ? "保存中..." : drawerMode === "add" ? "模試を追加して保存" : "変更を保存"}
                </button>
              </div>
            </form>
          </aside>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          管理者認証モーダル（STORE_DOWNLOAD_SECRET）
      ────────────────────────────────────────────────────────── */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">管理者認証</h3>
                <p className="text-xs text-slate-500 mt-1">
                  商品情報の編集・ステータス更新・PDF保存を行うには、環境変数 <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 font-mono">STORE_DOWNLOAD_SECRET</code> の入力が必要です。
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAuthModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <XIcon size={18} />
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  管理者パスコード（STORE_DOWNLOAD_SECRET）
                </label>
                <input
                  type="password"
                  autoFocus
                  required
                  value={authKeyInput}
                  onChange={(e) => setAuthKeyInput(e.target.value)}
                  placeholder="パスコードを入力..."
                  className="w-full rounded border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-hidden font-mono"
                />
              </div>

              {authError && (
                <div className="rounded bg-rose-50 border border-rose-200 p-2 text-xs text-rose-700 font-medium">
                  {authError}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(false)}
                  className="rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="rounded bg-blue-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-blue-500 shadow-sm"
                >
                  認証して保存を有効化
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
