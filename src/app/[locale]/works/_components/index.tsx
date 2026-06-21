import { MainColumn } from './MainColumn'
import { SideColumn } from './SideColumn'

import { Contact } from '~/components/common/Contact'
import { BaseBreadcrumb } from '~/components/ui/breadcrumbs/BaseBreadcrumb'
import { type LatestArticleCardProps } from '~/components/ui/cards/LatestArticleCard'
import { type WorkCardProps } from '~/components/ui/cards/WorkCard'
import { LayoutInner } from '~/components/ui/layouts/LayoutInner'
import { LayoutPageWrapper } from '~/components/ui/layouts/LayoutPageWrapper'
import { LayoutParallel } from '~/components/ui/layouts/LayoutParallel'
import { LayoutSection } from '~/components/ui/layouts/LayoutSection'
import { PageTitle } from '~/components/ui/typographies/PageTitle'
import { getScopedI18n } from '~/locales/server'
import { type Tag as ApiResponseTagPositionTag } from '~/types/apis/fetch/tag-position'

type Props = {
  defaultPage: number
  defaultTotalPage: number
  defaultArticles: WorkCardProps[]
  latestArticles: LatestArticleCardProps[]
  responseTagPosition: ApiResponseTagPositionTag[]
}

export const Index = async ({
  defaultPage,
  defaultTotalPage,
  defaultArticles,
  latestArticles,
  responseTagPosition,
}: Props) => {
  const scopedT = await getScopedI18n('works')

  return (
    <LayoutPageWrapper>
      <PageTitle
        title={scopedT('pageTitle')}
        subTitle={
          scopedT('pageSubTitle') !== 'pageSubTitle'
            ? scopedT('pageSubTitle')
            : ''
        }
      />
      <BaseBreadcrumb
        items={[
          {
            name: scopedT('pageTitle'),
          },
        ]}
      />

      <LayoutSection tag='div' isNotTopMargin>
        <LayoutInner>
          <LayoutParallel
            mainColumn={
              <MainColumn
                lead={scopedT('lead')}
                defaultPage={defaultPage}
                defaultTotalPage={defaultTotalPage}
                defaultArticles={defaultArticles}
                responseTagPosition={responseTagPosition}
              />
            }
            sideColumn={<SideColumn latestArticles={latestArticles} />}
          />
        </LayoutInner>
      </LayoutSection>

      <Contact />
    </LayoutPageWrapper>
  )
}
