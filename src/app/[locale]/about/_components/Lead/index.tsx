'use client'

import clsx from 'clsx'

import styles from './index.module.css'

import { LayoutInner } from '~/components/ui/layouts/LayoutInner'
import { LayoutSection } from '~/components/ui/layouts/LayoutSection'
import { ReplaceNewLineText } from '~/components/ui/typographies/ReplaceNewLineText'
import { SectionLead } from '~/components/ui/typographies/SectionLead'
import { useAnimelm, type AnimelmElement } from '~/hooks/use-animelm'

export type LeadProps = {
  lead: string
}

export const Lead = ({ lead }: LeadProps) => {
  const { targetRef } = useAnimelm<AnimelmElement>()

  return (
    <LayoutSection
      className={styles.Lead}
      isNotTopMargin
      isNotBottomMargin
      tag='div'
    >
      <LayoutInner>
        <div
          className={clsx(styles.Lead__container, 'AnimelmBlurIn')}
          ref={targetRef}
        >
          <SectionLead lead={<ReplaceNewLineText text={lead} />} />
        </div>
      </LayoutInner>
    </LayoutSection>
  )
}
