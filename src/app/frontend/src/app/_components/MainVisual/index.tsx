import styles from './index.module.scss'
import Image from 'next/image'
import { STATIC_IMAGE_DIR } from '~/config/env'
import { LayoutInner } from '~/components/ui/layouts/LayoutInner'

export const MainVisual = () => {
  return (
    <div className={styles.MainVisual}>
      <figure className={styles.MainVisualBackground}>
        <Image
          src={`${STATIC_IMAGE_DIR}/img-top-main_visual.png`}
          alt=''
          fill
          className={styles.MainVisualBackground__image}
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