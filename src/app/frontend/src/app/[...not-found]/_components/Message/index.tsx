import styles from './index.module.scss'
import { LayoutSection } from '@/components/ui/layouts/LayoutSection'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { BaseButton } from '@/components/ui/buttons/BaseButton'
import { routes } from '@/config/routes'

export const Message = () => {
  return (
    <LayoutSection className={styles.Message} isFirst tag='div'>
      <LayoutInner size='small'>
        <div className={styles.Message__container}>
          <div className={styles.Message__contents}>
            <p className={styles.Message__text}>
              お探しのページは削除されたか、一時的にご利用できない可能性があります。
              <br />
              お探しのページのURLが正しいかどうかご確認ください。
            </p>

            <div className={styles.MessageButton}>
              <BaseButton
                url={routes.top.url({})}
                text='トップに戻る'
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
