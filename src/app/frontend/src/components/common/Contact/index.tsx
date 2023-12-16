import clsx from 'clsx'
import styles from './index.module.scss'
import { LayoutSection } from '@/components/ui/layouts/LayoutSection'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { SectionTitle } from '@/components/ui/typographies/SectionTitle'
import { BaseButton } from '@/components/ui/buttons/BaseButton'
import { routes } from '@/config/routes'
import { SvgIcon } from '@/components/ui/icons/SvgIcon'
import { getScopedI18n } from '@/locales/server'
import { ReplaceNewLineText } from '@/components/ui/typographies/ReplaceNewLineText'

export type Props = {
  className?: string
}

export const Contact = async ({ className }: Props) => {
  const scopedT = await getScopedI18n('components.contact')

  return (
    <LayoutSection className={clsx(styles.Contact, className)}>
      <LayoutInner>
        <div className={styles.Contact__container}>
          <SectionTitle
            subTitle={scopedT('subTitle')}
            title={scopedT('title')}
          />

          <div className={styles.Contact__contents}>
            <p className={styles.Contact__message}>
              <ReplaceNewLineText text={scopedT('message')} />
            </p>

            <div className={styles.ContactButton}>
              <BaseButton
                className={styles.ContactButton__button}
                url={routes.contact.url({})}
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
