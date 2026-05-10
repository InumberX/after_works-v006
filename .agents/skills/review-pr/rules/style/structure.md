# ディレクトリ構造規約

`src/app/frontend/src/` 配下のファイル配置に関するルール。新規ファイルが正しい場所に置かれているかをレビューする。

## トップレベル構成

```
src/
├── app/[locale]/         # Next.js App Router（dynamic locale）
│   ├── api/              # ルートハンドラ
│   ├── robots.ts
│   └── sitemap.ts
├── apis/fetch/           # ヘッドレスCMSへのフェッチ関数
├── assets/               # 静的アセット（画像・PostCSS）
│   ├── img/
│   └── post-css/         # グローバルCSS（@import で common.css に集約）
├── components/
│   ├── common/           # レイアウト系の共有コンポーネント
│   └── ui/               # 再利用可能な UI コンポーネント（カテゴリ分割）
├── config/               # 設定値（env, routes, sns 等）
├── hooks/                # カスタムフック
├── layouts/              # ページレイアウトテンプレート
├── libs/                 # 外部ライブラリのラッパー（ga, validation 等）
├── locales/              # i18n 辞書とクライアント/サーバ用ヘルパ
├── providers/            # React Context / Provider
├── store/                # Jotai のグローバル state（カテゴリ別ディレクトリ）
├── styles/               # common.css（@import エントリ）
├── tests/                # Vitest テスト（components 構造をミラー）
├── types/                # TypeScript 型定義
└── utils/                # 純粋なユーティリティ関数
```

## components/common と components/ui の使い分け

| 置き場 | 用途 | 例 |
|---|---|---|
| `components/common/` | サイト全体のレイアウト・レイヤーに関わる **アプリ固有・1度しか使わない** コンポーネント | `LayoutHeader`、`LayoutFooter`、`LayoutPortal`、`LayoutPageBackground`、`Contact`、`AppHead`、`GoogleAnalytics` |
| `components/ui/` | **複数箇所で再利用される汎用パーツ**。カテゴリ別ディレクトリで分類 | `buttons/BaseButton`、`cards/ArticleCard`、`tags/BaseTag` |

判断基準:
- 「サイト全体で1つだけ使う・ページ毎に再利用しない」なら `common/`
- 「カードや一覧などで何度も再利用する」なら `ui/<category>/`

## ui/ 配下のカテゴリ分割

UI コンポーネントは以下のカテゴリのいずれかに配置する。新規カテゴリを追加する場合は、本ファイルに追記する。

```
ui/
├── ads/           # 広告
├── articles/      # 記事表示系
├── breadcrumbs/   # パンくず
├── buttons/       # ボタン
├── cards/         # カード
├── icons/         # アイコン（SVGR）
├── layouts/       # レイアウトユーティリティ
├── lists/         # リスト・一覧
├── pagination/    # ページネーション
├── sides/         # サイドバー
├── sliders/       # カルーセル/スライダー
├── tags/          # タグ
└── typographies/  # テキスト・タイポグラフィ
```

カテゴリ名は **複数形 kebab-case**。

## コンポーネントディレクトリの構造

各コンポーネントはディレクトリ単位で完結させる。ファイル数が増えたら同ディレクトリに追加する:

```
ui/buttons/BaseButton/
├── index.tsx              # メインのコンポーネント実装（必須）
└── index.module.css       # スタイル（必須・スタイルなしの場合は空でも作成）
```

派生:
- 子コンポーネントを切り出す場合は同ディレクトリ内に追加（`SubComponent.tsx`）か、独立コンポーネントとして別ディレクトリに切る
- 型定義をエクスポートする場合は `index.tsx` 内で `export type <Component>Props` を行う

## 関連レイヤーの配置

| ロジック種別 | 置き場 | 命名 |
|---|---|---|
| データ取得関数 | `apis/fetch/<resource>.ts` | camelCase |
| データ型定義 | `types/apis/fetch/<resource>.ts` | camelCase |
| カスタムフック | `hooks/use-<name>.ts` | kebab-case + `use-` プレフィックス |
| 純粋関数ユーティリティ | `utils/<verbName>.ts` | camelCase（動詞起点） |
| 外部ライブラリラッパー | `libs/<lib>/<file>.ts` | ライブラリ名のディレクトリで分割 |
| 設定値 | `config/<topic>.ts` | camelCase |
| Jotai store | `store/<topic>/...` | camelCase ディレクトリ |
| Provider | `providers/<Name>Provider.tsx` | PascalCase + Provider サフィックス |

## バレルエクスポート

各コンポーネントの `index.tsx` から名前付きエクスポートを行い、外部からは以下のように参照する:

```ts
import { BaseButton } from '~/components/ui/buttons/BaseButton'
```

`index.tsx` に `export default` は使わない（既存コードは全て名前付きエクスポート）。

### 例外: Next.js App Router 規約ファイル

以下のファイルは Next.js のファイル規約により `export default` が **必須**。指摘対象から除外する:

- `src/app/**/page.tsx`
- `src/app/**/layout.tsx`
- `src/app/**/error.tsx` / `global-error.tsx`
- `src/app/**/not-found.tsx`
- `src/app/**/loading.tsx`
- `src/app/**/template.tsx`
- `src/app/sitemap.ts` / `src/app/robots.ts`（Metadata Files）

`src/app/**/route.ts` は名前付きエクスポート（`GET` / `POST` 等）が規約のため、通常の「`export default` 禁止」ルールがそのまま適用される。

## パスエイリアス

`~/*` のみが `src/*` を指す。`@/*` は廃止済み（PR #209 で `tsconfig.json` / `vitest.config.ts` / `.storybook/main.ts` / `.oxfmtrc.json` から削除）。

- ✅ `~/...` を使う
- ❌ `@/...` は解決されない

## テストファイルの配置

`src/tests/` 配下に `src/components/` の構造をミラーして配置する:

```
src/components/ui/buttons/BaseButton/index.tsx
↓ 対応
src/tests/components/ui/buttons/BaseButton/<テストファイル>.test.tsx
```

## アンチパターン（指摘対象）

- ❌ 1度しか使わないアプリ固有コンポーネントを `ui/` に置く（→ `common/` へ）
- ❌ 再利用される汎用コンポーネントを `common/` に置く（→ `ui/<category>/` へ）
- ❌ `ui/` 直下にコンポーネントディレクトリを置く（→ 必ずカテゴリ配下に）
- ❌ カテゴリディレクトリが単数形（`button/`、`card/`） や PascalCase（`Buttons/`）
- ❌ コンポーネントエントリが `index.tsx` 以外（`BaseButton.tsx`、`Component.tsx`）
- ❌ コンポーネントスタイルが `index.module.css` 以外（`BaseButton.module.css`、`styles.module.css`）
- ❌ hooks ファイルが `useFoo.ts`（→ `use-foo.ts`）
- ❌ utils ファイルが `kebab-case.ts`（→ `camelCase.ts`）
- ❌ 廃止済みの `@/` エイリアスを使用（→ `~/` を使う）
- ❌ `export default` でのコンポーネントエクスポート（Next.js 規約ファイル `page.tsx` / `layout.tsx` / `error.tsx` / `global-error.tsx` / `not-found.tsx` / `loading.tsx` / `template.tsx` / `sitemap.ts` / `robots.ts` は除く）
- ❌ テストファイルが `src/components/` 内に同居（→ `src/tests/` 配下にミラー配置）
