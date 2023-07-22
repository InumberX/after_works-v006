import { ReactNode } from 'react'
import { LayoutWrapper } from '~/components/common/LayoutWrapper'
import { LayoutHeader } from '~/components/common/LayoutHeader'
import { LayoutFooter } from '~/components/common/LayoutFooter'
import { LayoutPortal } from '~/components/common/LayoutPortal'
import { LayoutSvgPainter } from '~/components/common/LayoutSvgPainter'
import { LayoutPageBackground } from '~/components/common/LayoutPageBackground'
import styles from './index.module.scss'

type Props = {
  children: ReactNode
}

export const LayoutDefault = ({ children }: Props) => {
  return (
    <LayoutWrapper>
      <LayoutHeader />
      <main className={styles.LayoutMain}>{children}</main>
      <LayoutFooter />
      <LayoutPortal />
      <LayoutSvgPainter />
      <LayoutPageBackground />
    </LayoutWrapper>
  )
}
