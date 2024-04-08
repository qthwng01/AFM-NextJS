'use client'

import React, {useState, useEffect } from 'react'
import { Row, Col, Tabs, ConfigProvider, RadioChangeEvent } from 'antd'
import Order from './order/order'
import Profile from './profile/profile'
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
  // {
  //   name: 'Updating',
  //   component: '',
  // },
]

type TabPosition = 'left' | 'right' | 'top' | 'bottom';

const Info = () => {
  const [tabPosition, setTabPosition] = useState<TabPosition>('left');

  const changeTabPosition = (position: any) => {
    setTabPosition(position);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 740) {
        changeTabPosition('top');
      } else {
        changeTabPosition('left');
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            <Col xs={24} md={24} lg={24} xl={24}>
              <div className="info_detail">
                <Tabs
                  tabPosition={tabPosition}
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
