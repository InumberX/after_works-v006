'use client'

import clsx from 'clsx'
import styles from './index.module.css'
import {
  ArticleCardProps,
  ArticleCard,
} from '@/components/ui/cards/ArticleCard'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/css'
import { BREAKPOINTS } from '@/providers/BreakpointsProvider'

type Props = {
  className?: string
  articleInfos: ArticleCardProps[]
}

export const ArticleSlider = ({ className, articleInfos }: Props) => {
  return (
    <div className={clsx(styles.ArticleSlider, className)}>
      <div className={styles.ArticleSlider__container}>
        <Splide
          className={styles.ArticleSlider__items}
          options={{
            type: 'loop',
            rewind: false,
            speed: 300,
            rewindSpeed: 200,
            pagination: false,
            mediaQuery: 'min',
            focus: 'center',
            perPage: 1.2,
            gap: '0px',
            width: '100%',
            breakpoints: {
              [BREAKPOINTS.sm]: {
                perPage: 2,
                focus: 0,
              },
              [BREAKPOINTS.lg]: {
                perPage: 3,
                focus: 'center',
              },
            },
          }}
        >
          {articleInfos.map((articleInfo, i) => (
            <SplideSlide key={i} className={styles.ArticleSlider__item}>
              <div className={styles.ArticleSlider__contents}>
                <ArticleCard
                  {...articleInfo}
                  className={styles.ArticleSlider__card}
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  )
}
