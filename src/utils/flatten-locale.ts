type NestedLocale = { readonly [key: string]: string | NestedLocale }

/**
 * 入れ子の辞書を、next-international の Provider が持つ形（`'home.title'` のように
 * キーを `.` でつないだ 1 段のオブジェクト）にする。next-international の
 * `flattenLocale` と同じ結果になる（公開されていないので、ここに持つ）
 */
export const flattenLocale = (
  locale: NestedLocale,
  prefix = '',
  flattened: Record<string, string> = {},
): Record<string, string> => {
  for (const [name, value] of Object.entries(locale)) {
    if (typeof value === 'string') {
      flattened[`${prefix}${name}`] = value
    } else {
      flattenLocale(value, `${prefix}${name}.`, flattened)
    }
  }

  return flattened
}
