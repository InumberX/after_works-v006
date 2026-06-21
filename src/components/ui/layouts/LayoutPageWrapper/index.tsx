import clsx from 'clsx'
import { type ReactNode } from 'react'

import styles from './index.module.css'

type Props = {
  children?: ReactNode
  className?: string
  isHiddenBackground?: boolean
}

export const LayoutPageWrapper = ({
  children,
  className,
  isHiddenBackground = false,
}: Props) => {
  return (
    <div className={clsx(styles.LayoutPageWrapper, className)}>
      {!isHiddenBackground && (
        <div className={styles.LayoutPageWrapperBackground}>
          <div
            className={clsx(
              styles.LayoutPageWrapperBackground__contents,
              styles['LayoutPageWrapperBackground__contents--top'],
            )}
          />
          <div
            className={clsx(
              styles.LayoutPageWrapperBackground__contents,
              styles['LayoutPageWrapperBackground__contents--bottom'],
            )}
          />
        </div>
      )}
      {children}
    </div>
  )
}
