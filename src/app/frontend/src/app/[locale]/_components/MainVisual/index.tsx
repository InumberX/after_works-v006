import styles from './index.module.scss'
import Image from 'next/image'
import { STATIC_IMAGE_DIR, CASH_BUSTER } from '@/config/env'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'

export const MainVisual = () => {
  return (
    <div className={styles.MainVisual}>
      <figure className={styles.MainVisualBackground}>
        <Image
          src={`${STATIC_IMAGE_DIR}/img-top-main_visual.webp?${CASH_BUSTER}`}
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
                  From design <br className='Obj--xs Obj--sm' />
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
