import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { legalInfo } from "@/data/legal";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "返金・解約ポリシー",
  description:
    "ノビットスタディ 中高部の返金・解約ポリシー。解約の方法とタイミング、返金の取扱い、休会、初月半額の条件、クーリングオフの適用関係について明記しています。",
  path: "/legal/refund",
});

export default function RefundPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "ホーム", path: "/" },
          { name: "返金・解約ポリシー", path: "/legal/refund" },
        ])}
      />
      <LegalPage
        eyebrow="Legal · 返金・解約ポリシー"
        title="返金・解約ポリシー"
        lead="安心してご利用いただけるよう、解約と返金の取扱いを明確に定めています。ご不明な点はお気軽にお問い合わせください。"
      >
        <LegalSection no={1} title="解約（退会）の方法">
          <p>
            解約は、いつでもお手続きいただけます。専用アプリの管理画面、または下記お問い合わせ先への
            ご連絡にて受け付けます。電話での引き止め等は一切行いません。
          </p>
        </LegalSection>

        <LegalSection no={2} title="解約のタイミングと効力">
          <p>
            本サービスは月額制（サブスクリプション）です。次回更新日の前までに解約手続きが完了した
            場合、翌月以降の課金は発生しません。解約後も、その時点で課金済みの期間の末日までは
            サービスをご利用いただけます。
          </p>
          <p>
            月の途中で解約された場合でも、日割りでの返金は行っておりません（課金済み期間の末日まで
            ご利用いただけます）。
          </p>
        </LegalSection>

        <LegalSection no={3} title="返金について">
          <p>
            本サービスはデジタルコンテンツ・役務の提供であるため、提供開始後の返金は原則として
            行っておりません。あらかじめご了承ください。
          </p>
          <p>
            ただし、次のような場合には、状況を確認のうえ個別に対応します。
          </p>
          <ul className="ml-1 list-disc space-y-1.5 pl-5">
            <li>システムの不具合等、当事業者の責に帰すべき事由によりサービスを提供できなかった場合</li>
            <li>誤って二重に課金された場合</li>
          </ul>
          <p>
            上記に該当する場合は、下記お問い合わせ先までご連絡ください。確認のうえ、返金または
            次回請求での調整等、適切に対応します。
          </p>
        </LegalSection>

        <LegalSection no={4} title="休会について">
          <p>
            ご事情により一時的に学習を止めたい場合は、休会のお手続きが可能です。休会中は課金が
            停止し、再開時にそのまま学習を継続いただけます。お手続きの詳細はお問い合わせください。
          </p>
        </LegalSection>

        <LegalSection no={5} title="「初月半額」の条件">
          <p>
            「初月半額」は、新規お申し込みの初月分にのみ適用される割引です。2か月目以降は通常の
            月額料金となります。料金の詳細は
            <Link className="text-[#0f766e] underline" href="/#pricing">
              料金・対応科目
            </Link>
            をご確認ください。
          </p>
        </LegalSection>

        <LegalSection no={6} title="クーリングオフについて">
          <p>
            本サービスは特定商取引法上の「通信販売」に該当します。通信販売には、訪問販売等で
            認められるクーリングオフ制度の適用はありません。返品・解約の取扱いは本ポリシーおよび
            <Link className="text-[#0f766e] underline" href="/legal/tokushoho">
              特定商取引法に基づく表記
            </Link>
            に定めるとおりとします。
          </p>
        </LegalSection>

        <LegalSection no={7} title="お問い合わせ">
          <p>
            返金・解約に関するご相談は、以下までご連絡ください。
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
