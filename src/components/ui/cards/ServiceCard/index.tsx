'use client'

import clsx from 'clsx'
import type { ReactNode, JSX } from 'react'

import styles from './index.module.css'

import {
  BaseButton,
  type BaseButtonProps,
} from '~/components/ui/buttons/BaseButton'
import { SvgIcon, type SvgIconVariant } from '~/components/ui/icons/SvgIcon'
import { useAnimelm, type AnimelmElement } from '~/hooks/use-animelm'

export type ServiceCardProps = {
  className?: string
  color?: 'primary' | 'secondary'
  icon?: SvgIconVariant
  titleTag?: keyof JSX.IntrinsicElements
  title: ReactNode
  description?: ReactNode
  buttonInfo?: BaseButtonProps
}

export const ServiceCard = ({
  className,
  color = 'primary',
  icon,
  titleTag,
  title,
  description,
  buttonInfo,
}: ServiceCardProps) => {
  const { targetRef } = useAnimelm<AnimelmElement>()

  const Title = titleTag ?? 'h3'

  return (
    <div
      className={clsx(
        styles.ServiceCard,
        styles[`ServiceCard--${color}`],
        className,
        'AnimelmBlurIn',
      )}
      ref={targetRef}
    >
      <div className={styles.ServiceCard__container}>
        {icon && (
          <div className={styles.ServiceCardIcon}>
            <div className={styles.ServiceCardIcon__container}>
              <SvgIcon
                variant={icon}
                className={styles.ServiceCardIcon__icon}
              />
            </div>
          </div>
        )}

        <div className={styles.ServiceCardTitle}>
          <Title className={styles.ServiceCardTitle__text}>{title}</Title>
        </div>

        {description && (
          <div className={styles.ServiceCardDescription}>
            <p className={styles.ServiceCardDescription__text}>{description}</p>
          </div>
        )}

        {buttonInfo && (
          <div className={styles.ServiceCardButton}>
            <BaseButton
              {...buttonInfo}
              className={clsx(
                styles.ServiceCardButton__button,
                buttonInfo.className,
              )}
            />
          </div>
        )}
      </div>
    </div>
  )
}
