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

export const zodCustomErrorMap = (): zod.ZodErrorMap => (issue, ctx) => {
  switch (issue.code) {
    case zod.ZodIssueCode.invalid_type:
      if (issue.received === 'undefined') {
        return {
          // Required
          message: `必須項目です。`,
        }
      }
      return {
        // Expected ${issue.expected}, received ${issue.received}
        message: `${convertTypeToNativeLanguage(
          issue.received,
        )}ではなく${convertTypeToNativeLanguage(
          issue.expected,
        )}で入力してください。`,
      }
    case zod.ZodIssueCode.unrecognized_keys:
      return {
        // Unrecognized key(s) in object: ${issue.keys.map((k) => `'${k}'`).join(', ')}
        message: `許可されていないキーが含まれています。（${issue.keys
          .map((k) => `'${k}'`)
          .join(', ')}）`,
      }
    case zod.ZodIssueCode.invalid_union:
      return {
        // Invalid input
        message: '無効な入力です。',
      }
    case zod.ZodIssueCode.invalid_union_discriminator:
      return {
        /*
         * Invalid discriminator value. Expected ${issue.options
         * .map((val) => (typeof val === 'string' ? `'${val}'` : val))
         * .join(' | ')}
         */
        message: `無効な入力値が含まれています。期待される値は ${issue.options
          .map((val) => (typeof val === 'string' ? `'${val}'` : val))
          .join(' | ')} です。`,
      }
    case zod.ZodIssueCode.invalid_enum_value:
      return {
        /*
         * Invalid enum value. Expected ${issue.options
         * .map((val) => (typeof val === 'string' ? `'${val}'` : val))
         * .join(' | ')}
         */
        message: `無効な入力値が含まれています。期待される値は ${issue.options
          .map((val) => (typeof val === 'string' ? `'${val}'` : val))
          .join(' | ')} です。`,
      }
    case zod.ZodIssueCode.invalid_arguments:
      return {
        // Invalid function arguments
        message: '関数の引数が不正です。',
      }
    case zod.ZodIssueCode.invalid_return_type:
      return {
        // Invalid function return type
        message: '関数の戻り値の型が不正です。',
      }
    case zod.ZodIssueCode.invalid_date:
      return {
        // Invalid date
        message: '無効な日付です。',
      }
    case zod.ZodIssueCode.invalid_string:
      if (issue.validation !== 'regex') {
        return {
          // Invalid ${issue.validation}
          message: `${String(issue.validation)}は無効な形式です。`,
        }
      }
      return {
        // Invalid
        message: '無効な入力です。',
      }
    case zod.ZodIssueCode.too_small:
      if (issue.type === 'array') {
        return {
          // Array must contain ${issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)
          message: `${issue.inclusive ? `少なくとも` : ``}${
            issue.minimum
          }個以上選択してください。`,
        }
      }

      if (issue.type === 'string') {
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

      if (issue.type === 'number') {
        return {
          // Number must be greater than ${issue.inclusive ? `or equal to ` : ``}${issue.minimum}
          message: `${issue.minimum}${
            issue.inclusive ? `以上の` : `より大きい`
          }数値で入力してください。`,
        }
      }

      return { message: 'Invalid input' }
    case zod.ZodIssueCode.too_big:
      if (issue.type === 'array') {
        return {
          // Array must contain ${issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)
          message: `${issue.inclusive ? `最大` : `最低`}${
            issue.maximum
          }個選択してください。`,
        }
      }

      if (issue.type === 'string') {
        return {
          // String must contain ${issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)
          message: `${
            issue.inclusive
              ? `最大${issue.maximum}文字`
              : `${issue.maximum}文字以下`
          }で入力してください。`,
        }
      }

      if (issue.type === 'number') {
        return {
          // Number must be less than ${issue.inclusive ? `or equal to ` : ``}${issue.maximum}
          message: `${issue.maximum}${
            issue.inclusive ? `以下` : `未満`
          }の数値で入力してください。`,
        }
      }

      return {
        // Invalid input
        message: '無効な入力です。',
      }
    case zod.ZodIssueCode.custom:
      return {
        // Invalid input
        message: '無効な入力です。',
      }
    case zod.ZodIssueCode.invalid_intersection_types:
      return {
        // Intersection results could not be merged
        message: '処理結果のマージに失敗しました。',
      }
    case zod.ZodIssueCode.not_multiple_of:
      return {
        // Number must be a multiple of ${issue.multipleOf}
        message: `${issue.multipleOf}の倍数で入力してください。`,
      }
    default:
      return { message: ctx.defaultError }
  }
}
