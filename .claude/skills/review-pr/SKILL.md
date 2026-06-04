---
name: review-pr
description: Review a pull request against this project's style, naming, and structural conventions. Use when the user asks for a PR review, code review, or review of pending changes — including narrowed-scope requests like "review the styling" or "check the naming".
---

# review-pr

このプロジェクト固有のレビュー観点を集約したスキル。リポジトリ直下の Next.js + React + TypeScript + CSS Modules コードに対する規約準拠をレビューする。

## いつ発動するか

次のいずれかに該当する場合に使う:

- 「PRレビューして」「コードレビューして」「変更をレビューして」と依頼された
- 「スタイルだけ見て」「命名だけチェックして」など特定観点のレビューを依頼された
- PR の差分（`git diff`、GitHub の PR、ステージング済みの変更）に対する品質評価を求められた

機械的に検出できる項目（フォーマット、未使用変数など）は `npm run lint`・`npm run stylelint`・`npm run format`・`npm run typecheck` に任せ、本スキルは**人間の判断が必要なルール**にフォーカスする。

## レビュー手順

### 1. 差分の取得

優先順位:

1. ユーザーが PR 番号や URL を指定 → `gh pr view <番号>` / `gh pr diff <番号>` で取得（GitHub MCP が利用可能なら `mcp__github__pull_request_read` でもよい）
2. ブランチが develop から派生している → `git diff develop...HEAD --stat` と `git diff develop...HEAD` で差分把握
3. 作業ツリーに未コミット変更がある → `git status` と `git diff`

### 2. 観点の選択

依頼内容から参照するルールを決定する。

| 依頼パターン | 参照ファイル |
|---|---|
| 「PRレビュー」「全体レビュー」「コードレビュー」 | `rules/**/*.md` 全て |
| 「スタイル」「命名」「CSS」「構造」関連 | `rules/style/*.md` |
| 「命名だけ」 | `rules/style/naming.md` |
| 「CSSだけ」「クラス名だけ」 | `rules/style/css.md` |
| 「ディレクトリ構造」「ファイル配置」 | `rules/style/structure.md` |

将来 `rules/a11y/`・`rules/performance/` 等が追加されたら、同様のマッピングを拡張する。

### 3. ルールの読み込みとレビュー

選択したルールファイルを実際に読み、差分の各ファイルに対してルール違反を検出する。**ルールを推測で適用せず、必ずファイルから引用して根拠を示す。**

判断に迷ったら `examples/style/good.md`・`examples/style/bad.md` を参照する。既存コード（例: `src/components/ui/buttons/BaseButton/`）も参考にする。

### 4. 出力フォーマット

指摘は重要度別に整理し、ファイルパスと行番号を必ず含める。

````markdown
## レビュー結果

### 🔴 Must（規約違反・修正必須）

- **`src/components/ui/buttons/NewButton/index.module.css:5`**
  クラス名がケバブケースになっています。本プロジェクトではコンポーネント名と一致する PascalCase を採用しています（参考: `rules/style/css.md` 命名セクション、既存の `BaseButton/index.module.css`）。
  ```css
  /* Bad */
  .new-button { }
  /* Good */
  .NewButton { }
  ```

### 🟡 Should（推奨される改善）

- **`src/components/ui/buttons/NewButton/index.tsx:14`**
  boolean Props は `is*` プレフィックスで揃えると既存と一貫します（参考: `rules/style/naming.md`）。
  - `disabled` → `isDisabled`

### 🟢 Nit（任意の好み）

- ...

### ✅ 良かった点

- ディレクトリ構造が `components/ui/buttons/PascalCase/index.tsx` パターンに正しく従っている
- ...
````

## 出力上の注意

- 機械的検出可能な指摘（lint で出るもの）は基本的に書かない。書く場合は「`npm run lint` で検出可能」と添える
- 「規約違反」と「好みの差」を明確に分ける（Must / Should / Nit）
- 参照したルールファイルとセクションを必ず引用する
- ファイルが大量にある PR では、まず観点別の集計（「naming違反 N件、css違反 M件」）を提示してから個別指摘に入る

## 拡張ガイド（将来の作業者向け）

新しいレビュー観点（例: アクセシビリティ）を追加するときは、以下の手順で拡張する:

1. `rules/<category>/` ディレクトリを作成し、観点別の `.md` ファイルを追加
2. `examples/<category>/good.md`・`bad.md` を追加
3. 本ファイルの「観点の選択」テーブルに行を追加

ルールファイルを増やしすぎる前に、既存ファイルへの追記で済まないか検討する。
