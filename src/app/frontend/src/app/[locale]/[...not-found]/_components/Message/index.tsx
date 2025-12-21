import styles from './index.module.css'

import { BaseButton } from '@/components/ui/buttons/BaseButton'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { LayoutSection } from '@/components/ui/layouts/LayoutSection'
import { ReplaceNewLineText } from '@/components/ui/typographies/ReplaceNewLineText'
import { routes } from '@/config/routes'
import { getScopedI18n, getCurrentLocale } from '@/locales/server'

export const Message = async () => {
  const scopedT = await getScopedI18n('notFound')
  const locale = await getCurrentLocale()

  return (
    <LayoutSection className={styles.Message} isFirst tag='div'>
      <LayoutInner size='small'>
        <div className={styles.Message__container}>
          <div className={styles.Message__contents}>
            <p className={styles.Message__text}>
              <ReplaceNewLineText text={scopedT('message.text')} />
            </p>

            <div className={styles.MessageButton}>
              <BaseButton
                url={routes.home.url({
                  locale,
                })}
                text={scopedT('message.buttonText')}
                isRightArrow
                className={styles.MessageButton__button}
              />
            </div>
          </div>
        </div>
      </LayoutInner>
    </LayoutSection>
  )
}
