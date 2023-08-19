import styles from './index.module.scss'
import { LayoutSection } from '~/components/ui/layouts/LayoutSection'
import { LayoutInner } from '~/components/ui/layouts/LayoutInner'
import { BaseButton } from '~/components/ui/buttons/BaseButton'

export const Message = () => {
  return (
    <LayoutSection className={styles.Message} isFirst>
      <LayoutInner>
        <div className={styles.Message__container}>
          <div className={styles.MessageText}>
            <p className={styles.MessageText__text}>
              下記フォームよりお気軽にお問い合わせください。
            </p>
          </div>

          <div className={styles.MessageLink}>
            <BaseButton
              text='お問い合わせ'
              url='https://docs.google.com/forms/d/e/1FAIpQLSfFvT-kuWDU1O45Nr-iq3ldDhH3gqRHO5XKpQlAD9Prw6UfLA/viewform?usp=sf_link'
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
