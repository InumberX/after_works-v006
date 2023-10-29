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

type Props = {
  latestArticleInfos: LatestArticleCardProps[]
  articleInfo: BaseArticleInfo
}

export const Index = ({ latestArticleInfos, articleInfo }: Props) => {
  return (
    <>
      <BaseBreadcrumb
        infos={[
          {
            name: '実績',
            url: routes.works.url({}),
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
