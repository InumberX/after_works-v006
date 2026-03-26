import clsx from 'clsx'

import styles from './index.module.css'

import {
  ArticleCard,
  ArticleCardProps,
} from '@/components/ui/cards/ArticleCard'

type Props = {
  className?: string
  infos: ArticleCardProps[]
}

export const ArticleCardList = ({ className, infos }: Props) => {
  return (
    <div className={clsx(styles.ArticleCardList, className)}>
      <div className={styles.ArticleCardList__items}>
        {infos.map((info, i) => (
          <article key={i} className={styles.ArticleCardList__item}>
            <ArticleCard {...info} />
          </article>
        ))}
      </div>
    </div>
  )
}
