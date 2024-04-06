import Image from 'next/image'
import { STATIC_IMAGE_DIR, CASH_BUSTER } from '@/config/env'
import styles from './index.module.scss'

export const LayoutPageBackground = () => {
  return (
    <div className={styles.LayoutPageBackground}>
      <Image
        src={`${STATIC_IMAGE_DIR}/img-page-background.webp?${CASH_BUSTER}`}
        alt=''
        width='3840'
        height='2160'
        className={styles.LayoutPageBackground__image}
        priority
      />
    </div>
  )
}
