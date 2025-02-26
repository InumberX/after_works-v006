'use client'

import { JSX } from 'react'
import clsx from 'clsx'
import styles from './index.module.scss'
import { LatestArticleCardProps } from '@/components/ui/cards/LatestArticleCard'
import { LatestArticleCardList } from '@/components/ui/lists/LatestArticleCardList'
import { useAnimelm, type AnimelmElement } from '@/hooks/use-animelm'

type Props = {
  className?: string
  title: string
  titleTag?: keyof JSX.IntrinsicElements
  infos: LatestArticleCardProps[]
}

export const SideLatestArticle = ({
  className,
  title,
  titleTag,
  infos,
}: Props) => {
  const Title = titleTag ?? 'h2'

  const { targetRef } = useAnimelm<AnimelmElement>()

  return (
    <div
      className={clsx(styles.SideLatestArticle, className, 'AnimelmBlurIn')}
      ref={targetRef}
    >
      <div className={styles.SideLatestArticle__container}>
        <div className={styles.SideLatestArticleTitle}>
          <Title className={styles.SideLatestArticleTitle__text}>{title}</Title>
        </div>

        <div className={styles.SideLatestArticle__contents}>
          <LatestArticleCardList infos={infos} />
        </div>
      </div>
    </div>
  )
}
