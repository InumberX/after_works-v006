import { PageTitle } from '~/components/ui/typographies/PageTitle'
import { Contact } from '~/components/common/Contact'
import { BaseBreadcrumb } from '~/components/ui/breadcrumbs/BaseBreadcrumb'

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
      <Contact />
    </>
  )
}
