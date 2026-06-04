import styles from './index.module.css'

export const LayoutSvgPainter = () => {
  return (
    <div className={styles.LayoutSvgPainter}>
      <svg width='0' height='0'>
        <linearGradient
          id='svg-painter-gradient-primary-top'
          x1='0%'
          y1='0%'
          x2='0%'
          y2='100%'
        >
          <stop className='Stop' offset='0%' />
          <stop className='Stop' offset='100%' />
        </linearGradient>

        <linearGradient
          id='svg-painter-gradient-primary-right'
          x1='0%'
          y1='50%'
          x2='100%'
          y2='50%'
        >
          <stop className='Stop' offset='0%' />
          <stop className='Stop' offset='100%' />
        </linearGradient>

        <linearGradient
          id='svg-painter-gradient-primary-bottom'
          x1='0%'
          y1='0%'
          x2='0%'
          y2='100%'
        >
          <stop className='Stop' offset='0%' />
          <stop className='Stop' offset='100%' />
        </linearGradient>

        <linearGradient
          id='svg-painter-gradient-primary-left'
          x1='0%'
          y1='50%'
          x2='100%'
          y2='50%'
        >
          <stop className='Stop' offset='0%' />
          <stop className='Stop' offset='100%' />
        </linearGradient>
      </svg>
    </div>
  )
}
