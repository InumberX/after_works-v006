import { ReactNode } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'

type Props = {
  children: ReactNode
  className?: string
  tag?: keyof JSX.IntrinsicElements
  isFirst?: boolean
}

export const LayoutSection = ({ children, className, tag, isFirst }: Props) => {
  const Tag = tag ?? 'section'

  return (
    <Tag
      className={clsx(
        styles.LayoutSection,
        className,
        isFirst && styles['LayoutSection--first'],
      )}
    >
      {children}
    </Tag>
  )
}
