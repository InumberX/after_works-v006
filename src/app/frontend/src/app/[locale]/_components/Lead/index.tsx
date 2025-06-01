'use client'

import styles from './index.module.css'
import Image from 'next/image'
import clsx from 'clsx'
import { STATIC_IMAGE_DIR, CASH_BUSTER } from '@/config/env'
import { LayoutSection } from '@/components/ui/layouts/LayoutSection'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { useScopedI18n } from '@/locales/client'
import { useAnimelm, type AnimelmElement } from '@/hooks/use-animelm'

export const Lead = () => {
  const scopedT = useScopedI18n('home.lead')
  const animelmLeadImage = useAnimelm<AnimelmElement>()
  const animelmLeadMessage = useAnimelm<AnimelmElement>()

  return (
    <LayoutSection className={styles.Lead} tag='div'>
      <div className={styles.Lead__wrapper}>
        <figure
          className={clsx(styles.LeadImage, 'AnimelmBlurIn')}
          ref={animelmLeadImage.targetRef}
        >
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
                  className={clsx(
                    styles.LeadMessage__paragraph,
                    'AnimelmBlurIn',
                  )}
                  dangerouslySetInnerHTML={{
                    __html: scopedT('message'),
                  }}
                  ref={animelmLeadMessage.targetRef}
                />
              </div>
            </div>
          </LayoutInner>
        </div>
      </div>
    </LayoutSection>
  )
}
