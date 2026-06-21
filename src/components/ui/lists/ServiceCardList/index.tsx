import clsx from 'clsx'

import styles from './index.module.css'

import {
  ServiceCard,
  ServiceCardProps,
} from '~/components/ui/cards/ServiceCard'

export type Props = {
  className?: string
  items: ServiceCardProps[]
}

export const ServiceCardList = ({ className, items }: Props) => {
  return (
    <div className={clsx(styles.ServiceCardList, className)}>
      <ul className={styles.ServiceCardList__items}>
        {items.map((info, i) => (
          <li key={i} className={styles.ServiceCardList__item}>
            <ServiceCard {...info} />
          </li>
        ))}
      </ul>
    </div>
  )
}
