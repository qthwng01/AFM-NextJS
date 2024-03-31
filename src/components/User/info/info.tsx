'use client'

import React from 'react'
import { Row, Col, Tabs, ConfigProvider } from 'antd'
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
            <Col span={24}>
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
          </Row>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default Info
