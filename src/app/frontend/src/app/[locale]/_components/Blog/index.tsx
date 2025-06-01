'use client'

import clsx from 'clsx'
import styles from './index.module.css'
import { LayoutSection } from '@/components/ui/layouts/LayoutSection'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { SectionTitle } from '@/components/ui/typographies/SectionTitle'
import { ArticleCardProps } from '@/components/ui/cards/ArticleCard'
import { ArticleSlider } from '@/components/ui/sliders/ArticleSlider'
import { BaseButton } from '@/components/ui/buttons/BaseButton'
import { routes } from '@/config/routes'
import { useScopedI18n, useCurrentLocale } from '@/locales/client'
import { useAnimelm, type AnimelmElement } from '@/hooks/use-animelm'

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
