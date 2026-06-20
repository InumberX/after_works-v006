'use client'

import clsx from 'clsx'

import styles from './index.module.css'

import { BaseButton } from '~/components/ui/buttons/BaseButton'
import { WorkCardProps } from '~/components/ui/cards/WorkCard'
import { LayoutInner } from '~/components/ui/layouts/LayoutInner'
import { LayoutSection } from '~/components/ui/layouts/LayoutSection'
import { WorkCardList } from '~/components/ui/lists/WorkCardList'
import { ReplaceNewLineText } from '~/components/ui/typographies/ReplaceNewLineText'
import { SectionLead } from '~/components/ui/typographies/SectionLead'
import { SectionTitle } from '~/components/ui/typographies/SectionTitle'
import { routes } from '~/config/routes'
import { useAnimelm, type AnimelmElement } from '~/hooks/use-animelm'
import { useScopedI18n, useCurrentLocale } from '~/locales/client'

type Props = {
  articleInfos: WorkCardProps[]
}

export const Works = ({ articleInfos }: Props) => {
  const scopedT = useScopedI18n('home.works')
  const { targetRef: sliderTargetRef } = useAnimelm<AnimelmElement>()
  const { targetRef: buttonTargetRef } = useAnimelm<AnimelmElement>()

  return (
    <LayoutSection className={styles.Works}>
      <div className={styles.Works__container}>
        <div className={styles.WorksTitle}>
          <LayoutInner>
            <div className={styles.WorksTitle__container}>
              <SectionTitle
                subTitle={scopedT('subTitle')}
                title={scopedT('title')}
              />
              <SectionLead
                lead={<ReplaceNewLineText text={scopedT('lead')} />}
              />
            </div>
          </LayoutInner>
        </div>

        <div className={styles.WorksSlider}>
          <LayoutInner>
            <div
              className={clsx(styles.BlogSlider__container, 'AnimelmBlurIn')}
              ref={sliderTargetRef}
            >
              <WorkCardList
                infos={articleInfos.map((article, articleIndex) => ({
                  ...article,
                  size: articleIndex === 0 ? 'pcLarge' : 'medium',
                }))}
              />
            </div>
          </LayoutInner>
        </div>

        <div className={styles.WorksButton}>
          <LayoutInner>
            <div
              className={clsx(styles.WorksButton__container, 'AnimelmBlurIn')}
              ref={buttonTargetRef}
            >
              <BaseButton
                className={styles.WorksButton__button}
                url={routes.works.url({
                  locale: useCurrentLocale(),
                })}
                text={scopedT('listPageButtonText')}
                isRightArrow
              />
            </div>
          </LayoutInner>
        </div>
      </div>
    </LayoutSection>
  )
}
