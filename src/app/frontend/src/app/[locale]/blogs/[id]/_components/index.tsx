import { MainColumn } from './MainColumn'
import { SideColumn } from './SideColumn'

import { Contact } from '@/components/common/Contact'
import { BaseArticleInfo } from '@/components/ui/articles/BaseArticle'
import { BaseBreadcrumb } from '@/components/ui/breadcrumbs/BaseBreadcrumb'
import { LatestArticleCardProps } from '@/components/ui/cards/LatestArticleCard'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { LayoutParallel } from '@/components/ui/layouts/LayoutParallel'
import { LayoutSection } from '@/components/ui/layouts/LayoutSection'
import { routes } from '@/config/routes'
import { getScopedI18n, getCurrentLocale } from '@/locales/server'

type Props = {
  latestArticleInfos: LatestArticleCardProps[]
  articleInfo: BaseArticleInfo
}

export const Index = async ({ latestArticleInfos, articleInfo }: Props) => {
  const blogsScopedT = await getScopedI18n('blogs')
  const locale = await getCurrentLocale()

  return (
    <>
      <BaseBreadcrumb
        infos={[
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
