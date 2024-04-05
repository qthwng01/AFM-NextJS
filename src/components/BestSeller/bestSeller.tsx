'use client'

import React from 'react'
import { Row, Col } from 'antd'
import Link from 'next/link'
import { ProductProps } from '@/app/types'
import CardProduct from '../UI/CardProduct'
import './bestSeller.scss'
import 'react-medium-image-zoom/dist/styles.css'

interface BestSellerListProps {
  bestSeller: ProductProps[]
}

function BestSeller({ bestSeller }: BestSellerListProps) {
  return (
    <div className="best_seller_ly container">
      <div className="best_seller_title">
        <h2>Sản phẩm bán chạy</h2>
        <Link href={'/top-product'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      </div>
      <div className="best_seller">
        <Row gutter={[8, { xs: 8, sm: 16, md: 16, lg: 16 }]}>
          {bestSeller?.map((item) => (
            <Col xs={12} md={12} lg={4} xl={4} key={item.id}>
              <CardProduct
                className="card_product_best_seller"
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
    </div>
  )
}

export default BestSeller
