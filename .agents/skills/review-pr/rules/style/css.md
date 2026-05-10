# CSS規約（CSS Modules + PostCSS）

`*.module.css` ファイルに対する規約。`stylelint` で機械的に検出できないルール（とくにクラス命名と `@layer` 配置）を中心に列挙する。

## クラス命名（CSS Modules + BEM風ハイブリッド）

本プロジェクトは **CSS Modules** を採用しているが、クラス名自体には **BEM風の構造** を持たせている。命名規則:

| 役割 | 形式 | 例 |
|---|---|---|
| ベースブロック | **PascalCase**（コンポーネント名と一致） | `.BaseButton`、`.ArticleCard` |
| 要素（Element） | `Block__camelCase` | `.BaseButton__text`、`.ArticleCard__container`、`.BaseButton__iconArrowRight` |
| 修飾子（Modifier） | `Block--camelCase` | `.BaseButton--rightArrow`、`.CircleButton--small`、`.CircleButton--outlined` |
| サブブロック | 別の PascalCase ブロック | `ArticleCardMainVisual`、`ArticleCardDate`、`ArticleCardTitle`、`ArticleCardTag` |
| サブブロックの要素 | `SubBlock__camelCase` | `.ArticleCardMainVisual__image`、`.ArticleCardDate__separator`、`.ArticleCardDate__text` |

### サブブロックを切る目安

ひとつのコンポーネント内で論理的に独立したまとまりがある場合は、`Block__sub` で深くネストせず、**新しい PascalCase ブロックに分ける**。例えば `ArticleCard` 内のメインビジュアル、日付、タイトル、タグはそれぞれ独立したサブブロック（`ArticleCardMainVisual`、`ArticleCardDate`、`ArticleCardTitle`、`ArticleCardTag`）として記述する。

判断基準:
- 「Element の Element」を書きたくなったら、サブブロックに切る合図
- そのまとまりが他のコンポーネントから視覚的に独立した塊として見えるか

### Modifier の使い方

修飾子は **ベースクラスと組み合わせて指定**する。CSS Modules では文字列キーアクセスが必要:

```tsx
// Good
className={clsx(
  styles.BaseButton,
  isRightArrow && styles['BaseButton--rightArrow'],
)}
```

CSS 側はベースクラスとの結合セレクタで定義する:

```css
/* Good */
.BaseButton.BaseButton--rightArrow {
  padding-block: 12px;
  padding-inline: 48px;
}
```

## カスケードレイヤー（@layer）

`src/styles/common.css` で以下の順序を定義済み:

```
reset, lib, base, component-ui-low, component-ui-middle, component-ui-high, component-common, component-page, util
```

### コンポーネントの `*.module.css` は **必ず `@layer` で囲む**

| 配置場所 | 使うべきレイヤー |
|---|---|
| `src/components/ui/` 配下のシンプルな UI コンポーネント | `@layer component-ui-low` |
| `src/components/ui/` 配下の中位レベルのコンポーネント（lists、cards 等で他の low コンポーネントを使う） | `@layer component-ui-middle` |
| `src/components/ui/` 配下の高位コンポーネント | `@layer component-ui-high` |
| `src/components/common/` 配下 | `@layer component-common` |
| `src/app/[locale]/**/page.module.css` 等のページ固有 | `@layer component-page` |

```css
/* Good — 必ず @layer で囲む */
@layer component-ui-low {
  .BaseButton { ... }
}
```

```css
/* Bad — レイヤー指定なしの裸ルール */
.BaseButton { ... }
```

## 論理プロパティ（Logical Properties）の徹底

本プロジェクトはマルチロケール（日本語/英語）対応のため、**物理プロパティではなく論理プロパティを使う**。

| 物理（NG） | 論理（OK） |
|---|---|
| `width` | `inline-size` |
| `height` | `block-size` |
| `padding-top` / `padding-bottom` | `padding-block` |
| `padding-left` / `padding-right` | `padding-inline` |
| `margin-top` / `margin-bottom` | `margin-block` |
| `margin-left` / `margin-right` | `margin-inline` |
| `top` / `bottom` | `inset-block-start` / `inset-block-end` |
| `left` / `right` | `inset-inline-start` / `inset-inline-end` |

例外: 既存コードで `transform`、`background-position` 等は物理座標が前提なのでそのまま。

## CSS変数 / Mixin

### 色・フォント・余白のリテラル直書きは避ける

```css
/* Good */
color: var(--color-palette-white);
background: linear-gradient(90deg, var(--color-gradation-primary));
font-weight: var(--font-weight-bold);
```

```css
/* Bad — リテラル色やマジックナンバーをコンポーネントから直接記述 */
color: #ffffff;
background: linear-gradient(90deg, #abc, #def);
font-weight: 700;
```

利用可能な CSS 変数は `src/assets/post-css/global/` 配下を参照:
- `color.css` — `--color-palette-*`、`--color-gradation-*`、`--color-palette-*-rgb`
- `font.css` — `--font-weight-*`
- `opacity.css` — `--opacity-*`
- `z-index.css` — `--z-index-*`
- `scale.css` — その他スケール

### Mixin 利用

PostCSS Mixin を活用する。レスポンシブなフォントサイズ・余白は専用 mixin を使う:

```css
@mixin getFontSize 16;                /* 固定フォントサイズ */
@mixin getClampRem font-size, 18, 22; /* 流体型フォントサイズ */
@mixin getClampPx padding-block, 16, 24;
@mixin getClampPx padding-inline, 16, 24;
```

固定ピクセル値の `font-size`・`padding`・`margin` 直書きが見えたら、mixin で置き換えられないか確認する。

## メディアクエリ

カスタムメディア（`src/assets/post-css/global/custom-media.css`）を使う:

```css
@media (--media-hover) {
  &:hover { ... }
}
```

`@media (hover: hover)` のような直書きは避け、定義済みのカスタムメディアを使う。

## ホバーは `@media (--media-hover)` でラップ

タッチデバイスでのホバー誤発火を防ぐため、`:hover` は必ず `@media (--media-hover)` 内に書く。

```css
/* Good */
@media (--media-hover) {
  &:hover { ... }
}
```

## アンチパターン（指摘対象）

- ❌ クラス名が kebab-case や camelCase（`.base-button`、`.baseButton`）
- ❌ Element を `_` 1つで区切る（`.BaseButton_text`）
- ❌ Modifier を `_` で書く（`.BaseButton_rightArrow`）や 別ブロックとして書く（`.BaseButtonRightArrow`）
- ❌ `@layer` で囲まれていない
- ❌ レイヤー名のtypo（`@layer component-low` 等、定義済みレイヤーにない名前）
- ❌ 物理プロパティ（`width`、`padding-left`）の直書き
- ❌ リテラルカラー（`#fff`、`rgb(...)`）の直書き
- ❌ `:hover` が `@media (--media-hover)` 外にある
- ❌ 固定フォントサイズの `font-size: 16px;` 直書き（`@mixin getFontSize` を使う）
