'use client'

import { ReactNode, useMemo } from 'react'
import { ButtonType, AnchorTarget, AnchorRel } from '@/types/html'
import Link from 'next/link'
import clsx from 'clsx'
import styles from './index.module.scss'
import { EventTypes } from '@/types/event'
import { SvgIcon } from '@/components/ui/icons/SvgIcon'

export type BaseButtonProps = {
  url?: string
  target?: AnchorTarget
  rel?: AnchorRel
  buttonType?: ButtonType
  isDisabled?: boolean
  className?: string
  text: ReactNode
  leftElm?: ReactNode
  rightElm?: ReactNode
  onClick?: EventTypes['onClickButton']
  isRightArrow?: boolean
}

export const BaseButton = ({
  url,
  target,
  rel,
  buttonType,
  isDisabled,
  className,
  text,
  leftElm,
  rightElm,
  onClick,
  isRightArrow,
}: BaseButtonProps) => {
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
        styles.BaseButton,
        className,
        isRightArrow && styles['BaseButton--rightArrow'],
      )}
    >
      {leftElm && leftElm}
      <span className={styles.BaseButton__text}>{text}</span>
      {rightElm && rightElm}
      {isRightArrow && (
        <SvgIcon
          variant='arrowRight'
          className={styles.BaseButton__iconArrowRight}
        />
      )}
    </a>
  ) : url ? (
    <Link
      href={url}
      target={target}
      rel={rel}
      className={clsx(
        styles.BaseButton,
        className,
        isRightArrow && styles['BaseButton--rightArrow'],
      )}
    >
      {leftElm && leftElm}
      <span className={styles.BaseButton__text}>{text}</span>
      {rightElm && rightElm}
      {isRightArrow && (
        <SvgIcon
          variant='arrowRight'
          className={styles.BaseButton__iconArrowRight}
        />
      )}
    </Link>
  ) : (
    <button
      type={buttonType ?? 'button'}
      onClick={onClick}
      disabled={isDisabled}
      className={clsx(
        styles.BaseButton,
        className,
        isRightArrow && styles['BaseButton--rightArrow'],
      )}
    >
      {leftElm && leftElm}
      <span className={styles.BaseButton__text}>{text}</span>
      {rightElm && rightElm}
      {isRightArrow && (
        <SvgIcon
          variant='arrowRight'
          className={styles.BaseButton__iconArrowRight}
        />
      )}
    </button>
  )
}
