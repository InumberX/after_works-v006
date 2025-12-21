import styles from './index.module.css'

import { LatestArticleCardProps } from '@/components/ui/cards/LatestArticleCard'
import { GoogleAdList } from '@/components/ui/lists/GoogleAdList'
import { SideLatestArticle } from '@/components/ui/sides/SideLatestArticle'
import { getScopedI18n } from '@/locales/server'

type Props = {
  latestArticleInfos: LatestArticleCardProps[]
}

export const SideColumn = async ({ latestArticleInfos }: Props) => {
  const scopedT = await getScopedI18n('blogs')

  return (
    <div className={styles.SideColumn}>
      <div className={styles.SideColumn__container}>
        <SideLatestArticle
          title={scopedT('sideColumn.latestArticle.title')}
          infos={latestArticleInfos}
        />
        <GoogleAdList
          className={styles.SideColumn__googleAdList}
          infos={[
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
