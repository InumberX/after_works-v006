import styles from './index.module.css'
import {
  BaseArticle,
  BaseArticleInfo,
} from '@/components/ui/articles/BaseArticle'

type Props = {
  articleInfo: BaseArticleInfo
}

export const MainColumn = ({ articleInfo }: Props) => {
  return (
    <div className={styles.MainColumn}>
      <div className={styles.MainColumn__container}>
        <BaseArticle
          info={articleInfo}
          className={styles.MainColumn__article}
        />
      </div>
    </div>
  )
}
