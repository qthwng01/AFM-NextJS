import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Radio, Space, Input, Button } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { CategoryProps, BrandProps } from '@/app/types'
import useSWR from 'swr'
import { useRouter, useSearchParams } from 'next/navigation'
import filter from '@/app/assets/filter.svg'
import arrowdb from '@/app/assets/arrow-db.svg'

interface FilterProps {
  name: string
}

const { Search } = Input

function LeftFilter() {
  const [categoryValue, setCategoryValue] = useState<number>(0)
  const [brandValue, setBrandValue] = useState<number>(0)
  const [allBrand, setAllBrand] = useState<BrandProps[]>([])
  const [countLoad, setCountLoad] = useState<number>(4)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const pages = 382
  const router = useRouter()
  const getSearchParams = useSearchParams()

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

  const deleteFilter = () => {
    setCategoryValue(0)
    setBrandValue(0)
  }

  const fetcher = (url: string) => fetch(url).then((res) => res.json())

  // Fetching Categories
  const {
    data: dataCate,
    error: errorCate,
    isLoading: isLoadingCate,
  } = useSWR('https://apis.dimuadi.vn/d2c-service/category', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  // Fetching Brands
  const {
    data: dataBrand,
    error: errorBrand,
    isLoading: isLoadingBrand,
  } = useSWR(`https://apis.dimuadi.vn/d2c-service/brand?page=1&page_size=${pages}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  //Load more
  useEffect(() => {
    if (countLoad === 4 && dataBrand !== undefined) {
      const firstIssue = dataBrand?.data?.slice(0, 4)
      setAllBrand(firstIssue)
    } else if (countLoad > 4) {
      const firstIssue = dataBrand?.data.slice(0, 4)
      const secondIssue = dataBrand?.data.slice(4, countLoad)
      setAllBrand([...firstIssue, ...secondIssue])
    }
  }, [countLoad, dataBrand])
  //End Fetching Brands

  //Search data
  useEffect(() => {
    if (searchTerm.toLowerCase() !== null && searchTerm.toLowerCase() !== '') {
      const result = dataBrand?.data.filter((i: FilterProps) => i.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setAllBrand(result)
    } else {
      const firstIssue = dataBrand?.data.slice(0, 4)
      setAllBrand(firstIssue)
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
            <Search placeholder="Tìm theo tên..." style={{ width: 280 }} onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
          </div>
          <div className="brand_search_list">
            <Radio.Group onChange={onChangeBrand} value={brandValue}>
              <Space direction="vertical">
                {allBrand?.map(
                  (item: BrandProps): JSX.Element => (
                    <Radio value={item.id} key={item.id}>
                      {item.name}
                    </Radio>
                  )
                )}
              </Space>
            </Radio.Group>
          </div>
          <div className="show_more">
            <Image src={arrowdb} width={25} height={25} alt="arrow" />
            <span onClick={() => setCountLoad(countLoad + 4)}>Xem thêm</span>
          </div>
        </div>
        <div className="brand_search_button">
          <Button onClick={deleteFilter} className="brand_button_reset" htmlType="button">
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
