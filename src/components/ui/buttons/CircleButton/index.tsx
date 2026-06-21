'use client'

import clsx from 'clsx'
import { ReactNode } from 'react'

import styles from './index.module.css'

import { PrimitiveButton } from '~/components/primitives/buttons/PrimitiveButton'
import { EventTypes } from '~/types/event'
import { ButtonType, AnchorTarget, AnchorRel } from '~/types/html'

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
  return (
    <PrimitiveButton
      url={url}
      target={target}
      rel={rel}
      buttonType={buttonType ?? 'button'}
      isDisabled={isDisabled}
      onClick={onClick}
      className={clsx(
        styles.CircleButton,
        className,
        variant && styles[`CircleButton--${variant}`],
        size && styles[`CircleButton--${size}`],
      )}
      title={title}
      ariaLabel={title}
    >
      <span className={styles.CircleButton__container}>{children}</span>
    </PrimitiveButton>
  )
}
