import { ReactNode } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'

type Props = {
  children: ReactNode
  className?: string
  tag?: keyof JSX.IntrinsicElements
}

export const LayoutSection = ({ children, className, tag }: Props) => {
  const Tag = tag ?? 'section'

  return <Tag className={clsx(styles.LayoutSection, className)}>{children}</Tag>
}
