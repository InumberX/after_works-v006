/**
 * API の応答の `errors` に、指定したコードのエラーがあるかどうか。
 *
 * `errors: [{ code, message }]` はヘッドレス CMS（Kuroco）の応答の形。別の形式で
 * エラーを返す API には使えない。
 *
 * 例: 一覧の範囲外の pageID には、次のエラーが返る（ステージングの API で確認）。
 *
 * ```json
 * {"errors":[{"code":"not_found","message":"pageID is too big."}]}
 * ```
 *
 * ```ts
 * hasApiErrorCode(body, 'not_found') // true
 * ```
 */
export const hasApiErrorCode = (value: unknown, code: string): boolean => {
  if (typeof value !== 'object' || value === null || !('errors' in value)) {
    return false
  }

  const { errors } = value

  return (
    Array.isArray(errors) &&
    errors.some(
      (error: unknown) =>
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === code,
    )
  )
}
