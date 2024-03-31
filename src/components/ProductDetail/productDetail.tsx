'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Row, Col, Button, Badge, ConfigProvider } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { ProductDetailProps } from '@/app/types'
import { DataServices } from '@/constants/DataServices'
import { formatPrice } from '@/utils/formatCurrency'
import Zoom from 'react-medium-image-zoom'
import ProductOfSupplier from './productOfSupplier'
import { useAppDispatch } from '@/store/hook/hooks'
import { addToCart } from '@/store/slices/cartSlice'
import { useRouter } from 'next/navigation'
import 'react-medium-image-zoom/dist/styles.css'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import './productDetail.scss'

interface ProductProps {
  data: ProductDetailProps
}

const ProductDetail = ({ data }: ProductProps) => {
  const router = useRouter()
  const item: ProductDetailProps = data?.data
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    const newOrder = {
      userId: null,
      quantity: 1,
      productId: item.id,
      productName: item.name,
      productPrice: item.price,
      productImage: item.thumbImage,
    }
    dispatch(addToCart(newOrder))
  }

  const handleBuy = () => {
    const newOrder = {
      userId: null,
      quantity: 1,
      productId: item.id,
      productName: item.name,
      productPrice: item.price,
      productImage: item.thumbImage,
    }
    dispatch(addToCart(newOrder))
    router.push('/cart')
  }

  return (
    <div className="product_detail_ly">
      <div className="container">
        <div className="product_info">
          <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
            <Col span={10}>
              <div className="thumbnail_image">
                <div className="top_image">
                  <Swiper
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper_gallery"
                  >
                    {item?.images?.map((img, key) => (
                      <SwiperSlide key={key}>
                        <Zoom>
                          <Image src={img} width={500} height={500} alt={item?.name}></Image>
                        </Zoom>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="thumb_gallery">
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      loop={true}
                      spaceBetween={10}
                      slidesPerView={4}
                      freeMode={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="mySwiper"
                    >
                      {item?.images?.map((img: any, key: any) => (
                        <SwiperSlide key={key}>
                          <Image src={img} width={500} height={500} alt={item?.name}></Image>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
                <div className="bottom_image"></div>
              </div>
            </Col>
            <Col span={14}>
              <div className="desc_product">
                <span className="brand">Thương hiệu: {item?.brand ? item?.brand : 'Đang cập nhật'}</span>
                <h2>{item?.name}</h2>
                <span className="total_selling">Đã bán: {item?.totalSelling}</span>
                <br />
                <span className="category">Category: {item?.categoryName ? item?.categoryName : 'Đang cập nhật'}</span>
                <div className="price_discount">
                  <span className="price_new">{formatPrice(item?.price)}</span>
                  <br />
                  <div className="price_sale">
                    {item?.priceBeforeDiscount > 0 ? <span className="ps_value">{formatPrice(item?.priceBeforeDiscount)}</span> : ''}
                    {item?.discountAmount > 0 ? (
                      <span>
                        <Badge className="ps_amount" count={item?.discountAmount > 0 ? '-' + item?.discountAmount + '%' : ''} />
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="cacl_discount">
                  <span>
                    {item?.priceBeforeDiscount
                      ? 'Giảm đến' + ' ' + formatPrice(item?.priceBeforeDiscount - item?.price)
                      : `Giá gốc ${formatPrice(item?.price)}`}
                  </span>
                </div>
                <div className="line_through"></div>
                <div className="ship_info">
                  <h4>Phí vận chuyển</h4>
                  <p>{item?.shipPrice ? item?.shipPrice : 'Đang cập nhật'}</p>
                </div>
                <div className="button_option">
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: '#03c78c',
                      },
                    }}
                  >
                    <Button className="add_button" htmlType="button" onClick={handleAddToCart}>
                      Thêm vào giỏ hàng
                    </Button>
                    <Button className="buy_button" type="primary" onClick={handleBuy}>
                      Mua ngay
                    </Button>
                  </ConfigProvider>
                </div>
                <div className="item_services">
                  <ul className="item_services_ul">
                    {DataServices?.map((item, key) => (
                      <li className="item_services_li" key={key}>
                        <i>
                          <Image src={item?.img} width={30} height={30} alt="freeship 2km" />
                        </i>
                        <span>{item?.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="product_info_bottom">
          <div className="container">
            <div className="pd_overview">
              <div className="pd_overview_company">
                <h2 className="title_overview">Tổng quan</h2>
                <h3>{item?.supplier?.name}</h3>
                <p className="total_selling">
                  Đã bán: <strong>{item?.supplier?.totalSelling ? item?.supplier?.totalSelling : 'Đang cập nhật'}</strong>
                </p>
                {/* <p className="time_process">
                  <i></i>Thời gian xác nhận đơn hàng: <strong>Trong vòng 24h</strong>
                </p> */}
                <p className="time_rate">
                  <i></i>Tỉ lệ giao hàng đúng hạn: <strong>90%</strong>
                </p>
              </div>
              <div className="pd_parameters">
                <h2>Tóm tắt thông số sản phẩm</h2>
                <p>
                  Thương hiệu: <span>{item?.brand ? item?.brand : 'Đang cập nhật'}</span>
                </p>
                <div className="pd_desc">
                  <div dangerouslySetInnerHTML={{ __html: item?.description }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="product_suggestion">
          <div className="container">
            <span className="title_suggestion">Sản phẩm tương tự</span>
            <br />
            <ProductOfSupplier companyId={item?.companyId} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
