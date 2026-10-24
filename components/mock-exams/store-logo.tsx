import React from "react";
import { LogoMark } from "@/components/logo";

interface StoreLogoMarkProps {
  size?: number;
  dark?: boolean;
  className?: string;
}

/**
 * 大学別数学研究室の公式ブランドロゴマーク。
 *
 * サイト本体・模試表紙と統一された、出題分析の幾何学意匠（LogoMark）。
 * 濃色ヘッダー上では角版を白、棒を濃紺に反転描画して視認性を確保。
 */
export function StoreLogoMark({ size = 30, dark = false, className = "" }: StoreLogoMarkProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative overflow-hidden rounded-lg shrink-0 select-none ${className}`}
      aria-label="大学別数学研究室 公式ロゴ"
    >
      <LogoMark
        className={`size-full ${dark ? "text-white" : "text-[#1b3a63]"}`}
        style={dark ? ({ "--logo-ink": "#0f172a" } as React.CSSProperties) : undefined}
      />
    </div>
  );
}
