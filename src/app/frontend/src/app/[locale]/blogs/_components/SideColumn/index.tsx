import styles from './index.module.scss'
import { SideLatestArticle } from '@/components/ui/sides/SideLatestArticle'
import { LatestArticleCardProps } from '@/components/ui/cards/LatestArticleCard'
import { getScopedI18n } from '@/locales/server'

type Props = {
  latestArticleInfos: LatestArticleCardProps[]
}

export const SideColumn = async ({ latestArticleInfos }: Props) => {
  const scopedT = await getScopedI18n('blogs')

  return (
    <div className={styles.SideColumn}>
      <div className={styles.SideColumn__container}>
        <SideLatestArticle
          title={scopedT('sideColumn.latestArticle.title')}
          infos={latestArticleInfos}
        />
      </div>
    </div>
  )
}
