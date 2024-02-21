'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Row, Col, Tabs, Button, ConfigProvider } from 'antd'
import Order from './order/order'
import Profile from './profile/profile'
import useUser from '@/auth/useUser'
import './info.scss'

const DataTab = [
  {
    name: 'Thông tin',
    component: <Profile />,
  },
  {
    name: 'Đơn hàng',
    component: <Order />,
  },
  {
    name: 'Updating',
    component: '',
  },
]

function Info() {
  const isUser = useUser()
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#03c78c',
        },
      }}
    >
      <div className="info_ly">
        <div className="container info_inside">
          <Row gutter={[16, { xs: 8, sm: 16, md: 16, lg: 16 }]}>
            <Col span={18}>
              <div className="info_detail">
                <Tabs
                  tabPosition="left"
                  items={DataTab?.map((_, i) => {
                    const id = String(i + 1)
                    return {
                      label: `${_.name}`,
                      key: id,
                      children: _.component,
                    }
                  })}
                />
              </div>
            </Col>
            <Col span={6}>
              <div className="right_info">
                <div className="top_info">
                  {/* <Image src={''} alt="user"></Image> */}
                  <p>{isUser?.displayName ? isUser?.displayName : 'Chưa đặt tên'}</p>
                  <p>{isUser?.email}</p>
                </div>
                <div className="bottom_info">
                  <p>Đơn hàng đã giao: 0</p>
                  <p>Đơn hàng đang giao: 0</p>
                  <p>Đơn hàng đã huỷ: 0</p>
                  <div className="logout">
                    <Button type="primary" shape="round" size="large">
                      Đăng xuất
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default Info
