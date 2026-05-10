# 命名規約（TypeScript / React）

`src/app/frontend/` 配下のフロントエンドコードに適用する命名ルール。oxlint・oxfmt で機械的に検出できないものを中心に列挙する。

## コンポーネント

- **コンポーネント名は PascalCase**（例: `BaseButton`、`ArticleCard`、`LayoutDefault`）
- **エクスポート名とディレクトリ名を一致させる**（`buttons/BaseButton/index.tsx` → `export const BaseButton`）
- **`common/` 配下のレイアウト系には `Layout` プレフィックスを付ける**（`LayoutHeader`、`LayoutFooter`、`LayoutPortal`）
- **`ui/` 配下では機能ベースの命名**（`BaseButton`、`CircleButton`、`ArticleCard`、`SvgIcon`）
- **同じファイル内のサブコンポーネントは目的が分かる名前にする**（`ArticleCard` 内の `ArticleCardContainer` 等、親コンポーネント名をプレフィックスに付けて衝突を避ける）

## Props 型

既存コードには2つの命名パターンが共存しており、**Props 型を export するか否かで使い分ける**:

- **export して他ファイルから参照する場合**: **`<ComponentName>Props`** で命名し `export type` する
  - 例: `export type BaseButtonProps`、`export type ArticleCardProps`、`export type LeadProps`
  - 主に `components/ui/` 配下の汎用部品や、ページ内で複数モジュール間で共有する型
- **同一ファイル内でのみ使用するローカル Props 型**: **`type Props = { ... }`** で OK（export しない）
  - 例: `app/[locale]/**/_components/MainColumn/index.tsx` 等のページ固有コンポーネント
  - ファイル内で1度しか使わない Props 型をわざわざ `<ComponentName>Props` 命名する必要はない
- **同ファイル内にサブ型がある場合は `<SubComponentName>Props` で揃える**（例: `ArticleCardContainerProps`）。サブ型は非 export でよい
- **`type` を使う**（`interface` ではなく `type`）

## Props の命名

- **camelCase で統一**
- **boolean Props は `is*` プレフィックスを付ける**
  - 例: `isDisabled`、`isRightArrow`、`isExternal`、`isButton`、`isJustifyEnd`、`isNotActiveAnimelm`
  - HTML属性として直接渡すもの（`disabled` 属性など）であっても、Props 名としては `isDisabled` を使い、内部で `disabled={isDisabled}` と展開する
- **イベントハンドラ Props は `on*`**（例: `onClick`、`onChange`、`onChangePage`）
- **ReactNode を受け取るスロット系は `*Elm` サフィックス**（例: `leftElm`、`rightElm`）
- **HTML要素タグ名を受ける Props は `*Tag`**（例: `titleTag?: keyof JSX.IntrinsicElements`）

## ファイル / ディレクトリ命名

| 種別 | 形式 | 例 |
|---|---|---|
| コンポーネントディレクトリ | PascalCase | `BaseButton/`、`ArticleCard/` |
| コンポーネントエントリファイル | `index.tsx` 固定 | `BaseButton/index.tsx` |
| コンポーネントスタイル | `index.module.css` 固定 | `BaseButton/index.module.css` |
| UIカテゴリディレクトリ | 複数形 kebab-case | `buttons/`、`cards/`、`lists/`、`typographies/` |
| hooks | `use-kebab-case.ts` | `use-animelm.ts` |
| utils / libs / config 関数ファイル | camelCase.ts | `actSmoothScroll.ts`、`zodCustomErrorMessage.ts`、`routes.ts` |
| 型定義（.d.ts） | 短い英単語 | `event.d.ts`、`html.d.ts`、`gtag.d.ts` |
| store | camelCase ディレクトリ | `breakpoints/`、`headerInfos/` |

## 変数 / 関数

- **変数・関数は camelCase**
- **定数（コンパイル時固定値、env 由来）は SCREAMING_SNAKE_CASE**
  - 例: `STATIC_IMAGE_DIR`、`CACHE_BUSTER`（`~/config/env` 参照）
- **boolean ローカル変数も `is*` を推奨**（`isExternal`、`isDisabled`）
- **イベントハンドラの命名**:
  - **コンポーネント内のローカル関数は `handle*`**（例: `handleChangePage`、`handleClickYear`）
  - **コールバック Props は `on*`**（例: `onClick`、`onChange`、`onChangePage`）
  - **副作用を伴う汎用ユーティリティ関数は `act*`**（例: `actSmoothScroll`）

  使用例: `<BasePagination onChangePage={handleChangePage} />` — Props 名は `on*`、渡すローカル関数は `handle*`

## 型 / 列挙

- **型エイリアスは PascalCase**（例: `EventTypes`、`ButtonType`、`AnchorTarget`、`AnchorRel`）
- **共通型は `~/types/` 配下に集約**してインポートして使う（`~/types/event`、`~/types/html`）
- **Props 型をローカルファイル内で定義する場合と、共通型を再利用する場合を意識的に分ける**（汎用属性は共通型から）

## インポート順序

oxfmt/oxlint で自動整形される領域だが、レビュー時に違反が混入していないかは見る価値がある。既存コードの慣例:

1. 外部パッケージ（`react`、`next/*`、`clsx` 等）
2. 空行
3. 同階層スタイル（`./index.module.css`）
4. 空行
5. プロジェクト内モジュール（`~/components/...`、`~/types/...`、`~/config/...`）

`.oxfmtrc.json` の `internalPrefix` も `["~/"]` のみ。`@/` は廃止済み。

## アンチパターン（指摘対象）

- ❌ コンポーネント名が camelCase / kebab-case（`baseButton` / `base-button`）
- ❌ export する Props 型名がコンポーネント名と乖離している（`export type ButtonProps` for `BaseButton` 等。ローカル `type Props` は対象外）
- ❌ boolean Props に `is*` がない（`disabled`、`rightArrow` のまま）
- ❌ コンポーネントディレクトリが kebab-case（`base-button/`）
- ❌ hook ファイルが PascalCase / camelCase（`useAnimelm.ts` ではなく `use-animelm.ts` が本プロジェクトの規約）
- ❌ utils ファイルが kebab-case（`act-smooth-scroll.ts` ではなく `actSmoothScroll.ts`）
- ❌ HTML属性そのままの名前を Props に使う（`disabled` → `isDisabled` に揃える）
- ❌ コールバック Props 名が `handle*`（→ `on*` に揃える。ローカル関数側は `handle*` のままで OK）
