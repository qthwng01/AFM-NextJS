'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { Card, Row, Col } from 'antd'
import { BrandProps } from '@/app/types'
import 'swiper/css'
import 'swiper/css/pagination'
import './brandHot.scss'

interface BrandList {
  brandHot: BrandProps[]
}

function BrandHot({ brandHot }: BrandList) {
  return (
    <div className="category_ly">
      <div className="category_title">
        <h2>Thương hiệu nổi bật</h2>
      </div>
      <div className="category_list">
        <Swiper
          allowSlidePrev
          slidesPerView={8}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
            {brandHot?.map((item) => (
              <Col span={3} key={item.id}>
                <SwiperSlide key={item.id}>
                  <Card>
                    <Link href={'/'} title={item.name}>
                      <Image src={item.image} width={80} height={65} alt={item.name}></Image>
                    </Link>
                  </Card>
                </SwiperSlide>
              </Col>
            ))}
          </Row>
        </Swiper>
      </div>
    </div>
  )
}

export default BrandHot
