'use client'

import { ReactNode, JSX } from 'react'
import clsx from 'clsx'
import styles from './index.module.css'
import { useAnimelm, type AnimelmElement } from '@/hooks/use-animelm'

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
  const { targetRef, isVisible } = useAnimelm<AnimelmElement>()

  return (
    <div className={clsx(styles.SectionTitle, className)} ref={targetRef}>
      <div className={styles.SectionTitle__container}>
        {subTitle && (
          <span
            className={clsx(
              styles.SectionTitleSub,
              isVisible && styles['SectionTitleSub--active'],
            )}
          >
            <span className={styles.SectionTitleSub__text}>{subTitle}</span>
          </span>
        )}
        <span className={styles.SectionTitleMain}>
          <Title className={styles.SectionTitleMain__paragraph}>
            <span
              className={clsx(
                styles.SectionTitleMain__text,
                isVisible && styles['SectionTitleMain__text--active'],
              )}
            >
              {title}
            </span>
            <span className={styles.SectionTitleMainCurtain}>
              <span
                className={clsx(
                  styles.SectionTitleMainCurtain__curtain,
                  isVisible &&
                    styles['SectionTitleMainCurtain__curtain--active'],
                )}
              />
            </span>
          </Title>
        </span>
      </div>
    </div>
  )
}
