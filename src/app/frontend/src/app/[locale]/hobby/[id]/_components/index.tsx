import { Contact } from '@/components/common/Contact'
import { BaseBreadcrumb } from '@/components/ui/breadcrumbs/BaseBreadcrumb'
import { LayoutSection } from '@/components/ui/layouts/LayoutSection'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { LayoutParallel } from '@/components/ui/layouts/LayoutParallel'
import { MainColumn } from './MainColumn'
import { LatestArticleCardProps } from '@/components/ui/cards/LatestArticleCard'
import { SideColumn } from './SideColumn'
import { BaseArticleInfo } from '@/components/ui/articles/BaseArticle'
import { routes } from '@/config/routes'
import { getScopedI18n } from '@/locales/server'

type Props = {
  latestArticleInfos: LatestArticleCardProps[]
  articleInfo: BaseArticleInfo
}

export const Index = async ({ latestArticleInfos, articleInfo }: Props) => {
  const hobbyScopedT = await getScopedI18n('hobby')

  return (
    <>
      <BaseBreadcrumb
        infos={[
          {
            name: hobbyScopedT('pageTitle'),
            url: routes.hobby.url({}),
          },
          {
            name: articleInfo.title,
          },
        ]}
        isTop={true}
      />

      <LayoutSection tag='div' isNotTopMargin>
        <LayoutInner>
          <LayoutParallel
            mainColumn={<MainColumn articleInfo={articleInfo} />}
            sideColumn={<SideColumn latestArticleInfos={latestArticleInfos} />}
          />
        </LayoutInner>
      </LayoutSection>

      <Contact />
    </>
  )
}
