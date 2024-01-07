import { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './index.module.scss'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'

type Props = {
  className?: string
  title: ReactNode
  subTitle?: ReactNode
  titleTag?: keyof JSX.IntrinsicElements
}

export const PageTitle = ({ className, title, subTitle, titleTag }: Props) => {
  const Title = titleTag ?? 'h1'

  return (
    <div className={clsx(styles.PageTitle, className)}>
      <LayoutInner>
        <div className={styles.PageTitle__container}>
          {subTitle && (
            <span className={styles.PageTitleSub}>
              <span className={styles.PageTitleSub__text}>{subTitle}</span>
            </span>
          )}
          <span className={styles.PageTitleMain}>
            <Title className={styles.PageTitleMain__text}>{title}</Title>
          </span>
        </div>
      </LayoutInner>
    </div>
  )
}
