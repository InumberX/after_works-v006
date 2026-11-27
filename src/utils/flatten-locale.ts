type NestedLocale = { readonly [key: string]: string | NestedLocale }

/**
 * 入れ子の辞書を、next-international の Provider が持つ形（`'home.title'` のように
 * キーを `.` でつないだ 1 段のオブジェクト）にする。next-international の
 * `flattenLocale` と同じ動き（公開されていないので、ここに持つ）
 */
export const flattenLocale = (
  locale: NestedLocale,
  prefix = '',
): Record<string, string> =>
  Object.entries(locale).reduce<Record<string, string>>(
    (flattened, [name, value]) =>
      typeof value === 'string'
        ? { ...flattened, [`${prefix}${name}`]: value }
        : { ...flattened, ...flattenLocale(value, `${prefix}${name}.`) },
    {},
  )
