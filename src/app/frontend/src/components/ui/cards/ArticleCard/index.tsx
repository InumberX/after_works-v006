'use client'

import { useMemo } from 'react'
import { ButtonType, AnchorTarget, AnchorRel } from '@/types/html'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import styles from './index.module.scss'
import { EventTypes } from '@/types/event'
import { STATIC_IMAGE_DIR, CASH_BUSTER } from '@/config/env'
import { format } from 'date-fns'
import { BaseTagProps } from '@/components/ui/tags/BaseTag'
import { BaseTagList } from '@/components/ui/lists/BaseTagList'
import { useCurrentLocale } from '@/locales/client'

type ArticleCardContainerProps = {
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
  isButton?: boolean
}

export type ArticleCardProps = {
  url?: string
  target?: AnchorTarget
  rel?: AnchorRel
  buttonType?: ButtonType
  isDisabled?: boolean
  className?: string
  onClick?: EventTypes['onClickButton']
} & ArticleCardContainerProps

const ArticleCardContainer = ({
  mainVisual,
  publishedAt,
  startedAt,
  endedAt,
  title,
  titleTag,
  tags,
  isButton,
}: ArticleCardContainerProps) => {
  const locale = useCurrentLocale()
  const Div = isButton ? 'span' : 'div'
  const Figure = isButton ? 'span' : 'figure'
  const Title = titleTag ?? 'h2'

  return (
    <Div className={styles.ArticleCard__container}>
      <Figure className={styles.ArticleCardMainVisual}>
        {mainVisual ? (
          <Image
            src={mainVisual.src}
            alt={mainVisual.alt}
            fill
            className={styles.ArticleCardMainVisual__image}
          />
        ) : (
          <Image
            src={`${STATIC_IMAGE_DIR}/img-empty.webp?${CASH_BUSTER}`}
            alt='After Works.'
            fill
            className={styles.ArticleCardMainVisual__image}
          />
        )}
      </Figure>

      {publishedAt && (
        <Div className={styles.ArticleCardDate}>
          <time
            className={styles.ArticleCardDate__text}
            dateTime={format(new Date(publishedAt), 'yyyy-MM-dd')}
          >
            {format(
              new Date(publishedAt),
              locale === 'en' ? 'MMMM d, yyyy' : 'yyyy/MM/dd',
            )}
          </time>
        </Div>
      )}

      {(startedAt || endedAt) && (
        <Div className={styles.ArticleCardDate}>
          {startedAt && (
            <time
              className={styles.ArticleCardDate__text}
              dateTime={format(new Date(startedAt), 'yyyy-MM-dd')}
            >
              {format(
                new Date(startedAt),
                locale === 'en' ? 'MMMM d, yyyy' : 'yyyy/MM/dd',
              )}
            </time>
          )}

          <span className={styles.ArticleCardDate__separator}>
            {locale === 'en' ? '-' : '〜'}
          </span>

          {endedAt && (
            <time
              className={styles.ArticleCardDate__text}
              dateTime={format(new Date(endedAt), 'yyyy-MM-dd')}
            >
              {format(
                new Date(endedAt),
                locale === 'en' ? 'MMMM d, yyyy' : 'yyyy/MM/dd',
              )}
            </time>
          )}
        </Div>
      )}

      <Div className={styles.ArticleCardTitle}>
        <Title className={styles.ArticleCardTitle__text}>{title}</Title>
      </Div>

      {tags.length > 0 && (
        <BaseTagList
          className={styles.ArticleCardTag}
          infos={tags}
          isJustifyEnd
        />
      )}
    </Div>
  )
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

  return isExternal ? (
    <a
      href={url}
      target={target}
      rel={rel}
      className={clsx(styles.ArticleCard, className)}
      title={title}
      aria-label={title}
    >
      <ArticleCardContainer
        mainVisual={mainVisual}
        publishedAt={publishedAt}
        startedAt={startedAt}
        endedAt={endedAt}
        title={title}
        titleTag={titleTag}
        tags={tags}
      />
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
      <ArticleCardContainer
        mainVisual={mainVisual}
        publishedAt={publishedAt}
        startedAt={startedAt}
        endedAt={endedAt}
        title={title}
        titleTag={titleTag}
        tags={tags}
      />
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
      <ArticleCardContainer
        mainVisual={mainVisual}
        publishedAt={publishedAt}
        startedAt={startedAt}
        endedAt={endedAt}
        title={title}
        titleTag={titleTag}
        tags={tags}
        isButton
      />
    </button>
  )
}
