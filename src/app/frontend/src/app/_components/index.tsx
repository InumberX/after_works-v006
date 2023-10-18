import { MainVisual } from './MainVisual'
import { Lead } from './Lead'
import { Service } from './Service'
import { Contents } from './Contents'
import { Blog } from './Blog'
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
