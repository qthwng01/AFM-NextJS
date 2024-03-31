'use client'

import React, { useState, useEffect } from 'react'
import { Row, Col, Button, ConfigProvider, Select, Input, Form, Alert } from 'antd'
import { ProvinceProps, DistrisctProps, WardProps, CartProps } from '@/app/types'
import { useAppSelector } from '@/store/hook/hooks'
import { CartItems } from '@/store/slices/cartSlice'
import { v4 as uuidv4 } from 'uuid'
import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '@/libs/firebase/FirebaseConfig'
import { notFound, useRouter } from 'next/navigation'
import useUser from '@/auth/useUser'
import './checkout.scss'

interface OrderProps {
  orderId: string
  userId: string | number | null
  fullname: string
  phone: string
  mail: string
  city: string
  district: string
  ward: string
  address: string
  total: number
  status: string
  created_at: string
  updated_at: string
  data: CartProps[]
}

function CheckoutComponent() {
  const uid = uuidv4()
  const [form] = Form.useForm()
  const router = useRouter()
  const isLoggedIn = useUser()
  const [dataP, setDataP] = useState<ProvinceProps[]>([])
  const [dataD, setDataD] = useState<DistrisctProps[]>([])
  const [dataW, setDataW] = useState<WardProps[]>([])
  const [valueP, setValueP] = useState<string>('')
  const [valueD, setValueD] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [districts, setDistricts] = useState<string>('')
  const [ward, setWard] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [mail, setMail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const cartItems = useAppSelector(CartItems)

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_PROVINCE}`)
        const result = await response.json()
        console.log(result)
        setDataP(result?.results)
      } catch (error) {
        alert('Lỗi server.')
      }
    }
    getData()
  }, [])

  useEffect(() => {
    form.setFieldsValue({
      districts: '',
    })
    form.setFieldsValue({
      ward: '',
    })
    async function getData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_DISTRICT}/${valueP}`)
        const result = await response.json()
        setDataD(result?.results)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    getData()
  }, [valueP])

  useEffect(() => {
    form.setFieldsValue({
      ward: '',
    })
    async function getData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_WARD}/${valueD}`)
        const result = await response.json()
        setDataW(result?.results)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    getData()
  }, [valueD])

  const handleSelectProvince = (value: string) => {
    const parts = value?.split(',')
    const numberPart = parseInt(parts[0])
    setValueP(numberPart.toString())
    const textPart = parts[1]
    setCity(textPart)
  }

  const handleSelectDistrict = (value: string) => {
    const parts = value?.split(',')
    const numberPart = parseInt(parts[0])
    setValueD(numberPart.toString())
    const textPart = parts[1]
    setDistricts(textPart)
  }

  const handleSelectWard = (value: string) => {
    const parts = value?.split(',')
    const textPart = parts[1]
    setWard(textPart)
  }

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value)
  }

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }

  const checkNumber = () => {
    const phoneNumberRegex = /^0[0-9]{9}$/
    const number: string = phone
    if (phoneNumberRegex.test(number)) return Promise.resolve()
    return Promise.reject(new Error('Số điện thoại sai định dạng.'))
  }

  const handleSubmit = async () => {
    const searchParams = new URLSearchParams(window.location.search)
    const tPrice = cartItems ? cartItems.reduce((acc, cur) => acc + cur.quantity * cur.productPrice, 0) : 0
    const newOrder: OrderProps = {
      orderId: 'order' + '-' + uid,
      userId: isLoggedIn ? isLoggedIn.uid : null,
      fullname: name,
      phone: phone,
      mail: mail,
      city: city,
      district: districts,
      ward: ward,
      address: address,
      total: tPrice,
      status: 'pending',
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
      data: cartItems,
    }

    const createOrder = async (dbName: string, newOrder: OrderProps) => {
      setLoading(true)
      const newOrderRef = doc(collection(db, dbName))
      await setDoc(newOrderRef, newOrder).then(function () {
        console.log('Created Order Success')
        form.resetFields()
        searchParams.set('orderId', newOrder.orderId)
        const newPathname = `/success-order?${searchParams.toString()}`
        router.push(newPathname)
      })
    }

    try {
      if (isLoggedIn) {
        createOrder('orderByUser', newOrder)
      } else {
        createOrder('orderNoneUser', newOrder)
      }
    } catch (e) {
      console.log(e)
    }
  }

  if (cartItems?.length === 0) {
    return notFound()
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#03c78c',
        },
      }}
    >
      <div className="checkout_ly">
        <div className="container checkout_inside">
          <div className="bill_info">
            <h2>Thông tin mua hàng</h2>
            {!isLoggedIn ? (
              <Alert
                className="alert_order"
                message="Bạn chưa đăng nhập. Đăng nhập để lưu đơn hàng!"
                type="info"
                showIcon
                action={
                  <Button onClick={() => router.push('/login')} size="small" type="primary">
                    Đăng nhập
                  </Button>
                }
              />
            ) : (
              ''
            )}
            <Form form={form} className="bill_address" layout="vertical" autoComplete="off" onFinish={handleSubmit}>
              <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
                <Col span={12}>
                  <Form.Item>
                    <Form.Item
                      name="fullname"
                      label="Họ tên"
                      rules={[
                        { required: true, message: 'Nhập email' },
                        { type: 'string', warningOnly: true },
                      ]}
                    >
                      <Input onChange={handleName} size="large" type="text" placeholder="Email..." />
                    </Form.Item>
                    <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, validator: checkNumber }]}>
                      <Input value={phone} onChange={handlePhone} size="large" type="text" placeholder="Số điện thoại..." />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                      <Input onChange={handleEmail} size="large" type="email" placeholder="Email..." />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <Form.Item name="city" label="Tỉnh thành" rules={[{ required: true, message: 'Chưa chọn' }]}>
                      <Select size="large" onChange={handleSelectProvince}>
                        {dataP?.map((item) => (
                          <Select.Option value={item?.province_id + ',' + item?.province_name} key={item?.province_id}>
                            {item?.province_name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item name="districts" label="Thành phố / Thị xã" rules={[{ required: true, message: 'Chưa chọn' }]}>
                      <Select size="large" onChange={handleSelectDistrict}>
                        {dataD?.map((item) => (
                          <Select.Option value={item?.district_id + ',' + item?.district_name} key={item?.district_id}>
                            {item?.district_name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item name="ward" label="Huyện / xã" rules={[{ required: true, message: 'Chưa chọn' }]}>
                      <Select size="large" onChange={handleSelectWard}>
                        {dataW?.map((item) => (
                          <Select.Option value={item?.ward_id + ',' + item?.ward_name} key={item?.ward_id}>
                            {item?.ward_name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="address"
                      label="Địa chỉ cụ thể (số nhà, hẻm, xóm, khu phố)"
                      rules={[{ required: true, message: 'Nhập địa chỉ cụ thể' }]}
                    >
                      <Input onChange={handleAddress} size="large" type="text" placeholder="Địa chỉ..." />
                    </Form.Item>
                  </Form.Item>
                </Col>
              </Row>
              <div className="submit_bill">
                <span>*Lưu ý: Chi tiết đơn hàng sẽ được gửi về email.</span>
                <Button loading={loading} type="primary" htmlType="submit" className="button_confirm">
                  Mua hàng
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default CheckoutComponent
