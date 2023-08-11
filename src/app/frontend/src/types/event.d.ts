import React from 'react'

export type EventTypes = {
  // 一般的な入力フォームのEvent型定義（text, checkbox, radioなど）
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  // input[type="button"]のEvent型定義
  onClick: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
  // buttonタグのEvent型定義
  onClickButton: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void
  // divタグのEvent型定義
  onClickDiv: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  // SelectBoxのEvent型定義
  onChangeSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void
  // TextAreaのEvent型定義
  onInputTextArea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  // Keyボード操作のEvent型定義
  onkeypress: (event: React.KeyboardEvent<HTMLInputElement>) => void
  // FocusのEvent型定義
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void
  // SubmitのEvent型定義
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}
