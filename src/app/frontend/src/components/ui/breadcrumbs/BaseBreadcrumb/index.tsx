import Link from 'next/link'
import clsx from 'clsx'
import styles from './index.module.scss'
import { routes } from '@/config/routes'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { SvgIcon } from '@/components/ui/icons/SvgIcon'
import { getI18n } from '@/locales/server'

type Props = {
  className?: string
  infos: {
    url?: string
    name: string
  }[]
  isTop?: boolean
}

export const BaseBreadcrumb = async ({ className, infos, isTop }: Props) => {
  const t = await getI18n()

  return (
    <div
      className={clsx(
        styles.BaseBreadcrumb,
        className,
        isTop && styles['BaseBreadcrumb--top'],
      )}
    >
      <div className={styles.BaseBreadcrumb__wrapper}>
        <LayoutInner>
          <div className={styles.BaseBreadcrumb__container}>
            <ol
              className={styles.BaseBreadcrumb__items}
              itemScope
              itemType='http://schema.org/BreadcrumbList'
            >
              <li
                className={styles.BaseBreadcrumb__item}
                itemProp='itemListElement'
                itemScope
                itemType='http://schema.org/ListItem'
              >
                <Link
                  href={routes.home.url({})}
                  className={styles.BaseBreadcrumb__link}
                  itemProp='item'
                >
                  <span className={styles.BaseBreadcrumb__name} itemProp='name'>
                    {t('home.title')}
                  </span>
                </Link>
                <meta itemProp='position' content='1' />
              </li>

              {infos.map((info, i) => (
                <li
                  key={i}
                  className={styles.BaseBreadcrumb__item}
                  itemProp='itemListElement'
                  itemScope
                  itemType='http://schema.org/ListItem'
                >
                  <SvgIcon
                    variant='arrowRight'
                    className={styles.BaseBreadcrumb__icon}
                  />

                  {info.url ? (
                    <Link
                      href={info.url}
                      className={styles.BaseBreadcrumb__link}
                      itemProp='item'
                    >
                      <span
                        className={styles.BaseBreadcrumb__name}
                        itemProp='name'
                      >
                        {info.name}
                      </span>
                    </Link>
                  ) : (
                    <span
                      className={styles.BaseBreadcrumb__name}
                      itemProp='name'
                    >
                      {info.name}
                    </span>
                  )}

                  <meta itemProp='position' content={String(i + 2)} />
                </li>
              ))}
            </ol>
          </div>
        </LayoutInner>
      </div>
    </div>
  )
}
