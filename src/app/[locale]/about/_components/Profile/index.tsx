'use client'

import clsx from 'clsx'
import Image from 'next/image'

import styles from './index.module.css'

import { LayoutInner } from '~/components/ui/layouts/LayoutInner'
import { LayoutSection } from '~/components/ui/layouts/LayoutSection'
import { ReplaceNewLineText } from '~/components/ui/typographies/ReplaceNewLineText'
import { SectionTitle } from '~/components/ui/typographies/SectionTitle'
import { STATIC_IMAGE_DIR, CACHE_BUSTER } from '~/config/env'
import { useAnimelm, type AnimelmElement } from '~/hooks/use-animelm'
import { useScopedI18n } from '~/locales/client'

export type ProfileProps = {
  lead: string
}

export const Profile = ({ lead }: ProfileProps) => {
  const scopedT = useScopedI18n('about.profile')
  const { targetRef } = useAnimelm<AnimelmElement>()

  return (
    <LayoutSection className={styles.Profile}>
      <LayoutInner>
        <div
          className={clsx(styles.Profile__container, 'AnimelmBlurIn')}
          ref={targetRef}
        >
          <div className={styles.ProfileIcon}>
            <figure className={styles.ProfileIconImage}>
              <Image
                src={`${STATIC_IMAGE_DIR}/img-profile.avif?${CACHE_BUSTER}`}
                width={880}
                height={1200}
                alt={scopedT('name')}
                className={styles.ProfileIconImage__image}
              />
            </figure>

            <div className={styles.ProfileIconTitle}>
              <h2 className={styles.ProfileIconTitle__main}>
                {scopedT('name')}
              </h2>
              <span className={styles.ProfileIconTitle__sub}>
                {scopedT('position')}
              </span>
            </div>
          </div>
          <div className={styles.ProfileContents}>
            <SectionTitle subTitle='PROFILE' title={scopedT('lead')} />
            <p className={styles.ProfileContents__lead}>
              <ReplaceNewLineText text={lead} />
            </p>
          </div>
        </div>
      </LayoutInner>
    </LayoutSection>
  )
}
