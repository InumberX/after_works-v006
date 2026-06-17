import { Message } from './Message'

import { Contact } from '~/components/common/Contact'
import { LayoutPageWrapper } from '~/components/ui/layouts/LayoutPageWrapper'
import { PageTitle } from '~/components/ui/typographies/PageTitle'
import { getScopedI18n } from '~/locales/server'

export const Index = async () => {
  const scopedT = await getScopedI18n('notFound')

  return (
    <LayoutPageWrapper>
      <PageTitle
        title={scopedT('pageTitle')}
        subTitle={scopedT('pageSubTitle')}
      />

      <Message />

      <Contact />
    </LayoutPageWrapper>
  )
}
