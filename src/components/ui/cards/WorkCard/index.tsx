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

type WorkCardContainerProps = {
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

export type WorkCardProps = Pick<
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
  size?: 'medium' | 'pcLarge'
} & WorkCardContainerProps

const WorkCardContainer = ({
  mainVisual,
  publishedAt,
  startedAt,
  endedAt,
  title,
  titleTag,
  tags,
  isButton,
}: WorkCardContainerProps) => {
  const locale = useCurrentLocale()
  const Div = isButton ? 'span' : 'div'
  const Figure = isButton ? 'span' : 'figure'
  const Title = titleTag ?? 'h2'

  return (
    <Div className={styles.WorkCard__container}>
      <Figure className={styles.WorkCardMainVisual}>
        {mainVisual ? (
          <Image
            src={mainVisual.src}
            alt={mainVisual.alt}
            fill
            className={styles.WorkCardMainVisual__image}
          />
        ) : (
          <Image
            src={`${STATIC_IMAGE_DIR}/img-empty.avif?${CACHE_BUSTER}`}
            alt='After Works.'
            fill
            className={styles.WorkCardMainVisual__image}
          />
        )}
      </Figure>

      {publishedAt && (
        <Div className={styles.WorkCardDate}>
          <time
            className={styles.WorkCardDate__text}
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
        <Div className={styles.WorkCardDate}>
          {startedAt && (
            <time
              className={styles.WorkCardDate__text}
              dateTime={format(new Date(startedAt), 'yyyy-MM-dd')}
            >
              {format(
                new Date(startedAt),
                locale === 'en' ? 'MMMM d, yyyy' : 'yyyy/MM/dd',
              )}
            </time>
          )}

          <span className={styles.WorkCardDate__separator}>
            {locale === 'en' ? '-' : '〜'}
          </span>

          {endedAt && (
            <time
              className={styles.WorkCardDate__text}
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

      <Div className={styles.WorkCardTitle}>
        <Title className={styles.WorkCardTitle__text}>{title}</Title>
      </Div>

      {tags.length > 0 && (
        <BaseTagList className={styles.WorkCardTag} items={tags} isJustifyEnd />
      )}
    </Div>
  )
}

export const WorkCard = ({
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
  size = 'medium',
}: WorkCardProps) => {
  const { targetRef } = useAnimelm<AnimelmElement>()

  return (
    <div
      className={clsx(
        styles.WorkCard,
        styles[`WorkCard--${size}`],
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
        className={clsx(styles.WorkCard__button, className)}
        title={title}
        ariaLabel={title}
      >
        <WorkCardContainer
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
