import styles from './index.module.scss'
import { LayoutSection } from '@/components/ui/layouts/LayoutSection'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { SectionTitle } from '@/components/ui/typographies/SectionTitle'
import { ArticleCardProps } from '@/components/ui/cards/ArticleCard'
import { ArticleSlider } from '@/components/ui/sliders/ArticleSlider'
import { BaseButton } from '@/components/ui/buttons/BaseButton'
import { routes } from '@/config/routes'
import { getScopedI18n, getCurrentLocale } from '@/locales/server'

type Props = {
  articleInfos: ArticleCardProps[]
}

export const Blog = async ({ articleInfos }: Props) => {
  const scopedT = await getScopedI18n('home.blog')

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
            <ArticleSlider
              className={styles.BlogSlider__slider}
              articleInfos={articleInfos}
            />
          </LayoutInner>
        </div>

        <div className={styles.BlogButton}>
          <LayoutInner>
            <div className={styles.BlogButton__container}>
              <BaseButton
                className={styles.BlogButton__button}
                url={routes.blogs.url({
                  locale: getCurrentLocale(),
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
