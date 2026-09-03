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

type Orientation = 'portrait' | 'landscape'

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

// `screen and (min-width: 360px) and (max-width: 575px)` などを評価する処理
const matchesQuery = (
  media: string,
  width: number,
  orientation: Orientation,
): boolean => {
  if (media.includes('orientation: landscape')) {
    return orientation === 'landscape'
  }

  if (media.includes('orientation: portrait')) {
    return orientation === 'portrait'
  }

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
  rotate: (orientation: Orientation) => void
}

/**
 * 実機の挙動を再現するハーネス。
 *
 * ブラウザでは meta[name="viewport"] の content を書き換えるとレイアウトビューポート幅が変わり、
 * その結果 matchMedia が再評価されて change イベントが発火する。
 * このフィードバックを再現することで「viewportの書き換え → ブレイクポイント判定の反転」
 * の無限ループを検出できるようにしている。
 *
 * screenWidth / screenHeight は window.screen が返す値。
 * iOS Safariは回転しても入れ替わらないため、ここでも入れ替えずに保持し、
 * 向きの解決はプロバイダー側の責務として検証する。
 */
const setupHarness = ({
  screenWidth,
  screenHeight = 800,
  orientation = 'portrait',
  withViewportMeta = true,
  withScreenOrientation = true,
}: {
  screenWidth: number
  screenHeight?: number
  orientation?: Orientation
  withViewportMeta?: boolean
  withScreenOrientation?: boolean
}): Harness => {
  let currentOrientation = orientation

  Object.defineProperty(window.screen, 'width', {
    value: screenWidth,
    configurable: true,
  })
  Object.defineProperty(window.screen, 'height', {
    value: screenHeight,
    configurable: true,
  })
  Object.defineProperty(window.screen, 'orientation', {
    value: withScreenOrientation
      ? {
          get type() {
            return currentOrientation === 'landscape'
              ? 'landscape-primary'
              : 'portrait-primary'
          },
        }
      : undefined,
    configurable: true,
  })

  // 向きを考慮した実際の画面幅
  const getEffectiveDeviceWidth = () =>
    currentOrientation === 'landscape'
      ? Math.max(screenWidth, screenHeight)
      : Math.min(screenWidth, screenHeight)

  // viewportを書き換えていない状態でのレイアウトビューポート幅
  let windowWidth = getEffectiveDeviceWidth()
  // meta viewport の `width=<数値>` による固定幅。nullは `width=device-width` 相当
  let fixedWidth: number | null = null
  let viewportWriteCount = 0
  let overflowed = false
  const mediaQueryLists: MockMediaQueryList[] = []

  const getLayoutWidth = () => fixedWidth ?? windowWidth

  const syncMediaQueryLists = () => {
    for (const mediaQueryList of [...mediaQueryLists]) {
      const matches = matchesQuery(
        mediaQueryList.media,
        getLayoutWidth(),
        currentOrientation,
      )

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
      matches: matchesQuery(media, getLayoutWidth(), currentOrientation),
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
      const nextFixedWidth = width ? Number(width[1]) : null

      if (nextFixedWidth === fixedWidth) {
        return
      }

      fixedWidth = nextFixedWidth
      syncMediaQueryLists()
    }
  }

  return {
    getViewportContent: () => viewport?.getAttribute('content') ?? null,
    getViewportWriteCount: () => viewportWriteCount,
    hasOverflowed: () => overflowed,
    getLayoutWidth,
    getMediaQueryListenerCount: () =>
      mediaQueryLists.reduce(
        (count, mediaQueryList) => count + mediaQueryList.listeners.size,
        0,
      ),
    resizeWindow: (width: number) => {
      windowWidth = width
      act(() => {
        syncMediaQueryLists()
        window.dispatchEvent(new Event('resize'))
      })
    },
    rotate: (nextOrientation: Orientation) => {
      currentOrientation = nextOrientation
      windowWidth = getEffectiveDeviceWidth()
      act(() => {
        syncMediaQueryLists()
        window.dispatchEvent(new Event('orientationchange'))
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
    test('画面幅が360px未満の場合はwidth=360が設定される', () => {
      const harness = setupHarness({ screenWidth: 320, screenHeight: 568 })
      renderProvider()

      expect(harness.getViewportContent()).toBe(`width=${BREAKPOINTS.xs}`)
    })

    test('画面幅が360px以上の場合は初期のcontentが維持される', () => {
      const harness = setupHarness({ screenWidth: 390, screenHeight: 844 })
      renderProvider()

      expect(harness.getViewportContent()).toBe(INITIAL_VIEWPORT_CONTENT)
      expect(harness.getViewportWriteCount()).toBe(0)
    })

    test('画面幅が359pxの場合はwidth=360が設定される', () => {
      const harness = setupHarness({ screenWidth: BREAKPOINTS.xs - 1 })
      renderProvider()

      expect(harness.getViewportContent()).toBe(`width=${BREAKPOINTS.xs}`)
    })

    test('画面幅が360pxちょうどの場合は書き換えられない', () => {
      const harness = setupHarness({ screenWidth: BREAKPOINTS.xs })
      renderProvider()

      expect(harness.getViewportContent()).toBe(INITIAL_VIEWPORT_CONTENT)
    })

    test('画面サイズを取得できない環境では書き換えられない', () => {
      // jsdomのscreenは既定で0を返すため、狭い端末と誤判定してはいけない
      const harness = setupHarness({ screenWidth: 0, screenHeight: 0 })
      renderProvider()

      expect(harness.getViewportContent()).toBe(INITIAL_VIEWPORT_CONTENT)
      expect(harness.getViewportWriteCount()).toBe(0)
    })

    test('viewportのmetaが存在しない場合でもエラーにならない', () => {
      setupHarness({ screenWidth: 320, withViewportMeta: false })

      expect(() => renderProvider()).not.toThrow()
    })

    test('ウィンドウ幅が変わってもviewportは書き換えられない', () => {
      const harness = setupHarness({ screenWidth: 1440, screenHeight: 900 })
      renderProvider()

      harness.resizeWindow(320)

      expect(harness.getViewportContent()).toBe(INITIAL_VIEWPORT_CONTENT)
      expect(harness.getViewportWriteCount()).toBe(0)
    })
  })

  describe('画面の向き', () => {
    test('横向きでは長辺で判定され書き換えられない', () => {
      // iOS Safariはscreen.widthが縦向きの値(320)のままになるため、
      // それをそのまま使うと横向き(568px)でも書き換えてしまう
      const harness = setupHarness({
        screenWidth: 320,
        screenHeight: 568,
        orientation: 'landscape',
      })
      renderProvider()

      expect(harness.getViewportContent()).toBe(INITIAL_VIEWPORT_CONTENT)
      expect(harness.getViewportWriteCount()).toBe(0)
    })

    test('縦向きから横向きに回転すると初期のcontentへ戻る', () => {
      const harness = setupHarness({ screenWidth: 320, screenHeight: 568 })
      renderProvider()

      expect(harness.getViewportContent()).toBe(`width=${BREAKPOINTS.xs}`)

      harness.rotate('landscape')

      expect(harness.getViewportContent()).toBe(INITIAL_VIEWPORT_CONTENT)
    })

    test('横向きから縦向きに戻すと再びwidth=360になる', () => {
      const harness = setupHarness({
        screenWidth: 320,
        screenHeight: 568,
        orientation: 'landscape',
      })
      renderProvider()

      harness.rotate('portrait')

      expect(harness.getViewportContent()).toBe(`width=${BREAKPOINTS.xs}`)
    })

    test('screen.orientation非対応環境ではメディアクエリで向きを判定する', () => {
      const harness = setupHarness({
        screenWidth: 320,
        screenHeight: 568,
        orientation: 'landscape',
        withScreenOrientation: false,
      })
      renderProvider()

      expect(harness.getViewportContent()).toBe(INITIAL_VIEWPORT_CONTENT)
    })

    test('回転を繰り返しても無限ループしない', () => {
      const harness = setupHarness({ screenWidth: 320, screenHeight: 568 })
      renderProvider()

      harness.rotate('landscape')
      harness.rotate('portrait')
      harness.rotate('landscape')
      harness.rotate('portrait')

      expect(harness.hasOverflowed()).toBe(false)
      expect(harness.getViewportContent()).toBe(`width=${BREAKPOINTS.xs}`)
    })
  })

  describe('viewportの書き換えとブレイクポイント判定の相互作用', () => {
    test('画面幅が360px未満でも無限ループしない', () => {
      const harness = setupHarness({ screenWidth: 320, screenHeight: 568 })
      renderProvider()

      // 書き換えたviewportがブレイクポイント判定を反転させ、
      // それがさらにviewportを書き換える…という往復が起きていないこと
      expect(harness.hasOverflowed()).toBe(false)
      expect(harness.getViewportWriteCount()).toBe(1)
      expect(harness.getViewportContent()).toBe(`width=${BREAKPOINTS.xs}`)
    })

    test('画面幅が360px未満のときレイアウト幅は360pxで安定する', () => {
      const harness = setupHarness({ screenWidth: 320, screenHeight: 568 })
      renderProvider()

      expect(harness.getLayoutWidth()).toBe(BREAKPOINTS.xs)
      // レイアウトビューポートが360pxになるため、CSS側と同じくxsとして扱われる
      expect(getActiveBreakpoints()).toEqual(['xs'])
    })

    test('画面幅が280pxでも無限ループしない', () => {
      const harness = setupHarness({ screenWidth: 280, screenHeight: 653 })
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
        // viewportの書き換えが挟まらない画面幅で起動し、ウィンドウ幅だけを変えて判定する
        const harness = setupHarness({
          screenWidth: 1440,
          screenHeight: 900,
          orientation: 'landscape',
        })
        renderProvider()
        harness.resizeWindow(width)

        expect(getActiveBreakpoints()).toEqual([expected])
      })
    }

    test('lgの範囲から縮小したときにmdへ切り替わる', () => {
      // mdの上限がlgと重複していると、lg → md の縮小でchangeイベントが発火せず
      // lgのまま取り残されるため、その退行を検出する
      const harness = setupHarness({
        screenWidth: 1440,
        screenHeight: 900,
        orientation: 'landscape',
      })
      renderProvider()

      harness.resizeWindow(1100)
      expect(getActiveBreakpoints()).toEqual(['lg'])

      harness.resizeWindow(900)
      expect(getActiveBreakpoints()).toEqual(['md'])

      harness.resizeWindow(1100)
      expect(getActiveBreakpoints()).toEqual(['lg'])
    })

    test('mdとlgの範囲が重複していない', () => {
      const harness = setupHarness({
        screenWidth: 1440,
        screenHeight: 900,
        orientation: 'landscape',
      })
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
      const harness = setupHarness({
        screenWidth: 1440,
        screenHeight: 900,
        orientation: 'landscape',
      })
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
      const harness = setupHarness({
        screenWidth: 1440,
        screenHeight: 900,
        orientation: 'landscape',
      })
      const result = renderProvider()

      expect(harness.getMediaQueryListenerCount()).toBeGreaterThan(0)

      result.unmount()

      expect(harness.getMediaQueryListenerCount()).toBe(0)
    })

    test('書き換えていない場合はアンマウント時も書き換えない', () => {
      const harness = setupHarness({
        screenWidth: 1440,
        screenHeight: 900,
        orientation: 'landscape',
      })
      const result = renderProvider()

      result.unmount()

      expect(harness.getViewportWriteCount()).toBe(0)
    })

    test('アンマウント時にviewportが初期状態へ戻る', () => {
      const harness = setupHarness({ screenWidth: 320, screenHeight: 568 })
      const result = renderProvider()

      expect(harness.getViewportContent()).toBe(`width=${BREAKPOINTS.xs}`)

      result.unmount()

      expect(harness.getViewportContent()).toBe(INITIAL_VIEWPORT_CONTENT)
    })

    test('再マウントしてもwidth=360が初期状態として記録されない', () => {
      // 書き換えたまま外れると、再マウント後に元のcontentへ戻せなくなる
      const harness = setupHarness({ screenWidth: 320, screenHeight: 568 })
      const result = renderProvider()

      result.unmount()
      renderProvider()

      expect(harness.getViewportContent()).toBe(`width=${BREAKPOINTS.xs}`)

      harness.rotate('landscape')

      expect(harness.getViewportContent()).toBe(INITIAL_VIEWPORT_CONTENT)
    })
  })
})
