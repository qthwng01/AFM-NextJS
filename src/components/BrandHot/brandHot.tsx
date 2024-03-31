'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y, Controller } from 'swiper/modules'
import { Card, Row, Col } from 'antd'
import { BrandProps } from '@/app/types'
import 'swiper/css'
import 'swiper/css/pagination'
import './brandHot.scss'

interface BrandList {
  brandHot: BrandProps[]
}

function BrandHot({ brandHot }: BrandList) {
  const swiperRef = useRef<SwiperCore>()

  return (
    <div className="category_ly container">
      <div className="category_title">
        <h2>Thương hiệu nổi bật</h2>
        <div className="swiper_arrows">
          <div className="swiper_left">
            <span onClick={() => swiperRef.current?.slidePrev()}>&#8592;</span>
          </div>
          <div className="swiper_right">
            <span onClick={() => swiperRef.current?.slideNext()}>&#8594;</span>
          </div>
        </div>
      </div>
      <div className="category_list">
        <Swiper
          slidesPerView={8}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper
          }}
          modules={[Pagination, Navigation, A11y, Controller]}
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
