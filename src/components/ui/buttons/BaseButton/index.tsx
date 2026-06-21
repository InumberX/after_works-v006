'use client'

import clsx from 'clsx'
import type { ReactNode } from 'react'

import styles from './index.module.css'

import {
  PrimitiveButton,
  type PrimitiveButtonProps,
} from '~/components/primitives/buttons/PrimitiveButton'
import { SvgIcon } from '~/components/ui/icons/SvgIcon'

export type BaseButtonProps = Omit<PrimitiveButtonProps, 'children'> & {
  text: ReactNode
  leftElm?: ReactNode
  rightElm?: ReactNode
  isRightArrow?: boolean
  variant?: 'contained' | 'outlined'
  color?: 'primary' | 'light'
}

export const BaseButton = ({
  text,
  leftElm,
  rightElm,
  isRightArrow,
  variant = 'contained',
  color = 'primary',
  className,
  buttonType,
  ...rest
}: BaseButtonProps) => {
  return (
    <PrimitiveButton
      {...rest}
      buttonType={buttonType ?? 'button'}
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
