import { PageTitle } from '@/components/ui/typographies/PageTitle'
import { BaseBreadcrumb } from '@/components/ui/breadcrumbs/BaseBreadcrumb'
import { Message } from './Message'
import { getScopedI18n } from '@/locales/server'

export const Index = async () => {
  const scopedT = await getScopedI18n('contact')

  return (
    <>
      <PageTitle
        title={scopedT('pageTitle')}
        subTitle={scopedT('pageSubTitle')}
      />
      <BaseBreadcrumb
        infos={[
          {
            name: scopedT('pageTitle'),
          },
        ]}
      />
      <Message />
    </>
  )
}
