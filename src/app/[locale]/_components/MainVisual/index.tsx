'use client'

import Image from 'next/image'

import styles from './index.module.css'

import { BaseButton } from '~/components/ui/buttons/BaseButton'
import { LayoutInner } from '~/components/ui/layouts/LayoutInner'
import { SITE_NAME } from '~/config/env'
import { STATIC_IMAGE_DIR, CACHE_BUSTER } from '~/config/env'
import { routes } from '~/config/routes'
import { useCurrentLocale, useScopedI18n } from '~/locales/client'

export const MainVisual = () => {
  const locale = useCurrentLocale()
  const scopedT = useScopedI18n('home.mainVisual')

  return (
    <div className={styles.MainVisual}>
      <div className={styles.MainVisualBackground}>
        <div className={styles.MainVisualBackground__container}>
          <figure className={styles.MainVisualBackgroundImage}>
            <Image
              src={`${STATIC_IMAGE_DIR}/img-home-main-visual.avif?${CACHE_BUSTER}`}
              alt=''
              fill
              className={styles.MainVisualBackgroundImage__image}
              priority
            />
          </figure>
        </div>
      </div>
      <div className={styles.MainVisual__wrapper}>
        <LayoutInner>
          <div className={styles.MainVisual__container}>
            <div className={styles.MainVisualLogo}>
              <figure className={styles.MainVisualLogoImage}>
                <Image
                  src={`${STATIC_IMAGE_DIR}/img-logo.svg?${CACHE_BUSTER}`}
                  alt={SITE_NAME}
                  width='140'
                  height='25'
                  className={styles.MainVisualLogoImage__image}
                  priority
                />
              </figure>
              <p className={styles.MainVisualLogo__paragraph}>
                WEB DESIGN & FRONT-END
                <br />
                PORTFOLIO
              </p>
            </div>
            <div className={styles.MainVisualTitle}>
              <h1 className={styles.MainVisualTitle__text}>
                From Design
                <br />
                to Code
              </h1>
            </div>
            <div className={styles.MainVisualLead}>
              <p
                className={styles.MainVisualLead__paragraph}
                dangerouslySetInnerHTML={{
                  __html: scopedT('lead.text'),
                }}
              />
            </div>
            <div className={styles.MainVisualButton}>
              <ul className={styles.MainVisualButton__items}>
                <li className={styles.MainVisualButton__item}>
                  <BaseButton
                    url={routes.works.url({
                      locale,
                    })}
                    text={scopedT('button.works.text')}
                    isRightArrow
                  />
                </li>
                <li className={styles.MainVisualButton__item}>
                  <BaseButton
                    url={routes.contact.url({
                      locale,
                    })}
                    text={scopedT('button.contact.text')}
                    variant='outlined'
                    color='light'
                  />
                </li>
              </ul>
            </div>
          </div>
        </LayoutInner>
      </div>
    </div>
  )
}
