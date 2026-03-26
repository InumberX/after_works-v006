import styles from './index.module.css'

import { SvgIcon } from '@/components/ui/icons/SvgIcon'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { LayoutSection } from '@/components/ui/layouts/LayoutSection'
import { ServiceCardList } from '@/components/ui/lists/ServiceCardList'
import { ReplaceNewLineText } from '@/components/ui/typographies/ReplaceNewLineText'
import { SectionTitle } from '@/components/ui/typographies/SectionTitle'
import { getScopedI18n } from '@/locales/server'

export const Service = async () => {
  const scopedT = await getScopedI18n('home.service')

  return (
    <LayoutSection className={styles.Service}>
      <LayoutInner>
        <div className={styles.Service__container}>
          <SectionTitle
            subTitle={scopedT('subTitle')}
            title={scopedT('title')}
          />
          <ServiceCardList
            className={styles.ServiceServiceCardList}
            infos={[
              {
                icon: (
                  <SvgIcon
                    variant='palette'
                    color='primary'
                    size='large'
                    className={styles.ServiceServiceCardList__icon}
                  />
                ),
                title: scopedT('design.title'),
                description: (
                  <ReplaceNewLineText text={scopedT('design.description')} />
                ),
              },
              {
                icon: (
                  <SvgIcon
                    variant='laptop'
                    color='primary'
                    size='large'
                    className={styles.ServiceServiceCardList__icon}
                  />
                ),
                title: scopedT('coding.title'),
                description: (
                  <ReplaceNewLineText text={scopedT('coding.description')} />
                ),
              },
            ]}
          />
        </div>
      </LayoutInner>
    </LayoutSection>
  )
}
