'use client'

import { useMemo } from 'react'
import { ButtonType, AnchorTarget, AnchorRel } from '~/types/html'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import styles from './index.module.scss'
import { EventTypes } from '~/types/event'
import { STATIC_IMAGE_DIR } from '~/config/env'
import { format } from 'date-fns'
import { BaseTagProps } from '~/components/ui/tags/BaseTag'
import { BaseTagList } from '~/components/ui/lists/BaseTagList'

export type ArticleCardProps = {
  url?: string
  target?: AnchorTarget
  rel?: AnchorRel
  buttonType?: ButtonType
  isDisabled?: boolean
  className?: string
  onClick?: EventTypes['onClickButton']
  mainVisual?: {
    src: string
    alt: string
  }
  publishedAt?: string
  startedAt?: string
  endedAt?: string
  title: string
  titleTag?: keyof JSX.IntrinsicElements
  tags: BaseTagProps[]
}

export const ArticleCard = ({
  url,
  target,
  rel,
  buttonType,
  isDisabled,
  className,
  onClick,
  mainVisual,
  publishedAt,
  startedAt,
  endedAt,
  title,
  titleTag,
  tags,
}: ArticleCardProps) => {
  // 外部リンク判定
  const isExternal = useMemo(() => {
    return url ? url.startsWith('http://') || url.startsWith('https://') : false
  }, [url])

  const Title = titleTag ?? 'h2'

  return isExternal ? (
    <a
      href={url}
      target={target}
      rel={rel}
      className={clsx(styles.ArticleCard, className)}
      title={title}
      aria-label={title}
    >
      <div className={styles.ArticleCard__container}>
        <figure className={styles.ArticleCardMainVisual}>
          {mainVisual ? (
            <Image
              src={mainVisual.src}
              alt={mainVisual.alt}
              fill
              className={styles.ArticleCardMainVisual__image}
            />
          ) : (
            <Image
              src={`${STATIC_IMAGE_DIR}/img-empty.webp`}
              alt='After Works.'
              fill
              className={styles.ArticleCardMainVisual__image}
            />
          )}
        </figure>

        {publishedAt && (
          <div className={styles.ArticleCardDate}>
            <time
              className={styles.ArticleCardDate__text}
              dateTime={format(new Date(publishedAt), 'yyyy-MM-dd')}
            >
              {format(new Date(publishedAt), 'yyyy/MM/dd')}
            </time>
          </div>
        )}

        {(startedAt || endedAt) && (
          <div className={styles.ArticleCardDate}>
            {startedAt && (
              <time
                className={styles.ArticleCardDate__text}
                dateTime={format(new Date(startedAt), 'yyyy-MM-dd')}
              >
                {format(new Date(startedAt), 'yyyy/MM/dd')}
              </time>
            )}

            <span className={styles.ArticleCardDate__separator}>〜</span>

            {endedAt && (
              <time
                className={styles.ArticleCardDate__text}
                dateTime={format(new Date(endedAt), 'yyyy-MM-dd')}
              >
                {format(new Date(endedAt), 'yyyy/MM/dd')}
              </time>
            )}
          </div>
        )}

        <div className={styles.ArticleCardTitle}>
          <Title className={styles.ArticleCardTitle__text}>{title}</Title>
        </div>

        {tags.length > 0 && (
          <BaseTagList
            className={styles.ArticleCardTag}
            infos={tags}
            isJustifyEnd
          />
        )}
      </div>
    </a>
  ) : url ? (
    <Link
      href={url}
      target={target}
      rel={rel}
      className={clsx(styles.ArticleCard, className)}
      title={title}
      aria-label={title}
    >
      <div className={styles.ArticleCard__container}>
        <figure className={styles.ArticleCardMainVisual}>
          {mainVisual ? (
            <Image
              src={mainVisual.src}
              alt={mainVisual.alt}
              fill
              className={styles.ArticleCardMainVisual__image}
            />
          ) : (
            <Image
              src={`${STATIC_IMAGE_DIR}/img-empty.jpg`}
              alt='After Works.'
              fill
              className={styles.ArticleCardMainVisual__image}
            />
          )}
        </figure>

        {publishedAt && (
          <div className={styles.ArticleCardDate}>
            <time
              className={styles.ArticleCardDate__text}
              dateTime={format(new Date(publishedAt), 'yyyy-MM-dd')}
            >
              {format(new Date(publishedAt), 'yyyy/MM/dd')}
            </time>
          </div>
        )}

        {(startedAt || endedAt) && (
          <div className={styles.ArticleCardDate}>
            {startedAt && (
              <time
                className={styles.ArticleCardDate__text}
                dateTime={format(new Date(startedAt), 'yyyy-MM-dd')}
              >
                {format(new Date(startedAt), 'yyyy/MM/dd')}
              </time>
            )}

            <span className={styles.ArticleCardDate__separator}>〜</span>

            {endedAt && (
              <time
                className={styles.ArticleCardDate__text}
                dateTime={format(new Date(endedAt), 'yyyy-MM-dd')}
              >
                {format(new Date(endedAt), 'yyyy/MM/dd')}
              </time>
            )}
          </div>
        )}

        <div className={styles.ArticleCardTitle}>
          <Title className={styles.ArticleCardTitle__text}>{title}</Title>
        </div>

        {tags.length > 0 && (
          <BaseTagList
            className={styles.ArticleCardTag}
            infos={tags}
            isJustifyEnd
          />
        )}
      </div>
    </Link>
  ) : (
    <button
      type={buttonType ?? 'button'}
      onClick={onClick}
      disabled={isDisabled}
      className={clsx(styles.ArticleCard, className)}
      title={title}
      aria-label={title}
    >
      <span className={styles.ArticleCard__container}>
        <span className={styles.ArticleCardMainVisual}>
          {mainVisual ? (
            <Image
              src={mainVisual.src}
              alt={mainVisual.alt}
              fill
              className={styles.ArticleCardMainVisual__image}
            />
          ) : (
            <Image
              src={`${STATIC_IMAGE_DIR}/img-empty.jpg`}
              alt='After Works.'
              fill
              className={styles.ArticleCardMainVisual__image}
            />
          )}
        </span>

        {publishedAt && (
          <span className={styles.ArticleCardDate}>
            <time
              className={styles.ArticleCardDate__text}
              dateTime={format(new Date(publishedAt), 'yyyy-MM-dd')}
            >
              {format(new Date(publishedAt), 'yyyy/MM/dd')}
            </time>
          </span>
        )}

        {(startedAt || endedAt) && (
          <span className={styles.ArticleCardDate}>
            {startedAt && (
              <time
                className={styles.ArticleCardDate__text}
                dateTime={format(new Date(startedAt), 'yyyy-MM-dd')}
              >
                {format(new Date(startedAt), 'yyyy/MM/dd')}
              </time>
            )}

            <span className={styles.ArticleCardDate__separator}>〜</span>

            {endedAt && (
              <time
                className={styles.ArticleCardDate__text}
                dateTime={format(new Date(endedAt), 'yyyy-MM-dd')}
              >
                {format(new Date(endedAt), 'yyyy/MM/dd')}
              </time>
            )}
          </span>
        )}

        <span className={styles.ArticleCardTitle}>
          <span className={styles.ArticleCardTitle__text}>{title}</span>
        </span>

        {tags.length > 0 && (
          <BaseTagList
            className={styles.ArticleCardTag}
            infos={tags}
            isNotSemantic
            isJustifyEnd
          />
        )}
      </span>
    </button>
  )
}
