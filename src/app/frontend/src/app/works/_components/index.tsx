import { PageTitle } from '@/components/ui/typographies/PageTitle'
import { Contact } from '@/components/common/Contact'
import { BaseBreadcrumb } from '@/components/ui/breadcrumbs/BaseBreadcrumb'

export const Index = () => {
  return (
    <>
      <PageTitle title='実績' subTitle='Works' />
      <BaseBreadcrumb
        infos={[
          {
            name: '実績',
          },
        ]}
      />
      <Contact />
    </>
  )
}
