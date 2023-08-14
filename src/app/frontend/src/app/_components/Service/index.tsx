import styles from './index.module.scss'
import { LayoutSection } from '~/components/ui/layouts/LayoutSection'
import { LayoutInner } from '~/components/ui/layouts/LayoutInner'
import { SectionTitle } from '~/components/ui/typographies/PageTitle'
import { ServiceCardList } from '~/components/ui/lists/ServiceCardList'
import { SvgIcon } from '~/components/ui/icons/SvgIcon'

export const Service = () => {
  return (
    <LayoutSection className={styles.Service}>
      <LayoutInner>
        <div className={styles.Service__container}>
          <SectionTitle subTitle='Service' title='提供サービス' />
          <ServiceCardList
            className={styles.ServiceServiceCardList}
            infos={[
              {
                icon: (
                  <SvgIcon variant='palette' color='primary' size='large' />
                ),
                title: 'デザイン',
                description: (
                  <>
                    お客様のご要望にもとづき、デザインを作成いたします。
                    <br />
                    実装可能なデザイン、実際の運用に耐えるデザインを制作することを心がけています。
                    <br />
                    見た目と使いやすさの両面を考慮し、ユーザにとって最適なデザインをご提案いたします。
                  </>
                ),
              },
              {
                icon: <SvgIcon variant='laptop' color='primary' size='large' />,
                title: 'コーディング',
                description: (
                  <>
                    デザインをもとにコーディングを行います。
                    <br />
                    パソコン・スマートフォンなど様々なデバイスで最適なデザインを表示できるレスポンシブサイト、WordPressを用いた更新性の高いサイト、JavaScriptを用いた動きのあるサイトなどお客様のご要望に合わせて様々なサイトが制作可能です。
                  </>
                ),
              },
            ]}
          />
        </div>
      </LayoutInner>
    </LayoutSection>
  )
}
