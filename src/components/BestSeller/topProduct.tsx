'use client'

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Row, Col, Pagination, ConfigProvider } from 'antd'
import type { PaginationProps } from 'antd'
import useSWR from 'swr'
import CardProduct from '../UI/CardProduct'
import CardProductSkeleton from '../UI/CardProductSkeleton'
import { ProductProps } from '@/app/types'
import { useRouter, useSearchParams } from 'next/navigation'
import banner from '@/app/assets/banner2.jpg'
import './topProduct.scss'

function TopProduct() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const [pages, setPages] = useState<number>(1)
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageId = searchParams.get('page')
  const [pageValue, setPageValue] = useState<string>('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (pageId) {
      setPageValue(pageId)
      setPages(Number(pageId))
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      setPageValue('')
    }
  }, [pageId])

  // Fetching Products
  const { data, error, isLoading } = useSWR(`https://apis.dimuadi.vn/d2c-service/product/top?page_size=18&page=${pageValue}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const totalPage: number = data?.paging?.total

  const onChangePage: PaginationProps['onChange'] = (page) => {
    const searchParams = new URLSearchParams(window.location.search)
    if (page) {
      searchParams.set('page', page.toString())
    } else {
      searchParams.delete('page')
    }
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`
    router.push(newPathname)
    setPages(page)
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#03c78c',
        },
      }}
    >
      <div className="top_product_ly">
        <div className="container top_product_inside">
          <div className="banner">
            <Image src={banner} alt="banner" />
          </div>
          {isLoading ? (
            <div style={{ marginTop: '1rem' }}>
              <Row gutter={[8, { xs: 8, sm: 16, md: 16, lg: 16 }]}>
                <CardProductSkeleton />
              </Row>
            </div>
          ) : (
            <div className="top_product_bottom" ref={scrollRef}>
              <h2 className="title">Sản phẩm bán chạy</h2>
              <div className="top_product_list">
                <Row gutter={[10, { xs: 8, sm: 16, md: 16, lg: 16 }]}>
                  {data?.data?.map((item: ProductProps) => (
                    <Col span={4} key={item.id}>
                      <CardProduct
                        className="card_product_sug"
                        id={item.id}
                        name={item.name}
                        thumbImage={item.thumbImage}
                        price={item.price}
                        priceBeforeDiscount={item.priceBeforeDiscount}
                        discountAmount={item.discountAmount}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
              <div className="pagination">
                <Pagination current={pages} total={totalPage} pageSize={18} onChange={onChangePage} showSizeChanger={false} />
              </div>
            </div>
          )}
        </div>
      </div>
    </ConfigProvider>
  )
}

export default TopProduct
