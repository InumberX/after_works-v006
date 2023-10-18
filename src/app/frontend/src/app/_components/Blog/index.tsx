import styles from './index.module.scss'
import { LayoutSection } from '@/components/ui/layouts/LayoutSection'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { SectionTitle } from '@/components/ui/typographies/SectionTitle'
import { ArticleCardProps } from '@/components/ui/cards/ArticleCard'
import { ArticleSlider } from '@/components/ui/sliders/ArticleSlider'
import { BaseButton } from '@/components/ui/buttons/BaseButton'
import { routes } from '@/config/routes'

type Props = {
  articleInfos: ArticleCardProps[]
}

export const Blog = ({ articleInfos }: Props) => {
  return (
    <LayoutSection className={styles.Blog}>
      <div className={styles.Blog__container}>
        <div className={styles.BlogTitle}>
          <LayoutInner>
            <SectionTitle subTitle='Blog' title='ブログ' />
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
                url={routes.blogs.url({})}
                text='ブログ一覧へ'
                isRightArrow
              />
            </div>
          </LayoutInner>
        </div>
      </div>
    </LayoutSection>
  )
}
