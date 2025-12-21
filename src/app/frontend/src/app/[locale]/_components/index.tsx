import { Blog } from './Blog'
import { Contents } from './Contents'
import { Lead } from './Lead'
import { MainVisual } from './MainVisual'
import { Service } from './Service'

import { Contact } from '@/components/common/Contact'
import { ArticleCardProps } from '@/components/ui/cards/ArticleCard'

type Props = {
  latestArticleInfos: ArticleCardProps[]
}

export const Index = ({ latestArticleInfos }: Props) => {
  return (
    <>
      <MainVisual />
      <Lead />
      <Service />
      <Contents />

      {latestArticleInfos.length > 0 && (
        <Blog articleInfos={latestArticleInfos} />
      )}

      <Contact />
    </>
  )
}
