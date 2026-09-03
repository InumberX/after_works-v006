import { render, cleanup, act } from '@testing-library/react'
import { useAtomValue } from 'jotai'
import type { ReactNode } from 'react'
import { describe, afterEach, test, expect } from 'vitest'

import {
  BREAKPOINTS,
  BreakpointsProvider,
} from '~/providers/BreakpointsProvider'
import { JotaiProvider } from '~/providers/JotaiProvider'
import {
  isBreakpointXxsAtom,
  isBreakpointXsAtom,
  isBreakpointSmAtom,
  isBreakpointMdAtom,
  isBreakpointLgAtom,
  isBreakpointXlAtom,
  isBreakpointXxlAtom,
} from '~/store/breakpoints'

const INITIAL_VIEWPORT_CONTENT =
  'width=device-width, initial-scale=1, minimum-scale=1, viewport-fit=cover'

// viewportの書き換えが暴走した場合にテストをハングさせないための上限
const MAX_VIEWPORT_WRITES = 20

type MockMediaQueryList = {
  media: string
  matches: boolean
  listeners: Set<(e: MediaQueryListEvent) => void>
  addEventListener: (
    type: string,
    listener: (e: MediaQueryListEvent) => void,
  ) => void
  removeEventListener: (
    type: string,
    listener: (e: MediaQueryListEvent) => void,
  ) => void
}

// `screen and (min-width: 360px) and (max-width: 575px)` 形式を評価する処理
const matchesQuery = (media: string, width: number): boolean => {
  const min = media.match(/min-width:\s*(\d+)px/)
  const max = media.match(/max-width:\s*(\d+)px/)

  if (min && width < Number(min[1])) {
    return false
  }

  if (max && width > Number(max[1])) {
    return false
  }

  return true
}

type Harness = {
  getViewportContent: () => string | null
  getViewportWriteCount: () => number
  hasOverflowed: () => boolean
  getLayoutWidth: () => number
  getMediaQueryListenerCount: () => number
  resizeWindow: (width: number) => void
}

/**
 * 実機の挙動を再現するハーネス。
 *
 * ブラウザでは meta[name="viewport"] の content を書き換えるとレイアウトビューポート幅が変わり、
 * その結果 matchMedia が再評価されて change イベントが発火する。
 * このフィードバックを再現することで「viewportの書き換え → ブレイクポイント判定の反転」
 * の無限ループを検出できるようにしている。
 */
const setupHarness = ({
  deviceWidth,
  withViewportMeta = true,
}: {
  deviceWidth: number
  withViewportMeta?: boolean
}): Harness => {
  // window.screen.width は meta viewport の影響を受けない端末の物理的な画面幅
  Object.defineProperty(window.screen, 'width', {
    value: deviceWidth,
    configurable: true,
  })

  let layoutWidth = deviceWidth
  let viewportWriteCount = 0
  let overflowed = false
  const mediaQueryLists: MockMediaQueryList[] = []

  const syncMediaQueryLists = () => {
    for (const mediaQueryList of [...mediaQueryLists]) {
      const matches = matchesQuery(mediaQueryList.media, layoutWidth)

      if (matches === mediaQueryList.matches) {
        continue
      }

      mediaQueryList.matches = matches

      for (const listener of [...mediaQueryList.listeners]) {
        listener({
          matches,
          media: mediaQueryList.media,
        } as MediaQueryListEvent)
      }
    }
  }

  window.matchMedia = ((media: string) => {
    const mediaQueryList: MockMediaQueryList = {
      media,
      matches: matchesQuery(media, layoutWidth),
      listeners: new Set(),
      addEventListener: (type, listener) => {
        if (type === 'change') {
          mediaQueryList.listeners.add(listener)
        }
      },
      removeEventListener: (type, listener) => {
        if (type === 'change') {
          mediaQueryList.listeners.delete(listener)
        }
      },
    }

    mediaQueryLists.push(mediaQueryList)

    return mediaQueryList
    // テストダブルのため、MediaQueryListの全メンバーは実装しない
  }) as unknown as typeof window.matchMedia

  let viewport: HTMLMetaElement | null = null

  if (withViewportMeta) {
    viewport = document.createElement('meta')
    viewport.setAttribute('name', 'viewport')
    viewport.setAttribute('content', INITIAL_VIEWPORT_CONTENT)
    document.head.appendChild(viewport)

    const originalSetAttribute = viewport.setAttribute.bind(viewport)

    viewport.setAttribute = (name: string, value: string) => {
      originalSetAttribute(name, value)

      if (name !== 'content') {
        return
      }

      viewportWriteCount += 1

      if (viewportWriteCount > MAX_VIEWPORT_WRITES) {
        // 無限ループに入っている。これ以上フィードバックさせるとテストが停止しないため打ち切る
        overflowed = true

        return
      }

      // contentの `width=...` に応じてレイアウトビューポート幅が変わる挙動を再現する
      const width = value.match(/width=(\d+)/)
      const nextLayoutWidth = width ? Number(width[1]) : deviceWidth

      if (nextLayoutWidth === layoutWidth) {
        return
      }

      layoutWidth = nextLayoutWidth
      syncMediaQueryLists()
    }
  }

  return {
    getViewportContent: () => viewport?.getAttribute('content') ?? null,
    getViewportWriteCount: () => viewportWriteCount,
    hasOverflowed: () => overflowed,
    getLayoutWidth: () => layoutWidth,
    getMediaQueryListenerCount: () =>
      mediaQueryLists.reduce(
        (count, mediaQueryList) => count + mediaQueryList.listeners.size,
        0,
      ),
    resizeWindow: (width: number) => {
      layoutWidth = width
      act(() => {
        syncMediaQueryLists()
        window.dispatchEvent(new Event('resize'))
      })
    },
  }
}

type BreakpointState = {
  xxs: null | boolean
  xs: null | boolean
  sm: null | boolean
  md: null | boolean
  lg: null | boolean
  xl: null | boolean
  xxl: null | boolean
}

let breakpointState: BreakpointState

const BreakpointProbe = () => {
  breakpointState = {
    xxs: useAtomValue(isBreakpointXxsAtom),
    xs: useAtomValue(isBreakpointXsAtom),
    sm: useAtomValue(isBreakpointSmAtom),
    md: useAtomValue(isBreakpointMdAtom),
    lg: useAtomValue(isBreakpointLgAtom),
    xl: useAtomValue(isBreakpointXlAtom),
    xxl: useAtomValue(isBreakpointXxlAtom),
  }

  return null
}

const renderProvider = (children: ReactNode = <BreakpointProbe />) =>
  render(
    <JotaiProvider>
      <BreakpointsProvider>{children}</BreakpointsProvider>
    </JotaiProvider>,
  )

// trueになっているブレイクポイントのキーを取得する処理
const getActiveBreakpoints = (): string[] =>
  Object.entries(breakpointState)
    .filter(([, isActive]) => isActive)
    .map(([key]) => key)

describe('BreakpointsProvider', () => {
  // テスト終了後の処理
  afterEach(() => {
    cleanup()
    document.head.querySelectorAll('meta[name="viewport"]').forEach((meta) => {
      meta.remove()
    })
  })

  describe('viewportの書き換え', () => {
    test('端末幅が360px未満の場合はwidth=360が設定される', () => {
      const harness = setupHarness({ deviceWidth: 320 })
      renderProvider()

      expect(harness.getViewportContent()).toBe(`width=${BREAKPOINTS.xs}`)
    })

    test('端末幅が360px以上の場合は初期のcontentが維持される', () => {
      const harness = setupHarness({ deviceWidth: 390 })
      renderProvider()

      expect(harness.getViewportContent()).toBe(INITIAL_VIEWPORT_CONTENT)
      expect(harness.getViewportWriteCount()).toBe(0)
    })

    test('端末幅が359pxの場合はwidth=360が設定される', () => {
      const harness = setupHarness({ deviceWidth: BREAKPOINTS.xs - 1 })
      renderProvider()

      expect(harness.getViewportContent()).toBe(`width=${BREAKPOINTS.xs}`)
    })

    test('端末幅が360pxちょうどの場合は書き換えられない', () => {
      const harness = setupHarness({ deviceWidth: BREAKPOINTS.xs })
      renderProvider()

      expect(harness.getViewportContent()).toBe(INITIAL_VIEWPORT_CONTENT)
    })

    test('viewportのmetaが存在しない場合でもエラーにならない', () => {
      setupHarness({ deviceWidth: 320, withViewportMeta: false })

      expect(() => renderProvider()).not.toThrow()
    })

    test('ウィンドウ幅が変わってもviewportは書き換えられない', () => {
      const harness = setupHarness({ deviceWidth: 1440 })
      renderProvider()

      harness.resizeWindow(320)

      expect(harness.getViewportContent()).toBe(INITIAL_VIEWPORT_CONTENT)
      expect(harness.getViewportWriteCount()).toBe(0)
    })
  })

  describe('viewportの書き換えとブレイクポイント判定の相互作用', () => {
    test('端末幅が360px未満でも無限ループしない', () => {
      const harness = setupHarness({ deviceWidth: 320 })
      renderProvider()

      // 書き換えたviewportがブレイクポイント判定を反転させ、
      // それがさらにviewportを書き換える…という往復が起きていないこと
      expect(harness.hasOverflowed()).toBe(false)
      expect(harness.getViewportWriteCount()).toBe(1)
      expect(harness.getViewportContent()).toBe(`width=${BREAKPOINTS.xs}`)
    })

    test('端末幅が360px未満のときレイアウト幅は360pxで安定する', () => {
      const harness = setupHarness({ deviceWidth: 320 })
      renderProvider()

      expect(harness.getLayoutWidth()).toBe(BREAKPOINTS.xs)
      // レイアウトビューポートが360pxになるため、CSS側と同じくxsとして扱われる
      expect(getActiveBreakpoints()).toEqual(['xs'])
    })

    test('端末幅が280pxでも無限ループしない', () => {
      const harness = setupHarness({ deviceWidth: 280 })
      renderProvider()

      expect(harness.hasOverflowed()).toBe(false)
      expect(harness.getViewportWriteCount()).toBe(1)
    })
  })

  describe('ブレイクポイント判定', () => {
    const patterns: { width: number; expected: keyof BreakpointState }[] = [
      { width: 320, expected: 'xxs' },
      { width: BREAKPOINTS.xs, expected: 'xs' },
      { width: BREAKPOINTS.sm - 1, expected: 'xs' },
      { width: BREAKPOINTS.sm, expected: 'sm' },
      { width: BREAKPOINTS.md - 1, expected: 'sm' },
      { width: BREAKPOINTS.md, expected: 'md' },
      { width: BREAKPOINTS.lg - 1, expected: 'md' },
      { width: BREAKPOINTS.lg, expected: 'lg' },
      { width: BREAKPOINTS.xl - 1, expected: 'lg' },
      { width: BREAKPOINTS.xl, expected: 'xl' },
      { width: BREAKPOINTS.xxl - 1, expected: 'xl' },
      { width: BREAKPOINTS.xxl, expected: 'xxl' },
    ]

    for (const { width, expected } of patterns) {
      test(`${width}pxでは${expected}のみがtrueになる`, () => {
        // viewportの書き換えが挟まらない端末幅で起動し、ウィンドウ幅だけを変えて判定する
        const harness = setupHarness({ deviceWidth: 1440 })
        renderProvider()
        harness.resizeWindow(width)

        expect(getActiveBreakpoints()).toEqual([expected])
      })
    }

    test('lgの範囲から縮小したときにmdへ切り替わる', () => {
      // mdの上限がlgと重複していると、lg → md の縮小でchangeイベントが発火せず
      // lgのまま取り残されるため、その退行を検出する
      const harness = setupHarness({ deviceWidth: 1440 })
      renderProvider()

      harness.resizeWindow(1100)
      expect(getActiveBreakpoints()).toEqual(['lg'])

      harness.resizeWindow(900)
      expect(getActiveBreakpoints()).toEqual(['md'])

      harness.resizeWindow(1100)
      expect(getActiveBreakpoints()).toEqual(['lg'])
    })

    test('mdとlgの範囲が重複していない', () => {
      const harness = setupHarness({ deviceWidth: 1440 })
      renderProvider()

      for (const width of [BREAKPOINTS.md, BREAKPOINTS.lg - 1]) {
        harness.resizeWindow(width)

        expect(getActiveBreakpoints()).toEqual(['md'])
      }

      for (const width of [BREAKPOINTS.lg, BREAKPOINTS.xl - 1]) {
        harness.resizeWindow(width)

        expect(getActiveBreakpoints()).toEqual(['lg'])
      }
    })

    test('リサイズでブレイクポイントが追従する', () => {
      const harness = setupHarness({ deviceWidth: 1440 })
      renderProvider()

      expect(getActiveBreakpoints()).toEqual(['xxl'])

      harness.resizeWindow(800)
      expect(getActiveBreakpoints()).toEqual(['md'])

      harness.resizeWindow(500)
      expect(getActiveBreakpoints()).toEqual(['xs'])

      harness.resizeWindow(1250)
      expect(getActiveBreakpoints()).toEqual(['xl'])
    })
  })

  describe('クリーンアップ', () => {
    test('アンマウント時にchangeリスナーが解除される', () => {
      const harness = setupHarness({ deviceWidth: 1440 })
      const result = renderProvider()

      expect(harness.getMediaQueryListenerCount()).toBeGreaterThan(0)

      result.unmount()

      expect(harness.getMediaQueryListenerCount()).toBe(0)
    })

    test('アンマウント後はviewportが書き換えられない', () => {
      const harness = setupHarness({ deviceWidth: 1440 })
      const result = renderProvider()

      result.unmount()
      harness.resizeWindow(320)

      expect(harness.getViewportWriteCount()).toBe(0)
    })
  })
})
