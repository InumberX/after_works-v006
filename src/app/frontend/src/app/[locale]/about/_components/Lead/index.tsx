'use client'

import clsx from 'clsx'

import styles from './index.module.css'

import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { LayoutSection } from '@/components/ui/layouts/LayoutSection'
import { ReplaceNewLineText } from '@/components/ui/typographies/ReplaceNewLineText'
import { useAnimelm, type AnimelmElement } from '@/hooks/use-animelm'

export type LeadProps = {
  lead: string
}

export const Lead = ({ lead }: LeadProps) => {
  const { targetRef } = useAnimelm<AnimelmElement>()

  return (
    <LayoutSection className={styles.Lead} isFirst tag='div'>
      <LayoutInner size='small'>
        <div className={styles.Lead__container}>
          <div
            className={clsx(styles.Lead__contents, 'AnimelmBlurIn')}
            ref={targetRef}
          >
            <p className={styles.Lead__text}>
              <ReplaceNewLineText text={lead} />
            </p>
          </div>
        </div>
      </LayoutInner>
    </LayoutSection>
  )
}
