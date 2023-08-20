import clsx from 'clsx'
import styles from './index.module.scss'
import {
  ArticleCard,
  ArticleCardProps,
} from '~/components/ui/cards/ArticleCard'

type Props = {
  className?: string
  infos: ArticleCardProps[]
}

export const ArticleCardList = ({ className, infos }: Props) => {
  return (
    <div className={clsx(styles.ArticleCardList, className)}>
      <ul className={styles.ArticleCardList__items}>
        {infos.map((info, i) => (
          <li key={i} className={styles.ArticleCardList__item}>
            <ArticleCard {...info} />
          </li>
        ))}
      </ul>
    </div>
  )
}
