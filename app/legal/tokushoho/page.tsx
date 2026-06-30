import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { LegalPage, LegalRow } from "@/components/legal-page";
import { legalInfo } from "@/data/legal";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "特定商取引法に基づく表記",
  description:
    "ノビットスタディ 中高部の特定商取引法に基づく表記。販売事業者・運営責任者・連絡先・販売価格・支払方法・役務の提供時期・解約および返金に関する事項を記載しています。",
  path: "/legal/tokushoho",
});

export default function TokushohoPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "ホーム", path: "/" },
          { name: "特定商取引法に基づく表記", path: "/legal/tokushoho" },
        ])}
      />
      <LegalPage
        eyebrow="Legal · 特定商取引法に基づく表記"
        title="特定商取引法に基づく表記"
        lead="特定商取引に関する法律（特定商取引法）第11条に基づき、以下のとおり表示します。"
      >
        <dl>
          <LegalRow label="販売事業者">{legalInfo.sellerName}</LegalRow>
          <LegalRow label="運営統括責任者">{legalInfo.operator}</LegalRow>
          <LegalRow label="所在地">{legalInfo.address}</LegalRow>
          <LegalRow label="電話番号">{legalInfo.phone}</LegalRow>
          <LegalRow label="メールアドレス">
            <a className="text-[#0f766e] underline" href={`mailto:${legalInfo.email}`}>
              {legalInfo.email}
            </a>
          </LegalRow>
          <LegalRow label="お問い合わせ方法">{legalInfo.contactMethod}</LegalRow>
          <LegalRow label="販売URL">
            <a className="text-[#0f766e] underline" href={legalInfo.url}>
              {legalInfo.url}
            </a>
          </LegalRow>
          <LegalRow label="販売価格">
            受講料は教科ごとの月額制です。1教科 月額 ¥4,980 から、選択する教科数に応じて変動します
            （2教科 ¥8,800／3教科 ¥12,800／4教科目以降は1教科ごとに +¥3,000）。
            表示価格はすべて消費税を含む総額です。最新の料金は
            <Link className="text-[#0f766e] underline" href="/#pricing">
              料金・対応科目
            </Link>
            をご確認ください。
          </LegalRow>
          <LegalRow label="商品代金以外の必要料金">
            入会金・教材費は0円です。商品代金以外の費用は発生しませんが、サービスのご利用にあたり
            必要なインターネット接続料・通信料はお客様のご負担となります。
          </LegalRow>
          <LegalRow label="お支払い方法">
            クレジットカード決済（Visa／Mastercard／American Express／JCB 等）。
            決済は世界標準の決済代行サービス Stripe を通じて安全に処理され、カード情報を当事業者が
            保持することはありません。
          </LegalRow>
          <LegalRow label="お支払い時期">
            お申し込み時に初月分を決済し、以後は毎月、初回決済日に対応する日に自動的に課金される
            月額制（サブスクリプション）です。
          </LegalRow>
          <LegalRow label="役務の提供時期">
            決済完了後、ご案内に従ってアカウント登録（パスワード設定）が完了した時点から、
            速やかにサービスをご利用いただけます。
          </LegalRow>
          <LegalRow label="解約・返金について">
            次回更新日の前までに解約手続きをいただくと、翌月以降の課金は発生しません。役務の性質上、
            提供開始後の返金は原則として行っておりません。詳細は
            <Link className="text-[#0f766e] underline" href="/legal/refund">
              返金・解約ポリシー
            </Link>
            をご確認ください。
          </LegalRow>
          <LegalRow label="動作環境">
            インターネットに接続されたスマートフォンまたはパソコンと、最新版のWebブラウザ。
          </LegalRow>
          <LegalRow label="特別な販売条件">
            「初月半額」は、新規お申し込みの初月分にのみ適用されます。
          </LegalRow>
        </dl>
      </LegalPage>
    </>
  );
}
