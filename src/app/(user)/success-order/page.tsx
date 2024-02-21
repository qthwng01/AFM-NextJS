'use client'
import { notFound, useSearchParams, useRouter } from 'next/navigation'
import React from 'react'
import { Button, Result } from 'antd'
import { useAppDispatch } from '@/store/hook/hooks'
import { deleteAll } from '@/store/slices/cartSlice'

function SuccessPage() {
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('orderId')

  if (orderId) {
    dispatch(deleteAll())
  } else {
    return notFound()
  }

  return (
    <Result
      status="success"
      title="Đặt hàng thành công!"
      subTitle="Chi tiết đơn hàng được gửi về email."
      extra={[
        <Button type="primary" key="console" onClick={() => router.push('/')}>
          Quay lại trang chủ
        </Button>,
      ]}
    />
  )
}

export default SuccessPage
