import clsx from 'clsx'
import { ReactNode } from 'react'

import styles from './index.module.css'

type Props = {
  className?: string
  mainColumn: ReactNode
  sideColumn: ReactNode
}

export const LayoutParallel = ({
  className,
  mainColumn,
  sideColumn,
}: Props) => {
  return (
    <div className={clsx(styles.LayoutParallel, className)}>
      <div className={styles.LayoutParallel__container}>
        <div className={styles.LayoutParallel__main}>{mainColumn}</div>

        <aside className={styles.LayoutParallel__side}>{sideColumn}</aside>
      </div>
    </div>
  )
}
