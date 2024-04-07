import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState, useMemo } from 'react'
import { Row, Col, Select, Card, Pagination, ConfigProvider } from 'antd'
import type { PaginationProps } from 'antd'
import useSWR from 'swr'
import { ProductProps } from '@/app/types'
import { formatPrice } from '@/utils/formatCurrency'
import { convertSlug } from '@/utils/convertSlugUrl'
import useFetcher from '@/hooks/useFetcher'
import { IFilterMobileProps } from '@/app/types'

const RightProduct: React.FC<IFilterMobileProps> = ({ setIsFilterMobile, isFilterMobile }) => {
  const searchParams = useSearchParams()
  const brandId = searchParams.get('brand_id')
  const categoryId = searchParams.get('category_id')
  const pageId = searchParams.get('page')
  const [brandValue, setBrandValue] = useState<string>('')
  const [categoryValue, setCategoryValue] = useState<string>('')
  const [pageValue, setPageValue] = useState<string>('')
  const [pages, setPages] = useState<number>(1)
  const [sortOption, setSortOption] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (categoryId) {
      setCategoryValue(categoryId.toString())
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

  // Fetching Products
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_URL_PRODUCT}?brand_id=${brandValue}${
      categoryValue !== '' && categoryValue !== '0' ? `&category_id=${categoryValue}` : ''
    }&page=${pageValue}&page_size=12`,
    useFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  // Handle change state option in Select
  const handleChangeSelect = (value: string) => {
    setSortOption(value)
  }

  // Data sorted
  const sortedData = useMemo(() => {
    if (!data?.data) return []
    return [...data.data].sort((a, b) => {
      if (sortOption === 'price_ascending') {
        return a.price - b.price
      } else if (sortOption === 'price_decrease') {
        return b.price - a.price
      }
      return 0
    })
  }, [data?.data, sortOption])

  // handle pagination
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
      <div className="btn-filter__mobile">
        <span className="btn__filter" onClick={() => setIsFilterMobile(!isFilterMobile)}>Bộ lọc</span>
      </div>
      <div className="product_right_top">
        <span>
          Hiển thị từ {data?.paging ? <strong>{data?.paging?.pageSize * data?.paging?.page}</strong> : ''} của{' '}
          <strong>{data?.paging?.total}</strong> sản phẩm
        </span>
        <div className="product_right_cs">
          <p>Sắp xếp theo</p>
          <Select
            defaultValue="Tất cả"
            style={{ width: 150 }}
            onChange={handleChangeSelect}
            options={[
              { value: 'Tất cả', label: 'Tất cả', disabled: true },
              { value: 'price_ascending', label: 'Giá tăng dần' },
              { value: 'price_decrease', label: 'Giá giảm dần' },
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
            {sortedData?.length > 0
              ? sortedData?.map((item: ProductProps) => (
                  <Col xs={12} md={12} lg={6} xl={6} key={item?.id}>
                    <Card className="card_all_product">
                      <div className="image_all_product">
                        <Link href={`/product/${convertSlug(item?.name)}-${item?.id}.html`}>
                          <Image src={item?.thumbImage} width={180} height={180} alt={item?.name} className="image_product_main" />
                        </Link>
                      </div>
                      <div className="description_all_product">
                        <div className="name_all_product">
                          <Link href={`/product/${convertSlug(item?.name)}-${item?.id}.html`}>
                            <h2>{item?.name}</h2>
                          </Link>
                        </div>
                        <div className="price_all_product">
                          <p>{formatPrice(item?.price)}</p>
                        </div>
                        <div className="old_price">
                          {item?.priceBeforeDiscount > 0 ? (
                            <p className="content_info_discount">{formatPrice(item?.priceBeforeDiscount)}</p>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))
              : 'Không có dữ liệu hoặc sản phẩm đã bị xoá.'}
          </Row>
        </ConfigProvider>
      </div>
      <div className="product_right_bottom_pagination">
        <Pagination current={pages} total={data?.paging?.total} pageSize={12} showSizeChanger={false} onChange={onChangePage} />
      </div>
    </div>
  )
}

export default RightProduct
