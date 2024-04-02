import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Radio, Space, Input, Button } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { CategoryProps, BrandProps } from '@/app/types'
import useSWR from 'swr'
import { useRouter, useSearchParams } from 'next/navigation'
import useFetcher from '@/hooks/useFetcher'
import filter from '@/app/assets/filter.svg'

interface FilterProps {
  name: string
}

const { Search } = Input

function LeftFilter() {
  const router = useRouter()
  const getSearchParams = useSearchParams()
  const brandName = getSearchParams.get('brand_name')
  const brandId = getSearchParams.get('brand_id')
  const categoryId = getSearchParams.get('category_id')
  const [categoryValue, setCategoryValue] = useState<number>(categoryId ? Number(categoryId) : 0)
  const [brandValue, setBrandValue] = useState<number>(brandId ? Number(brandId) : 0)
  const [searchBrand, setSearchBrand] = useState<BrandProps[]>([])
  const [searchTerm, setSearchTerm] = useState<string>(brandName ? brandName : '')
  const pages = 382

  // Fetching Categories
  const { data: dataCate, isLoading: isLoadingCate } = useSWR(`${process.env.NEXT_PUBLIC_URL_CATEGORY}`, useFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  // Fetching Brands
  const { data: dataBrand, isLoading: isLoadingBrand } = useSWR(
    `${process.env.NEXT_PUBLIC_URL_BRAND}?page=1&page_size=${pages}`,
    useFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  const onChangeCategory = (e: RadioChangeEvent) => {
    setCategoryValue(e.target.value)
  }

  const onChangeBrand = (e: RadioChangeEvent) => {
    setBrandValue(e.target.value)
  }

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (categoryValue === undefined && brandValue === undefined) {
      return alert('Hãy chọn loại và thương hiệu!')
    }
    updateFilter(brandValue, categoryValue)
  }

  const updateFilter = (brandId: number, categoryId: number) => {
    const searchParams = new URLSearchParams(window.location.search)
    // Update or delete the 'categoryId' search parameter based on the 'categoryId' value
    if (categoryId) {
      searchParams.set('category_id', categoryId.toString())
    } else {
      searchParams.delete('category_id')
    }
    // Update or delete the 'brandId' search parameter based on the 'brandId' value
    if (brandId) {
      searchParams.set('brand_id', brandId.toString())
    } else {
      searchParams.delete('brand_id')
    }
    // Check 'page' parameter exist
    if (getSearchParams.get('page')) {
      searchParams.set('page', '1')
    } else {
      searchParams.set('page', '1')
    }

    // Generate the new pathname with the updated search parameters
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`
    router.push(newPathname)
  }

  const handleReset = () => {
    setCategoryValue(0)
    setBrandValue(0)
    setSearchTerm('')
  }

  //Search data
  useEffect(() => {
    if (searchTerm.toLowerCase() !== null && searchTerm.toLowerCase() !== '') {
      const result = dataBrand?.data.filter((i: FilterProps) => i.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setSearchBrand(result)
    } else {
      setSearchBrand(dataBrand?.data)
    }
  }, [searchTerm])

  return (
    <div className="filter_ly">
      <form className="search_form" onSubmit={handleFilter}>
        <div className="filter_ly_top">
          <Image src={filter} width={25} height={25} alt="filter icon" />
          <h3>Bộ lọc sản phẩm</h3>
        </div>
        <div className="border_b"></div>
        <div className="filter_list_category">
          <Radio.Group onChange={onChangeCategory} value={categoryValue}>
            <Space direction="vertical">
              <Radio value={0} key={0}>
                Tất cả
              </Radio>
              {dataCate?.data.map(
                (item: CategoryProps): JSX.Element => (
                  <Radio value={item.id} key={item.id}>
                    {item.name}
                  </Radio>
                )
              )}
            </Space>
          </Radio.Group>
        </div>
        <div className="filter_list_brand">
          <h4>Thương hiệu</h4>
          <div className="brand_search">
            <Search
              placeholder="Tìm theo tên..."
              style={{ width: 280 }}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
          <div className="brand_search_list">
            <Radio.Group onChange={onChangeBrand} value={brandValue}>
              <Space direction="vertical">
                {searchBrand?.length > 0
                  ? searchBrand.map(
                      (item: BrandProps): JSX.Element => (
                        <Radio value={item.id} key={item.id}>
                          {item.name}
                        </Radio>
                      )
                    )
                  : dataBrand?.data?.map(
                      (item: BrandProps): JSX.Element => (
                        <Radio value={item.id} key={item.id}>
                          {item.name}
                        </Radio>
                      )
                    )}
              </Space>
            </Radio.Group>
          </div>
        </div>
        <div className="brand_search_button">
          <Button onClick={handleReset} className="brand_button_reset" htmlType="button">
            Đặt lại
          </Button>
          <Button className="brand_button_submit" htmlType="submit" type="primary">
            Áp dụng
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LeftFilter
