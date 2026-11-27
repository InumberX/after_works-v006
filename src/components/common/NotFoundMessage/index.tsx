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

export const NotFoundMessage = ({ text, buttonText, buttonUrl }: Props) => {
  return (
    <LayoutSection className={styles.NotFoundMessage} isFirst tag='div'>
      <LayoutInner size='small'>
        <div className={styles.NotFoundMessage__container}>
          <div className={styles.NotFoundMessage__contents}>
            <p className={styles.NotFoundMessage__text}>
              <ReplaceNewLineText text={text} />
            </p>

            <div className={styles.NotFoundMessageButton}>
              <BaseButton
                url={buttonUrl}
                text={buttonText}
                isRightArrow
                className={styles.NotFoundMessageButton__button}
              />
            </div>
          </div>
        </div>
      </LayoutInner>
    </LayoutSection>
  )
}
