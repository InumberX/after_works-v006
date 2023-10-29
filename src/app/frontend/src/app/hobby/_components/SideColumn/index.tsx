import styles from './index.module.scss'
import { SideLatestArticle } from '@/components/ui/sides/SideLatestArticle'
import { LatestArticleCardProps } from '@/components/ui/cards/LatestArticleCard'

type Props = {
  latestArticleInfos: LatestArticleCardProps[]
}

export const SideColumn = ({ latestArticleInfos }: Props) => {
  return (
    <div className={styles.SideColumn}>
      <div className={styles.SideColumn__container}>
        <SideLatestArticle title='最近の趣味' infos={latestArticleInfos} />
      </div>
    </div>
  )
}
