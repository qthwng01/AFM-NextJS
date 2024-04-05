'use client'

import { Row, Col } from 'antd'
import useSWR from 'swr'
import CardProduct from '../UI/CardProduct'
import { ProductProps } from '@/app/types'
import CardProductSkeleton from '../UI/CardProductSkeleton'
import useFetcher from '@/hooks/useFetcher'

interface ISupplierProps {
  companyId: number
}

const ProductOfSupplier = ({ companyId }: ISupplierProps) => {
  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_URL_PRODUCT}?page=1&page_size=10&supplier_id=${companyId}&sort_types=total_selling`,
    useFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

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
        {data?.data?.map((item: ProductProps, key: number) => (
          <Col lg={4} xl={4} key={key}>
            <CardProduct
              className=""
              id={item.id}
              name={item.name}
              thumbImage={item.thumbImage}
              price={item.price}
              priceBeforeDiscount={item.priceBeforeDiscount}
              discountAmount={item.discountAmount}
              totalSelling={item.totalSelling}
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ProductOfSupplier
