import { PageTitle } from '@/components/ui/typographies/PageTitle'
import { Contact } from '@/components/common/Contact'
import { BaseBreadcrumb } from '@/components/ui/breadcrumbs/BaseBreadcrumb'
import { Lead, LeadProps } from './Lead'
import { Profile, ProfileProps } from './Profile'
import { History, HistoryProps } from './History'

type Props = {
  leadInfo: LeadProps
  profileInfo: ProfileProps
  historyInfo: HistoryProps
}

export const Index = ({ leadInfo, profileInfo, historyInfo }: Props) => {
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

      <Lead {...leadInfo} />

      <Profile {...profileInfo} />

      <History {...historyInfo} />

      <Contact />
    </>
  )
}
