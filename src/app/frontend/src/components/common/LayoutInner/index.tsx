import { ReactNode } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'

type Props = {
  children: ReactNode
  className?: string
}

export const LayoutInner = ({ children, className }: Props) => {
  return <div className={clsx(styles.LayoutInner, className)}>{children}</div>
}
