import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Row, Col, Select, Card, Pagination, ConfigProvider } from 'antd'
import type { PaginationProps } from 'antd'
import useSWR from 'swr'
import { ProductProps } from '@/app/types'
import { formatPrice } from '@/utils/formatCurrency'
import { convertSlug } from '@/utils/convertSlugUrl'
//import prod from '@/app/assets/prod.jpg'

function RightProduct() {
  const searchParams = useSearchParams()
  const brandId = searchParams.get('brand_id')
  const categoryId = searchParams.get('category_id')
  const pageId = searchParams.get('page')
  const [brandValue, setBrandValue] = useState<string>('')
  const [categoryValue, setCategoryValue] = useState<string>('')
  const [pageValue, setPageValue] = useState<string>('')
  const [pages, setPages] = useState<number>(1)
  const router = useRouter()

  useEffect(() => {
    if (categoryId) {
      setCategoryValue(categoryId)
    } else {
      setCategoryValue('')
    }
    if (brandId) {
      setBrandValue(brandId)
    } else {
      setBrandValue('')
    }
    if (pageId) {
      setPageValue(pageId)
      setPages(Number(pageId))
    } else {
      setPageValue('')
    }
  }, [brandId, categoryId, pageId])

  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  // Fetching Products
  const { data, error, isLoading } = useSWR(
    `https://apis.dimuadi.vn/d2c-service/product?brand_id=${brandValue}${
      categoryValue !== '' ? `&category_id=${categoryValue}` : ''
    }&page=${pageValue}&page_size=12`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

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
    <div className="product_right_ly">
      <div className="product_right_top">
        <span>
          Hiển thị từ {data?.paging ? <strong>{data?.paging?.pageSize * data?.paging?.page}</strong> : ''} của{' '}
          <strong>{data?.paging?.total}</strong> sản phẩm
        </span>
        <div className="product_right_cs">
          <p>Sắp xếp theo</p>
          <Select
            defaultValue="Tất cả"
            style={{ width: 120 }}
            // onChange={handleChange}
            options={[
              { value: 'Tất cả', label: 'Tất cả', disabled: true },
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
            ]}
          />
        </div>
      </div>
      <div className="product_right_bottom">
        <ConfigProvider
          theme={{
            token: {
              paddingLG: 10,
            },
          }}
        >
          <Row gutter={[10, { xs: 8, sm: 16, md: 16, lg: 16 }]}>
            {data?.data.map((item: ProductProps) => (
              <Col span={6} key={item.id}>
                <Card className="card_all_product">
                  <div className="image_all_product">
                    <Link href={`/product/${convertSlug(item.name)}-${item.id}.html`}>
                      <Image src={item.thumbImage} width={180} height={180} alt={item.name} className="image_product_main" />
                    </Link>
                  </div>
                  <div className="description_all_product">
                    <div className="name_all_product">
                      <Link href={`/product/${convertSlug(item.name)}-${item.id}.html`}>
                        <h2>{item.name}</h2>
                      </Link>
                    </div>
                    <div className="price_all_product">
                      <p>{formatPrice(item.price)}</p>
                    </div>
                    <div className="old_price">
                      {item.priceBeforeDiscount > 0 ? <p className="content_info_discount">{formatPrice(item.priceBeforeDiscount)}</p> : ''}
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </ConfigProvider>
      </div>
      <div className="product_right_bottom_pagination">
        <Pagination current={pages} total={totalPage} pageSize={12} showSizeChanger={false} onChange={onChangePage} />
      </div>
    </div>
  )
}

export default RightProduct
