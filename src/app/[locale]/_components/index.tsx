import { Blog } from './Blog'
import { MainVisual } from './MainVisual'
import { Service } from './Service'
import { Works } from './Works'

import { Contact } from '~/components/common/Contact'
import type { ArticleCardProps } from '~/components/ui/cards/ArticleCard'
import type { WorkCardProps } from '~/components/ui/cards/WorkCard'
import { LayoutPageWrapper } from '~/components/ui/layouts/LayoutPageWrapper'

type Props = {
  latestBlogs: ArticleCardProps[]
  latestWorks: WorkCardProps[]
}

export const Index = ({ latestBlogs, latestWorks }: Props) => {
  return (
    <LayoutPageWrapper isHiddenBackground>
      <MainVisual />
      {latestWorks.length > 0 && <Works articles={latestWorks} />}
      <Service />
      {latestBlogs.length > 0 && <Blog articles={latestBlogs} />}
      <Contact />
    </LayoutPageWrapper>
  )
}
