import { History, HistoryProps } from './History'
import { Lead, LeadProps } from './Lead'
import { Profile, ProfileProps } from './Profile'

import { Contact } from '@/components/common/Contact'
import { BaseBreadcrumb } from '@/components/ui/breadcrumbs/BaseBreadcrumb'
import { PageTitle } from '@/components/ui/typographies/PageTitle'
import { getScopedI18n } from '@/locales/server'

type Props = {
  leadInfo: LeadProps
  profileInfo: ProfileProps
  historyInfo: HistoryProps
}

export const Index = async ({ leadInfo, profileInfo, historyInfo }: Props) => {
  const scopedT = await getScopedI18n('about')

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

      <Lead {...leadInfo} />

      <Profile {...profileInfo} />

      <History {...historyInfo} />

      <Contact />
    </>
  )
}
