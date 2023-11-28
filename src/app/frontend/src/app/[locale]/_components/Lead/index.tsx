import styles from './index.module.scss'
import Image from 'next/image'
import { STATIC_IMAGE_DIR, CASH_BUSTER } from '@/config/env'
import { LayoutSection } from '@/components/ui/layouts/LayoutSection'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { getScopedI18n } from '@/locales/server'

export const Lead = async () => {
  const scopedT = await getScopedI18n('home.lead')

  return (
    <LayoutSection className={styles.Lead} tag='div'>
      <div className={styles.Lead__wrapper}>
        <figure className={styles.LeadImage}>
          <Image
            src={`${STATIC_IMAGE_DIR}/img-top-lead.webp?${CASH_BUSTER}`}
            alt=''
            fill
            className={styles.LeadImage__image}
          />
        </figure>

        <div className={styles.Lead__container}>
          <LayoutInner>
            <div className={styles.Lead__contents}>
              <div className={styles.LeadMessage}>
                <p
                  className={styles.LeadMessage__paragraph}
                  dangerouslySetInnerHTML={{
                    __html: scopedT('message'),
                  }}
                />
              </div>
            </div>
          </LayoutInner>
        </div>
      </div>
    </LayoutSection>
  )
}
