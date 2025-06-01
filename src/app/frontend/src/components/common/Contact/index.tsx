'use client'

import clsx from 'clsx'
import styles from './index.module.css'
import { LayoutSection } from '@/components/ui/layouts/LayoutSection'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { SectionTitle } from '@/components/ui/typographies/SectionTitle'
import { BaseButton } from '@/components/ui/buttons/BaseButton'
import { routes } from '@/config/routes'
import { SvgIcon } from '@/components/ui/icons/SvgIcon'
import { useScopedI18n, useCurrentLocale } from '@/locales/client'
import { ReplaceNewLineText } from '@/components/ui/typographies/ReplaceNewLineText'
import { useAnimelm, type AnimelmElement } from '@/hooks/use-animelm'

export type Props = {
  className?: string
}

export const Contact = ({ className }: Props) => {
  const scopedT = useScopedI18n('components.contact')
  const { targetRef } = useAnimelm<AnimelmElement>()

  return (
    <LayoutSection className={clsx(styles.Contact, className)}>
      <LayoutInner>
        <div className={styles.Contact__container}>
          <SectionTitle
            subTitle={scopedT('subTitle')}
            title={scopedT('title')}
          />

          <div
            className={clsx(styles.Contact__contents, 'AnimelmBlurIn')}
            ref={targetRef}
          >
            <p className={styles.Contact__message}>
              <ReplaceNewLineText text={scopedT('message')} />
            </p>

            <div className={styles.ContactButton}>
              <BaseButton
                className={styles.ContactButton__button}
                url={routes.contact.url({
                  locale: useCurrentLocale(),
                })}
                text={scopedT('buttonText')}
                isRightArrow
                leftElm={
                  <SvgIcon
                    className={styles.ContactButton__icon}
                    variant='mail'
                  />
                }
              />
            </div>
          </div>
        </div>
      </LayoutInner>
    </LayoutSection>
  )
}
