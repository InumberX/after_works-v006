import { PageTitle } from '~/components/ui/typographies/PageTitle'
import { Contact } from '~/components/common/Contact'
import { BaseBreadcrumb } from '~/components/ui/breadcrumbs/BaseBreadcrumb'

export const Index = () => {
  return (
    <>
      <PageTitle title='経歴' subTitle='About' />
      <BaseBreadcrumb
        infos={[
          {
            name: '経歴',
          },
        ]}
      />
      <Contact />
    </>
  )
}
