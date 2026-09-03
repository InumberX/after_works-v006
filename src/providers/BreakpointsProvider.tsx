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

// 端末の物理的な画面幅が最小ブレイクポイント未満かを判定する処理
// meta[name="viewport"] の書き換えで変化しない window.screen.width を使うことで、
// 「viewportを書き換える → レイアウトビューポート幅が変わる → 判定が反転する」
// という無限ループを構造的に発生させないようにしている
const checkNarrowDevice = (): boolean => {
  const deviceWidth = window.screen?.width

  if (typeof deviceWidth !== 'number') {
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

  // 初回レンダー時点で確定させ、マウント直後の余計な書き換えを発生させない
  const [isNarrowDevice, setIsNarrowDevice] = useState(() =>
    typeof window === 'undefined' ? false : checkNarrowDevice(),
  )
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
