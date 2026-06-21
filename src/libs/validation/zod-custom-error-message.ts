export const customErrorMessage = {
  required: (name?: string): string => {
    let result = ''

    if (name) {
      result = `${name}は`
    }

    result = `${result}必須項目です。`

    return result
  },
  email: (name?: string): string => {
    let result = ''

    if (name) {
      result = `${name}は`
    }

    result = `${result}有効なアドレスではありません。`

    return result
  },
  alpha: (name?: string): string => {
    let result = ''

    if (name) {
      result = `${name}は`
    }

    result = `${result}アルファベットのみ使用できます。`

    return result
  },
  alphaNum: (name?: string): string => {
    let result = ''

    if (name) {
      result = `${name}は`
    }

    result = `${result}英数字のみ使用できます。`

    return result
  },
  alphaDash: (name?: string): string => {
    let result = ''

    if (name) {
      result = `${name}は`
    }

    result = `${result}英数字とハイフン、アンダースコアのみ使用できます。`

    return result
  },
  alphaSpaces: (name?: string): string => {
    let result = ''

    if (name) {
      result = `${name}は`
    }

    result = `${result}アルファベットと空白のみ使用できます。`

    return result
  },
  between: (min: number, max: number, name?: string): string => {
    let result = ''

    if (name) {
      result = `${name}は`
    }

    result = `${result}${min}から${max}の間でなければなりません。`

    return result
  },
  confirmed: (name?: string): string => {
    let result = ''

    if (name) {
      result = `${name}が`
    }

    result = `${result}一致しません。`

    return result
  },
  digits: (length: number, name?: string): string => {
    let result = ''

    if (name) {
      result = `${name}は`
    }

    result = `${result}${length}桁の数字でなければなりません。`

    return result
  },
  excluded: (name?: string): string => {
    let result = ''

    if (name) {
      result = `${name}は`
    }

    result = `${result}不正な値です。`

    return result
  },
  mimes: (name?: string): string => {
    let result = ''

    if (name) {
      result = `${name}は`
    }

    result = `${result}有効なファイル形式ではありません。`

    return result
  },
  image: (name?: string): string => {
    let result = ''

    if (name) {
      result = `${name}は`
    }

    result = `${result}有効な画像形式ではありません。`

    return result
  },
  integer: (name?: string): string => {
    let result = ''

    if (name) {
      result = `${name}は`
    }

    result = `${result}整数のみ使用できます。`

    return result
  },
  length: (length: number, name?: string): string => {
    let result = ''

    if (name) {
      result = `${name}は`
    }

    result = `${result}${length}文字でなければなりません。`

    return result
  },
  maxValue: (max: number, name?: string): string => {
    let result = ''

    if (name) {
      result = `${name}は`
    }

    result = `${result}${max}以下でなければなりません。`

    return result
  },
  max: (max: number, name?: string): string => {
    let result = ''

    if (name) {
      result = `${name}は`
    }

    result = `${result}${max}文字以内にしてください。`

    return result
  },
  minValue: (min: number, name?: string): string => {
    let result = ''

    if (name) {
      result = `${name}は`
    }

    result = `${result}${min}以上でなければなりません。`

    return result
  },
  min: (min: number, name?: string): string => {
    let result = ''

    if (name) {
      result = `${name}は`
    }

    result = `${result}${min}文字以上でなければなりません。`

    return result
  },
  numeric: (name?: string): string => {
    let result = ''

    if (name) {
      result = `${name}は`
    }

    result = `${result}数字のみ使用できます。`

    return result
  },
  oneOf: (name?: string): string => {
    let result = ''

    if (name) {
      result = `${name}は`
    }

    result = `${result}有効な値ではありません。`

    return result
  },
  regex: (name?: string): string => {
    let result = ''

    if (name) {
      result = `${name}の`
    }

    result = `${result}フォーマットが正しくありません。`

    return result
  },
  size: (size: number, name?: string): string => {
    let result = ''

    if (name) {
      result = `${name}は`
    }

    result = `${result}${size}KB以内でなければなりません。`

    return result
  },
}
