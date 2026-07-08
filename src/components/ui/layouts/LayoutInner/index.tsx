import clsx from 'clsx'
import type { ReactNode } from 'react'

import styles from './index.module.css'

export type LayoutInnerProps = {
  children: ReactNode
  className?: string
  size?: 'small' | 'medium' | 'large' | 'maximum' | 'full'
}

export const LayoutInner = ({
  children,
  className,
  size = 'medium',
}: LayoutInnerProps) => {
  return (
    <div
      className={clsx(
        styles.LayoutInner,
        className,
        size && styles[`LayoutInner--${size}`],
      )}
    >
      {children}
    </div>
  )
}
