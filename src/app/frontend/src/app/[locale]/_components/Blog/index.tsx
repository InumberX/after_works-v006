'use client'

import clsx from 'clsx'

import styles from './index.module.css'

import { BaseButton } from '@/components/ui/buttons/BaseButton'
import { ArticleCardProps } from '@/components/ui/cards/ArticleCard'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { LayoutSection } from '@/components/ui/layouts/LayoutSection'
import { ArticleSlider } from '@/components/ui/sliders/ArticleSlider'
import { SectionTitle } from '@/components/ui/typographies/SectionTitle'
import { routes } from '@/config/routes'
import { useAnimelm, type AnimelmElement } from '@/hooks/use-animelm'
import { useScopedI18n, useCurrentLocale } from '@/locales/client'

type Props = {
  articleInfos: ArticleCardProps[]
}

export const Blog = ({ articleInfos }: Props) => {
  const scopedT = useScopedI18n('home.blog')
  const animelmSlider = useAnimelm<AnimelmElement>()
  const animelmButton = useAnimelm<AnimelmElement>()

  return (
    <LayoutSection className={styles.Blog}>
      <div className={styles.Blog__container}>
        <div className={styles.BlogTitle}>
          <LayoutInner>
            <SectionTitle
              subTitle={scopedT('subTitle')}
              title={scopedT('title')}
            />
          </LayoutInner>
        </div>

        <div className={styles.BlogSlider}>
          <LayoutInner>
            <div
              className={clsx(styles.BlogSlider__container, 'AnimelmBlurIn')}
              // eslint-disable-next-line react-hooks/refs
              ref={animelmSlider.targetRef}
            >
              <ArticleSlider
                className={clsx(styles.BlogSlider__slider)}
                articleInfos={articleInfos}
              />
            </div>
          </LayoutInner>
        </div>

        <div className={styles.BlogButton}>
          <LayoutInner>
            <div
              className={clsx(styles.BlogButton__container, 'AnimelmBlurIn')}
              // eslint-disable-next-line react-hooks/refs
              ref={animelmButton.targetRef}
            >
              <BaseButton
                className={styles.BlogButton__button}
                url={routes.blogs.url({
                  locale: useCurrentLocale(),
                })}
                text={scopedT('listPageButtonText')}
                isRightArrow
              />
            </div>
          </LayoutInner>
        </div>
      </div>
    </LayoutSection>
  )
}
