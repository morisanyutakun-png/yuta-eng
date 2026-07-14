import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { legalInfo } from "@/data/legal";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "返金ポリシー",
  description:
    "ノビットスタディ 中高部の返金ポリシー。買い切り（教材の一括購入）における返金の取扱い、例外対応、開講記念パック割の条件、クーリングオフの適用関係について明記しています。",
  path: "/legal/refund",
});

export default function RefundPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "ホーム", path: "/" },
          { name: "返金ポリシー", path: "/legal/refund" },
        ])}
      />
      <LegalPage
        eyebrow="Legal · 返金ポリシー"
        title="返金ポリシー"
        lead="安心してご利用いただけるよう、買い切り（教材の一括購入）における返金の取扱いを明確に定めています。ご不明な点はお気軽にお問い合わせください。"
      >
        <LegalSection no={1} title="料金の仕組み（買い切り）">
          <p>
            本サービスは、教材（講座）ごとの買い切り（一括購入）です。月額の継続課金や自動更新はなく、
            解約のお手続きも必要ありません。一度ご購入いただいた教材は、その提供範囲（1教材につき
            約100回分の課題と添削）を修了までご利用いただけます。
          </p>
        </LegalSection>

        <LegalSection no={2} title="返金について">
          <p>
            本サービスはデジタルコンテンツ・役務の提供であるため、提供開始後（アカウント登録の完了、
            または最初の課題・添削の提供開始）の返金は原則として行っておりません。あらかじめご了承ください。
          </p>
          <p>
            ただし、次のような場合には、状況を確認のうえ個別に対応します。
          </p>
          <ul className="ml-1 list-disc space-y-1.5 pl-5">
            <li>システムの不具合等、当事業者の責に帰すべき事由によりサービスを提供できなかった場合</li>
            <li>誤って二重に決済された場合</li>
          </ul>
          <p>
            上記に該当する場合は、下記お問い合わせ先までご連絡ください。確認のうえ、適切に返金等の
            対応をします。
          </p>
        </LegalSection>

        <LegalSection no={3} title="「開講記念パック割」の条件">
          <p>
            「開講記念パック割」は、2教材以上を同時にお申し込みの場合に、2026年8月6日までのお申し込みへ
            適用される割引です。料金の詳細は
            <Link className="text-[#0f766e] underline" href="/#pricing">
              料金・対応教材
            </Link>
            をご確認ください。
          </p>
        </LegalSection>

        <LegalSection no={4} title="クーリングオフについて">
          <p>
            本サービスは特定商取引法上の「通信販売」に該当します。通信販売には、訪問販売等で
            認められるクーリングオフ制度の適用はありません。返品・解約の取扱いは本ポリシーおよび
            <Link className="text-[#0f766e] underline" href="/legal/tokushoho">
              特定商取引法に基づく表記
            </Link>
            に定めるとおりとします。
          </p>
        </LegalSection>

        <LegalSection no={5} title="お問い合わせ">
          <p>
            返金に関するご相談は、以下までご連絡ください。
            <br />
            事業者：{legalInfo.sellerName}（運営統括責任者：{legalInfo.operator}）
            <br />
            メール：
            <a className="text-[#0f766e] underline" href={`mailto:${legalInfo.email}`}>
              {legalInfo.email}
            </a>
          </p>
        </LegalSection>
      </LegalPage>
    </>
  );
}
