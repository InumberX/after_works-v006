import { notFound } from 'next/navigation'

// どのルートにも当たらないパスを受け、404 のステータスで not-found.tsx を表示する。
// ここでページを描画すると、表示は Not Found でもステータスが 200 になる（#284）
const CatchAllPage = () => {
  notFound()
}

export default CatchAllPage
