import Image from 'next/image'

import styles from './index.module.css'

import { STATIC_IMAGE_DIR, CACHE_BUSTER } from '@/config/env'

export const LayoutPageBackground = () => {
  return (
    <div className={styles.LayoutPageBackground}>
      <Image
        src={`${STATIC_IMAGE_DIR}/img-page-background.webp?${CACHE_BUSTER}`}
        alt=''
        width='3840'
        height='2160'
        className={styles.LayoutPageBackground__image}
        priority
      />
    </div>
  )
}
