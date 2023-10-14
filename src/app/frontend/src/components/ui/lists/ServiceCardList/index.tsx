import clsx from 'clsx'
import styles from './index.module.scss'
import {
  ServiceCard,
  ServiceCardProps,
} from '@/components/ui/cards/ServiceCard'

export type Props = {
  className?: string
  infos: ServiceCardProps[]
}

export const ServiceCardList = ({ className, infos }: Props) => {
  return (
    <div className={clsx(styles.ServiceCardList, className)}>
      <ul className={styles.ServiceCardList__items}>
        {infos.map((info, i) => (
          <li key={i} className={styles.ServiceCardList__item}>
            <ServiceCard {...info} />
          </li>
        ))}
      </ul>
    </div>
  )
}
