import { MainColumn } from './MainColumn'
import { SideColumn } from './SideColumn'

import { Contact } from '~/components/common/Contact'
import { BaseBreadcrumb } from '~/components/ui/breadcrumbs/BaseBreadcrumb'
import { LatestArticleCardProps } from '~/components/ui/cards/LatestArticleCard'
import { WorkCardProps } from '~/components/ui/cards/WorkCard'
import { LayoutInner } from '~/components/ui/layouts/LayoutInner'
import { LayoutPageWrapper } from '~/components/ui/layouts/LayoutPageWrapper'
import { LayoutParallel } from '~/components/ui/layouts/LayoutParallel'
import { LayoutSection } from '~/components/ui/layouts/LayoutSection'
import { PageTitle } from '~/components/ui/typographies/PageTitle'
import { getScopedI18n } from '~/locales/server'
import { Tag as ApiResponseTagPositionTag } from '~/types/apis/fetch/tagPosition'

type Props = {
  defaultPage: number
  defaultTotalPage: number
  defaultArticleInfos: WorkCardProps[]
  latestArticleInfos: LatestArticleCardProps[]
  responseTagPosition: ApiResponseTagPositionTag[]
}

export const Index = async ({
  defaultPage,
  defaultTotalPage,
  defaultArticleInfos,
  latestArticleInfos,
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
        infos={[
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
                defaultPage={defaultPage}
                defaultTotalPage={defaultTotalPage}
                defaultArticleInfos={defaultArticleInfos}
                responseTagPosition={responseTagPosition}
              />
            }
            sideColumn={<SideColumn latestArticleInfos={latestArticleInfos} />}
          />
        </LayoutInner>
      </LayoutSection>

      <Contact />
    </LayoutPageWrapper>
  )
}
