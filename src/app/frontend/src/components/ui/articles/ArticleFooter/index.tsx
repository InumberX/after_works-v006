import clsx from 'clsx'

import styles from './index.module.css'

import { BaseButton } from '@/components/ui/buttons/BaseButton'

type Props = {
  className?: string
  info: {
    link?: {
      url: string
      text: string
    }
  }
}

export const ArticleFooter = ({ className, info }: Props) => {
  const { link } = info

  return (
    <div className={clsx(styles.ArticleFooter, className)}>
      {link && (
        <div className={styles.ArticleFooterLink}>
          <BaseButton
            className={styles.ArticleFooterLink__button}
            url={link.url}
            text={link.text}
            isRightArrow={true}
          />
        </div>
      )}
    </div>
  )
}
