import Link from "next/link";
import { PaymentBrandBadges } from "@/components/mock-exams/payment-badges";

export function BoothFooter() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white py-12 text-xs text-slate-500">
      <div className="mx-auto max-w-[1040px] px-4 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* 模試ラインナップ */}
          <div>
            <h4 className="font-bold text-slate-900">演習模試ラインナップ</h4>
            <ul className="mt-3.5 space-y-2">
              <li>
                <Link
                  href="/mock-exams/preview-zento-set1"
                  className="hover:text-slate-900 transition-colors"
                >
                  8月夏期用［国公立・難関大標準］
                </Link>
              </li>
              <li>
                <Link
                  href="/mock-exams/preview-zento-set2"
                  className="hover:text-slate-900 transition-colors"
                >
                  10月秋期用［旧帝大・医学部実戦］
                </Link>
              </li>
              <li>
                <Link
                  href="/mock-exams/preview-zento-set3"
                  className="hover:text-slate-900 transition-colors"
                >
                  12月直前用［最難関総合・冠模試レベル］
                </Link>
              </li>
              <li className="text-slate-400">大学別冠模試（順次公開予定）</li>
            </ul>
          </div>

          {/* ご利用案内 */}
          <div>
            <h4 className="font-bold text-slate-900">ご利用案内・納品仕様</h4>
            <ul className="mt-3.5 space-y-2">
              <li>形式：高精細A4印刷用ベクターPDF</li>
              <li>納品：決済完了後、即時ダウンロード（メール送付）</li>
              <li>再取得：購入者ご本人に限りいつでも再DL可能（※提供期間中）</li>
              <li>印刷：自宅プリンター・コンビニネットプリント対応</li>
              <li className="text-slate-400">※購入者以外の第三者への再配布・転送禁止</li>
            </ul>
          </div>

          {/* 規約・法規 */}
          <div>
            <h4 className="font-bold text-slate-900">規約・特定商取引法</h4>
            <ul className="mt-3.5 space-y-2">
              <li>
                <Link
                  href="/mock-exams/legal"
                  className="hover:text-slate-900 transition-colors"
                >
                  特定商取引法に基づく表記
                </Link>
              </li>
              <li>
                <Link
                  href="/mock-exams/legal"
                  className="hover:text-slate-900 transition-colors"
                >
                  利用規約・著作権について
                </Link>
              </li>
              <li>
                <Link
                  href="/mock-exams/legal"
                  className="hover:text-slate-900 transition-colors"
                >
                  個人情報保護方針
                </Link>
              </li>
            </ul>
          </div>

          {/* 運営元情報 */}
          <div>
            <h4 className="font-bold text-slate-900">ショップ運営者</h4>
            <ul className="mt-3.5 space-y-2">
              <li className="font-medium text-slate-900">大学別数学研究室</li>
              <li>代表・作問監修：森 祐太</li>
              <li>決済保護：Stripe（カード情報は暗号化保護）</li>
              <li>
                <Link
                  href="/"
                  className="text-slate-700 hover:text-slate-900 underline underline-offset-2 font-medium"
                >
                  ← 研究室トップページへ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <span>© 2027 大学別数学研究室 公式ストア All rights reserved.</span>
          <PaymentBrandBadges />
        </div>
      </div>
    </footer>
  );
}

