import styles from './index.module.scss'
import { SideLatestArticle } from '@/components/ui/sides/SideLatestArticle'
import { LatestArticleCardProps } from '@/components/ui/cards/LatestArticleCard'
import { getScopedI18n } from '@/locales/server'
import { GoogleAdList } from '@/components/ui/lists/GoogleAdList'

type Props = {
  latestArticleInfos: LatestArticleCardProps[]
}

export const SideColumn = async ({ latestArticleInfos }: Props) => {
  const scopedT = await getScopedI18n('hobby')

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
