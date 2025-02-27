import { SITE_ROOT, SITE_URL } from '@/config/env'

type RouteKey =
  | 'home'
  | 'blogs'
  | 'blogsDetail'
  | 'about'
  | 'works'
  | 'worksDetail'
  | 'hobby'
  | 'hobbyDetail'
  | 'contact'
  | 'contactFinish'
  | 'notFound'

const getUrl = ({
  isFullPath,
  locale,
  url,
}: {
  isFullPath?: boolean
  locale: string
  url: string
}) => {
  return `${isFullPath ? SITE_URL : ''}${SITE_ROOT}${
    locale === 'ja' ? '' : '/' + locale
  }${locale !== 'ja' && url === '/' ? '' : url}`
}

export const routes: {
  // eslint-disable-next-line no-unused-vars
  [key in RouteKey]: {
    id: string
    url: ({
      // eslint-disable-next-line no-unused-vars
      isFullPath,
      // eslint-disable-next-line no-unused-vars
      locale,
      // eslint-disable-next-line no-unused-vars
      id,
    }: {
      isFullPath?: boolean
      locale: string
      id?: string
    }) => string
  }
} = {
  // トップ
  home: {
    id: 'home',
    url: ({ isFullPath, locale }) => {
      return getUrl({
        isFullPath,
        locale,
        url: '/',
      })
    },
  },
  // ブログ
  blogs: {
    id: 'blogs',
    url: ({ isFullPath, locale }) => {
      return getUrl({
        isFullPath,
        locale,
        url: '/blogs',
      })
    },
  },
  // ブログ詳細
  blogsDetail: {
    id: 'blogsDetail',
    url: ({ isFullPath, locale, id }) => {
      return getUrl({
        isFullPath,
        locale,
        url: `/blogs/${id}`,
      })
    },
  },
  // 経歴
  about: {
    id: 'about',
    url: ({ isFullPath, locale }) => {
      return getUrl({
        isFullPath,
        locale,
        url: '/about',
      })
    },
  },
  // 実績
  works: {
    id: 'works',
    url: ({ isFullPath, locale }) => {
      return getUrl({
        isFullPath,
        locale,
        url: '/works',
      })
    },
  },
  // 実績詳細
  worksDetail: {
    id: 'worksDetail',
    url: ({ isFullPath, locale, id }) => {
      return getUrl({
        isFullPath,
        locale,
        url: `/works/${id}`,
      })
    },
  },
  // 趣味
  hobby: {
    id: 'hobby',
    url: ({ isFullPath, locale }) => {
      return getUrl({
        isFullPath,
        locale,
        url: '/hobby',
      })
    },
  },
  // 趣味詳細
  hobbyDetail: {
    id: 'hobbyDetail',
    url: ({ isFullPath, locale, id }) => {
      return getUrl({
        isFullPath,
        locale,
        url: `/hobby/${id}`,
      })
    },
  },
  // お問い合わせ
  contact: {
    id: 'contact',
    url: ({ isFullPath, locale }) => {
      return getUrl({
        isFullPath,
        locale,
        url: '/contact',
      })
    },
  },
  // お問い合わせ完了
  contactFinish: {
    id: 'contactFinish',
    url: ({ isFullPath, locale }) => {
      return getUrl({
        isFullPath,
        locale,
        url: '/contact/finish',
      })
    },
  },
  // 404
  notFound: {
    id: 'notFound',
    url: ({ isFullPath, locale }) => {
      return getUrl({
        isFullPath,
        locale,
        url: '/404',
      })
    },
  },
}
