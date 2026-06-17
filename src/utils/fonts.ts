import { Jost, Zen_Kaku_Gothic_New, Zen_Old_Mincho } from 'next/font/google'

// 欧文用（可変フォント: 100〜900 / italic 対応）
export const jost = Jost({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-jost',
})

// 和文ゴシック（日本語サブセットは next/font では扱えないため preload は無効化）
export const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  preload: false,
  variable: '--font-zen-kaku-gothic-new',
})

// 和文明朝
export const zenOldMincho = Zen_Old_Mincho({
  weight: ['500', '700'],
  display: 'swap',
  preload: false,
  variable: '--font-zen-old-mincho',
})
