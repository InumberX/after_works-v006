import clsx from 'clsx'

import styles from './index.module.css'

export type SvgIconVariant =
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
  | 'translate'

type Props = {
  variant: SvgIconVariant
  className?: string
}

export const SvgIcon = ({ className, variant }: Props) => {
  return (
    <i
      className={clsx(styles.SvgIcon, className, styles[`SvgIcon--${variant}`])}
    />
  )
}
