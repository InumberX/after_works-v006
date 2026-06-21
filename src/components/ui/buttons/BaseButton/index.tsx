'use client'

import clsx from 'clsx'
import { ReactNode } from 'react'

import styles from './index.module.css'

import { PrimitiveButton } from '~/components/primitives/buttons/PrimitiveButton'
import { SvgIcon } from '~/components/ui/icons/SvgIcon'
import { EventTypes } from '~/types/event'
import { ButtonType, AnchorTarget, AnchorRel } from '~/types/html'

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
  variant?: 'contained' | 'outlined'
  color?: 'primary' | 'light'
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
  variant = 'contained',
  color = 'primary',
}: BaseButtonProps) => {
  return (
    <PrimitiveButton
      url={url}
      target={target}
      rel={rel}
      buttonType={buttonType ?? 'button'}
      isDisabled={isDisabled}
      onClick={onClick}
      className={clsx(
        styles.BaseButton,
        styles[`BaseButton--${variant}`],
        styles[`BaseButton--${color}`],
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
    </PrimitiveButton>
  )
}
