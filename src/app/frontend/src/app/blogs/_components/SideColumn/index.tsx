import styles from './index.module.scss'
import { SideLatestArticle } from '~/components/ui/sides/SideLatestArticle'
import { LatestArticleCardProps } from '~/components/ui/cards/LatestArticleCard'

export type ProfileProps = {
  latestArticleInfos: LatestArticleCardProps[]
}

export const SideColumn = ({ latestArticleInfos }: ProfileProps) => {
  return (
    <div className={styles.SideColumn}>
      <div className={styles.SideColumn__container}>
        <SideLatestArticle title='最近の記事' infos={latestArticleInfos} />
      </div>
    </div>
  )
}
