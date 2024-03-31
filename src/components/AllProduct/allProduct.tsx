'use client'

import React from 'react'
import { Row, Col, ConfigProvider } from 'antd'
import LeftFilter from './leftFilter'
import RightProduct from './rightProduct'
import './allProduct.scss'

function AllProduct() {
  return (
    <div className="all_product">
      <div className="container all_product_inside">
        <ConfigProvider
          theme={{
            token: {
              colorPrimaryBorder: '#03c78c',
              colorPrimary: '#03c78c',
            },
          }}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
            <Col span={6}>
              <LeftFilter />
            </Col>
            <Col span={18}>
              <RightProduct />
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  )
}

export default AllProduct
