import clsx from 'clsx'
import styles from './index.module.scss'
import { LayoutSection } from '~/components/ui/layouts/LayoutSection'
import { LayoutInner } from '~/components/ui/layouts/LayoutInner'
import { SectionTitle } from '~/components/ui/typographies/PageTitle'
import { BaseButton } from '~/components/ui/buttons/BaseButton'
import { routes } from '~/config/routes'
import { SvgIcon } from '~/components/ui/icons/SvgIcon'

export type Props = {
  className?: string
}

export const Contact = ({ className }: Props) => {
  return (
    <LayoutSection className={clsx(styles.Contact, className)}>
      <LayoutInner>
        <div className={styles.Contact__container}>
          <SectionTitle subTitle='Contact' title='お問い合わせ' />

          <div className={styles.Contact__contents}>
            <p className={styles.Contact__message}>
              「ランディングページを制作してほしい」、「WordPressを使って更新性の高いWebサイトを作りたい」、
              <br />
              「JavaScriptを用いてWebサイトにリッチな表現を取り入れてほしい」などお客様の様々なご要望にお応えいたします。
              <br />
              また、デザインのみ、コーディングのみ行ってほしいといったご依頼にも柔軟に対応できます。
              <br />
              まずはお気軽にお問い合わせください。
            </p>

            <div className={styles.ContactButton}>
              <BaseButton
                className={styles.ContactButton__button}
                url={routes.contact.url({})}
                text='お問い合わせ'
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
