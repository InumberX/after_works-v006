'use client'

import clsx from 'clsx'
import { type ReactNode, type JSX } from 'react'

import styles from './index.module.css'

import { useAnimelm, type AnimelmElement } from '~/hooks/use-animelm'

type Props = {
  className?: string
  title: ReactNode
  subTitle?: ReactNode
  subTitleColor?: 'primary' | 'secondary'
  titleTag?: keyof JSX.IntrinsicElements
  horizontalAlign?: 'start' | 'center' | 'end'
}

export const SectionTitle = ({
  className,
  title,
  subTitle,
  subTitleColor = 'primary',
  titleTag,
  horizontalAlign = 'start',
}: Props) => {
  const Title = titleTag ?? 'h2'
  const { targetRef, isVisible } = useAnimelm<AnimelmElement>()

  return (
    <div
      className={clsx(
        styles.SectionTitle,
        styles[`SectionTitle--${horizontalAlign}`],
        className,
      )}
      ref={targetRef}
    >
      <div className={styles.SectionTitle__container}>
        {subTitle && (
          <span
            className={clsx(
              styles.SectionTitleSub,
              styles[`SectionTitleSub--${subTitleColor}`],
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
          </Title>
        </span>
      </div>
    </div>
  )
}
