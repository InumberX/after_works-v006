import { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './index.module.scss'

type Props = {
  className?: string
  title: ReactNode
  subTitle?: ReactNode
  titleTag?: keyof JSX.IntrinsicElements
}

export const SectionTitle = ({
  className,
  title,
  subTitle,
  titleTag,
}: Props) => {
  const Title = titleTag ?? 'h2'

  return (
    <div className={clsx(styles.SectionTitle, className)}>
      <div className={styles.SectionTitle__container}>
        {subTitle && (
          <span className={styles.SectionTitleSub}>
            <span className={styles.SectionTitleSub__text}>{subTitle}</span>
          </span>
        )}
        <span className={styles.SectionTitleMain}>
          <Title className={styles.SectionTitleMain__text}>{title}</Title>
        </span>
      </div>
    </div>
  )
}
