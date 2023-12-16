'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { useAtom } from 'jotai'
import { routes } from '@/config/routes'
import { STATIC_IMAGE_DIR, SITE_NAME, CASH_BUSTER } from '@/config/env'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import styles from './index.module.scss'
import { actSmoothScroll } from '@/utils/actSmoothScroll'
import {
  isBreakpointMdAtom,
  isBreakpointLgAtom,
  isBreakpointXlAtom,
  isBreakpointXxlAtom,
} from '@/store/breakpoints'
import { useI18n } from '@/locales/client'

export const LayoutHeader = () => {
  const t = useI18n()
  const [isShowMenu, setIsShowMenu] = useState(false)
  const router = useRouter()
  const [isBreakpointMd] = useAtom(isBreakpointMdAtom)
  const [isBreakpointLg] = useAtom(isBreakpointLgAtom)
  const [isBreakpointXl] = useAtom(isBreakpointXlAtom)
  const [isBreakpointXxl] = useAtom(isBreakpointXxlAtom)

  const headerMenuGlobalInfos: {
    id: string
    title: string
    url: string
    elmId?: string
  }[] = [
    {
      id: routes.home.id,
      title: t('home.title'),
      url: routes.home.url({}),
    },
    {
      id: routes.blogs.id,
      title: t('blogs.title'),
      url: routes.blogs.url({}),
    },
    {
      id: routes.about.id,
      title: t('about.title'),
      url: routes.about.url({}),
    },
    {
      id: routes.works.id,
      title: t('works.title'),
      url: routes.works.url({}),
    },
    {
      id: routes.hobby.id,
      title: t('hobby.title'),
      url: routes.hobby.url({}),
    },
    {
      id: routes.contact.id,
      title: t('contact.title'),
      url: routes.contact.url({}),
    },
  ]

  const toggleMenu = () => {
    if (!isShowMenu) {
      showMenu()

      return
    }

    hideMenu()
  }

  const showMenu = () => {
    setIsShowMenu(true)
  }

  const hideMenu = () => {
    setIsShowMenu(false)
  }

  const movePage = ({ url, id }: { url: string; id?: string }) => {
    if (id && document.querySelector(`#${id}`)) {
      if (!isShowMenu) {
        actSmoothScroll(`#${id}`)
        return
      }

      hideMenu()

      setTimeout(() => {
        actSmoothScroll(`#${id}`)
      }, 310)

      return
    }

    if (!isShowMenu) {
      router.push(url)
      return
    }

    hideMenu()

    setTimeout(() => {
      router.push(url)
    }, 310)
  }

  const isShowSmallMenu = useMemo(() => {
    // 特定の画面幅以上の場合
    if (isBreakpointMd || isBreakpointLg || isBreakpointXl || isBreakpointXxl) {
      return true
    }

    return false
  }, [isBreakpointMd, isBreakpointLg, isBreakpointXl, isBreakpointXxl])

  useEffect(() => {
    hideMenu()
  }, [isShowSmallMenu])

  return (
    <header className={styles.LayoutHeader}>
      <div className={styles.LayoutHeader__wrapper}>
        <LayoutInner className={styles.LayoutHeader__inner}>
          <div className={styles.LayoutHeader__container}>
            <div className={styles.LayoutHeaderLogo}>
              <Link
                href={routes.home.url({})}
                className={styles.LayoutHeaderLogo__link}
              >
                <Image
                  src={`${STATIC_IMAGE_DIR}/img-logo.svg?${CASH_BUSTER}`}
                  alt={SITE_NAME}
                  width='160'
                  height='28'
                  className={styles.LayoutHeaderLogo__image}
                />
              </Link>
            </div>

            <div className={styles.LayoutHeaderMenu}>
              <div className={styles.LayoutHeaderMenuGlobal}>
                <nav className={styles.LayoutHeaderMenuGlobal__navigation}>
                  <ul className={styles.LayoutHeaderMenuGlobal__items}>
                    {headerMenuGlobalInfos.map((info) => (
                      <li
                        className={styles.LayoutHeaderMenuGlobal__item}
                        key={info.id}
                      >
                        <button
                          type='button'
                          className={styles.LayoutHeaderMenuGlobal__link}
                          onClick={() => {
                            movePage({
                              url: info.url,
                              id: info.elmId,
                            })
                          }}
                        >
                          <span className={styles.LayoutHeaderMenuGlobal__text}>
                            {info.title}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className={styles.LayoutHeaderMenuButton}>
                <button
                  type='button'
                  className={styles.LayoutHeaderMenuButton__button}
                  onClick={toggleMenu}
                >
                  <span className={styles.LayoutHeaderMenuButton__container}>
                    <span className={styles.LayoutHeaderMenuButton__icons}>
                      <span className={styles.LayoutHeaderMenuButton__icon} />
                      <span className={styles.LayoutHeaderMenuButton__icon} />
                      <span className={styles.LayoutHeaderMenuButton__icon} />
                    </span>
                    <span className={styles.LayoutHeaderMenuButton__text}>
                      メニュー
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </LayoutInner>
      </div>

      <AnimatePresence mode='wait'>
        {isShowMenu && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className={styles.LayoutHeaderMenuOuter}
          >
            <div className={styles.LayoutHeaderMenuOuter__container}>
              <div
                className={clsx(
                  styles.LayoutHeaderMenuButton,
                  styles.LayoutHeaderMenuOuterButton,
                )}
              >
                <button
                  type='button'
                  className={clsx(
                    styles.LayoutHeaderMenuButton__button,
                    styles['LayoutHeaderMenuButton__button--active'],
                  )}
                  onClick={hideMenu}
                >
                  <span className={styles.LayoutHeaderMenuButton__container}>
                    <span className={styles.LayoutHeaderMenuButton__icons}>
                      <span className={styles.LayoutHeaderMenuButton__icon} />
                      <span className={styles.LayoutHeaderMenuButton__icon} />
                      <span className={styles.LayoutHeaderMenuButton__icon} />
                    </span>
                    <span className={styles.LayoutHeaderMenuButton__text}>
                      閉じる
                    </span>
                  </span>
                </button>
              </div>

              <div className={styles.LayoutHeaderMenuOuter__contents}>
                <div className={styles.LayoutHeaderMenuOuterNavigation}>
                  <nav
                    className={
                      styles.LayoutHeaderMenuOuterNavigation__container
                    }
                  >
                    <motion.ul
                      initial='hidden'
                      animate='show'
                      className={styles.LayoutHeaderMenuOuterNavigation__items}
                    >
                      {headerMenuGlobalInfos.map((info, i) => (
                        <motion.li
                          variants={{
                            hidden: {
                              opacity: 0,
                              transform: 'translateY(20px)',
                            },
                            show: {
                              opacity: 1,
                              transform: 'translateY(0)',
                              transition: {
                                duration: 0.6,
                                delay: 0.2 * (i + 1),
                              },
                            },
                          }}
                          className={
                            styles.LayoutHeaderMenuOuterNavigation__item
                          }
                          key={info.id}
                        >
                          <button
                            type='button'
                            className={
                              styles.LayoutHeaderMenuOuterNavigation__link
                            }
                            onClick={() => {
                              movePage({
                                url: info.url,
                                id: info.elmId,
                              })
                            }}
                          >
                            <span
                              className={
                                styles.LayoutHeaderMenuOuterNavigation__text
                              }
                            >
                              {info.title}
                            </span>
                          </button>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </nav>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode='wait'>
        {isShowMenu && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className={styles.LayoutHeaderOverlay}
            onClick={hideMenu}
          />
        )}
      </AnimatePresence>
    </header>
  )
}
