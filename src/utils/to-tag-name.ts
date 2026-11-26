/**
 * タグとして表示する名前。タイトル（`tag_nm`）は管理画面の記事編集などでも表示するので、
 * 各言語の読める名前にしておく。タイトルには空白を使えないため、空白を含む名前のときだけ
 * 拡張項目 1（`ext_col_01`）に表示名を入れる。拡張項目 1 が空か空白だけならタイトルを使う。
 */
export const toTagName = (tag: {
  tag_nm: string
  ext_col_01: string | null
}): string => tag.ext_col_01?.trim() || tag.tag_nm
