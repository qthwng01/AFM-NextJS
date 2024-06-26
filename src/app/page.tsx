import BestSeller from '@/components/BestSeller/bestSeller'
import BrandHot from '@/components/BrandHot/brandHot'
import ProductSuggestion from '@/components/ProductSuggestion/productSug'
import Slider from '@/components/Slider/slider'
import Voucher from '@/components/Voucher/voucher'

async function getBestSeller() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_PRODUCT}/top?page_size=6&page=1`)
  if (!res.ok) {
    throw new Error('Failed to fetch BestSeller')
  }
  return res.json()
}

async function getCategoryHot() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BRAND}?page_size=10&page=1&hot=1`)
  if (!res.ok) {
    throw new Error('Failed to fetch BestSeller')
  }
  return res.json()
}

export default async function Home() {
  const bestSellerResponse = await getBestSeller()
  const categoryHotResponse = await getCategoryHot()

  const bestSeller = bestSellerResponse?.data || []
  const categoryHot = categoryHotResponse?.data || []

  return (
    <main>
      <Slider />
      <BestSeller bestSeller={bestSeller} />
      <BrandHot brandHot={categoryHot} />
      <Voucher />
      <ProductSuggestion />
    </main>
  )
}
