import { PageTitle } from '@/components/ui/typographies/PageTitle'
import { Contact } from '@/components/common/Contact'
import { BaseBreadcrumb } from '@/components/ui/breadcrumbs/BaseBreadcrumb'
import { LayoutSection } from '@/components/ui/layouts/LayoutSection'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { LayoutParallel } from '@/components/ui/layouts/LayoutParallel'
import { ArticleCardProps } from '@/components/ui/cards/ArticleCard'
import { MainColumn } from './MainColumn'
import { LatestArticleCardProps } from '@/components/ui/cards/LatestArticleCard'
import { SideColumn } from './SideColumn'
import { ApiResponseTagPositionTag } from '@/types/apis/fetch/tagPosition'

type Props = {
  defaultPage: number
  defaultTotalPage: number
  defaultArticleInfos: ArticleCardProps[]
  latestArticleInfos: LatestArticleCardProps[]
  tagPositionInfos: ApiResponseTagPositionTag[]
}

export const Index = ({
  defaultPage,
  defaultTotalPage,
  defaultArticleInfos,
  latestArticleInfos,
  tagPositionInfos,
}: Props) => {
  return (
    <>
      <PageTitle title='趣味' subTitle='Hobby' />
      <BaseBreadcrumb
        infos={[
          {
            name: '趣味',
          },
        ]}
      />

      <LayoutSection tag='div' isNotTopMargin>
        <LayoutInner>
          <LayoutParallel
            mainColumn={
              <MainColumn
                defaultPage={defaultPage}
                defaultTotalPage={defaultTotalPage}
                defaultArticleInfos={defaultArticleInfos}
                tagPositionInfos={tagPositionInfos}
              />
            }
            sideColumn={<SideColumn latestArticleInfos={latestArticleInfos} />}
          />
        </LayoutInner>
      </LayoutSection>

      <Contact />
    </>
  )
}
