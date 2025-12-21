import { ReactNode } from 'react'

import styles from './index.module.css'

type Props = {
  children: ReactNode
}

export const LayoutWrapper = ({ children }: Props) => {
  return <div className={styles.LayoutWrapper}>{children}</div>
}
