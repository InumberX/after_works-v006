'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { STATIC_IMAGE_DIR, CASH_BUSTER } from '@/config/env'
import styles from './index.module.css'
import { LayoutSection } from '@/components/ui/layouts/LayoutSection'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { useScopedI18n } from '@/locales/client'
import { useAnimelm, type AnimelmElement } from '@/hooks/use-animelm'

export type ProfileProps = {
  certifications: {
    name: string
    url: string
  }[]
  skills: string[]
}

export const Profile = ({ certifications, skills }: ProfileProps) => {
  const scopedT = useScopedI18n('about.profile')
  const { targetRef } = useAnimelm<AnimelmElement>()

  return (
    <LayoutSection className={styles.Profile}>
      <LayoutInner size='small'>
        <div
          className={clsx(styles.Profile__container, 'AnimelmBlurIn')}
          ref={targetRef}
        >
          <figure className={styles.ProfileIcon}>
            <Image
              src={`${STATIC_IMAGE_DIR}/img-profile.svg?${CASH_BUSTER}`}
              width={80}
              height={80}
              alt={scopedT('title')}
              className={styles.ProfileIcon__image}
            />
          </figure>

          <div className={styles.ProfileTitle}>
            <h2 className={styles.ProfileTitle__main}>{scopedT('title')}</h2>

            <span className={styles.ProfileTitle__sub}>
              {scopedT('subTitle')}
            </span>
          </div>

          <div className={styles.ProfileInfo}>
            <div className={styles.ProfileInfo__contents}>
              <div className={styles.ProfileInfoTitle}>
                <h3 className={styles.ProfileInfoTitle__text}>
                  {scopedT('certification.title')}
                </h3>
              </div>

              <div className={styles.ProfileInfoDescription}>
                <ul className={styles.ProfileInfoDescription__items}>
                  {certifications.map((info, i) => (
                    <li key={i} className={styles.ProfileInfoDescription__item}>
                      <a
                        href={info.url}
                        className={styles.ProfileInfoDescription__link}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <span className={styles.ProfileInfoDescription__text}>
                          {info.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.ProfileInfo__contents}>
              <div className={styles.ProfileInfoTitle}>
                <h3 className={styles.ProfileInfoTitle__text}>
                  {scopedT('skill.title')}
                </h3>
              </div>

              <div className={styles.ProfileInfoDescription}>
                <ul className={styles.ProfileInfoDescription__items}>
                  {skills.map((info, i) => (
                    <li key={i} className={styles.ProfileInfoDescription__item}>
                      <span className={styles.ProfileInfoDescription__text}>
                        {info}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </LayoutInner>
    </LayoutSection>
  )
}
