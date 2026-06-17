import { MainColumn } from './MainColumn'
import { SideColumn } from './SideColumn'

import { Contact } from '~/components/common/Contact'
import { BaseArticleInfo } from '~/components/ui/articles/BaseArticle'
import { BaseBreadcrumb } from '~/components/ui/breadcrumbs/BaseBreadcrumb'
import { LatestArticleCardProps } from '~/components/ui/cards/LatestArticleCard'
import { LayoutInner } from '~/components/ui/layouts/LayoutInner'
import { LayoutPageWrapper } from '~/components/ui/layouts/LayoutPageWrapper'
import { LayoutParallel } from '~/components/ui/layouts/LayoutParallel'
import { LayoutSection } from '~/components/ui/layouts/LayoutSection'
import { PageTitle } from '~/components/ui/typographies/PageTitle'
import { routes } from '~/config/routes'
import { getScopedI18n, getCurrentLocale } from '~/locales/server'

type Props = {
  latestArticleInfos: LatestArticleCardProps[]
  articleInfo: BaseArticleInfo
}

export const Index = async ({ latestArticleInfos, articleInfo }: Props) => {
  const scopedT = await getScopedI18n('worksDetail')
  const worksScopedT = await getScopedI18n('works')
  const locale = await getCurrentLocale()

  return (
    <LayoutPageWrapper>
      <PageTitle subTitle={scopedT('pageSubTitle')} />

      <BaseBreadcrumb
        infos={[
          {
            name: worksScopedT('pageTitle'),
            url: routes.works.url({
              locale,
            }),
          },
          {
            name: articleInfo.title,
          },
        ]}
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
    </LayoutPageWrapper>
  )
}
