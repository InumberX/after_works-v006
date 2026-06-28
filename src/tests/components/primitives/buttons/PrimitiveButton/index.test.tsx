import type { RenderResult } from '@testing-library/react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { describe, vi, afterEach, beforeEach, test, expect } from 'vitest'

import { PrimitiveButton } from '~/components/primitives/buttons/PrimitiveButton'

describe('PrimitiveButton', () => {
  let result: RenderResult
  const handleClick: () => void = vi.fn()

  // テスト終了後の処理
  afterEach(() => {
    cleanup()
  })

  describe('標準ボタン', () => {
    // テスト開始前の処理
    beforeEach(() => {
      result = render(
        <PrimitiveButton onClick={() => handleClick()}>
          <span className='TestText'>test</span>
        </PrimitiveButton>,
      )
    })

    test('子要素が正常に出力されている', () => {
      const button = result.container.querySelector('button')
      const text = button?.querySelector('.TestText')
      expect(text).not.toBe(null)
      expect(text?.innerHTML).toBe('test')
    })

    test('typeが正常に付与されている', () => {
      const button = result.container.querySelector('button')
      expect(button?.getAttribute('type')).toEqual('button')
    })

    test('クリックイベントが正常に動作している', () => {
      fireEvent.click(result.getByText('test'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('buttonType指定ボタン', () => {
    // テスト開始前の処理
    beforeEach(() => {
      result = render(
        <PrimitiveButton buttonType='submit'>
          <span className='TestText'>test</span>
        </PrimitiveButton>,
      )
    })

    test('typeが正常に付与されている', () => {
      const button = result.container.querySelector('button')
      expect(button?.getAttribute('type')).toEqual('submit')
    })
  })

  describe('非活性ボタン', () => {
    // テスト開始前の処理
    beforeEach(() => {
      result = render(
        <PrimitiveButton onClick={() => handleClick()} isDisabled>
          <span className='TestText'>test</span>
        </PrimitiveButton>,
      )
    })

    test('属性が正常に付与されている', () => {
      const button = result.container.querySelector('button')
      expect(button?.getAttribute('disabled')).toEqual('')
    })
  })

  describe('外部リンクボタン', () => {
    // テスト開始前の処理
    beforeEach(() => {
      result = render(
        <PrimitiveButton url='https://test.com/' target='_blank' rel='noopener'>
          <span className='TestText'>test</span>
        </PrimitiveButton>,
      )
    })

    test('aタグで遷移先が正常に設定されている', () => {
      const anchor = result.container.querySelector('a')
      expect(anchor?.getAttribute('href')).toEqual('https://test.com/')
    })

    test('属性が正常に付与されている', () => {
      const anchor = result.container.querySelector('a')
      expect(anchor?.getAttribute('target')).toEqual('_blank')
      expect(anchor?.getAttribute('rel')).toEqual('noopener')
    })
  })

  describe('ページ内リンクボタン', () => {
    // テスト開始前の処理
    beforeEach(() => {
      result = render(
        <PrimitiveButton url='#section'>
          <span className='TestText'>test</span>
        </PrimitiveButton>,
      )
    })

    test('aタグで遷移先が正常に設定されている', () => {
      const anchor = result.container.querySelector('a')
      expect(anchor?.getAttribute('href')).toEqual('#section')
    })
  })

  describe('内部リンクボタン', () => {
    // テスト開始前の処理
    beforeEach(() => {
      result = render(
        <PrimitiveButton url='/about'>
          <span className='TestText'>test</span>
        </PrimitiveButton>,
      )
    })

    test('aタグで遷移先が正常に設定されている', () => {
      const anchor = result.container.querySelector('a')
      expect(anchor?.getAttribute('href')).toEqual('/about')
    })
  })

  describe('フォールバック', () => {
    // テスト開始前の処理
    beforeEach(() => {
      result = render(
        <PrimitiveButton>
          <span className='TestText'>test</span>
        </PrimitiveButton>,
      )
    })

    test('spanタグで出力されている', () => {
      const button = result.container.querySelector('button')
      const anchor = result.container.querySelector('a')
      const span = result.container.querySelector('span.TestText')
      expect(button).toBe(null)
      expect(anchor).toBe(null)
      expect(span).not.toBe(null)
    })
  })

  describe('アクセシビリティ属性', () => {
    // テスト開始前の処理
    beforeEach(() => {
      result = render(
        <PrimitiveButton
          buttonType='button'
          role='tab'
          tabIndex={0}
          ariaLabel='testLabel'
          ariaControls='testPanel'
          ariaSelected
        >
          <span className='TestText'>test</span>
        </PrimitiveButton>,
      )
    })

    test('属性が正常に付与されている', () => {
      const button = result.container.querySelector('button')
      expect(button?.getAttribute('role')).toEqual('tab')
      expect(button?.getAttribute('tabindex')).toEqual('0')
      expect(button?.getAttribute('aria-label')).toEqual('testLabel')
      expect(button?.getAttribute('aria-controls')).toEqual('testPanel')
      expect(button?.getAttribute('aria-selected')).toEqual('true')
    })
  })
})
