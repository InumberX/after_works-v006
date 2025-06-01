import styles from './index.module.css'

export const LayoutPortal = () => {
  return (
    <div className={styles.LayoutPortal}>
      <div id='portal-modal' className={styles.LayoutPortal__modal} />
    </div>
  )
}
