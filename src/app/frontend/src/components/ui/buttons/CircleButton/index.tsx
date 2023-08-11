'use client'

import { ReactNode, useMemo } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { ButtonType, AnchorTarget, AnchorRel } from '~/types/html'
import { EventTypes } from '~/types/event'
import styles from './index.module.scss'

type Props = {
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
      className={clsx(styles.CircleButton, className)}
      title={title}
      aria-label={title}
    >
      {children}
    </a>
  ) : url ? (
    <Link
      href={url}
      target={target}
      rel={rel}
      className={clsx(styles.CircleButton, className)}
      title={title}
      aria-label={title}
    >
      {children}
    </Link>
  ) : (
    <button
      type={buttonType ?? 'button'}
      onClick={onClick}
      disabled={isDisabled}
      className={clsx(styles.CircleButton, className)}
      title={title}
      aria-label={title}
    >
      {children}
    </button>
  )
}
