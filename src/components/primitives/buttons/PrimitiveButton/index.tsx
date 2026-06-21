'use client'

import clsx from 'clsx'
import Link from 'next/link'
import {
  type AriaRole,
  type AriaAttributes,
  type ReactNode,
  useMemo,
} from 'react'

import styles from './index.module.css'

import type { EventTypes } from '~/types/event'
import type { ButtonType, AnchorTarget, AnchorRel } from '~/types/html'

export type PrimitiveButtonProps = {
  url?: string
  target?: AnchorTarget
  rel?: AnchorRel
  buttonType?: ButtonType
  isDisabled?: boolean
  className?: string
  children?: ReactNode
  onClick?: EventTypes['onClickButton']
  name?: string
  value?: string
  title?: string
  role?: AriaRole
  tabIndex?: number
  ariaLabel?: AriaAttributes['aria-label']
  ariaControls?: AriaAttributes['aria-controls']
  ariaSelected?: AriaAttributes['aria-selected']
}

export const PrimitiveButton = ({
  url,
  target,
  rel,
  buttonType,
  isDisabled,
  className,
  children,
  onClick,
  name,
  value,
  title,
  role,
  tabIndex,
  ariaLabel,
  ariaControls,
  ariaSelected,
}: PrimitiveButtonProps) => {
  // 外部リンク判定
  const isExternal = useMemo(() => {
    return url ? url.startsWith('http://') || url.startsWith('https://') : false
  }, [url])

  // ページ内リンク判定
  const isInternalLink = useMemo(() => {
    return url ? url.startsWith('#') : false
  }, [url])

  const primitiveButtonClassName = clsx(
    styles.PrimitiveButton,
    isDisabled && styles['PrimitiveButton--disabled'],
    className,
  )

  return isExternal || isInternalLink ? (
    <a
      href={url}
      target={target}
      rel={rel}
      className={primitiveButtonClassName}
      title={title}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      aria-controls={ariaControls}
      aria-selected={ariaSelected}
    >
      {children}
    </a>
  ) : url ? (
    <Link
      href={url}
      target={target}
      rel={rel}
      className={primitiveButtonClassName}
      title={title}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      aria-controls={ariaControls}
      aria-selected={ariaSelected}
    >
      {children}
    </Link>
  ) : onClick || buttonType ? (
    <button
      type={buttonType ?? 'button'}
      onClick={onClick}
      disabled={isDisabled}
      className={primitiveButtonClassName}
      name={name}
      value={value}
      title={title}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      aria-controls={ariaControls}
      aria-selected={ariaSelected}
    >
      {children}
    </button>
  ) : (
    <span
      className={primitiveButtonClassName}
      title={title}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      aria-controls={ariaControls}
      aria-selected={ariaSelected}
    >
      {children}
    </span>
  )
}
