'use client'

import clsx from 'clsx'
import { useKeenSlider } from 'keen-slider/react'

import styles from './index.module.css'

import { CircleButton } from '@/components/ui/buttons/CircleButton'
import {
  ArticleCardProps,
  ArticleCard,
} from '@/components/ui/cards/ArticleCard'
import { SvgIcon } from '@/components/ui/icons/SvgIcon'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { BREAKPOINTS } from '@/providers/BreakpointsProvider'

type Props = {
  className?: string
  articleInfos: ArticleCardProps[]
}

export const ArticleSlider = ({ className, articleInfos }: Props) => {
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 1.2,
        origin: 'center',
        spacing: 0,
      },
      breakpoints: {
        [`(width >= ${BREAKPOINTS.sm}px)`]: {
          slides: {
            origin: 'auto',
            perView: 2.2,
          },
        },
        [`(width >= ${BREAKPOINTS.lg}px)`]: {
          slides: {
            origin: 'center',
            perView: 3.4,
          },
        },
      },
    },
    [],
  )

  return (
    <div className={clsx(styles.ArticleSlider, className)}>
      <div className={styles.ArticleSlider__wrapper}>
        <div className={styles.ArticleSlider__container}>
          <div
            ref={sliderRef}
            className={clsx(styles.ArticleSlider__items, 'keen-slider')}
          >
            {articleInfos.map((articleInfo, i) => (
              <div
                key={i}
                className={clsx(
                  styles.ArticleSlider__item,
                  'keen-slider__slide',
                )}
              >
                <div className={styles.ArticleSlider__contents}>
                  <ArticleCard
                    {...articleInfo}
                    className={styles.ArticleSlider__card}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.ArticleSliderButtons}>
          <LayoutInner>
            <div className={styles.ArticleSliderButtons__container}>
              <div className={styles.ArticleSliderButtons__items}>
                <div
                  className={clsx(
                    styles.ArticleSliderButtons__item,
                    styles['ArticleSliderButtons__item--prev'],
                  )}
                >
                  <CircleButton
                    className={styles.ArticleSliderButtons__button}
                    title='前へ'
                    onClick={() => {
                      instanceRef.current?.prev()
                    }}
                    variant='outlined'
                  >
                    <SvgIcon
                      variant='arrowLeft'
                      className={styles.ArticleSliderButtons__icon}
                    />
                  </CircleButton>
                </div>
                <div
                  className={clsx(
                    styles.ArticleSliderButtons__item,
                    styles['ArticleSliderButtons__item--next'],
                  )}
                >
                  <CircleButton
                    className={styles.ArticleSliderButtons__button}
                    title='次へ'
                    onClick={() => {
                      instanceRef.current?.next()
                    }}
                    variant='outlined'
                  >
                    <SvgIcon
                      variant='arrowRight'
                      className={styles.ArticleSliderButtons__icon}
                    />
                  </CircleButton>
                </div>
              </div>
            </div>
          </LayoutInner>
        </div>
      </div>
    </div>
  )
}
