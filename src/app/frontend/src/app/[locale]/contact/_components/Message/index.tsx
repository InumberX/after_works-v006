import styles from './index.module.css'
import { LayoutSection } from '@/components/ui/layouts/LayoutSection'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { BaseButton } from '@/components/ui/buttons/BaseButton'
import { getScopedI18n } from '@/locales/server'

export const Message = async () => {
  const scopedT = await getScopedI18n('contact')

  return (
    <LayoutSection className={styles.Message} isFirst>
      <LayoutInner>
        <div className={styles.Message__container}>
          <div className={styles.MessageText}>
            <p className={styles.MessageText__text}>
              {scopedT('message.text')}
            </p>
          </div>

          <div className={styles.MessageLink}>
            <BaseButton
              text={scopedT('message.buttonText')}
              url={scopedT('message.buttonUrl')}
              rel='noopener noreferrer'
              target='_blank'
              className={styles.MessageLink__button}
              isRightArrow
            />
          </div>
        </div>
      </LayoutInner>
    </LayoutSection>
  )
}
