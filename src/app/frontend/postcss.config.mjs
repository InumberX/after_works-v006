import postcss from 'postcss'

const BREAKPOINTS = {
  xs: 360,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
}

const MIN_VIEWPORT = BREAKPOINTS.xs
const MAX_VIEWPORT = BREAKPOINTS.xl

const config = {
  plugins: {
    'postcss-mixins': {
      mixins: {
        getMediaQueryXs: () => {
          return {
            [`@media screen and (width >= ${BREAKPOINTS.xs}px), print`]: {
              '@mixin-content': '',
            },
          }
        },
        getMediaQuerySm: () => {
          return {
            [`@media screen and (width >= ${BREAKPOINTS.sm}px), print`]: {
              '@mixin-content': '',
            },
          }
        },
        getMediaQueryMd: () => {
          return {
            [`@media screen and (width >= ${BREAKPOINTS.md}px), print`]: {
              '@mixin-content': '',
            },
          }
        },
        getMediaQueryLg: () => {
          return {
            [`@media screen and (width >= ${BREAKPOINTS.lg}px), print`]: {
              '@mixin-content': '',
            },
          }
        },
        getMediaQueryXl: () => {
          return {
            [`@media screen and (width >= ${BREAKPOINTS.xl}px), print`]: {
              '@mixin-content': '',
            },
          }
        },
        getMediaQueryXxl: () => {
          return {
            [`@media screen and (width >= ${BREAKPOINTS.xxl}px), print`]: {
              '@mixin-content': '',
            },
          }
        },
        getMediaQueryReverseXs: () => {
          return {
            [`@media screen and (width < ${BREAKPOINTS.xs}px), print`]: {
              '@mixin-content': '',
            },
          }
        },
        getMediaQueryReverseSm: () => {
          return {
            [`@media screen and (width < ${BREAKPOINTS.sm}px), print`]: {
              '@mixin-content': '',
            },
          }
        },
        getMediaQueryReverseMd: () => {
          return {
            [`@media screen and (width < ${BREAKPOINTS.md}px), print`]: {
              '@mixin-content': '',
            },
          }
        },
        getMediaQueryReverseLg: () => {
          return {
            [`@media screen and (width < ${BREAKPOINTS.lg}px), print`]: {
              '@mixin-content': '',
            },
          }
        },
        getMediaQueryReverseXl: () => {
          return {
            [`@media screen and (width < ${BREAKPOINTS.xl}px), print`]: {
              '@mixin-content': '',
            },
          }
        },
        getMediaQueryReverseXxl: () => {
          return {
            [`@media screen and (width < ${BREAKPOINTS.xxl}px), print`]: {
              '@mixin-content': '',
            },
          }
        },
        getContainerQueryXs: () => {
          return {
            [`@container (width >= ${BREAKPOINTS.xs}px)`]: {
              '@mixin-content': '',
            },
          }
        },
        getContainerQuerySm: () => {
          return {
            [`@container (width >= ${BREAKPOINTS.sm}px)`]: {
              '@mixin-content': '',
            },
          }
        },
        getContainerQueryMd: () => {
          return {
            [`@container (width >= ${BREAKPOINTS.md}px)`]: {
              '@mixin-content': '',
            },
          }
        },
        getContainerQueryLg: () => {
          return {
            [`@container (width >= ${BREAKPOINTS.lg}px)`]: {
              '@mixin-content': '',
            },
          }
        },
        getContainerQueryXl: () => {
          return {
            [`@container (width >= ${BREAKPOINTS.xl}px)`]: {
              '@mixin-content': '',
            },
          }
        },
        getContainerQueryXxl: () => {
          return {
            [`@container (width >= ${BREAKPOINTS.xxl}px)`]: {
              '@mixin-content': '',
            },
          }
        },
        getContainerQueryReverseXs: () => {
          return {
            [`@container (width < ${BREAKPOINTS.xs}px)`]: {
              '@mixin-content': '',
            },
          }
        },
        getContainerQueryReverseSm: () => {
          return {
            [`@container (width < ${BREAKPOINTS.sm}px)`]: {
              '@mixin-content': '',
            },
          }
        },
        getContainerQueryReverseMd: () => {
          return {
            [`@container (width < ${BREAKPOINTS.md}px)`]: {
              '@mixin-content': '',
            },
          }
        },
        getContainerQueryReverseLg: () => {
          return {
            [`@container (width < ${BREAKPOINTS.lg}px)`]: {
              '@mixin-content': '',
            },
          }
        },
        getContainerQueryReverseXl: () => {
          return {
            [`@container (width < ${BREAKPOINTS.xl}px)`]: {
              '@mixin-content': '',
            },
          }
        },
        getContainerQueryReverseXxl: () => {
          return {
            [`@container (width < ${BREAKPOINTS.xxl}px)`]: {
              '@mixin-content': '',
            },
          }
        },
        getFontSize: (mixin, fontSize) => {
          const rule = postcss.rule({
            selector: '&',
          })
          rule.append({
            prop: 'font-size',
            value: `${(fontSize / 16) * 1}rem`,
          })
          mixin.replaceWith(rule)
        },
        getClampPx: (mixin, property, minSize, maxSize) => {
          const sizeRate = maxSize - minSize
          const viewportRate = MAX_VIEWPORT - MIN_VIEWPORT
          const changingSize = (sizeRate / viewportRate) * 100
          const fixedSize = minSize - (sizeRate / viewportRate) * MIN_VIEWPORT
          const rule = postcss.rule({
            selector: '&',
          })
          rule.append({
            prop: property,
            value: `clamp(${minSize}px, ${fixedSize.toFixed(2)}px + ${changingSize.toFixed(2)}vi, ${maxSize}px)`,
          })
          mixin.replaceWith(rule)
        },
        getClampRem: (mixin, property, minSize, maxSize) => {
          const sizeRate = maxSize - minSize
          const viewportRate = MAX_VIEWPORT - MIN_VIEWPORT
          const changingSize = (sizeRate / viewportRate) * 100
          const fixedSize =
            (minSize - (sizeRate / viewportRate) * MIN_VIEWPORT) / 16
          const minRemSize = minSize / 16
          const maxRemSize = maxSize / 16
          const rule = postcss.rule({
            selector: '&',
          })
          rule.append({
            prop: property,
            value: `clamp(${minRemSize.toFixed(2)}rem, ${fixedSize.toFixed(2)}rem + ${changingSize.toFixed(2)}vi, ${maxRemSize.toFixed(2)}rem)`,
          })
          mixin.replaceWith(rule)
        },
        getLineClamp: (mixin, maxLine) => {
          const rule = postcss.rule({
            selector: '&',
          })
          rule.append({
            prop: 'display',
            value: '-webkit-box',
          })
          rule.append({
            prop: '-webkit-box-orient',
            value: 'vertical',
          })
          rule.append({
            prop: 'overflow',
            value: 'hidden',
          })
          rule.append({
            prop: '-webkit-line-clamp',
            value: maxLine,
          })
          mixin.replaceWith(rule)
        },
      },
    },
    'postcss-nested': {},
    '@csstools/postcss-global-data': {
      files: ['./src/assets/post-css/global/custom-media.css'],
    },
    'postcss-custom-media': {},
    'postcss-import': {},
    autoprefixer: {},
  },
}

export default config
