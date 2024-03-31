'use client'

import React from 'react'
import { Skeleton } from 'antd'
import useSWR from 'swr'
import VoucherItems from './voucherItems'
import '@/components/Voucher/voucher.scss'

function Voucher() {
  const fetcher = (url: string) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Token ${process.env.NEXT_PUBLIC_TOKEN_KEY}`)

    return fetch(url, {
      method: 'GET',
      headers: headers,
    }).then((res) => res.json())
  }

  const { data, error, isLoading } = useSWR(`${process.env.NEXT_URL_COUPON}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const getData = data?.data

  if (isLoading) {
    return (
      <div className="voucher_ly container">
        <Skeleton active style={{ marginTop: '1rem' }} />
      </div>
    )
  }

  return (
    <div className="voucher_ly">
      <div className="container">{Array.isArray(getData) && getData.length > 0 ? <VoucherItems data={getData} /> : ''}</div>
    </div>
  )
}

export default Voucher
