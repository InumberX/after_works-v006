import { Contact } from '~/components/common/Contact'
import { NotFoundMessage } from '~/components/common/NotFoundMessage'
import { LayoutPageWrapper } from '~/components/ui/layouts/LayoutPageWrapper'
import { PageTitle } from '~/components/ui/typographies/PageTitle'
import { routes } from '~/config/routes'
import { getScopedI18n, getCurrentLocale } from '~/locales/server'

export const NotFound = async () => {
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

      <NotFoundMessage
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
