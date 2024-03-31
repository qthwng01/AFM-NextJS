'use client'

import { Row, Col } from 'antd'
import useSWR from 'swr'
import CardProduct from '../UI/CardProduct'
import { ProductProps } from '@/app/types'
import CardProductSkeleton from '../UI/CardProductSkeleton'

interface SupplierProps {
  companyId: number
}

const ProductOfSupplier = ({ companyId }: SupplierProps) => {
  const fetcher = (url: string) => {
    return fetch(url).then((res) => res.json())
  }
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_URL_PRODUCT}?page=1&page_size=10&supplier_id=${companyId}&sort_types=total_selling`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  const getData = data?.data

  if (isLoading) {
    return (
      <div className="item_suggestions">
        <Row gutter={[8, { xs: 8, sm: 16, md: 16, lg: 16 }]}>
          <CardProductSkeleton />
        </Row>
      </div>
    )
  }

  return (
    <div className="item_suggestions">
      <Row gutter={[8, { xs: 8, sm: 16, md: 16, lg: 16 }]}>
        {getData?.map((item: ProductProps, key: number) => (
          <Col lg={4} xl={4} key={key}>
            <CardProduct
              className=""
              id={item.id}
              name={item.name}
              thumbImage={item.thumbImage}
              price={item.price}
              priceBeforeDiscount={item.priceBeforeDiscount}
              discountAmount={item.discountAmount}
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ProductOfSupplier
