import { SITE_ROOT } from '@/config/env'

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

export const routes: {
  [key in RouteKey]: {
    id: string
    url: ({ id }: { id?: string }) => string
  }
} = {
  // トップ
  home: {
    id: 'home',
    url: () => `${SITE_ROOT}/`,
  },
  // ブログ
  blogs: {
    id: 'blogs',
    url: () => `${SITE_ROOT}/blogs`,
  },
  // ブログ詳細
  blogsDetail: {
    id: 'blogsDetail',
    url: ({ id }) => `${SITE_ROOT}/blogs/${id}`,
  },
  // 経歴
  about: {
    id: 'about',
    url: () => `${SITE_ROOT}/about`,
  },
  // 実績
  works: {
    id: 'works',
    url: () => `${SITE_ROOT}/works`,
  },
  // 実績詳細
  worksDetail: {
    id: 'worksDetail',
    url: ({ id }) => `${SITE_ROOT}/works/${id}`,
  },
  // 趣味
  hobby: {
    id: 'hobby',
    url: () => `${SITE_ROOT}/hobby`,
  },
  // 趣味詳細
  hobbyDetail: {
    id: 'hobbyDetail',
    url: ({ id }) => `${SITE_ROOT}/hobby/${id}`,
  },
  // お問い合わせ
  contact: {
    id: 'contact',
    url: () => `${SITE_ROOT}/contact`,
  },
  // お問い合わせ完了
  contactFinish: {
    id: 'contactFinish',
    url: () => `${SITE_ROOT}/contact/finish`,
  },
  // 404
  notFound: {
    id: 'notFound',
    url: () => `${SITE_ROOT}/404`,
  },
}
