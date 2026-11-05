// ブラウザでの getAboutHistoryInfo()（年の切り替え）を中継する
import { createProxyHandler } from '~/app/api/cms/_utils/create-proxy-handler'

export const dynamic = 'force-dynamic'

export const GET = createProxyHandler({
  endpoint: '/about-history',
  allowedParams: ['category_parent_id[]', 'cnt', 'pageID'],
})
