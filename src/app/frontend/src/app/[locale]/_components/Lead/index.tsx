'use client'

import clsx from 'clsx'
import Image from 'next/image'

import styles from './index.module.css'

import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { LayoutSection } from '@/components/ui/layouts/LayoutSection'
import { STATIC_IMAGE_DIR, CACHE_BUSTER } from '@/config/env'
import { useAnimelm, type AnimelmElement } from '@/hooks/use-animelm'
import { useScopedI18n } from '@/locales/client'

export const Lead = () => {
  const scopedT = useScopedI18n('home.lead')
  const { targetRef: leadImageTargetRef } = useAnimelm<AnimelmElement>()
  const { targetRef: leadMessageTargetRef } = useAnimelm<AnimelmElement>()

  return (
    <LayoutSection className={styles.Lead} tag='div'>
      <div className={styles.Lead__wrapper}>
        <figure
          className={clsx(styles.LeadImage, 'AnimelmBlurIn')}
          ref={leadImageTargetRef}
        >
          <Image
            src={`${STATIC_IMAGE_DIR}/img-top-lead.webp?${CACHE_BUSTER}`}
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
                  ref={leadMessageTargetRef}
                />
              </div>
            </div>
          </LayoutInner>
        </div>
      </div>
    </LayoutSection>
  )
}
