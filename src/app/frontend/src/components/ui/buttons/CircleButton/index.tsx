'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode, useMemo } from 'react'

import styles from './index.module.css'

import { EventTypes } from '@/types/event'
import { ButtonType, AnchorTarget, AnchorRel } from '@/types/html'

type Props = {
  variant?: 'contained' | 'outlined'
  size?: 'small' | 'medium' | 'large'
  url?: string
  target?: AnchorTarget
  rel?: AnchorRel
  buttonType?: ButtonType
  isDisabled?: boolean
  className?: string
  children?: ReactNode
  onClick?: EventTypes['onClickButton']
  title?: string
}

export const CircleButton = ({
  variant,
  size,
  url,
  target,
  rel,
  buttonType,
  isDisabled,
  className,
  children,
  onClick,
  title,
}: Props) => {
  // 外部リンク判定
  const isExternal = useMemo(() => {
    return url ? url.startsWith('http://') || url.startsWith('https://') : false
  }, [url])

  return isExternal ? (
    <a
      href={url}
      target={target}
      rel={rel}
      className={clsx(
        styles.CircleButton,
        className,
        variant && styles[`CircleButton--${variant}`],
        size && styles[`CircleButton--${size}`],
      )}
      title={title}
      aria-label={title}
    >
      <span className={styles.CircleButton__container}>{children}</span>
    </a>
  ) : url ? (
    <Link
      href={url}
      target={target}
      rel={rel}
      className={clsx(
        styles.CircleButton,
        className,
        variant && styles[`CircleButton--${variant}`],
        size && styles[`CircleButton--${size}`],
      )}
      title={title}
      aria-label={title}
    >
      <span className={styles.CircleButton__container}>{children}</span>
    </Link>
  ) : (
    <button
      type={buttonType ?? 'button'}
      onClick={onClick}
      disabled={isDisabled}
      className={clsx(
        styles.CircleButton,
        className,
        variant && styles[`CircleButton--${variant}`],
        size && styles[`CircleButton--${size}`],
      )}
      title={title}
      aria-label={title}
    >
      <span className={styles.CircleButton__container}>{children}</span>
    </button>
  )
}
