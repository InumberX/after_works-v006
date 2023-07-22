import styles from './index.module.scss'

export const LayoutPortal = () => {
  return (
    <div className={styles.LayoutPortal}>
      <div id='portal-modal' className={styles.LayoutPortal__modal} />
    </div>
  )
}
