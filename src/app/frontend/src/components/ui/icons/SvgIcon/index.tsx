import styles from './index.module.scss'
import clsx from 'clsx'

type Props = {
  variant:
    | 'arrowTop'
    | 'arrowRight'
    | 'arrowBottom'
    | 'arrowLeft'
    | 'x'
    | 'instagram'
    | 'github'
    | 'youtube'
    | 'qiita'
    | 'note'
    | 'behance'
    | 'pixiv'
    | 'palette'
    | 'star'
    | 'laptop'
    | 'person'
    | 'mail'
  color?: 'primary'
  size?: 'large'
  className?: string
}

export const SvgIcon = ({ className, variant, color, size }: Props) => {
  return (
    <i
      className={clsx(
        styles.SvgIcon,
        className,
        styles[`SvgIcon--${variant}`],
        styles[`SvgIcon--${color}`],
        styles[`SvgIcon--${size}`],
      )}
    />
  )
}
