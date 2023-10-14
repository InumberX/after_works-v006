import Image from 'next/image'
import clsx from 'clsx'
import styles from './index.module.scss'
import { format } from 'date-fns'
import { BaseTagProps } from '@/components/ui/tags/BaseTag'
import { BaseTagList } from '@/components/ui/lists/BaseTagList'

type Props = {
  className?: string
  info: {
    mainVisual?: {
      src: string
      alt: string
    }
    title: string
    dateTitle?: string
    startedAt?: string
    endedAt?: string
    tags?: {
      title?: string
      items: BaseTagProps[]
    }[]
  }
}

export const ArticleHead = ({ className, info }: Props) => {
  const { mainVisual, title, dateTitle, startedAt, endedAt, tags } = info

  const startedAtText = startedAt
    ? format(new Date(startedAt), 'yyyy/MM/dd')
    : undefined
  const endedAtText = endedAt
    ? format(new Date(endedAt), 'yyyy/MM/dd')
    : undefined

  return (
    <div className={clsx(styles.ArticleHead, className)}>
      {mainVisual && (
        <div className={styles.ArticleHeadMainVisual}>
          <figure className={styles.ArticleHeadMainVisual__container}>
            <Image
              src={mainVisual.src}
              alt={mainVisual.alt}
              layout='fill'
              className={styles.ArticleHeadMainVisual__image}
            />
          </figure>
        </div>
      )}

      <div className={styles.ArticleHeadTitle}>
        <h1 className={styles.ArticleHeadTitle__text}>{title}</h1>
      </div>

      <div className={styles.ArticleHeadInfo}>
        {(startedAtText || endedAtText) && (
          <div className={styles.ArticleHeadDate}>
            {dateTitle && (
              <span className={styles.ArticleHeadDate__title}>{dateTitle}</span>
            )}

            <div className={styles.ArticleHeadDate__contents}>
              {startedAtText && (
                <time
                  className={styles.ArticleHeadDate__text}
                  dateTime={format(new Date(startedAtText), 'yyyy-MM-dd')}
                >
                  {startedAtText}
                </time>
              )}

              {startedAtText && endedAtText && (
                <span className={styles.ArticleHeadDate__separator}>〜</span>
              )}

              {endedAtText && (
                <time
                  className={styles.ArticleHeadDate__text}
                  dateTime={format(new Date(endedAtText), 'yyyy-MM-dd')}
                >
                  {endedAtText}
                </time>
              )}
            </div>
          </div>
        )}
      </div>

      {tags && tags.length > 0 && (
        <div className={styles.ArticleHeadTag}>
          <ul className={styles.ArticleHeadTag__items}>
            {tags.map((item, i) => (
              <li key={i} className={styles.ArticleHeadTag__item}>
                <div className={styles.ArticleHeadTag__container}>
                  {item.title && (
                    <div className={styles.ArticleHeadTagTitle}>
                      <span className={styles.ArticleHeadTagTitle__text}>
                        {item.title}
                      </span>
                    </div>
                  )}
                  <div className={styles.ArticleHeadTag__list}>
                    <BaseTagList infos={item.items} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
