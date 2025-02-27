'use client'

import { ReactNode, JSX } from 'react'
import clsx from 'clsx'
import styles from './index.module.scss'
import { BaseButton, BaseButtonProps } from '@/components/ui/buttons/BaseButton'
import { useAnimelm, type AnimelmElement } from '@/hooks/use-animelm'

export type ServiceCardProps = {
  className?: string
  icon?: ReactNode
  titleTag?: keyof JSX.IntrinsicElements
  title: ReactNode
  description?: ReactNode
  buttonInfo?: BaseButtonProps
}

export const ServiceCard = ({
  className,
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
      className={clsx(styles.ServiceCard, className, 'AnimelmBlurIn')}
      ref={targetRef}
    >
      <div className={styles.ServiceCard__container}>
        {icon && <div className={styles.ServiceCardIcon}>{icon}</div>}

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
