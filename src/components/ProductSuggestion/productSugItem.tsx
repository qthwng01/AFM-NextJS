'use client'

import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import { ProductProps } from '@/app/types'
import CardProduct from '../UI/CardProduct'
import '@/components/ProductSuggestion/productSug.scss'

interface IdProps {
  id: number
}

const ProductSuggesItem = ({ id }: IdProps) => {
  const [dataPSI, setData] = useState<ProductProps[]>([])
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.NEXT_URL_PRODUCT}?category_id=${id}&page_size=10`)
      if (!res.ok) {
        throw new Error('Failed to fetch BestSeller')
      }
      const data = await res.json()
      setData(data?.data)
    }
    getData()
  }, [id])

  return (
    <div className="product_sug_items">
      <Row gutter={[16, { xs: 8, sm: 16, md: 16, lg: 16 }]}>
        {dataPSI?.map((item) => (
          <Col span={4} key={item.id}>
            <CardProduct
              className="card_product_sug"
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

export default ProductSuggesItem
