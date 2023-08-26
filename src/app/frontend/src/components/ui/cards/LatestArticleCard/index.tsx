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

export type LatestArticleCardProps = {
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

  const Title = titleTag ?? 'h3'

  return isExternal ? (
    <a
      href={url}
      target={target}
      rel={rel}
      className={clsx(styles.LatestArticleCard, className)}
      title={title}
      aria-label={title}
    >
      <div className={styles.LatestArticleCard__container}>
        <figure className={styles.LatestArticleCardMainVisual}>
          {mainVisual ? (
            <Image
              src={mainVisual.src}
              alt={mainVisual.alt}
              fill
              className={styles.LatestArticleCardMainVisual__image}
            />
          ) : (
            <Image
              src={`${STATIC_IMAGE_DIR}/img-empty.webp`}
              alt='After Works.'
              fill
              className={styles.LatestArticleCardMainVisual__image}
            />
          )}
        </figure>

        <div className={styles.LatestArticleCard__contents}>
          {publishedAt && (
            <div className={styles.LatestArticleCardDate}>
              <time
                className={styles.LatestArticleCardDate__text}
                dateTime={format(new Date(publishedAt), 'yyyy-MM-dd')}
              >
                {format(new Date(publishedAt), 'yyyy/MM/dd')}
              </time>
            </div>
          )}

          {(startedAt || endedAt) && (
            <div className={styles.LatestArticleCardDate}>
              {startedAt && (
                <time
                  className={styles.LatestArticleCardDate__text}
                  dateTime={format(new Date(startedAt), 'yyyy-MM-dd')}
                >
                  {format(new Date(startedAt), 'yyyy/MM/dd')}
                </time>
              )}

              <span className={styles.LatestArticleCardDate__separator}>
                〜
              </span>

              {endedAt && (
                <time
                  className={styles.LatestArticleCardDate__text}
                  dateTime={format(new Date(endedAt), 'yyyy-MM-dd')}
                >
                  {format(new Date(endedAt), 'yyyy/MM/dd')}
                </time>
              )}
            </div>
          )}

          <div className={styles.LatestArticleCardTitle}>
            <Title className={styles.LatestArticleCardTitle__text}>
              {title}
            </Title>
          </div>
        </div>
      </div>
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
      <div className={styles.LatestArticleCard__container}>
        <figure className={styles.LatestArticleCardMainVisual}>
          {mainVisual ? (
            <Image
              src={mainVisual.src}
              alt={mainVisual.alt}
              fill
              className={styles.LatestArticleCardMainVisual__image}
            />
          ) : (
            <Image
              src={`${STATIC_IMAGE_DIR}/img-empty.jpg`}
              alt='After Works.'
              fill
              className={styles.LatestArticleCardMainVisual__image}
            />
          )}
        </figure>

        <div className={styles.LatestArticleCard__contents}>
          {publishedAt && (
            <div className={styles.LatestArticleCardDate}>
              <time
                className={styles.LatestArticleCardDate__text}
                dateTime={format(new Date(publishedAt), 'yyyy-MM-dd')}
              >
                {format(new Date(publishedAt), 'yyyy/MM/dd')}
              </time>
            </div>
          )}

          {(startedAt || endedAt) && (
            <div className={styles.LatestArticleCardDate}>
              {startedAt && (
                <time
                  className={styles.LatestArticleCardDate__text}
                  dateTime={format(new Date(startedAt), 'yyyy-MM-dd')}
                >
                  {format(new Date(startedAt), 'yyyy/MM/dd')}
                </time>
              )}

              <span className={styles.LatestArticleCardDate__separator}>
                〜
              </span>

              {endedAt && (
                <time
                  className={styles.LatestArticleCardDate__text}
                  dateTime={format(new Date(endedAt), 'yyyy-MM-dd')}
                >
                  {format(new Date(endedAt), 'yyyy/MM/dd')}
                </time>
              )}
            </div>
          )}

          <div className={styles.LatestArticleCardTitle}>
            <Title className={styles.LatestArticleCardTitle__text}>
              {title}
            </Title>
          </div>
        </div>
      </div>
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
      <span className={styles.LatestArticleCard__container}>
        <span className={styles.LatestArticleCardMainVisual}>
          {mainVisual ? (
            <Image
              src={mainVisual.src}
              alt={mainVisual.alt}
              fill
              className={styles.LatestArticleCardMainVisual__image}
            />
          ) : (
            <Image
              src={`${STATIC_IMAGE_DIR}/img-empty.jpg`}
              alt='After Works.'
              fill
              className={styles.LatestArticleCardMainVisual__image}
            />
          )}
        </span>

        <span className={styles.LatestArticleCard__contents}>
          {publishedAt && (
            <span className={styles.LatestArticleCardDate}>
              <time
                className={styles.LatestArticleCardDate__text}
                dateTime={format(new Date(publishedAt), 'yyyy-MM-dd')}
              >
                {format(new Date(publishedAt), 'yyyy/MM/dd')}
              </time>
            </span>
          )}

          {(startedAt || endedAt) && (
            <span className={styles.LatestArticleCardDate}>
              {startedAt && (
                <time
                  className={styles.LatestArticleCardDate__text}
                  dateTime={format(new Date(startedAt), 'yyyy-MM-dd')}
                >
                  {format(new Date(startedAt), 'yyyy/MM/dd')}
                </time>
              )}

              <span className={styles.LatestArticleCardDate__separator}>
                〜
              </span>

              {endedAt && (
                <time
                  className={styles.LatestArticleCardDate__text}
                  dateTime={format(new Date(endedAt), 'yyyy-MM-dd')}
                >
                  {format(new Date(endedAt), 'yyyy/MM/dd')}
                </time>
              )}
            </span>
          )}

          <span className={styles.LatestArticleCardTitle}>
            <span className={styles.LatestArticleCardTitle__text}>{title}</span>
          </span>
        </span>
      </span>
    </button>
  )
}
