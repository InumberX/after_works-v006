import styles from './index.module.css'

import { BaseButton } from '~/components/ui/buttons/BaseButton'
import { LayoutInner } from '~/components/ui/layouts/LayoutInner'
import { LayoutSection } from '~/components/ui/layouts/LayoutSection'
import { ReplaceNewLineText } from '~/components/ui/typographies/ReplaceNewLineText'

// 404 のページと、エラーのページ（`src/app/[locale]/error.tsx`、クライアント
// コンポーネント）で共有するため、文言は呼び出し側で翻訳して渡す
type Props = {
  text: string
  buttonText: string
  buttonUrl: string
}

export const Message = ({ text, buttonText, buttonUrl }: Props) => {
  return (
    <LayoutSection className={styles.Message} isFirst tag='div'>
      <LayoutInner size='small'>
        <div className={styles.Message__container}>
          <div className={styles.Message__contents}>
            <p className={styles.Message__text}>
              <ReplaceNewLineText text={text} />
            </p>

            <div className={styles.MessageButton}>
              <BaseButton
                url={buttonUrl}
                text={buttonText}
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
