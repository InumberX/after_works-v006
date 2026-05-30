# feat: AWS Amplify から Cloudflare Workers へ移行 (OpenNext)

## 概要

`src/app/frontend` の Next.js 16 アプリを **AWS Amplify → Cloudflare Workers** に移行します。フレームワークは Next.js のまま、[OpenNext (`@opennextjs/cloudflare`)](https://opennext.js.org/cloudflare) で Workers 上に動かします。staging のみ Basic 認証を有効化します（本番は無効）。

## 変更内容

### 新規ファイル

- `src/app/frontend/wrangler.jsonc` — Workers 設定。`main` はカスタム Worker、`assets` バインディング、`development` / `production` 環境を定義。
- `src/app/frontend/workers/app.ts` — OpenNext ハンドラを `@inumberx/cloudflare-workers-basic-auth` の `createWorkerFetch` でラップしたカスタム Worker。
- `src/app/frontend/open-next.config.ts` — OpenNext 設定。
- `src/app/frontend/.env.example` / `.dev.vars.example` — 環境変数・ローカルシークレットのサンプル。
- `.github/workflows/deploy.yml` — Cloudflare へのデプロイ（`develop`→staging / `main`→production）。

### 変更ファイル

- `src/app/frontend/src/proxy.ts` → `src/app/frontend/src/middleware.ts` にリネーム（関数 `proxy` → `middleware`）。**理由**: Next.js 16 の Proxy は常に Node.js ランタイムで動作し、OpenNext の Cloudflare アダプタは Node.js ミドルウェア未対応（[workers-sdk#13755](https://github.com/cloudflare/workers-sdk/issues/13755)）。非推奨だが利用可能な `middleware.ts`（Edge ランタイム）に戻すことで OpenNext ビルドが通り、i18n も動作します。ビルド時に deprecation 警告が出ますがビルドは成功します。
- `src/app/frontend/package.json` / `package-lock.json` — 依存（`@opennextjs/cloudflare` / `@inumberx/cloudflare-workers-basic-auth` / `wrangler`）とスクリプト追加。
- `src/app/frontend/next.config.js` — `initOpenNextCloudflareForDev()` の dev フック追加。
- `src/app/frontend/.gitignore` — `.open-next/` / `.wrangler/` / `.dev.vars` を除外。
- `src/app/frontend/CLAUDE.md` — middleware の記述を更新。
- `.node-version` — `22.20.0`。

### 据え置き

- `amplify.yml` — DNS 切替確認までロールバック用に残置。

## 認証の挙動

- `BASIC_AUTH_USER` / `BASIC_AUTH_PASS` を **両方** 設定 → ゲート有効（staging）。
- 両方未設定 → ゲート無効（production）。
- 片方のみ → fail-closed（全リクエスト `503`）。
- `assets.run_worker_first: true` により認証は静的アセットを含むサイト全体に適用。

## 動作確認（このブランチで実施済み）

- ✅ `npm install`（lockfile 更新）
- ✅ `npm run typecheck` / `lint` / `format` / `stylelint`
- ✅ `npm run test -- --run`
- ✅ `opennextjs-cloudflare build`（Next.js 16.2.6 ビルド成功、`.open-next/worker.js` 生成）
- ✅ `wrangler deploy --dry-run`（development / production 両環境でバンドル成功、gzip 約 1.35 MiB、`env.ASSETS` バインド）
- ✅ `wrangler dev` でのライブ Basic 認証:
  - 認証なし → `401`（`WWW-Authenticate: Basic realm="after-works (staging)"`）
  - 正しい認証 → `/robots.txt` `200`
  - 誤った認証 → `401`

> 注: CMS（Kuroco）連携の SSR ページ実機表示は `NEXT_PUBLIC_API_URL` 等の実値が必要なため未実施です。デプロイ環境変数設定後に確認してください（トップ(SSR) / `ja`・`en` 切替 / `blogs`・`works`・`hobby` の一覧+詳細 / `/rss.xml` / `/sitemap.xml` / 画像表示 / 404・error）。

## マージ後の手動設定

詳細は `CLOUDFLARE_MIGRATION.md` を参照。

1. GitHub Environments（`development` / `production`）と Environment variables（`NEXT_PUBLIC_*`）を作成。
2. GitHub Secrets（`CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID`）を設定。
3. staging のみ `wrangler secret put BASIC_AUTH_USER --env=development`（と `..._PASS`）。
4. `afterworks.jp` を `after-works-v006` ワーカーのカスタムドメインに割当。確認後 Amplify を撤去。
