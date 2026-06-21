import clsx from 'clsx'

import styles from './index.module.css'

import {
  LatestArticleCard,
  type LatestArticleCardProps,
} from '~/components/ui/cards/LatestArticleCard'

type Props = {
  className?: string
  items: LatestArticleCardProps[]
}

export const LatestArticleCardList = ({ className, items }: Props) => {
  return (
    <div className={clsx(styles.LatestArticleCardList, className)}>
      <div className={styles.LatestArticleCardList__items}>
        {items.map((info, i) => (
          <article key={i} className={styles.LatestArticleCardList__item}>
            <LatestArticleCard {...info} />
          </article>
        ))}
      </div>
    </div>
  )
}
