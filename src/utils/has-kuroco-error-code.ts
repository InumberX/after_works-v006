/**
 * Kuroco の応答の `errors` に、指定したコードのエラーがあるかどうか。
 *
 * 例: 一覧の範囲外の pageID には、次のエラーが返る（ステージングの API で確認）。
 *
 * ```json
 * {"errors":[{"code":"not_found","message":"pageID is too big."}]}
 * ```
 *
 * ```ts
 * hasKurocoErrorCode(body, 'not_found') // true
 * ```
 */
export const hasKurocoErrorCode = (value: unknown, code: string): boolean => {
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
