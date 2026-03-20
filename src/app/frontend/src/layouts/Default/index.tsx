import { ReactNode } from 'react'

import { LayoutFooter } from '@/components/common/LayoutFooter'
import { LayoutHeader } from '@/components/common/LayoutHeader'
import { LayoutPageBackground } from '@/components/common/LayoutPageBackground'
import { LayoutPortal } from '@/components/common/LayoutPortal'
import { LayoutSvgPainter } from '@/components/common/LayoutSvgPainter'
import { LayoutWrapper } from '@/components/ui/layouts/LayoutWrapper'

import styles from './index.module.css'

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
