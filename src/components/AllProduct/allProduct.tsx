'use client'

import React, { useState } from 'react'
import { Row, Col, ConfigProvider } from 'antd'
import LeftFilter from './leftFilter'
import RightProduct from './rightProduct'
import './allProduct.scss'

function AllProduct() {
  const [isFilterMobile, setIsFilterMobile] = useState(false)

  return (
    <div className={isFilterMobile ? 'all_product is__overlay' : 'all_product'}>
      <div className="container all_product_inside">
        <ConfigProvider
          theme={{
            token: {
              colorPrimaryBorder: '#03C78C',
              colorPrimary: '#03C78C',
            },
          }}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
            <Col xs={24} md={24} lg={6} xl={6}>
              <LeftFilter setIsFilterMobile={setIsFilterMobile} isFilterMobile={isFilterMobile} />
            </Col>
            {isFilterMobile ? '' : (
              <Col xs={24} md={24} lg={18} xl={18}>
                <RightProduct setIsFilterMobile={setIsFilterMobile} isFilterMobile={isFilterMobile} />
              </Col>
            )}
          </Row>
        </ConfigProvider>
      </div>
    </div>
  )
}

export default AllProduct
