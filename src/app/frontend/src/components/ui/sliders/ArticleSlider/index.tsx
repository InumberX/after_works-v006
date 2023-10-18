'use client'

import clsx from 'clsx'
import styles from './index.module.scss'
import {
  ArticleCardProps,
  ArticleCard,
} from '@/components/ui/cards/ArticleCard'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/css'

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
            perPage: 1,
            gap: '24px',
            width: '80%',
            breakpoints: {
              576: {
                perPage: 2,
                focus: 0,
                width: '88%',
              },
              768: {
                perPage: 3,
                focus: 'center',
              },
              992: {
                gap: '32px',
                width: '96%',
              },
              1200: {
                gap: '40px',
                width: '100%',
              },
            },
          }}
        >
          {articleInfos.map((articleInfo, i) => (
            <SplideSlide key={i} className={styles.ArticleSlider__item}>
              <ArticleCard
                {...articleInfo}
                className={styles.ArticleSlider__card}
              />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  )
}
