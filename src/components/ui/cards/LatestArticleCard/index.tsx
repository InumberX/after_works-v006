'use client'

import clsx from 'clsx'
import { format } from 'date-fns'
import Image from 'next/image'
import { JSX } from 'react'

import styles from './index.module.css'

import {
  PrimitiveButton,
  PrimitiveButtonProps,
} from '~/components/primitives/buttons/PrimitiveButton'
import { STATIC_IMAGE_DIR, CACHE_BUSTER } from '~/config/env'
import { useCurrentLocale } from '~/locales/client'

type LatestArticleCardContainerProps = {
  mainVisual?: {
    src: string
    alt: string
  }
  publishedAt?: string | Date
  startedAt?: string | Date
  endedAt?: string | Date
  title: string
  titleTag?: keyof JSX.IntrinsicElements
  isButton?: boolean
}

export type LatestArticleCardProps = Pick<
  PrimitiveButtonProps,
  | 'url'
  | 'target'
  | 'rel'
  | 'buttonType'
  | 'isDisabled'
  | 'className'
  | 'onClick'
> &
  LatestArticleCardContainerProps

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
            src={`${STATIC_IMAGE_DIR}/img-empty.avif?${CACHE_BUSTER}`}
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
              {locale === 'en' ? '-' : '〜'}
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
  return (
    <PrimitiveButton
      url={url}
      target={target}
      rel={rel}
      buttonType={buttonType ?? 'button'}
      isDisabled={isDisabled}
      onClick={onClick}
      className={clsx(styles.LatestArticleCard, className)}
      title={title}
      ariaLabel={title}
    >
      <LatestArticleCardContainer
        mainVisual={mainVisual}
        publishedAt={publishedAt}
        startedAt={startedAt}
        endedAt={endedAt}
        title={title}
        titleTag={titleTag}
        isButton={!url}
      />
    </PrimitiveButton>
  )
}
