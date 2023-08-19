import { PageTitle } from '~/components/ui/typographies/PageTitle'
import { Contact } from '~/components/common/Contact'
import { BaseBreadcrumb } from '~/components/ui/breadcrumbs/BaseBreadcrumb'

export const Index = () => {
  return (
    <>
      <PageTitle title='ブログ' subTitle='Blog' />
      <BaseBreadcrumb
        infos={[
          {
            name: 'ブログ',
          },
        ]}
      />
      <Contact />
    </>
  )
}
