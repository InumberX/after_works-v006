import { Message } from './Message'

import { Contact } from '~/components/common/Contact'
import { LayoutPageWrapper } from '~/components/ui/layouts/LayoutPageWrapper'
import { PageTitle } from '~/components/ui/typographies/PageTitle'
import { routes } from '~/config/routes'
import { getScopedI18n, getCurrentLocale } from '~/locales/server'

export const Index = async () => {
  const [scopedT, locale] = await Promise.all([
    getScopedI18n('notFound'),
    getCurrentLocale(),
  ])

  return (
    <LayoutPageWrapper>
      <PageTitle
        title={scopedT('pageTitle')}
        subTitle={scopedT('pageSubTitle')}
      />

      <Message
        text={scopedT('message.text')}
        buttonText={scopedT('message.buttonText')}
        buttonUrl={routes.home.url({
          locale,
        })}
      />

      <Contact />
    </LayoutPageWrapper>
  )
}
