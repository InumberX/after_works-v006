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

- `src/app/frontend/package.json` — 依存（`@opennextjs/cloudflare` / `@inumberx/cloudflare-workers-basic-auth` / `wrangler`）とスクリプト追加。
- `src/app/frontend/next.config.js` — `initOpenNextCloudflareForDev()` の dev フック追加。
- `src/app/frontend/.gitignore` — `.open-next/` / `.wrangler/` / `.dev.vars` を除外。
- `.node-version` — `22.20.0`。

### 据え置き

- `amplify.yml` — DNS 切替確認までロールバック用に残置。

## 認証の挙動

- `BASIC_AUTH_USER` / `BASIC_AUTH_PASS` を **両方** 設定 → ゲート有効（staging）。
- 両方未設定 → ゲート無効（production）。
- 片方のみ → fail-closed（全リクエスト `503`）。
- `assets.run_worker_first: true` により認証は静的アセットを含むサイト全体に適用。

## 動作確認

```sh
cd src/app/frontend
npm install
npm run typecheck
npm run lint
npm run test -- --run
npm run preview   # OpenNext ビルド + wrangler dev
```

確認項目: トップ(SSR) / `ja`・`en` 切替 / `blogs`・`works`・`hobby` の一覧+詳細 / `/rss.xml` / `/sitemap.xml` / `/robots.txt` / 画像表示 / 404・error。

## マージ後の手動設定

詳細は `CLOUDFLARE_MIGRATION.md` を参照。

1. GitHub Environments（`development` / `production`）と Environment variables（`NEXT_PUBLIC_*`）を作成。
2. GitHub Secrets（`CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID`）を設定。
3. staging のみ `wrangler secret put BASIC_AUTH_USER --env=development`（と `..._PASS`）。
4. `afterworks.jp` を `after-works-v006` ワーカーのカスタムドメインに割当。確認後 Amplify を撤去。
