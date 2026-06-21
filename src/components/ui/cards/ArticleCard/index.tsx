'use client'

import clsx from 'clsx'
import { format } from 'date-fns'
import Image from 'next/image'
import type { JSX } from 'react'

import styles from './index.module.css'

import {
  PrimitiveButton,
  type PrimitiveButtonProps,
} from '~/components/primitives/buttons/PrimitiveButton'
import { BaseTagList } from '~/components/ui/lists/BaseTagList'
import type { BaseTagProps } from '~/components/ui/tags/BaseTag'
import { STATIC_IMAGE_DIR, CACHE_BUSTER } from '~/config/env'
import { useAnimelm, type AnimelmElement } from '~/hooks/use-animelm'
import { useCurrentLocale } from '~/locales/client'

type ArticleCardContainerProps = {
  mainVisual?: {
    src: string
    alt: string
  }
  publishedAt?: string | Date
  startedAt?: string | Date
  endedAt?: string | Date
  title: string
  titleTag?: keyof JSX.IntrinsicElements
  tags: BaseTagProps[]
  isButton?: boolean
}

export type ArticleCardProps = Pick<
  PrimitiveButtonProps,
  | 'url'
  | 'target'
  | 'rel'
  | 'buttonType'
  | 'isDisabled'
  | 'className'
  | 'onClick'
> & {
  isNotActiveAnimelm?: boolean
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
            src={`${STATIC_IMAGE_DIR}/img-empty.avif?${CACHE_BUSTER}`}
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
          items={tags}
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
  isNotActiveAnimelm,
}: ArticleCardProps) => {
  const { targetRef } = useAnimelm<AnimelmElement>()

  return (
    <div
      className={clsx(
        styles.ArticleCard,
        !isNotActiveAnimelm && 'AnimelmBlurIn',
      )}
      ref={isNotActiveAnimelm ? null : targetRef}
    >
      <PrimitiveButton
        url={url}
        target={target}
        rel={rel}
        buttonType={buttonType ?? 'button'}
        isDisabled={isDisabled}
        onClick={onClick}
        className={clsx(styles.ArticleCard__button, className)}
        title={title}
        ariaLabel={title}
      >
        <ArticleCardContainer
          mainVisual={mainVisual}
          publishedAt={publishedAt}
          startedAt={startedAt}
          endedAt={endedAt}
          title={title}
          titleTag={titleTag}
          tags={tags}
          isButton={!url}
        />
      </PrimitiveButton>
    </div>
  )
}
