'use client'

import { useState } from 'react'
import styles from './index.module.scss'
import { ArticleCardProps } from '~/components/ui/cards/ArticleCard'
import { ArticleCardList } from '~/components/ui/lists/ArticleCardList'

export type ProfileProps = {
  defaultArticleInfos: ArticleCardProps[]
}

export const MainColumn = ({ defaultArticleInfos }: ProfileProps) => {
  const [articleInfos /* setArticleInfos */] = useState(defaultArticleInfos)

  return (
    <div className={styles.MainColumn}>
      <div className={styles.MainColumn__container}>
        <ArticleCardList infos={articleInfos} />
      </div>
    </div>
  )
}
