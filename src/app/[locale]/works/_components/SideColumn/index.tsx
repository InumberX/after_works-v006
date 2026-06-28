import styles from './index.module.css'

import type { LatestArticleCardProps } from '~/components/ui/cards/LatestArticleCard'
import { GoogleAdList } from '~/components/ui/lists/GoogleAdList'
import { SideLatestArticle } from '~/components/ui/sides/SideLatestArticle'
import { getScopedI18n } from '~/locales/server'

type Props = {
  latestArticles: LatestArticleCardProps[]
}

export const SideColumn = async ({ latestArticles }: Props) => {
  const scopedT = await getScopedI18n('works')

  return (
    <div className={styles.SideColumn}>
      <div className={styles.SideColumn__container}>
        <SideLatestArticle
          title={scopedT('sideColumn.latestArticle.title')}
          items={latestArticles}
        />
        <GoogleAdList
          className={styles.SideColumn__googleAdList}
          items={[
            {
              slot: '7889882209',
            },
            {
              slot: '6465119893',
            },
          ]}
        />
      </div>
    </div>
  )
}
