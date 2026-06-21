import clsx from 'clsx'

import styles from './index.module.css'

import { WorkCard, type WorkCardProps } from '~/components/ui/cards/WorkCard'

type Props = {
  className?: string
  items: WorkCardProps[]
}

export const WorkCardList = ({ className, items }: Props) => {
  return (
    <div className={clsx(styles.WorkCardList, className)}>
      <div className={styles.WorkCardList__items}>
        {items.map((info, i) => (
          <article
            key={i}
            className={clsx(
              styles.WorkCardList__item,
              styles[`WorkCardList__item--${info.size}`],
            )}
          >
            <WorkCard {...info} />
          </article>
        ))}
      </div>
    </div>
  )
}
