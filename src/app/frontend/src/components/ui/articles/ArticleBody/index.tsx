import clsx from 'clsx'
import styles from './index.module.scss'

type Props = {
  className?: string
  info: {
    body: string
  }
}

export const ArticleBody = ({ className, info }: Props) => {
  return (
    <div className={clsx(styles.ArticleBody, className)}>
      <div
        className={styles.ArticleBody__body}
        dangerouslySetInnerHTML={{
          __html: info.body,
        }}
      />
    </div>
  )
}
