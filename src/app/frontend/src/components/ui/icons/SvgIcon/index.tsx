import styles from './index.module.scss'
import clsx from 'clsx'

type Props = {
  variant:
    | 'arrowTop'
    | 'arrowRight'
    | 'arrowBottom'
    | 'arrowLeft'
    | 'twitter'
    | 'instagram'
    | 'github'
    | 'youtube'
    | 'qiita'
    | 'note'
    | 'behance'
    | 'pixiv'
  className?: string
}

export const SvgIcon = ({ className, variant }: Props) => {
  return (
    <i
      className={clsx(styles.SvgIcon, className, styles[`SvgIcon--${variant}`])}
    />
  )
}
