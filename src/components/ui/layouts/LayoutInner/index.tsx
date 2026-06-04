import clsx from 'clsx'
import { ReactNode } from 'react'

import styles from './index.module.css'

type Props = {
  children: ReactNode
  className?: string
  size?: 'small'
}

export const LayoutInner = ({ children, className, size }: Props) => {
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
