import BestSeller from '@/components/BestSeller/bestSeller'
import BrandHot from '@/components/BrandHot/brandHot'
import ProductSuggestion from '@/components/ProductSuggestion/productSug'
import Slider from '@/components/Slider/slider'
import Voucher from '@/components/Voucher/voucher'

async function getBestSeller() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BEST_SELLER}?page_size=6&page=1`)
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
  const bestSeller = await getBestSeller()
  const categoryHot = await getCategoryHot()

  return (
    <main>
      <Slider />
      <BestSeller bestSeller={bestSeller?.data} />
      <BrandHot brandHot={categoryHot?.data} />
      <Voucher />
      <ProductSuggestion />

    </main>
  )
}
