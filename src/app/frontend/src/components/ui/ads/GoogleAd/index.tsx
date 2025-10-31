'use client'

import clsx from 'clsx'
import styles from './index.module.css'
import { useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'

export type GoogleAdProps = {
  className?: string
  slot: string
  responsive?: boolean
  style?: object
}

export const GoogleAd = ({
  className,
  slot,
  responsive = false,
  style,
}: GoogleAdProps) => {
  const pathname = usePathname()
  const googleAdKey = useMemo(() => pathname.replace(/\//g, '-'), [pathname])

  useEffect(() => {
    try {
      /* eslint-disable */
      // @ts-ignore
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      /* eslint-enable */
    } catch (error) {
      console.error(error)
    }
  }, [pathname])

  return (
    <div
      key={`${googleAdKey}-${slot}`}
      className={clsx(styles.GoogleAd, className)}
    >
      <ins
        key={`${googleAdKey}-${slot}-ins`}
        className={clsx(styles.GoogleAd__ins, 'adsbygoogle')}
        style={{
          display: 'inline-block',
          inlineSize: '300px',
          blockSize: '300px',
          ...style,
        }}
        data-ad-client='ca-pub-6711167987812480'
        data-ad-slot={slot}
        data-full-width-responsive={responsive}
      />
    </div>
  )
}
