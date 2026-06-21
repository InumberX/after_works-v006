import clsx from 'clsx'

import styles from './index.module.css'

import {
  ArticleCard,
  type ArticleCardProps,
} from '~/components/ui/cards/ArticleCard'

type Props = {
  className?: string
  items: ArticleCardProps[]
}

export const ArticleCardList = ({ className, items }: Props) => {
  return (
    <div className={clsx(styles.ArticleCardList, className)}>
      <div className={styles.ArticleCardList__items}>
        {items.map((info, i) => (
          <article key={i} className={styles.ArticleCardList__item}>
            <ArticleCard {...info} />
          </article>
        ))}
      </div>
    </div>
  )
}
