"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/mock-exams/icons";

interface FaqItem {
  q: string;
  a: string;
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    q: "購入後、どのようにPDFを受け取りますか？",
    a: "決済完了と同時に完了画面が開き、一括統合版PDFおよび個別PDF（問題冊子・所定解答用紙・解答解説・採点基準）のダウンロードボタンが即座に表示されます。また、入力いただいたメールアドレス宛にもダウンロードURLが自動送付されます。",
  },
  {
    q: "自宅にプリンターがなくてもコンビニで印刷できますか？",
    a: "はい。すべてのPDFは一般的なA4原寸サイズで組版されています。セブン-イレブン（ネットプリント）、ローソン・ファミリーマート（ネットワークプリント）などのLINEやWebアプリにPDFを登録し、コンビニのマルチコピー機で白黒・A4サイズですぐに印刷いただけます。",
  },
  {
    q: "所定解答用紙は白紙のノートと何が違いますか？",
    a: "各大問に1枚ずつ、入試本番そっくりの解答枠（受験番号・氏名欄・小問別採点欄・出題分野帯）を設けています。「どの程度の文字サイズで書けば枠内に収まるか」「下書きと清書のスペース配分」など、ノート演習では絶対に身につかない本番の枠感覚を体得できます。",
  },
  {
    q: "自己採点は一人でも正確に行えますか？",
    a: "はい。大手予備校の模試では一般に公開されない「小問ごとの加点項目」と「減点例（特定条件の欠落、根拠のない立式など）」がすべて1点刻みで表形式にまとまっています。さらに得点に応じたS〜D到達度グレード判定表（志望校レベル目安）が付くため、自分の弱点と到達度が客観的に分かります。",
  },
  {
    q: "領収書は発行されますか？（経費精算対応）",
    a: "はい。決済完了時にStripeより自動送信される領収書メールに加え、決済完了画面（専用ダウンロードページ）からもPDF形式の公式領収書を即座に表示・ダウンロードいただけます。塾や学校、研究費等の経費精算にもご利用いただけます。（※当ストアは適格請求書発行事業者の登録を行っていないため、発行される領収書は通常の領収書PDFとなります）",
  },
  {
    q: "購入後の再ダウンロード期間はどのくらいですか？",
    a: "ご購入確認メールに記載された専用リンクから、いつでも何度でも最新版PDFを再ダウンロードいただけます。端末の機種変更やファイル紛失時も安心です（※購入者ご本人の学習利用に限ります。第三者への転送・再配布は固くお断りいたします）。",
  },
];

export function FaqAccordion({ faqs = DEFAULT_FAQS }: { faqs?: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="divide-y divide-slate-200 border-y border-slate-200">
      {faqs.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="py-3.5">
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between text-left focus:outline-hidden gap-4"
            >
              <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                Q. {item.q}
              </span>
              <span
                className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-slate-700" : ""
                }`}
              >
                <ChevronDownIcon size={18} />
              </span>
            </button>
            {isOpen && (
              <p className="mt-2.5 text-xs leading-relaxed text-slate-600 animate-in fade-in duration-150">
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
