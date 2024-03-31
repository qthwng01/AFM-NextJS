import React from 'react'
import Coupon from '@/components/Coupon/coupon'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Coupon | PickBazar',
    description: 'Cập nhật thông tin các mã khuyến mãi từ Shopee, Tiki, Lazada...',
  }

function CouponPage() {
  return <Coupon />
}

export default CouponPage
