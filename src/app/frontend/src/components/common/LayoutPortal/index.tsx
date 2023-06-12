import styles from './index.module.scss'
import clsx from 'clsx'

type Props = {
  className?: string
}

export const LayoutPortal = ({ className }: Props) => {
  return (
    <div className={clsx(styles.LayoutPortal, className)}>
      <div id='portal-modal' className={styles.LayoutPortal__modal} />
    </div>
  )
}
