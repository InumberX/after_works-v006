'use client'

import type { RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'

export type AnimelmElement =
  | HTMLParagraphElement
  | HTMLDivElement
  | HTMLHeadingElement

type UseAnimelmOptions = {
  threshold?: number
  rootMargin?: string
}

export const useAnimelm = <T extends HTMLElement>({
  options,
}: {
  options?: UseAnimelmOptions
} = {}): {
  isVisible: boolean
  targetRef: RefObject<T | null>
} => {
  const [isVisible, setIsVisible] = useState(false)
  const targetRef = useRef<T | null>(null)

  useEffect(() => {
    const currentRef = targetRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        // スムーススクロール中の場合
        if (document.body.classList.contains('Scrolling')) {
          return
        }

        if (!entry || !entry.isIntersecting) {
          return
        }

        const target = entry.target
        const delay = target.getAttribute('data-animelm-delay')

        observer.unobserve(entry.target)

        // 遅延開始が指定されている場合
        if (delay != null && delay !== '') {
          ;((param, time) => {
            setTimeout(() => {
              param.classList.add('Animelm--active')
            }, time)
          })(target, Number(delay))

          return
        }

        setIsVisible(true)
        target.classList.add('Animelm--active')
      },
      {
        root: null,
        rootMargin: options?.rootMargin || '-15% 0px',
        threshold: options?.threshold || 0,
      },
    )

    if (!currentRef) {
      return
    }

    observer.observe(currentRef)

    return () => {
      if (!currentRef) {
        return
      }

      observer.unobserve(currentRef)
    }
  }, [options, isVisible])

  return {
    isVisible,
    targetRef,
  }
}
