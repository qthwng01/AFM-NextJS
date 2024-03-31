'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Row, Col, Button, ConfigProvider, InputNumber, Empty, Select, Input, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { CartProps } from '@/app/types'
import { formatPrice } from '@/utils/formatCurrency'
import { convertSlug } from '@/utils/convertSlugUrl'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/hook/hooks'
import { increaseAmount, decreaseAmount, removeItem, deleteAll } from '@/store/slices/cartSlice'
import { CartItems } from '@/store/slices/cartSlice'
import './cart.scss'

function Cart() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [modal, contextHolder] = Modal.useModal()
  const [data, setData] = useState<CartProps[]>([])
  const [quantity, setQuantity] = useState<string | number>(0)
  const tPrice = data ? data.reduce((acc, cur) => acc + cur.quantity * cur.productPrice, 0) : 0
  const flag = useAppSelector(CartItems)

  useEffect(() => {
    if (typeof window !== 'undefined' && data) {
      const data = JSON.parse(localStorage.getItem('cart-store') as string)
      const countQuantity = JSON.parse(localStorage.getItem('cart-quanity') as string)
      setData(data)
      setQuantity(countQuantity)
    } else {
      setData([])
      setQuantity(0)
    }
  }, [flag])

  const handleIncreaseAmount = (productId: string) => {
    dispatch(increaseAmount({ productId }))
  }

  const handleDecreaseAmount = (productId: string) => {
    dispatch(decreaseAmount({ productId }))
  }

  const handleRemoveAmount = (productId: string) => {
    dispatch(removeItem({ productId }))
  }

  const handleDeleteAll = () => {
    dispatch(deleteAll())
  }

  const openModal = () => {
    modal.confirm({
      title: 'Thông báo',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn chắc chắn muốn xoá tất cả trong giỏ hàng.',
      okText: 'OK',
      cancelText: 'Cancle',
      onOk() {
        handleDeleteAll()
      },
    })
  }

  const processCheckout = () => {
    router.push('/checkout')
  }

  if (data?.length === 0 || !data) {
    return (
      <div className="cart_ly">
        <div className="container no_cart">
          <Empty description="Giỏ hàng trống..." />
        </div>
      </div>
    )
  }

  return (
    <div className="cart_ly">
      <div className="container cart_inside">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#03c78c',
            },
          }}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
            <Col span={16}>
              <div className="cart_left">
                <div className="cart_left_top">
                  <h2>Giỏ hàng</h2>
                  <span className="delete_all" onClick={openModal}>
                    Xoá tất cả
                  </span>
                </div>
                <div className="cart_left_bottom">
                  <div className="data_cart_left_bottom" id="scrollbar">
                    {data?.map((item) => (
                      <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }} key={item?.productId} className="data_cart_left">
                        <Col span={4}>
                          <div className="product_image">
                            <Image src={item?.productImage} width={100} height={100} alt="image" />
                          </div>
                        </Col>
                        <Col span={6}>
                          <div className="product_details">
                            <p className="product_detail_name" title={item?.productName}>
                              {item?.productName}
                            </p>
                            <p className="product_detail_code">Mã sản phẩm: {item?.productId}</p>
                            <Link href={`/product/${convertSlug(item?.productName)}-${item?.productId}.html`}>Xem chi tiết</Link>
                          </div>
                        </Col>
                        <Col span={4}>
                          <div className="quantity">
                            <span className="minus" onClick={() => handleDecreaseAmount(item?.productId)}>
                              -
                            </span>
                            <InputNumber value={item?.quantity} controls={false} width={20} />
                            <span className="add" onClick={() => handleIncreaseAmount(item?.productId)}>
                              +
                            </span>
                          </div>
                        </Col>
                        <Col span={4}>
                          <div className="price">
                            <span>{formatPrice(item.productPrice)}</span>
                          </div>
                        </Col>
                        <Col span={4}>
                          <div className="total">
                            <span>{formatPrice(item.productPrice * item.quantity)}</span>
                          </div>
                        </Col>
                        <Col span={2}>
                          <div className="remove">
                            <span onClick={() => handleRemoveAmount(item?.productId)}>
                              Xoá
                              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px">
                                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
                              </svg> */}
                            </span>
                          </div>
                        </Col>
                      </Row>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="cart_right">
                <div className="cart_right_top">
                  <h2>Tổng hoá đơn</h2>
                </div>
                <div className="cart_right_bottom">
                  <div className="cart_right_detail">
                    <span className="count_items">Số lượng: {quantity}</span>
                    <span className="t_price">{formatPrice(tPrice)}</span>
                  </div>
                  <div className="shipping">
                    <p>Phương thức thanh toán</p>
                    <Select defaultValue="cod" style={{ width: '100%' }} options={[{ value: 'cod', label: 'Ship COD - Thanh toán khi nhận hàng' }]} />
                  </div>
                  <div className="promote">
                    <p>Mã giảm giá</p>
                    <Input placeholder="Nhập mã giảm giá.." />
                    <Button type="primary" className="apply_button">
                      Apply
                    </Button>
                  </div>
                  <div className="line_through"></div>
                  <div className="checkout">
                    <span className="total_count">Tạm tính</span>
                    <span className="total_value">{formatPrice(tPrice)}</span>
                    <Button onClick={processCheckout} htmlType="button" style={{ width: '100%' }} className="checkout_button" type="primary">
                      Tiếp tục
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          {/* Modal Delete All */}
            {contextHolder}
          {/* Modal Delete All */}
        </ConfigProvider>
      </div>
    </div>
  )
}

export default Cart
