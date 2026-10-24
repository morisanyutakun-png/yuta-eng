"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/mock-exams/icons";

interface DaimonItem {
  no: number;
  field: string;
  points: number;
  theme: string;
}

interface DaimonAccordionProps {
  structure: DaimonItem[];
  minutes: number;
  fullMark: number;
}

export function DaimonAccordion({ structure, minutes, fullMark }: DaimonAccordionProps) {
  // 第1問（無料サンプル対象）を既定で開いておく
  const [openMap, setOpenMap] = useState<Record<number, boolean>>({ 1: true });

  const toggle = (no: number) => {
    setOpenMap((prev) => ({ ...prev, [no]: !prev[no] }));
  };

  const toggleAll = () => {
    const allOpen = structure.every((item) => openMap[item.no]);
    const nextState: Record<number, boolean> = {};
    structure.forEach((item) => {
      nextState[item.no] = !allOpen;
    });
    setOpenMap(nextState);
  };

  const isAllOpen = structure.every((item) => openMap[item.no]);

  return (
    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
      {/* アコーディオンヘッダー */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
            全{structure.length}大問構成
          </span>
          <span className="font-medium text-slate-700">
            制限時間 {minutes}分 ／ {fullMark}点満点（200点換算）
          </span>
        </div>
        <button
          type="button"
          onClick={toggleAll}
          className="font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          {isAllOpen ? "すべて閉じる" : "すべて展開する"}
        </button>
      </div>

      {/* 大問リスト */}
      <div className="divide-y divide-slate-100">
        {structure.map((item) => {
          const isOpen = !!openMap[item.no];
          const isSample = item.no === 1; // 第1問は立ち読みサンプル対象

          return (
            <div key={item.no} className="transition-colors hover:bg-slate-50/40">
              <button
                type="button"
                onClick={() => toggle(item.no)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between px-4 py-3.5 text-left focus:outline-hidden"
              >
                <div className="flex items-start sm:items-center gap-3 min-w-0 pr-3">
                  <span className="font-bold text-xs text-slate-800 bg-slate-100 px-2 py-1 rounded shrink-0">
                    第{item.no}問
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        {item.field}
                      </span>
                      <span className="text-xs text-slate-500">
                        （配点 {item.points}点）
                      </span>
                      {isSample && (
                        <span className="rounded bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 text-[10px] font-bold text-emerald-700">
                          無料立ち読み対象
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-600 truncate">
                      {item.theme}
                    </p>
                  </div>
                </div>
                <div
                  className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-slate-700" : ""
                  }`}
                >
                  <ChevronDownIcon size={18} />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs text-slate-600 bg-slate-50/50 border-t border-slate-100">
                  <div className="rounded bg-white p-3 border border-slate-200/80 space-y-1.5 leading-relaxed">
                    <p className="font-bold text-slate-800">
                      【出題のねらいと採点ポイント】
                    </p>
                    <p className="text-slate-600">{item.theme}</p>
                    <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                      ※製品版には本問専用の所定解答用紙（A4原寸1枚）と、小問ごとの加点行・減点行を網羅した詳細採点基準表が付属します。
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
