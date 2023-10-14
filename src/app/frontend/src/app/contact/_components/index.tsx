import { PageTitle } from '@/components/ui/typographies/PageTitle'
import { BaseBreadcrumb } from '@/components/ui/breadcrumbs/BaseBreadcrumb'
import { Message } from './Message'

export const Index = () => {
  return (
    <>
      <PageTitle title='お問い合わせ' subTitle='Contact' />
      <BaseBreadcrumb
        infos={[
          {
            name: 'お問い合わせ',
          },
        ]}
      />
      <Message />
    </>
  )
}
