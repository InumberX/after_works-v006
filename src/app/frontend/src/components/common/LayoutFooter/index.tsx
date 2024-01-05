'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { routes } from '@/config/routes'
import { snsInfos } from '@/config/sns'
import { actSmoothScroll } from '@/utils/actSmoothScroll'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { SvgIcon } from '@/components/ui/icons/SvgIcon'
import { CircleButton } from '@/components/ui/buttons/CircleButton'
import styles from './index.module.scss'
import { useI18n, useCurrentLocale } from '@/locales/client'

export const LayoutFooter = () => {
  const locale = useCurrentLocale()
  const t = useI18n()
  const router = useRouter()
  const currentYear: number = new Date().getFullYear()

  const footerMenuInfos: {
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

  const footerSnsInfos: {
    id: string
    url: string
    title: string
    icon: ReactNode
  }[] = [
    {
      id: snsInfos.x.id,
      url: snsInfos.x.url,
      title: snsInfos.x.title,
      icon: <SvgIcon variant='x' className={styles.LayoutFooterSns__icon} />,
    },
    {
      id: snsInfos.instagram.id,
      url: snsInfos.instagram.url,
      title: snsInfos.instagram.title,
      icon: (
        <SvgIcon variant='instagram' className={styles.LayoutFooterSns__icon} />
      ),
    },
    {
      id: snsInfos.github.id,
      url: snsInfos.github.url,
      title: snsInfos.github.title,
      icon: (
        <SvgIcon variant='github' className={styles.LayoutFooterSns__icon} />
      ),
    },
    {
      id: snsInfos.youtube.id,
      url: snsInfos.youtube.url,
      title: snsInfos.youtube.title,
      icon: (
        <SvgIcon variant='youtube' className={styles.LayoutFooterSns__icon} />
      ),
    },
    {
      id: snsInfos.qiita.id,
      url: snsInfos.qiita.url,
      title: snsInfos.qiita.title,
      icon: (
        <SvgIcon variant='qiita' className={styles.LayoutFooterSns__icon} />
      ),
    },
    {
      id: snsInfos.note.id,
      url: snsInfos.note.url,
      title: snsInfos.note.title,
      icon: <SvgIcon variant='note' className={styles.LayoutFooterSns__icon} />,
    },
    {
      id: snsInfos.behance.id,
      url: snsInfos.behance.url,
      title: snsInfos.behance.title,
      icon: (
        <SvgIcon variant='behance' className={styles.LayoutFooterSns__icon} />
      ),
    },
    {
      id: snsInfos.pixiv.id,
      url: snsInfos.pixiv.url,
      title: snsInfos.pixiv.title,
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
              <div className={styles.LayoutFooterNavigation}>
                <nav className={styles.LayoutFooterNavigation__container}>
                  <ul className={styles.LayoutFooterNavigation__items}>
                    {footerMenuInfos.map((info) => (
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
                  {footerSnsInfos.map((info) => (
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
                  Copyright &copy; {currentYear} N/NE, All rights reserved.
                </small>
              </p>
            </div>
          </LayoutInner>
        </div>
      </div>
    </footer>
  )
}
