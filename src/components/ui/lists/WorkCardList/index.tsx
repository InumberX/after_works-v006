import clsx from 'clsx'

import styles from './index.module.css'

import { WorkCard, WorkCardProps } from '~/components/ui/cards/WorkCard'

type Props = {
  className?: string
  infos: WorkCardProps[]
}

export const WorkCardList = ({ className, infos }: Props) => {
  return (
    <div className={clsx(styles.WorkCardList, className)}>
      <div className={styles.WorkCardList__items}>
        {infos.map((info, i) => (
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
