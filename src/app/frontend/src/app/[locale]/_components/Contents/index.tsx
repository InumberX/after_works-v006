import styles from './index.module.css'

import { SvgIcon } from '@/components/ui/icons/SvgIcon'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { LayoutSection } from '@/components/ui/layouts/LayoutSection'
import { ServiceCardList } from '@/components/ui/lists/ServiceCardList'
import { SectionTitle } from '@/components/ui/typographies/SectionTitle'
import { routes } from '@/config/routes'
import { getScopedI18n, getCurrentLocale } from '@/locales/server'

export const Contents = async () => {
  const scopedT = await getScopedI18n('home.contents')
  const locale = await getCurrentLocale()

  return (
    <LayoutSection className={styles.Contents}>
      <LayoutInner>
        <div className={styles.Contents__container}>
          <SectionTitle
            subTitle={scopedT('subTitle')}
            title={scopedT('title')}
          />
          <ServiceCardList
            className={styles.ContentsServiceCardList}
            infos={[
              {
                icon: (
                  <SvgIcon
                    variant='person'
                    color='primary'
                    size='large'
                    className={styles.ContentsServiceCardList__icon}
                  />
                ),
                title: scopedT('about.title'),
                description: scopedT('about.description'),
                buttonInfo: {
                  url: routes.about.url({
                    locale,
                  }),
                  text: scopedT('about.buttonText'),
                  isRightArrow: true,
                },
              },
              {
                icon: (
                  <SvgIcon
                    variant='star'
                    color='primary'
                    size='large'
                    className={styles.ContentsServiceCardList__icon}
                  />
                ),
                title: scopedT('works.title'),
                description: scopedT('works.description'),
                buttonInfo: {
                  url: routes.works.url({
                    locale,
                  }),
                  text: scopedT('works.buttonText'),
                  isRightArrow: true,
                },
              },
            ]}
          />
        </div>
      </LayoutInner>
    </LayoutSection>
  )
}
