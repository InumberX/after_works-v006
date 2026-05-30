# Cloudflare Workers 移行ガイド

`src/app/frontend` の Next.js 16 アプリを **AWS Amplify → Cloudflare Workers** に移行しました。フレームワークは Next.js のまま、[OpenNext (`@opennextjs/cloudflare`)](https://opennext.js.org/cloudflare) で Workers 上に動かします。staging のみ Basic 認証を有効化します（本番は無効）。

## 仕組み

- **OpenNext** が Next.js の出力を Cloudflare Workers 向けにビルドし、`.open-next/worker.js` を生成します。
- **カスタム Worker**（`src/app/frontend/workers/app.ts`）が OpenNext のハンドラを [`@inumberx/cloudflare-workers-basic-auth`](https://www.npmjs.com/package/@inumberx/cloudflare-workers-basic-auth) の `createWorkerFetch` でラップし、Basic 認証ゲートを前段に挟みます。
- 認証情報（`BASIC_AUTH_USER` / `BASIC_AUTH_PASS`）は **staging のみ** Wrangler シークレットとして設定します。両方未設定ならゲートは無効（本番）、片方だけ設定すると fail-closed で全リクエストが `503` になります。
- `wrangler.jsonc` で `assets.run_worker_first: true` を指定しているため、認証は静的アセットも含めてサイト全体に適用されます。認証通過後の `GET` / `HEAD` はカスタム Worker が `ASSETS` バインディングから配信し、ヒットしなければ Next.js ハンドラにフォールバックします。

## 追加・変更ファイル

新規:

- `src/app/frontend/wrangler.jsonc` — Workers 設定（`main` はカスタム Worker、`assets` バインディング、`development` / `production` 環境）
- `src/app/frontend/workers/app.ts` — Basic 認証でラップするカスタム Worker エントリ
- `src/app/frontend/open-next.config.ts` — OpenNext 設定
- `src/app/frontend/.env.example` — ビルド時 `NEXT_PUBLIC_*` のサンプル
- `src/app/frontend/.dev.vars.example` — ローカル実行時シークレットのサンプル
- `.github/workflows/deploy.yml` — Cloudflare へのデプロイワークフロー

変更:

- `src/app/frontend/src/proxy.ts` → `src/app/frontend/src/middleware.ts` にリネーム（後述「Next.js 16 Proxy と OpenNext の互換問題」を参照）
- `src/app/frontend/package.json` — 依存（`@opennextjs/cloudflare` / `@inumberx/cloudflare-workers-basic-auth` / `wrangler`）とスクリプト追加
- `src/app/frontend/next.config.js` — `initOpenNextCloudflareForDev()` の dev フック追加
- `src/app/frontend/.gitignore` — `.open-next/` / `.wrangler/` / `.dev.vars` などを除外
- `.node-version` — `22.20.0`

削除:

- `amplify.yml` — AWS Amplify のビルド設定。Cloudflare Workers への移行に伴い削除

## Next.js 16 Proxy と OpenNext の互換問題（重要）

引き継ぎ資料では `src/proxy.ts` は移行ブロッカーなしと記載されていましたが、実機検証で **ビルドブロッカー** が判明しました。

- Next.js 16 で `middleware.ts` は `proxy.ts` にリネームされ、**Proxy は常に Node.js ランタイムで動作**します（Edge ランタイムは選択不可。`export const config = { runtime: 'edge' }` はビルドエラー）。
- 一方、OpenNext の Cloudflare アダプタは **現時点で Node.js ミドルウェアをサポートしていません**（`ERROR Node.js middleware is not currently supported. Consider switching to Edge Middleware.`）。参考: https://github.com/cloudflare/workers-sdk/issues/13755

### 対応

`src/proxy.ts` を **非推奨だが利用可能な** `src/middleware.ts` 規約に戻しました（関数名 `proxy` → `middleware`）。`middleware.ts` は Edge ランタイムで動作し、OpenNext がサポートするため、next-international によるロケール振り分けが Cloudflare Workers 上でそのまま動作します。

- ビルド時に `⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.` という **警告** は出ますが、ビルドは成功します。
- 将来 OpenNext が Node.js ミドルウェア（Next 16 Proxy）に対応したら `proxy.ts` へ戻せます。

## ローカル開発

```sh
cd src/app/frontend
npm install

# 通常の Next.js dev サーバ
npm run dev

# Workers ランタイムでのプレビュー（OpenNext ビルド + wrangler dev）
npm run preview
```

`preview` で Basic 認証を試す場合は `.dev.vars.example` を `.dev.vars` にコピーして `BASIC_AUTH_USER` / `BASIC_AUTH_PASS` を設定します。

確認項目: トップ(SSR) / `ja`・`en` 切替 / `blogs`・`works`・`hobby` の一覧+詳細 / `/rss.xml` / `/sitemap.xml` / `/robots.txt` / 画像表示 / 404・error。

## npm スクリプト

| スクリプト | 内容 |
| --- | --- |
| `npm run cf-build` | OpenNext ビルド（`.open-next/` 生成） |
| `npm run preview` | ビルド後に `wrangler dev` でローカルプレビュー |
| `npm run deploy` | ビルド後にデフォルト環境へデプロイ |
| `npm run deploy:staging` | ビルド後に `--env development`（staging）へデプロイ |
| `npm run deploy:production` | ビルド後に `--env production` へデプロイ |
| `npm run cf-typegen` | `wrangler types` で型生成 |

## CI / CD（GitHub Actions）

`.github/workflows/deploy.yml`:

- `develop` への push → `development` 環境（staging worker `after-works-v006-staging`）
- `main` への push → `production` 環境（worker `after-works-v006`）
- 手動実行（`workflow_dispatch`）も可能

ビルド時に `NEXT_PUBLIC_*` を GitHub Environment variables から注入し、`CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` でデプロイします。

## 人間（NiNE）側の手動設定

コードだけでは完結しない設定です。

1. **GitHub Environments** を作成: `development` / `production`
2. **GitHub Environment variables**（各環境）:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_SITE_ROOT`
   - `NEXT_PUBLIC_SITE_NAME`
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`
   - `NEXT_PUBLIC_STATIC_IMAGE_DIR`
3. **GitHub Secrets**: `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID`
4. **staging のみ認証 ON**（Wrangler シークレット）:

   ```sh
   cd src/app/frontend
   wrangler secret put BASIC_AUTH_USER --env=development
   wrangler secret put BASIC_AUTH_PASS --env=development
   ```

5. **本番ドメイン切替**: `afterworks.jp` を `after-works-v006` ワーカーのカスタムドメインに割当（ゾーンが Cloudflare 上にあること）。確認後に AWS 側の Amplify アプリを撤去（`amplify.yml` は本ブランチで削除済み）。

## 監査済みの互換性（移行ブロッカーなし）

- App Router + `[locale]` i18n（next-international）。ロケール振り分けは `src/middleware.ts`（Edge ランタイム）で実施（上記の互換対応を参照）。URL ベースの振り分けのみで Node 専用 API 不使用。
- `export const runtime = 'edge'` は不使用。fs / path 等の Node 組み込みモジュールの直接利用なし。
- データ取得は標準 Web `fetch`（`cache: 'no-store'`）で Kuroco CMS を参照。RSS / `sitemap.ts` / `robots.ts` も fetch ベース。
- トップは `force-dynamic`（SSR）。`images: { unoptimized: true }` 済み。
- 実行時シークレットは Basic 認証のみ（staging）。
