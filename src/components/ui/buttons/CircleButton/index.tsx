'use client'

import clsx from 'clsx'

import styles from './index.module.css'

import {
  PrimitiveButton,
  PrimitiveButtonProps,
} from '~/components/primitives/buttons/PrimitiveButton'

export type CircleButtonProps = PrimitiveButtonProps & {
  variant?: 'contained' | 'outlined'
  size?: 'small' | 'medium' | 'large'
}

export const CircleButton = ({
  variant,
  size,
  children,
  className,
  buttonType,
  title,
  ariaLabel,
  ...rest
}: CircleButtonProps) => {
  return (
    <PrimitiveButton
      {...rest}
      buttonType={buttonType ?? 'button'}
      title={title}
      ariaLabel={ariaLabel ?? title}
      className={clsx(
        styles.CircleButton,
        className,
        variant && styles[`CircleButton--${variant}`],
        size && styles[`CircleButton--${size}`],
      )}
    >
      <span className={styles.CircleButton__container}>{children}</span>
    </PrimitiveButton>
  )
}
