import { PageTitle } from '@/components/ui/typographies/PageTitle'
import { Contact } from '@/components/common/Contact'
import { Message } from './Message'
import { getScopedI18n } from '@/locales/server'

export const Index = async () => {
  const scopedT = await getScopedI18n('notFound')

  return (
    <>
      <PageTitle
        title={scopedT('pageTitle')}
        subTitle={scopedT('pageSubTitle')}
      />

      <Message />

      <Contact />
    </>
  )
}
