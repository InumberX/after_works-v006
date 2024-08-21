import clsx from 'clsx'
import styles from './index.module.scss'
import { ArticleHead } from '@/components/ui/articles/ArticleHead'
import { ArticleBody } from '@/components/ui/articles/ArticleBody'
import { ArticleFooter } from '@/components/ui/articles/ArticleFooter'
import { BaseTagProps } from '@/components/ui/tags/BaseTag'

export type BaseArticleInfo = {
  id: string
  mainVisual?: {
    src: string
    alt: string
  }
  title: string
  tags?: {
    title?: string
    items: BaseTagProps[]
  }[]
  body: string
  dateTitle?: string
  startedAt?: string | Date
  endedAt?: string | Date
  bottomLink?: {
    url: string
    text: string
  }
  url?: string
}

type Props = {
  className?: string
  info: BaseArticleInfo
}

export const BaseArticle = ({ className, info }: Props) => {
  return (
    <article className={clsx(styles.BaseArticle, className)}>
      <div className={styles.BaseArticle__wrapper}>
        <ArticleHead
          className={styles.BaseArticle__head}
          info={{
            mainVisual: info.mainVisual,
            title: info.title,
            dateTitle: info.dateTitle,
            startedAt: info.startedAt,
            endedAt: info.endedAt,
            tags: info.tags,
            url: info.url,
          }}
        />

        <ArticleBody
          className={styles.BaseArticle__body}
          info={{
            body: info.body,
          }}
        />

        <ArticleFooter
          className={styles.BaseArticle__footer}
          info={{
            link: info.bottomLink,
          }}
        />
      </div>
    </article>
  )
}
