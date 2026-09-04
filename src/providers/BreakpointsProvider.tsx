'use client'

import { useAtom } from 'jotai'
import { type ReactNode, useEffect, useRef, useState } from 'react'

import {
  isBreakpointXxsAtom,
  isBreakpointXsAtom,
  isBreakpointSmAtom,
  isBreakpointMdAtom,
  isBreakpointLgAtom,
  isBreakpointXlAtom,
  isBreakpointXxlAtom,
} from '~/store/breakpoints'

export const BREAKPOINTS = {
  xs: 360,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
} as const

// meta[name="viewport"] が取得できなかった場合のフォールバック
const DEFAULT_VIEWPORT_CONTENT =
  'width=device-width, initial-scale=1.0, minimum-scale=1.0, shrink-to-fit=no, viewport-fit=cover'

// 端末の画面幅を取得する処理
// meta[name="viewport"] の書き換えで変化しない window.screen を使うことで、
// 「viewportを書き換える → レイアウトビューポート幅が変わる → 判定が反転する」
// という無限ループを構造的に発生させないようにしている
//
// なおwindow.screenは端末の画面であってアプリのウィンドウではないため、
// 分割画面や狭いWebViewのようにウィンドウが画面より狭いケースは検知できない。
// これらを検知するにはレイアウトビューポート幅を読む必要があり、
// それは上記の無限ループの原因そのものになるため、意図的に対象外としている。
const getDeviceWidth = (): number => {
  const deviceScreen = window.screen

  if (!deviceScreen) {
    return 0
  }

  const { width, height } = deviceScreen

  // jsdomなど画面サイズを持たない環境では0になる
  // ここで打ち切ることで、後続の向きの判定にも到達させない
  if (!Number.isFinite(width) || width <= 0) {
    return 0
  }

  // iOS Safariは回転してもscreen.width/heightが入れ替わらないため、
  // 向きに応じて短辺・長辺を選び直す
  const orientationType = deviceScreen.orientation?.type
  const isLandscape =
    typeof orientationType === 'string'
      ? orientationType.startsWith('landscape')
      : window.matchMedia('(orientation: landscape)').matches

  // heightが取得できない場合、縦向きならwidthが短辺そのものなので判定できるが、
  // 横向きは長辺が分からず実際の幅を求められない。書き換えない側に倒す
  if (!Number.isFinite(height) || height <= 0) {
    return isLandscape ? 0 : width
  }

  return isLandscape ? Math.max(width, height) : Math.min(width, height)
}

// 端末の画面幅が最小ブレイクポイント未満かを判定する処理
const checkNarrowDevice = (): boolean => {
  const deviceWidth = getDeviceWidth()

  // jsdomなど画面サイズを持たない環境では0になるため、狭い端末とはみなさない
  if (deviceWidth <= 0) {
    return false
  }

  return deviceWidth < BREAKPOINTS.xs
}

export const BreakpointsProvider = ({ children }: { children: ReactNode }) => {
  const [, setIsBreakpointXxs] = useAtom(isBreakpointXxsAtom)
  const [, setIsBreakpointXs] = useAtom(isBreakpointXsAtom)
  const [, setIsBreakpointSm] = useAtom(isBreakpointSmAtom)
  const [, setIsBreakpointMd] = useAtom(isBreakpointMdAtom)
  const [, setIsBreakpointLg] = useAtom(isBreakpointLgAtom)
  const [, setIsBreakpointXl] = useAtom(isBreakpointXlAtom)
  const [, setIsBreakpointXxl] = useAtom(isBreakpointXxlAtom)

  // 判定はレンダー中ではなくマウント後に行う
  // 初期値と同じcontentへの書き換えは後段のガードで抑止されるため、
  // レンダー中にwindowへ触れてまで初期値を確定させる必要はない
  const [isNarrowDevice, setIsNarrowDevice] = useState(false)
  const defaultViewportContentRef = useRef<string | null>(null)

  // ブレイクポイントの各判定をセットする処理
  const setCurrentBreakPointXxs = () => {
    setIsBreakpointXxs(true)
    setIsBreakpointXs(false)
    setIsBreakpointSm(false)
    setIsBreakpointMd(false)
    setIsBreakpointLg(false)
    setIsBreakpointXl(false)
    setIsBreakpointXxl(false)
  }
  const setCurrentBreakPointXs = () => {
    setIsBreakpointXxs(false)
    setIsBreakpointXs(true)
    setIsBreakpointSm(false)
    setIsBreakpointMd(false)
    setIsBreakpointLg(false)
    setIsBreakpointXl(false)
    setIsBreakpointXxl(false)
  }
  const setCurrentBreakPointSm = () => {
    setIsBreakpointXxs(false)
    setIsBreakpointXs(false)
    setIsBreakpointSm(true)
    setIsBreakpointMd(false)
    setIsBreakpointLg(false)
    setIsBreakpointXl(false)
    setIsBreakpointXxl(false)
  }
  const setCurrentBreakPointMd = () => {
    setIsBreakpointXxs(false)
    setIsBreakpointXs(false)
    setIsBreakpointSm(false)
    setIsBreakpointMd(true)
    setIsBreakpointLg(false)
    setIsBreakpointXl(false)
    setIsBreakpointXxl(false)
  }
  const setCurrentBreakPointLg = () => {
    setIsBreakpointXxs(false)
    setIsBreakpointXs(false)
    setIsBreakpointSm(false)
    setIsBreakpointMd(false)
    setIsBreakpointLg(true)
    setIsBreakpointXl(false)
    setIsBreakpointXxl(false)
  }
  const setCurrentBreakPointXl = () => {
    setIsBreakpointXxs(false)
    setIsBreakpointXs(false)
    setIsBreakpointSm(false)
    setIsBreakpointMd(false)
    setIsBreakpointLg(false)
    setIsBreakpointXl(true)
    setIsBreakpointXxl(false)
  }
  const setCurrentBreakPointXxl = () => {
    setIsBreakpointXxs(false)
    setIsBreakpointXs(false)
    setIsBreakpointSm(false)
    setIsBreakpointMd(false)
    setIsBreakpointLg(false)
    setIsBreakpointXl(false)
    setIsBreakpointXxl(true)
  }

  // ブレイクポイントを判定する処理
  const checkBreakPointXxs = (
    e: MediaQueryList | MediaQueryListEvent,
  ): void => {
    if (e.matches) {
      setCurrentBreakPointXxs()
    }
  }
  const checkBreakPointXs = (e: MediaQueryList | MediaQueryListEvent): void => {
    if (e.matches) {
      setCurrentBreakPointXs()
    }
  }
  const checkBreakPointSm = (e: MediaQueryList | MediaQueryListEvent): void => {
    if (e.matches) {
      setCurrentBreakPointSm()
    }
  }
  const checkBreakPointMd = (e: MediaQueryList | MediaQueryListEvent): void => {
    if (e.matches) {
      setCurrentBreakPointMd()
    }
  }
  const checkBreakPointLg = (e: MediaQueryList | MediaQueryListEvent): void => {
    if (e.matches) {
      setCurrentBreakPointLg()
    }
  }
  const checkBreakPointXl = (e: MediaQueryList | MediaQueryListEvent): void => {
    if (e.matches) {
      setCurrentBreakPointXl()
    }
  }
  const checkBreakPointXxl = (
    e: MediaQueryList | MediaQueryListEvent,
  ): void => {
    if (e.matches) {
      setCurrentBreakPointXxl()
    }
  }

  // 端末の物理的な画面幅の監視
  useEffect(() => {
    const handleCheckNarrowDevice = () => {
      setIsNarrowDevice(checkNarrowDevice())
    }

    // 初回チェック
    handleCheckNarrowDevice()

    // 画面回転などで物理的な画面幅が入れ替わった場合に追従する
    window.addEventListener('resize', handleCheckNarrowDevice)
    window.addEventListener('orientationchange', handleCheckNarrowDevice)

    return () => {
      window.removeEventListener('resize', handleCheckNarrowDevice)
      window.removeEventListener('orientationchange', handleCheckNarrowDevice)
    }
  }, [])

  // viewportの書き換え
  useEffect(() => {
    const viewport = document.querySelector('meta[name="viewport"]')

    if (!viewport) {
      return
    }

    // 初期状態のcontentを保持しておき、通常時はそのまま復元する
    if (defaultViewportContentRef.current === null) {
      defaultViewportContentRef.current =
        viewport.getAttribute('content') ?? DEFAULT_VIEWPORT_CONTENT
    }

    const nextContent = isNarrowDevice
      ? `width=${BREAKPOINTS.xs}`
      : defaultViewportContentRef.current

    // 同じ値での書き換えはレイアウトを揺らすだけなので行わない
    if (viewport.getAttribute('content') === nextContent) {
      return
    }

    viewport.setAttribute('content', nextContent)
  }, [isNarrowDevice])

  // アンマウント時のviewportの復元
  // 書き換えたまま外れると、再マウント時に `width=360` を初期状態として
  // 記録してしまい、以降どの端末幅でも元のcontentに戻せなくなる
  useEffect(() => {
    return () => {
      const viewport = document.querySelector('meta[name="viewport"]')
      const defaultContent = defaultViewportContentRef.current

      if (!viewport || defaultContent === null) {
        return
      }

      if (viewport.getAttribute('content') === defaultContent) {
        return
      }

      viewport.setAttribute('content', defaultContent)
    }
  }, [])

  useEffect(() => {
    // ブレイクポイント判定
    const matchMediaXxs: MediaQueryList = window.matchMedia(
      `screen and (max-width: ${BREAKPOINTS.xs - 1}px)`,
    )
    const matchMediaXs: MediaQueryList = window.matchMedia(
      `screen and (min-width: ${BREAKPOINTS.xs}px) and (max-width: ${
        BREAKPOINTS.sm - 1
      }px)`,
    )
    const matchMediaSm: MediaQueryList = window.matchMedia(
      `screen and (min-width: ${BREAKPOINTS.sm}px) and (max-width: ${
        BREAKPOINTS.md - 1
      }px)`,
    )
    const matchMediaMd: MediaQueryList = window.matchMedia(
      `screen and (min-width: ${BREAKPOINTS.md}px) and (max-width: ${
        BREAKPOINTS.lg - 1
      }px)`,
    )
    const matchMediaLg: MediaQueryList = window.matchMedia(
      `screen and (min-width: ${BREAKPOINTS.lg}px) and (max-width: ${
        BREAKPOINTS.xl - 1
      }px)`,
    )
    const matchMediaXl: MediaQueryList = window.matchMedia(
      `screen and (min-width: ${BREAKPOINTS.xl}px) and (max-width: ${
        BREAKPOINTS.xxl - 1
      }px)`,
    )
    const matchMediaXxl: MediaQueryList = window.matchMedia(
      `screen and (min-width: ${BREAKPOINTS.xxl}px)`,
    )

    // ブレイクポイントの瞬間に発火
    matchMediaXxs.addEventListener('change', checkBreakPointXxs)
    matchMediaXs.addEventListener('change', checkBreakPointXs)
    matchMediaSm.addEventListener('change', checkBreakPointSm)
    matchMediaMd.addEventListener('change', checkBreakPointMd)
    matchMediaLg.addEventListener('change', checkBreakPointLg)
    matchMediaXl.addEventListener('change', checkBreakPointXl)
    matchMediaXxl.addEventListener('change', checkBreakPointXxl)

    // 初回チェック
    checkBreakPointXxs(matchMediaXxs)
    checkBreakPointXs(matchMediaXs)
    checkBreakPointSm(matchMediaSm)
    checkBreakPointMd(matchMediaMd)
    checkBreakPointLg(matchMediaLg)
    checkBreakPointXl(matchMediaXl)
    checkBreakPointXxl(matchMediaXxl)

    return () => {
      matchMediaXxs.removeEventListener('change', checkBreakPointXxs)
      matchMediaXs.removeEventListener('change', checkBreakPointXs)
      matchMediaSm.removeEventListener('change', checkBreakPointSm)
      matchMediaMd.removeEventListener('change', checkBreakPointMd)
      matchMediaLg.removeEventListener('change', checkBreakPointLg)
      matchMediaXl.removeEventListener('change', checkBreakPointXl)
      matchMediaXxl.removeEventListener('change', checkBreakPointXxl)
    }
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}
