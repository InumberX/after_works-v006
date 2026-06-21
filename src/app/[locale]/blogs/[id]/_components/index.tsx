import { MainColumn } from './MainColumn'
import { SideColumn } from './SideColumn'

import { Contact } from '~/components/common/Contact'
import { type BaseArticleInfo } from '~/components/ui/articles/BaseArticle'
import { BaseBreadcrumb } from '~/components/ui/breadcrumbs/BaseBreadcrumb'
import { type LatestArticleCardProps } from '~/components/ui/cards/LatestArticleCard'
import { LayoutInner } from '~/components/ui/layouts/LayoutInner'
import { LayoutPageWrapper } from '~/components/ui/layouts/LayoutPageWrapper'
import { LayoutParallel } from '~/components/ui/layouts/LayoutParallel'
import { LayoutSection } from '~/components/ui/layouts/LayoutSection'
import { PageTitle } from '~/components/ui/typographies/PageTitle'
import { routes } from '~/config/routes'
import { getScopedI18n, getCurrentLocale } from '~/locales/server'

type Props = {
  latestArticles: LatestArticleCardProps[]
  articleInfo: BaseArticleInfo
}

export const Index = async ({ latestArticles, articleInfo }: Props) => {
  const scopedT = await getScopedI18n('blogsDetail')
  const blogsScopedT = await getScopedI18n('blogs')
  const locale = await getCurrentLocale()

  return (
    <LayoutPageWrapper>
      <PageTitle subTitle={scopedT('pageSubTitle')} />

      <BaseBreadcrumb
        items={[
          {
            name: blogsScopedT('pageTitle'),
            url: routes.blogs.url({
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
            sideColumn={<SideColumn latestArticles={latestArticles} />}
          />
        </LayoutInner>
      </LayoutSection>

      <Contact />
    </LayoutPageWrapper>
  )
}
