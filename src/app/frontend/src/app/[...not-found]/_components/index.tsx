import { PageTitle } from '~/components/ui/typographies/PageTitle'
import { Contact } from '~/components/common/Contact'
import { Message } from './Message'

export const Index = () => {
  return (
    <>
      <PageTitle
        title='お探しのページが見つかりませんでした'
        subTitle='Not Found'
      />

      <Message />

      <Contact />
    </>
  )
}
