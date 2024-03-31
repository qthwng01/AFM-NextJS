import ProductDetail from '@/components/ProductDetail/productDetail'
import { SplitParams } from '@/utils/splitParams'
import { Suspense } from 'react'
import Loading from '@/app/loading'

async function getProductDetail(id: string) {
  const res = await fetch(`https://apis.dimuadi.vn/d2c-service/product/${id}`, {
    cache: 'no-store',
  })
  if (!res.ok) {
    console.log('Failed to fetch Product Detail')
  }
  const data = await res.json()
  return data
}

async function DetailProduct({ params }: { params: { slug: string } }) {
  const id = SplitParams(params.slug)
  const data = await getProductDetail(id)

  return (
    <Suspense fallback={<Loading />}>
      <ProductDetail data={data} />
    </Suspense>
  )
}

export default DetailProduct