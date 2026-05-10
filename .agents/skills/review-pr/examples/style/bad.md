# Bad 例（アンチパターン）

レビューで指摘すべき典型例と、対応する Good への修正方針。

## 1. ❌ コンポーネントディレクトリ命名

```
# Bad
src/components/ui/button/base-button/index.tsx
src/components/ui/Buttons/BaseButton/index.tsx
src/components/ui/buttons/baseButton/index.tsx
```

**問題**: カテゴリが単数形 / PascalCase、またはコンポーネントが kebab-case / camelCase。

```
# Good
src/components/ui/buttons/BaseButton/index.tsx
```

参照: `rules/style/structure.md` ui/ 配下のカテゴリ分割

## 2. ❌ Props 型の命名

```tsx
// Bad
export type ButtonProps = { /* ... */ }
export interface BaseButtonProps { /* ... */ }
```

**問題**: 1つ目はコンポーネント名と乖離。2つ目は `interface`（本プロジェクトは `type` で統一）。

```tsx
// Good
export type BaseButtonProps = { /* ... */ }
```

参照: `rules/style/naming.md` Props 型

## 3. ❌ boolean Props に `is*` がない

```tsx
// Bad
type BaseButtonProps = {
  disabled?: boolean
  rightArrow?: boolean
  external?: boolean
}
```

```tsx
// Good
type BaseButtonProps = {
  isDisabled?: boolean
  isRightArrow?: boolean
  isExternal?: boolean
}

// 内部でHTML属性に渡すときに展開
<button disabled={isDisabled} />
```

参照: `rules/style/naming.md` Props の命名

## 4. ❌ CSS クラス命名

```css
/* Bad — kebab-case / camelCase / 単一アンダースコア */
.base-button { }
.baseButton { }
.BaseButton_text { }
.BaseButton_rightArrow { }

/* Bad — Modifier が独立ブロックに */
.BaseButtonRightArrow { }
```

```css
/* Good */
.BaseButton { }
.BaseButton__text { }
.BaseButton--rightArrow { }
.BaseButton.BaseButton--rightArrow { }
```

参照: `rules/style/css.md` クラス命名

## 5. ❌ `@layer` の指定漏れ・誤り

```css
/* Bad — レイヤー指定なし */
.BaseButton {
  display: flex;
}

/* Bad — 定義されていないレイヤー名 */
@layer component-low {
  .BaseButton { ... }
}
```

```css
/* Good */
@layer component-ui-low {
  .BaseButton { ... }
}
```

定義済みレイヤー: `component-ui-low`、`component-ui-middle`、`component-ui-high`、`component-common`、`component-page`、`util`

参照: `rules/style/css.md` カスケードレイヤー

## 6. ❌ 物理プロパティの直書き

```css
/* Bad */
.BaseButton {
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  margin-top: 8px;
  margin-left: 16px;
  top: 0;
  left: 0;
}
```

```css
/* Good */
.BaseButton {
  inline-size: 100%;
  block-size: 48px;
  padding-block: 12px;
  padding-inline: 16px;
  margin-block-start: 8px;
  margin-inline-start: 16px;
  inset-block-start: 0;
  inset-inline-start: 0;
}
```

参照: `rules/style/css.md` 論理プロパティ

## 7. ❌ リテラル値の直書き

```css
/* Bad */
.BaseButton {
  color: #ffffff;
  background: linear-gradient(90deg, #abc, #def);
  font-weight: 700;
  font-size: 16px;
}
```

```css
/* Good */
.BaseButton {
  color: var(--color-palette-white);
  background: linear-gradient(90deg, var(--color-gradation-primary));
  font-weight: var(--font-weight-bold);

  @mixin getFontSize 16;
}
```

参照: `rules/style/css.md` CSS変数 / Mixin

## 8. ❌ ホバーが `@media (--media-hover)` 外

```css
/* Bad — タッチデバイスで誤発火 */
.BaseButton:hover {
  box-shadow: 0 0 24px var(--color-palette-heliotrope);
}
```

```css
/* Good */
@media (--media-hover) {
  .BaseButton:hover {
    box-shadow: 0 0 24px var(--color-palette-heliotrope);
  }
}
```

参照: `rules/style/css.md` ホバーは `@media (--media-hover)` でラップ

## 9. ❌ ファイル命名

```
# Bad — hook が camelCase / PascalCase
src/hooks/useAnimelm.ts
src/hooks/UseAnimelm.ts

# Bad — utils が kebab-case
src/utils/act-smooth-scroll.ts
```

```
# Good
src/hooks/use-animelm.ts
src/utils/actSmoothScroll.ts
```

参照: `rules/style/naming.md` ファイル / ディレクトリ命名

## 10. ❌ 配置場所の取り違え

```
# Bad — 1度しか使わないレイアウト系を ui/ へ
src/components/ui/layouts/SiteHeader/

# Bad — 再利用するボタンを common/ へ
src/components/common/PrimaryButton/
```

```
# Good
src/components/common/LayoutHeader/      # 1度しか使わない→common
src/components/ui/buttons/BaseButton/    # 再利用→ui/<category>/
```

参照: `rules/style/structure.md` components/common と components/ui の使い分け

## 11. ❌ コンポーネントの export default

```tsx
// Bad
const BaseButton = (props: BaseButtonProps) => { /* ... */ }
export default BaseButton
```

```tsx
// Good
export const BaseButton = ({ /* ... */ }: BaseButtonProps) => { /* ... */ }
```

ただし Next.js App Router 規約ファイル（`page.tsx` / `layout.tsx` / `error.tsx` / `global-error.tsx` / `not-found.tsx` / `loading.tsx` / `template.tsx` / `sitemap.ts` / `robots.ts`）は `export default` が必須。指摘対象外。

参照: `rules/style/structure.md` バレルエクスポート

## 12. ❌ 廃止済みエイリアス `@/` の使用

```tsx
// Bad — `@/` は PR #209 で廃止済み。tsconfig 等から外れているため解決されない
import { BaseButton } from '@/components/ui/buttons/BaseButton'
import { ArticleCard } from '@/components/ui/cards/ArticleCard'
```

```tsx
// Good — `~/` を使う
import { BaseButton } from '~/components/ui/buttons/BaseButton'
import { ArticleCard } from '~/components/ui/cards/ArticleCard'
```

参照: `rules/style/structure.md` パスエイリアス
