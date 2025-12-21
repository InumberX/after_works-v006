import clsx from 'clsx'

import styles from './index.module.css'

export type BaseTagProps = {
  className?: string
  id: string
  name: string
}

export const BaseTag = ({ className, name }: BaseTagProps) => {
  return (
    <span className={clsx(styles.BaseTag, className)}>
      <span className={styles.BaseTag__text}>{name}</span>
    </span>
  )
}
