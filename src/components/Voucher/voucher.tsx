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
    headers.append('Authorization', 'Token a06MUDl98tJjjSoY_PGL4ijPrJAIFXge')

    return fetch(url, {
      method: 'GET',
      headers: headers,
    }).then((res) => res.json())
  }
  const { data, error, isLoading } = useSWR('https://api.accesstrade.vn/v1/offers_informations/coupon?limit=3', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const getData = data?.data

  if (isLoading) {
    return (
      <div className="voucher_ly">
        <Skeleton active style={{ marginTop: '10px' }} />
      </div>
    )
  }

  return <div className="voucher_ly">{Array.isArray(getData) && getData.length > 0 ? <VoucherItems data={getData} /> : ''}</div>
}

export default Voucher
