import clsx from 'clsx'
import styles from './index.module.scss'
import {
  LatestArticleCard,
  LatestArticleCardProps,
} from '~/components/ui/cards/LatestArticleCard'

type Props = {
  className?: string
  infos: LatestArticleCardProps[]
}

export const LatestArticleCardList = ({ className, infos }: Props) => {
  return (
    <div className={clsx(styles.LatestArticleCardList, className)}>
      <ul className={styles.LatestArticleCardList__items}>
        {infos.map((info, i) => (
          <li key={i} className={styles.LatestArticleCardList__item}>
            <LatestArticleCard {...info} />
          </li>
        ))}
      </ul>
    </div>
  )
}
