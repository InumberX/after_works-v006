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
import { useCurrentLocale } from '@/locales/client'

type LatestArticleCardContainerProps = {
  mainVisual?: {
    src: string
    alt: string
  }
  publishedAt?: string
  startedAt?: string
  endedAt?: string
  title: string
  titleTag?: keyof JSX.IntrinsicElements
  isButton?: boolean
}

export type LatestArticleCardProps = {
  url?: string
  target?: AnchorTarget
  rel?: AnchorRel
  buttonType?: ButtonType
  isDisabled?: boolean
  className?: string
  onClick?: EventTypes['onClickButton']
} & LatestArticleCardContainerProps

const LatestArticleCardContainer = ({
  mainVisual,
  publishedAt,
  startedAt,
  endedAt,
  title,
  titleTag,
  isButton,
}: LatestArticleCardContainerProps) => {
  const locale = useCurrentLocale()
  const Div = isButton ? 'span' : 'div'
  const Figure = isButton ? 'span' : 'figure'
  const Title = titleTag ?? 'h2'

  return (
    <Div className={styles.LatestArticleCard__container}>
      <Figure className={styles.LatestArticleCardMainVisual}>
        {mainVisual ? (
          <Image
            src={mainVisual.src}
            alt={mainVisual.alt}
            fill
            className={styles.LatestArticleCardMainVisual__image}
          />
        ) : (
          <Image
            src={`${STATIC_IMAGE_DIR}/img-empty.webp?${CASH_BUSTER}`}
            alt='After Works.'
            fill
            className={styles.LatestArticleCardMainVisual__image}
          />
        )}
      </Figure>

      <Div className={styles.LatestArticleCard__contents}>
        {publishedAt && (
          <Div className={styles.LatestArticleCardDate}>
            <time
              className={styles.LatestArticleCardDate__text}
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
          <Div className={styles.LatestArticleCardDate}>
            {startedAt && (
              <time
                className={styles.LatestArticleCardDate__text}
                dateTime={format(new Date(startedAt), 'yyyy-MM-dd')}
              >
                {format(
                  new Date(startedAt),
                  locale === 'en' ? 'MMMM d, yyyy' : 'yyyy/MM/dd',
                )}
              </time>
            )}

            <span className={styles.LatestArticleCardDate__separator}>
              {locale === 'en' ? ' - ' : '〜'}
            </span>

            {endedAt && (
              <time
                className={styles.LatestArticleCardDate__text}
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

        <Div className={styles.LatestArticleCardTitle}>
          <Title className={styles.LatestArticleCardTitle__text}>{title}</Title>
        </Div>
      </Div>
    </Div>
  )
}

export const LatestArticleCard = ({
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
}: LatestArticleCardProps) => {
  // 外部リンク判定
  const isExternal = useMemo(() => {
    return url ? url.startsWith('http://') || url.startsWith('https://') : false
  }, [url])

  return isExternal ? (
    <a
      href={url}
      target={target}
      rel={rel}
      className={clsx(styles.LatestArticleCard, className)}
      title={title}
      aria-label={title}
    >
      <LatestArticleCardContainer
        mainVisual={mainVisual}
        publishedAt={publishedAt}
        startedAt={startedAt}
        endedAt={endedAt}
        title={title}
        titleTag={titleTag}
      />
    </a>
  ) : url ? (
    <Link
      href={url}
      target={target}
      rel={rel}
      className={clsx(styles.LatestArticleCard, className)}
      title={title}
      aria-label={title}
    >
      <LatestArticleCardContainer
        mainVisual={mainVisual}
        publishedAt={publishedAt}
        startedAt={startedAt}
        endedAt={endedAt}
        title={title}
        titleTag={titleTag}
      />
    </Link>
  ) : (
    <button
      type={buttonType ?? 'button'}
      onClick={onClick}
      disabled={isDisabled}
      className={clsx(styles.LatestArticleCard, className)}
      title={title}
      aria-label={title}
    >
      <LatestArticleCardContainer
        mainVisual={mainVisual}
        publishedAt={publishedAt}
        startedAt={startedAt}
        endedAt={endedAt}
        title={title}
        titleTag={titleTag}
        isButton
      />
    </button>
  )
}
