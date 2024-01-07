import styles from './index.module.scss'
import { LayoutSection } from '@/components/ui/layouts/LayoutSection'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { BaseButton } from '@/components/ui/buttons/BaseButton'
import { routes } from '@/config/routes'
import { getScopedI18n, getCurrentLocale } from '@/locales/server'
import { ReplaceNewLineText } from '@/components/ui/typographies/ReplaceNewLineText'

export const Message = async () => {
  const scopedT = await getScopedI18n('notFound')

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
                  locale: getCurrentLocale(),
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
