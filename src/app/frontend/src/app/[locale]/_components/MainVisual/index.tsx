import Image from 'next/image'

import styles from './index.module.css'

import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { STATIC_IMAGE_DIR, CACHE_BUSTER } from '@/config/env'

export const MainVisual = () => {
  return (
    <div className={styles.MainVisual}>
      <figure className={styles.MainVisualBackground}>
        <Image
          src={`${STATIC_IMAGE_DIR}/img-top-main-visual.webp?${CACHE_BUSTER}`}
          alt=''
          fill
          className={styles.MainVisualBackground__image}
          priority
        />
      </figure>
      <div className={styles.MainVisual__wrapper}>
        <LayoutInner>
          <div className={styles.MainVisual__container}>
            <div className={styles.MainVisual__contents}>
              <div className={styles.MainVisualTitle}>
                <h1 className={styles.MainVisualTitle__text}>
                  From design <br className='Obj__sm--reverse' />
                  to coding
                </h1>
              </div>
            </div>
          </div>
        </LayoutInner>
      </div>
    </div>
  )
}
