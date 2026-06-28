'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'

import styles from './index.module.css'

import { CircleButton } from '~/components/ui/buttons/CircleButton'
import { SvgIcon } from '~/components/ui/icons/SvgIcon'
import { LayoutInner } from '~/components/ui/layouts/LayoutInner'
import { STATIC_IMAGE_DIR, SITE_NAME, CACHE_BUSTER } from '~/config/env'
import { routes } from '~/config/routes'
import { snsLinks } from '~/config/sns'
import { useI18n, useCurrentLocale } from '~/locales/client'
import { actSmoothScroll } from '~/utils/act-smooth-scroll'

export const LayoutFooter = () => {
  const locale = useCurrentLocale()
  const t = useI18n()
  const router = useRouter()
  const currentYear: number = new Date().getFullYear()

  const footerMenuItems: {
    id: string
    title: string
    url: string
    elmId?: string
  }[] = [
    {
      id: routes.home.id,
      title: t('home.title'),
      url: routes.home.url({
        locale,
      }),
    },
    {
      id: routes.blogs.id,
      title: t('blogs.title'),
      url: routes.blogs.url({
        locale,
      }),
    },
    {
      id: routes.about.id,
      title: t('about.title'),
      url: routes.about.url({
        locale,
      }),
    },
    {
      id: routes.works.id,
      title: t('works.title'),
      url: routes.works.url({
        locale,
      }),
    },
    {
      id: routes.hobby.id,
      title: t('hobby.title'),
      url: routes.hobby.url({
        locale,
      }),
    },
    {
      id: routes.contact.id,
      title: t('contact.title'),
      url: routes.contact.url({
        locale,
      }),
    },
  ]

  const footerSnsLinks: {
    id: string
    url: string
    title: string
    icon: ReactNode
  }[] = [
    {
      id: snsLinks.x.id,
      url: snsLinks.x.url,
      title: snsLinks.x.title,
      icon: <SvgIcon variant='x' className={styles.LayoutFooterSns__icon} />,
    },
    {
      id: snsLinks.instagram.id,
      url: snsLinks.instagram.url,
      title: snsLinks.instagram.title,
      icon: (
        <SvgIcon variant='instagram' className={styles.LayoutFooterSns__icon} />
      ),
    },
    {
      id: snsLinks.github.id,
      url: snsLinks.github.url,
      title: snsLinks.github.title,
      icon: (
        <SvgIcon variant='github' className={styles.LayoutFooterSns__icon} />
      ),
    },
    {
      id: snsLinks.youtube.id,
      url: snsLinks.youtube.url,
      title: snsLinks.youtube.title,
      icon: (
        <SvgIcon variant='youtube' className={styles.LayoutFooterSns__icon} />
      ),
    },
    {
      id: snsLinks.qiita.id,
      url: snsLinks.qiita.url,
      title: snsLinks.qiita.title,
      icon: (
        <SvgIcon variant='qiita' className={styles.LayoutFooterSns__icon} />
      ),
    },
    {
      id: snsLinks.note.id,
      url: snsLinks.note.url,
      title: snsLinks.note.title,
      icon: <SvgIcon variant='note' className={styles.LayoutFooterSns__icon} />,
    },
    {
      id: snsLinks.behance.id,
      url: snsLinks.behance.url,
      title: snsLinks.behance.title,
      icon: (
        <SvgIcon variant='behance' className={styles.LayoutFooterSns__icon} />
      ),
    },
    {
      id: snsLinks.pixiv.id,
      url: snsLinks.pixiv.url,
      title: snsLinks.pixiv.title,
      icon: (
        <SvgIcon variant='pixiv' className={styles.LayoutFooterSns__icon} />
      ),
    },
  ]

  const movePage = ({ url, id }: { url: string; id?: string }) => {
    if (id && document.querySelector(`#${id}`)) {
      actSmoothScroll(`#${id}`)
      return
    }

    router.push(url)
  }

  return (
    <footer className={styles.LayoutFooter}>
      <div className={styles.LayoutFooterBackToTop}>
        <div className={styles.LayoutFooterBackToTop__container}>
          <CircleButton
            className={styles.LayoutFooterBackToTop__button}
            title='ページトップに戻る'
            onClick={() => {
              actSmoothScroll('#')
            }}
            variant='outlined'
          >
            <SvgIcon
              variant='arrowTop'
              className={styles.LayoutFooterBackToTop__icon}
            />
          </CircleButton>
        </div>
      </div>

      <div className={styles.LayoutFooter__wrapper}>
        <div className={styles.LayoutFooter__contents}>
          <LayoutInner>
            <div className={styles.LayoutFooterContents}>
              <div className={styles.LayoutFooterLogo}>
                <figure className={styles.LayoutFooterLogo__container}>
                  <Image
                    src={`${STATIC_IMAGE_DIR}/img-logo.svg?${CACHE_BUSTER}`}
                    alt={SITE_NAME}
                    width='288'
                    height='51'
                    className={styles.LayoutFooterLogo__image}
                  />
                </figure>
              </div>
              <div className={styles.LayoutFooterNavigation}>
                <nav className={styles.LayoutFooterNavigation__container}>
                  <ul className={styles.LayoutFooterNavigation__items}>
                    {footerMenuItems.map((info) => (
                      <li
                        className={styles.LayoutFooterNavigation__item}
                        key={info.id}
                      >
                        {info.elmId ? (
                          <button
                            type='button'
                            className={styles.LayoutFooterNavigation__link}
                            onClick={() => {
                              movePage({
                                url: info.url,
                                id: info.elmId,
                              })
                            }}
                          >
                            <SvgIcon
                              variant='arrowRight'
                              className={styles.LayoutFooterNavigation__icon}
                            />
                            <span
                              className={styles.LayoutFooterNavigation__text}
                            >
                              {info.title}
                            </span>
                          </button>
                        ) : (
                          <Link
                            href={info.url}
                            className={styles.LayoutFooterNavigation__link}
                          >
                            <SvgIcon
                              variant='arrowRight'
                              className={styles.LayoutFooterNavigation__icon}
                            />
                            <span
                              className={styles.LayoutFooterNavigation__text}
                            >
                              {info.title}
                            </span>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className={styles.LayoutFooterSns}>
                <ul className={styles.LayoutFooterSns__items}>
                  {footerSnsLinks.map((info) => (
                    <li className={styles.LayoutFooterSns__item} key={info.id}>
                      <a
                        href={info.url}
                        className={clsx(
                          styles.LayoutFooterSns__link,
                          styles[`LayoutFooterSns__link--${info.id}`],
                        )}
                        target='_blank'
                        rel='noopener noreferrer'
                        title={info.title}
                        aria-label={info.title}
                      >
                        {info.icon}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </LayoutInner>
        </div>

        <div className={styles.LayoutFooter__copy}>
          <LayoutInner>
            <div className={styles.LayoutFooterCopy}>
              <p className={styles.LayoutFooterCopy__paragraph}>
                <small
                  className={styles.LayoutFooterCopy__text}
                  lang='en'
                  translate='no'
                >
                  Copyright &copy; {currentYear} NiNE, All rights reserved.
                </small>
              </p>
            </div>
          </LayoutInner>
        </div>
      </div>
    </footer>
  )
}
