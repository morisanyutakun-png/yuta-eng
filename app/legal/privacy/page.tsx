import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { legalInfo } from "@/data/legal";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "プライバシーポリシー（個人情報の取扱い）",
  description:
    "ノビットスタディ 中高部のプライバシーポリシー。取得する個人情報、利用目的、第三者提供・業務委託、Cookie・アクセス解析、安全管理措置、開示請求の窓口について定めています。",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "ホーム", path: "/" },
          { name: "プライバシーポリシー", path: "/legal/privacy" },
        ])}
      />
      <LegalPage
        eyebrow="Legal · プライバシーポリシー"
        title="プライバシーポリシー"
        lead={`${legalInfo.sellerName}（以下「当事業者」）は、ノビットスタディ 中高部（以下「本サービス」）における個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。個人情報の保護に関する法律（個人情報保護法）その他の関係法令を遵守し、適切に取り扱います。`}
      >
        <LegalSection no={1} title="取得する情報">
          <p>本サービスでは、提供にあたり次の情報を取得することがあります。</p>
          <ul className="ml-1 list-disc space-y-1.5 pl-5">
            <li>お申し込み・ご連絡に関する情報（保護者・受講者の氏名、メールアドレス、電話番号、学年 等）</li>
            <li>学習に関する情報（提出された答案、課題の進捗、添削の記録 等）</li>
            <li>決済に関する情報（サブスクリプションの契約状況等）。なお、クレジットカード番号等の決済情報は決済代行会社（Stripe）が取得・処理し、当事業者がカード番号を保持することはありません。</li>
            <li>アクセスに関する情報（Cookie、閲覧ページ、IPアドレス、ブラウザの種類、アクセス日時 等）</li>
          </ul>
        </LegalSection>

        <LegalSection no={2} title="利用目的">
          <ul className="ml-1 list-disc space-y-1.5 pl-5">
            <li>本サービス（教材の配信・課題の添削・学習管理）の提供のため</li>
            <li>本人確認、お申し込み・決済の管理、料金請求のため</li>
            <li>お問い合わせ・ご連絡への対応、重要なお知らせの通知のため</li>
            <li>サービスの維持・改善、品質向上のための分析のため</li>
            <li>不正利用の防止、法令・規約に基づく対応のため</li>
          </ul>
        </LegalSection>

        <LegalSection no={3} title="第三者提供・業務委託">
          <p>
            当事業者は、法令に基づく場合等を除き、あらかじめご本人の同意なく個人情報を第三者に
            提供しません。ただし、本サービスの提供に必要な範囲で、以下の外部サービスに取扱いを
            委託することがあります（いずれも各社の規約・セキュリティ基準に従って取り扱われます）。
          </p>
          <ul className="ml-1 list-disc space-y-1.5 pl-5">
            <li>決済処理：Stripe, Inc.（クレジットカード決済）</li>
            <li>サーバー・インフラ：Vercel, Inc.／Neon, Inc.（ホスティング・データベース）</li>
            <li>メール送信：Resend, Inc.（連絡・通知メールの配信）</li>
            <li>アクセス解析：Google LLC（Google Analytics）</li>
          </ul>
        </LegalSection>

        <LegalSection no={4} title="Cookie・アクセス解析">
          <p>
            本サービスは、利用状況の把握とサービス改善のために Cookie および Google Analytics を
            利用することがあります。これにより収集される情報は匿名で、個人を直接特定するものでは
            ありません。ブラウザの設定により Cookie を無効化できます。Google Analytics による
            データ収集を停止したい場合は、Google が提供するオプトアウト アドオンをご利用ください。
          </p>
        </LegalSection>

        <LegalSection no={5} title="安全管理措置">
          <p>
            当事業者は、取得した個人情報の漏えい・滅失・毀損の防止その他の安全管理のために、
            通信の暗号化（SSL/TLS）やアクセス権限の管理等、必要かつ適切な措置を講じます。
          </p>
        </LegalSection>

        <LegalSection no={6} title="未成年者の個人情報">
          <p>
            本サービスは中高生を主な対象とします。未成年の方がご利用になる場合は、保護者の方の
            同意を得たうえでお申し込みください。
          </p>
        </LegalSection>

        <LegalSection no={7} title="開示・訂正・利用停止等の請求">
          <p>
            ご本人からの保有個人データの開示・訂正・追加・削除・利用停止・第三者提供の停止等の
            ご請求には、ご本人であることを確認のうえ、法令に従って遅滞なく対応します。下記の
            お問い合わせ窓口までご連絡ください。
          </p>
        </LegalSection>

        <LegalSection no={8} title="お問い合わせ窓口">
          <p>
            本ポリシーに関するお問い合わせ、個人情報の取扱いに関するご請求は、以下までご連絡ください。
          </p>
          <p className="text-[0.92rem]">
            事業者：{legalInfo.sellerName}（運営統括責任者：{legalInfo.operator}）
            <br />
            メール：
            <a className="text-[#0f766e] underline" href={`mailto:${legalInfo.email}`}>
              {legalInfo.email}
            </a>
          </p>
        </LegalSection>

        <LegalSection no={9} title="本ポリシーの改定">
          <p>
            当事業者は、法令の改正やサービス内容の変更に応じて、本ポリシーを改定することがあります。
            重要な変更がある場合は、本サービス上でお知らせします。最新の内容は本ページに掲載します。
          </p>
        </LegalSection>

        <p className="mt-8 text-[0.84rem] text-[#94a3b8]">
          {siteConfig.name} {siteConfig.division}／制定日：{legalInfo.established}・最終改定日：
          {legalInfo.lastUpdated}
        </p>
      </LegalPage>
    </>
  );
}
