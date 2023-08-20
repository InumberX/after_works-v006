import clsx from 'clsx'
import styles from './index.module.scss'
import { BaseTag, BaseTagProps } from '~/components/ui/tags/BaseTag'

type Props = {
  className?: string
  infos: BaseTagProps[]
  isNotSemantic?: boolean
  isJustifyEnd?: boolean
}

export const BaseTagList = ({
  className,
  infos,
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
            {infos.map((info, i) => (
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
            {infos.map((info, i) => (
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
