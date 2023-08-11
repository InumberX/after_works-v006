'use client'

import { ReactNode, useEffect } from 'react'
import { useAtom } from 'jotai'
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
  xs: 320,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
} as const

export const BreakpointsProvider = ({ children }: { children: ReactNode }) => {
  const [isBreakpointXxs, setIsBreakpointXxs] = useAtom(isBreakpointXxsAtom)
  const [, setIsBreakpointXs] = useAtom(isBreakpointXsAtom)
  const [, setIsBreakpointSm] = useAtom(isBreakpointSmAtom)
  const [, setIsBreakpointMd] = useAtom(isBreakpointMdAtom)
  const [, setIsBreakpointLg] = useAtom(isBreakpointLgAtom)
  const [, setIsBreakpointXl] = useAtom(isBreakpointXlAtom)
  const [, setIsBreakpointXxl] = useAtom(isBreakpointXxlAtom)

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
    if (e && e.matches) {
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

  useEffect(() => {
    if (!document) {
      return
    }

    const viewport = document.querySelector('meta[name="viewport"]')

    if (!viewport) {
      return
    }

    viewport.setAttribute(
      'content',
      isBreakpointXxs
        ? `width=${BREAKPOINTS.xs}`
        : 'width=device-width, initial-scale=1.0, minimum-scale=1.0, shrink-to-fit=no, viewport-fit=cover',
    )
  }, [isBreakpointXxs])

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
        BREAKPOINTS.xl - 1
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
  }, [])

  return <>{children}</>
}
