import { PageTitle } from '~/components/ui/typographies/PageTitle'
import { Contact } from '~/components/common/Contact'
import { BaseBreadcrumb } from '~/components/ui/breadcrumbs/BaseBreadcrumb'
import { getAboutInfo } from '~/apis/fetch/about'
import { Lead } from './Lead'
import { Profile } from './Profile'

export const Index = async () => {
  const aboutInfo = await getAboutInfo()

  const certifications = aboutInfo
    ? aboutInfo.certifications.map((info) => {
        return {
          name: info.certification_name,
          url: info.certification_url,
        }
      })
    : []

  const skills = aboutInfo ? aboutInfo.skills : []

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

      <Lead lead={aboutInfo && aboutInfo.lead ? aboutInfo.lead : ''} />

      <Profile certifications={certifications} skills={skills} />

      <Contact />
    </>
  )
}
