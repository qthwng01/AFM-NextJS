import type { Metadata } from 'next'
import TopProduct from '@/components/BestSeller/topProduct'

export const metadata: Metadata = {
  title: 'Sản phẩm bán chạy | PickBazar',
  description: 'Sản phẩm bán chạy của PickBazar',
}

function TopProductPage() {
  return <TopProduct />
}

export default TopProductPage
