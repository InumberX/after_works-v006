import { History, HistoryProps } from './History'
import { Lead } from './Lead'
import { Profile, ProfileProps } from './Profile'

import { Contact } from '~/components/common/Contact'
import { BaseBreadcrumb } from '~/components/ui/breadcrumbs/BaseBreadcrumb'
import { LayoutPageWrapper } from '~/components/ui/layouts/LayoutPageWrapper'
import { PageTitle } from '~/components/ui/typographies/PageTitle'
import { getScopedI18n } from '~/locales/server'

type Props = {
  profileInfo: ProfileProps
  historyInfo: HistoryProps
}

export const Index = async ({ profileInfo, historyInfo }: Props) => {
  const scopedT = await getScopedI18n('about')

  return (
    <LayoutPageWrapper>
      <PageTitle
        title={scopedT('pageTitle')}
        subTitle={
          scopedT('pageSubTitle') !== 'pageSubTitle'
            ? scopedT('pageSubTitle')
            : ''
        }
      />

      <BaseBreadcrumb
        items={[
          {
            name: scopedT('pageTitle'),
          },
        ]}
      />

      <Lead lead={scopedT('lead')} />

      <Profile {...profileInfo} />

      <History {...historyInfo} />

      <Contact />
    </LayoutPageWrapper>
  )
}
