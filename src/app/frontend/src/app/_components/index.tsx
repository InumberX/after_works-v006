import { MainVisual } from './MainVisual'
import { Lead } from './Lead'
import { Service } from './Service'
import { Contents } from './Contents'
import { Contact } from '@/components/common/Contact'

export const Index = () => {
  return (
    <>
      <MainVisual />
      <Lead />
      <Service />
      <Contents />
      <Contact />
    </>
  )
}
