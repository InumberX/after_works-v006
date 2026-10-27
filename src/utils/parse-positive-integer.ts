/**
 * URL から受け取った値を正の整数として読む。
 *
 * `1`・`12` のような正規の形だけを受け付け、`0`・`-1`・`01`・`1.5`・`1abc`・
 * 空文字・配列（同じクエリの重複）は `undefined` を返す。`parseInt` のように
 * 先頭の数字だけを読むと、`1abc` や `01` が `1` と同じページになり、
 * 想定外の値がそのまま Kuroco へのリクエストに渡るため。
 */
export const parsePositiveInteger = (value: unknown): number | undefined => {
  if (typeof value !== 'string' || !/^[1-9][0-9]*$/.test(value)) {
    return undefined
  }

  const number = Number(value)

  return Number.isSafeInteger(number) ? number : undefined
}
