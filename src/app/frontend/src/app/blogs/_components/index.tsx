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
import { ApiResponseTagNewsTag } from '@/types/apis/fetch/tagNews'

type Props = {
  defaultPage: number
  defaultTotalPage: number
  defaultArticleInfos: ArticleCardProps[]
  latestArticleInfos: LatestArticleCardProps[]
  tagNewsInfos: ApiResponseTagNewsTag[]
}

export const Index = ({
  defaultPage,
  defaultTotalPage,
  defaultArticleInfos,
  latestArticleInfos,
  tagNewsInfos,
}: Props) => {
  return (
    <>
      <PageTitle title='ブログ' subTitle='Blog' />

      <BaseBreadcrumb
        infos={[
          {
            name: 'ブログ',
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
                tagNewsInfos={tagNewsInfos}
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
