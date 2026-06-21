import clsx from 'clsx'

import styles from './index.module.css'

import { BaseTag, type BaseTagProps } from '~/components/ui/tags/BaseTag'

type Props = {
  className?: string
  items: BaseTagProps[]
  isNotSemantic?: boolean
  isJustifyEnd?: boolean
}

export const BaseTagList = ({
  className,
  items,
  isNotSemantic,
  isJustifyEnd,
}: Props) => {
  return (
    <>
      {isNotSemantic ? (
        <span
          className={clsx(
            styles.BaseTagList,
            className,
            isJustifyEnd && styles['BaseTagList--justifyEnd'],
          )}
        >
          <span className={styles.BaseTagList__items}>
            {items.map((info, i) => (
              <span key={i} className={styles.BaseTagList__item}>
                <BaseTag {...info} />
              </span>
            ))}
          </span>
        </span>
      ) : (
        <div
          className={clsx(
            styles.BaseTagList,
            className,
            isJustifyEnd && styles['BaseTagList--justifyEnd'],
          )}
        >
          <ul className={styles.BaseTagList__items}>
            {items.map((info, i) => (
              <li key={i} className={styles.BaseTagList__item}>
                <BaseTag {...info} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
