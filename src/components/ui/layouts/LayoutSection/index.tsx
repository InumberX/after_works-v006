import clsx from 'clsx'
import { ReactNode, JSX } from 'react'

import styles from './index.module.css'

type Props = {
  children: ReactNode
  className?: string
  tag?: keyof JSX.IntrinsicElements
  isFirst?: boolean
  isNotTopMargin?: boolean
  isNotBottomMargin?: boolean
}

export const LayoutSection = ({
  children,
  className,
  tag,
  isFirst,
  isNotTopMargin,
  isNotBottomMargin,
}: Props) => {
  const Tag = tag ?? 'section'

  return (
    <Tag
      className={clsx(
        styles.LayoutSection,
        className,
        isFirst && styles['LayoutSection--first'],
        isNotTopMargin && styles['LayoutSection--notTopMargin'],
        isNotBottomMargin && styles['LayoutSection--notBottomMargin'],
      )}
    >
      {children}
    </Tag>
  )
}
