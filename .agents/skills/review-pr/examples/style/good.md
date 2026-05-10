# Good 例（推奨パターン）

レビュー時の正解例。実際の既存コードから抜粋している。

> **パス表記について**: 本ファイル内の `src/...` は `src/app/frontend/src/...`（フロントエンドプロジェクトの `src/` をルートとした相対パス）を指す。
> レビュー出力でファイルパスを書くときはリポジトリルート相対の `src/app/frontend/src/...` 形式に展開すること。

## 1. コンポーネントディレクトリ構造

```
src/components/ui/buttons/BaseButton/
├── index.tsx
└── index.module.css
```

- カテゴリは複数形 kebab-case（`buttons/`）
- コンポーネントは PascalCase（`BaseButton/`）
- エントリは `index.tsx` 固定
- スタイルは `index.module.css` 固定

## 2. コンポーネント実装（命名・Props・Type）

```tsx
// src/components/ui/buttons/BaseButton/index.tsx
'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode, useMemo } from 'react'

import styles from './index.module.css'

import { SvgIcon } from '~/components/ui/icons/SvgIcon'
import { EventTypes } from '~/types/event'
import { ButtonType, AnchorTarget, AnchorRel } from '~/types/html'

export type BaseButtonProps = {
  url?: string
  target?: AnchorTarget
  rel?: AnchorRel
  buttonType?: ButtonType
  isDisabled?: boolean
  className?: string
  text: ReactNode
  leftElm?: ReactNode
  rightElm?: ReactNode
  onClick?: EventTypes['onClickButton']
  isRightArrow?: boolean
}

export const BaseButton = ({
  url,
  isDisabled,
  text,
  leftElm,
  rightElm,
  onClick,
  isRightArrow,
}: BaseButtonProps) => { /* ... */ }
```

ポイント:
- `export type BaseButtonProps`（コンポーネント名 + `Props`）
- boolean Props に `is*` プレフィックス: `isDisabled`、`isRightArrow`
- ReactNode スロットに `*Elm` サフィックス: `leftElm`、`rightElm`
- 共通型を `~/types/event`、`~/types/html` から import
- インポート順序: 外部 → 同階層スタイル → プロジェクト内

## 3. CSS Modules（PascalCase + BEM風）

```css
/* src/components/ui/buttons/BaseButton/index.module.css */
@layer component-ui-low {
  .BaseButton.BaseButton--rightArrow {
    padding-block: 12px;
    padding-inline: 48px;
  }

  .BaseButton {
    align-items: center;
    background: linear-gradient(90deg, var(--color-gradation-primary));
    block-size: 100%;
    border-radius: 100px;
    color: var(--color-palette-white);
    cursor: pointer;
    display: flex;
    font-weight: var(--font-weight-bold);
    inline-size: 100%;
    padding-block: 12px;
    padding-inline: 16px;

    @mixin getClampRem font-size, 18, 22;

    @media (--media-hover) {
      &:hover {
        box-shadow: 0 0 24px rgb(var(--color-palette-heliotrope-rgb) / 64%);
      }
    }
  }

  .BaseButton__iconArrowRight {
    inset-block-start: 50%;
    inset-inline-end: 24px;
    margin-block-start: -12px;
    position: absolute;
  }
}
```

ポイント:
- `@layer component-ui-low` で必ず囲む
- ベースクラス `.BaseButton` は PascalCase
- Element は `.BaseButton__iconArrowRight`（`__camelCase`）
- Modifier は `.BaseButton--rightArrow`（`--camelCase`）
- 論理プロパティ（`block-size`、`inline-size`、`padding-block`、`padding-inline`、`inset-block-start`、`inset-inline-end`、`margin-block-start`）
- カラーは `var(--color-palette-*)` 経由
- `:hover` は `@media (--media-hover)` 内
- フォントサイズは `@mixin getClampRem` を活用

## 4. サブブロックの切り出し

`ArticleCard` は内部に複数の独立した塊（メインビジュアル、日付、タイトル、タグ）を持つため、サブブロックとして別の PascalCase ブロックに分けている:

```css
@layer component-ui-low {
  .ArticleCard { ... }
  .ArticleCard__container { ... }

  /* 独立した塊はサブブロックに */
  .ArticleCardMainVisual { ... }
  .ArticleCardMainVisual__image { ... }

  .ArticleCardDate { ... }
  .ArticleCardDate__separator { ... }
  .ArticleCardDate__text { ... }

  .ArticleCardTitle { ... }
  .ArticleCardTitle__text { ... }

  .ArticleCardTag { ... }
}
```

## 5. Modifier の TS 側での扱い

```tsx
className={clsx(
  styles.BaseButton,
  className,
  isRightArrow && styles['BaseButton--rightArrow'],
)}
```

- ベースクラスは `styles.BaseButton`（プロパティアクセス）
- Modifier は `styles['BaseButton--rightArrow']`（ハイフン含むので文字列キー）
- `clsx` で条件付き結合

## 6. hooks / utils / config の命名

```
src/hooks/use-animelm.ts            # use-kebab-case.ts
src/utils/actSmoothScroll.ts        # camelCase.ts
src/libs/validation/zodCustomErrorMessage.ts
src/config/routes.ts
src/config/env.ts
```

## 7. 共通コンポーネント vs UI コンポーネント

```
src/components/common/LayoutHeader/  # サイト全体で1つ→ common
src/components/common/LayoutFooter/
src/components/common/LayoutPortal/

src/components/ui/buttons/BaseButton/   # 再利用→ ui/buttons
src/components/ui/cards/ArticleCard/    # 再利用→ ui/cards
```
