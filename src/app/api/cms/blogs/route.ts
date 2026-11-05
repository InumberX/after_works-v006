// ブラウザでの getBlogsList()（ページ送り）を中継する
import { createProxyHandler } from '~/app/api/cms/_utils/create-proxy-handler'

export const dynamic = 'force-dynamic'

export const GET = createProxyHandler({
  endpoint: '/blogs',
  allowedParams: ['cnt', 'pageID', 'order_query'],
})
