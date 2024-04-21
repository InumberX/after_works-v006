'use client'

import { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './index.module.scss'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { useAnimelm, type AnimelmElement } from '@/hooks/use-animelm'

type Props = {
  className?: string
  title: ReactNode
  subTitle?: ReactNode
  titleTag?: keyof JSX.IntrinsicElements
}

export const PageTitle = ({ className, title, subTitle, titleTag }: Props) => {
  const Title = titleTag ?? 'h1'
  const { targetRef, isVisible } = useAnimelm<AnimelmElement>()

  return (
    <div className={clsx(styles.PageTitle, className)} ref={targetRef}>
      <LayoutInner>
        <div className={styles.PageTitle__container}>
          {subTitle && (
            <span
              className={clsx(
                styles.PageTitleSub,
                isVisible && styles['PageTitleSub--active'],
              )}
            >
              <span className={styles.PageTitleSub__text}>{subTitle}</span>
            </span>
          )}
          <span className={styles.PageTitleMain}>
            <Title className={styles.PageTitleMain__paragraph}>
              <span
                className={clsx(
                  styles.PageTitleMain__text,
                  isVisible && styles['PageTitleMain__text--active'],
                )}
              >
                {title}
              </span>
              <span className={styles.PageTitleMainCurtain}>
                <span
                  className={clsx(
                    styles.PageTitleMainCurtain__curtain,
                    isVisible &&
                      styles['PageTitleMainCurtain__curtain--active'],
                  )}
                />
              </span>
            </Title>
          </span>
        </div>
      </LayoutInner>
    </div>
  )
}
