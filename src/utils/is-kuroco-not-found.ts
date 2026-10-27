/**
 * Kuroco の応答が `not_found` のエラーかどうか。
 *
 * 一覧の範囲外の pageID には、次のエラーが返る（ステージングの API で確認）。
 *
 * ```json
 * {"errors":[{"code":"not_found","message":"pageID is too big."}]}
 * ```
 */
export const isKurocoNotFound = (value: unknown): boolean => {
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
        error.code === 'not_found',
    )
  )
}
