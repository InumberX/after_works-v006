import styles from './index.module.scss'
import { LayoutSection } from '~/components/ui/layouts/LayoutSection'
import { LayoutInner } from '~/components/ui/layouts/LayoutInner'
import { ReplaceNewLineText } from '~/components/ui/typographies/ReplaceNewLineText'

type Props = {
  lead: string
}

export const Lead = ({ lead }: Props) => {
  return (
    <LayoutSection className={styles.Lead} isFirst tag='div'>
      <LayoutInner size='small'>
        <div className={styles.Lead__container}>
          <div className={styles.Lead__contents}>
            <p className={styles.Lead__text}>
              <ReplaceNewLineText text={lead} />
            </p>
          </div>
        </div>
      </LayoutInner>
    </LayoutSection>
  )
}
