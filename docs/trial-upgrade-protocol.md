# お試し（3課題・添削3回）と本契約アップグレードの連携仕様

対象：ノビットスタディ 管理システム（アプリ）側の実装者。
yuta-eng（LP・決済）側はこの仕様どおり実装済み。金額の権威は常に yuta-eng サーバ
（Stripe の `unit_amount`）にあり、`metadata.amount` は実請求額と必ず一致する。

## 1. 用語と方針

- **お試し** … 既存の100回教材を「3提出で上限」にするのではなく、**3課題ぶんの専用教材**を
  別商品（`{fullId}-trial`）として販売する。アプリは既存の「教材ID＝まるごと割当」の経路で
  扱えばよく、提出回数の上限管理などの新規ロジックは不要。
- **本契約アップグレード** … お試し済みの生徒が本契約へ進むとき、yuta-eng が
  **−¥1,980（`TRIAL_CREDIT`）**を請求額から差し引く。資格の証明は**アプリが署名した
  トークン**（`/apply?u=<token>`）で行う。

現在お試しを用意している主要科目（`lib/pricing.ts` の `TRIAL_FLAGSHIP_IDS`）：
`math-1a` / `math-2bc` / `chemistry` / `english-reading` / `physics`
（=お試しID：`math-1a-trial` ほか。ここに追加すれば拡張できる。）

## 2. 購入時に渡す metadata（yuta-eng → アプリ）

`checkout.session.completed` の Webhook（`NOBIT_REGISTER_WEBHOOK_URL`）と
`GET /api/provision/session` の両方が返す `Registration` に、以下が追加された。

| フィールド (JSON) | Stripe metadata | 意味 |
|---|---|---|
| `plan` | `plan` | `"full"` / `"trial"` / `"upgrade"` |
| `subjects` | `subjects` | 教材IDのカンマ区切り。お試しは `math-1a-trial` 等 |
| `trialOf` | `trial_of` | お試しが対応するフル教材ID（`plan="trial"` のとき）例 `math-1a` |
| `creditAmount` | `credit_amount` | 値引き額（¥1,980）文字列（`plan="upgrade"` のとき） |
| `upgradeOf` | `upgrade_of` | アップグレードしたフル教材ID（`plan="upgrade"` のとき） |
| `amount` | `amount` | **実請求額**（値引き後）。会計・GA4 はこれを使用 |

## 3. アプリ側に必要な実装

### (A) お試しの割当（`plan="trial"`）
`subjects`（`*-trial`）または `trial_of` を見て、対応する**3課題教材**を生徒へ割り当てる。
既存のフル教材割当と同じ経路でよい。上限カウントは不要（教材自体が3課題）。

### (B) 本契約への導線＝署名トークンの発行（アプリの主担当・ここだけが新規実装）
お試し済みで、まだ本契約していない生徒に、次のリンクを提示する：

```
https://yuta-eng.com/apply?u=<token>
```

`<token>` は **JWTライクなコンパクト形式**：`base64url(JSON payload) + "." + base64url(HMAC_SHA256(payloadPart, secret))`

- `secret` = 環境変数 `NOBIT_REGISTER_SECRET`（yuta-eng と共有済み）
- `payload`：
  ```json
  { "s": "math-1a", "jti": "一意なID", "exp": 1730000000, "c": "cus_..." }
  ```
  - `s` … 本契約するフル教材の Subject.id（**この教材がカゴに入っているときだけ**値引き適用）
  - `jti` … 単回化のキー（生徒×お試しごとに一意。例：`trialSessionId` など）
  - `exp` … 失効UNIX秒（推奨：発行から24〜72時間）
  - `c` … Stripe Customer ID（任意・記録用）

発行の擬似コード（Node）:
```js
import { createHmac } from "node:crypto";
const b64 = (b) => Buffer.from(b).toString("base64").replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
const payload = { s: fullSubjectId, jti, exp: Math.floor(Date.now()/1000)+72*3600 };
const pp = b64(JSON.stringify(payload));
const sig = b64(createHmac("sha256", process.env.NOBIT_REGISTER_SECRET).update(pp).digest());
const token = `${pp}.${sig}`;
```

### (C) 単回化・二重適用の防止
- **一次防御は yuta-eng 側**：本契約決済で `upgrade_jti` を PaymentIntent metadata に記録し、
  同じ `jti` で成立済みの成功決済があれば値引きを付けない（`stripe.paymentIntents.search`）。
- **推奨（アプリ側）**：完了 Webhook で `plan="upgrade"` を受けたら、その生徒の
  アップグレード導線（トークン発行）を止める。これで再提示による重複を確実に防げる。

## 4. yuta-eng 側の挙動（実装済み・参考）

- お試し購入：`subjects=[*-trial]` を受けると 1本 ¥1,980（`TRIAL_PRICE`）、パック割・
  キャンペーンは非適用。`plan="trial"`, `trial_of` を付与。
- 本契約＋`?u=`：トークンの署名・`exp`・「`s` がカゴにある」を検証し、`jti` 未使用なら
  `unit_amount = 通常額 − 1,980`。検証/照会に失敗したら**値引きなし（通常額）**にフォールバック
  ＝ `amount` と実請求額は常に一致し、決済不整合は起きない。
- お試しと通常教材の**カゴ混在は 400** で拒否（価格体系が別のため）。

## 5. 残課題・注意

- **微小な競合**：同一 `jti` の本契約決済を、最初の成功が Stripe 検索に反映される前に
  ほぼ同時に2回開始すると、両方に値引きが付く可能性がある（金額差は¥1,980・要同時操作）。
  (C) の推奨（アプリ側でトークン発行を止める）で実質的に防げる。
- **表示の見込み**：`/apply?u=` では値引きを「適用予定（決済画面で確定）」として表示する。
  トークンが失効・無効の場合、Stripe 決済画面では通常額が表示される（請求は常に正しい）。
- お試し教材の**中身（3課題＋解答解説）の作成**が別途必要（コンテンツ側の作業）。
