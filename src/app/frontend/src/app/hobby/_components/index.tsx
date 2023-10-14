import { PageTitle } from '@/components/ui/typographies/PageTitle'
import { Contact } from '@/components/common/Contact'
import { BaseBreadcrumb } from '@/components/ui/breadcrumbs/BaseBreadcrumb'

export const Index = () => {
  return (
    <>
      <PageTitle title='趣味' subTitle='Hobby' />
      <BaseBreadcrumb
        infos={[
          {
            name: '趣味',
          },
        ]}
      />
      <Contact />
    </>
  )
}
