import clsx from 'clsx'

import styles from './index.module.css'

import { GoogleAd, GoogleAdProps } from '~/components/ui/ads/GoogleAd'

type Props = {
  className?: string
  items: GoogleAdProps[]
}

export const GoogleAdList = ({ className, items }: Props) => {
  return (
    <div className={clsx(styles.GoogleAdList, className)}>
      <ul className={styles.GoogleAdList__items}>
        {items.map((info, i) => (
          <li key={i} className={styles.GoogleAdList__item}>
            <GoogleAd {...info} />
          </li>
        ))}
      </ul>
    </div>
  )
}
