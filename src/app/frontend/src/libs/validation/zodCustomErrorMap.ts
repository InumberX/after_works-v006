import * as zod from 'zod'

const convertTypeToNativeLanguage = (type: string): string => {
  switch (type) {
    case 'string':
      return '文字列'
    case 'nan':
      return '数値以外'
    case 'number':
      return '数値'
    case 'integer':
      return '整数'
    case 'float':
      return '数値（小数点あり）'
    case 'boolean':
      return '真偽値'
    case 'date':
      return '日付'
    case 'bigint':
      return '大きい桁の数値'
    case 'symbol':
      return 'シンボル'
    case 'function':
      return '関数'
    case 'undefined':
      return 'Undefined'
    case 'null':
      return 'Null'
    case 'array':
      return '配列'
    case 'object':
      return 'オブジェクト'
    case 'unknown':
      return 'Unknown'
    case 'promise':
      return 'Promise'
    case 'void':
      return 'Void'
    case 'never':
      return 'Never'
    case 'map':
      return 'Map'
    case 'set':
      return 'Set'
    default:
      return type
  }
}

export const zodCustomErrorMap: zod.ZodErrorMap = (issue) => {
  switch (issue.code) {
    case 'invalid_type':
      if ('expected' in issue && 'input' in issue) {
        const received =
          issue.input === undefined ? 'undefined' : typeof issue.input
        if (received === 'undefined') {
          return {
            // Required
            message: `必須項目です。`,
          }
        }
        return {
          // Expected ${issue.expected}, received ${received}
          message: `${convertTypeToNativeLanguage(
            received,
          )}ではなく${convertTypeToNativeLanguage(
            String(issue.expected),
          )}で入力してください。`,
        }
      }
      return { message: '型が不正です。' }
    case 'unrecognized_keys':
      if ('keys' in issue && Array.isArray(issue.keys)) {
        return {
          // Unrecognized key(s) in object: ${issue.keys.map((k) => `'${k}'`).join(', ')}
          message: `許可されていないキーが含まれています。（${issue.keys
            .map((k: string) => `'${k}'`)
            .join(', ')}）`,
        }
      }
      return { message: '許可されていないキーが含まれています。' }
    case 'invalid_union':
      return {
        // Invalid input
        message: '無効な入力です。',
      }
    case 'invalid_format':
      return {
        // Invalid format
        message: '無効な形式です。',
      }
    case 'too_small':
      if ('origin' in issue && 'minimum' in issue) {
        if (issue.origin === 'array') {
          return {
            // Array must contain ${issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)
            message: `${issue.inclusive ? `少なくとも` : ``}${
              issue.minimum
            }個以上選択してください。`,
          }
        }

        if (issue.origin === 'string') {
          return {
            /*
             * String must contain ${
             * issue.inclusive ? `at least` : `over`
             * } ${issue.minimum} character(s)
             */
            message: `${issue.inclusive ? `少なくとも` : ``}${
              issue.minimum
            }文字以上入力してください。`,
          }
        }

        if (
          issue.origin === 'number' ||
          issue.origin === 'int' ||
          issue.origin === 'bigint'
        ) {
          return {
            // Number must be greater than ${issue.inclusive ? `or equal to ` : ``}${issue.minimum}
            message: `${issue.minimum}${
              issue.inclusive ? `以上の` : `より大きい`
            }数値で入力してください。`,
          }
        }
      }
      return { message: '入力値が小さすぎます。' }
    case 'too_big':
      if ('origin' in issue && 'maximum' in issue) {
        if (issue.origin === 'array') {
          return {
            // Array must contain ${issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)
            message: `${issue.inclusive ? `最大` : `最低`}${
              issue.maximum
            }個選択してください。`,
          }
        }

        if (issue.origin === 'string') {
          return {
            // String must contain ${issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)
            message: `${
              issue.inclusive
                ? `最大${issue.maximum}文字`
                : `${issue.maximum}文字以下`
            }で入力してください。`,
          }
        }

        if (
          issue.origin === 'number' ||
          issue.origin === 'int' ||
          issue.origin === 'bigint'
        ) {
          return {
            // Number must be less than ${issue.inclusive ? `or equal to ` : ``}${issue.maximum}
            message: `${issue.maximum}${
              issue.inclusive ? `以下` : `未満`
            }の数値で入力してください。`,
          }
        }
      }
      return {
        // Invalid input
        message: '入力値が大きすぎます。',
      }
    case 'custom':
      if ('message' in issue && typeof issue.message === 'string') {
        return { message: issue.message }
      }
      return {
        // Invalid input
        message: '無効な入力です。',
      }
    case 'not_multiple_of':
      if ('divisor' in issue) {
        return {
          // Number must be a multiple of ${issue.divisor}
          message: `${issue.divisor}の倍数で入力してください。`,
        }
      }
      return { message: '倍数ではありません。' }
    default:
      return { message: '無効な入力です。' }
  }
}
