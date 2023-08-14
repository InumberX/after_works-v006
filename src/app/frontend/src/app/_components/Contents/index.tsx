import styles from './index.module.scss'
import { LayoutSection } from '~/components/ui/layouts/LayoutSection'
import { LayoutInner } from '~/components/ui/layouts/LayoutInner'
import { SectionTitle } from '~/components/ui/typographies/PageTitle'
import { ServiceCardList } from '~/components/ui/lists/ServiceCardList'
import { SvgIcon } from '~/components/ui/icons/SvgIcon'
import { routes } from '~/config/routes'

export const Contents = () => {
  return (
    <LayoutSection className={styles.Contents}>
      <LayoutInner>
        <div className={styles.Contents__container}>
          <SectionTitle subTitle='Contents' title='コンテンツ' />
          <ServiceCardList
            className={styles.ContentsServiceCardList}
            infos={[
              {
                icon: <SvgIcon variant='person' color='primary' size='large' />,
                title: '経歴紹介',
                description: 'これまでの経歴や保有資格などをご紹介いたします。',
                buttonInfo: {
                  url: routes.about.url({}),
                  text: '経歴紹介へ',
                  isRightArrow: true,
                },
              },
              {
                icon: <SvgIcon variant='star' color='primary' size='large' />,
                title: '実績紹介',
                description:
                  'これまでにお客様からご依頼を受けて制作したものや趣味で制作した作品について、ご紹介いたします。',
                buttonInfo: {
                  url: routes.works.url({}),
                  text: '実績一覧へ',
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
