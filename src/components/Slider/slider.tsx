'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'
import Link from 'next/link'
import { Col, Row } from 'antd'
import '@/components/Slider/slider.scss'
import picRight from '@/app/assets/pic-right.jpg'
import picLeft from '@/app/assets/pic-left.jpg'

const Slider = () => {
  return (
    <>
      <div className="slider_ly container">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
          <Col span={16}>
            <div className="slider_first">
              <Swiper
                // allowSlidePrev
                // slidesPerView={3}
                loop={true}
                navigation={true}
                pagination={true}
                modules={[Navigation, Pagination]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <Link href={''}>
                    <Image src={picLeft} alt=""></Image>
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link href={''}>
                    <Image src={picLeft} alt=""></Image>
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link href={''}>
                    <Image src={picLeft} alt=""></Image>
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link href={''}>
                    <Image src={picLeft} alt=""></Image>
                  </Link>
                </SwiperSlide>
                {/* <div className="navigation_slide">
                  <Image src={arrowRight} alt=""></Image>
                </div> */}
              </Swiper>
            </div>
          </Col>
          <Col span={8}>
            <div className="slider_second">
              <div className="slider_top">
                <Link href={''}>
                  <Image src={picRight} alt=""></Image>
                </Link>
              </div>
              <div className="slider_bottom">
                <Link href={''}>
                  <Image src={picRight} alt=""></Image>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <></>
    </>
  )
}

export default Slider
