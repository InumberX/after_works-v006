'use client'

import clsx from 'clsx'
import { type ReactNode } from 'react'

import styles from './index.module.css'

import { useAnimelm, type AnimelmElement } from '~/hooks/use-animelm'

type Props = {
  className?: string
  lead: ReactNode
}

export const SectionLead = ({ className, lead }: Props) => {
  const { targetRef, isVisible } = useAnimelm<AnimelmElement>()

  return (
    <div
      className={clsx(
        styles.SectionLead,
        isVisible && 'AnimelmBlurIn',
        className,
      )}
      ref={targetRef}
    >
      <div className={styles.SectionTitle__container}>
        <p className={styles.SectionLead__paragraph}>{lead}</p>
      </div>
    </div>
  )
}
