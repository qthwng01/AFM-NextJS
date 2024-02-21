'use client'

import React from 'react'
import { Tabs, ConfigProvider } from 'antd'
import useSWR from 'swr'
import { CategoryProps } from '@/app/types'
import ProductSugItem from './productSugItem'
import './productSug.scss'

function ProductSuggestion() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const { data, error, isLoading } = useSWR('https://apis.dimuadi.vn/d2c-service/category', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const getCate: CategoryProps[] | undefined = data?.data

  if (!isLoading) {
    // console.log(data)
  }

  return (
    <div className="product_sug_ly">
      <div className="product_sug_title">
        <h2>Gợi ý sản phẩm</h2>
      </div>
      <div className="cate_product_sug">
        <div className="cate_product_sug_list">
          <ConfigProvider
            theme={{
              components: {
                Tabs: {
                  inkBarColor: '#03C78C',
                  itemSelectedColor: '#03C78C',
                  itemHoverColor: '#03c78cc4'
                }
              },
            }}
          >
            <Tabs
              defaultActiveKey="0"
              tabPosition='top'
              style={{ height: 220 }}
              items={getCate?.map((_, i) => {
                const id = String(i)
                return {
                  label: `${_.name}`,
                  key: id,
                  // disabled: i === 28,
                  children: <ProductSugItem id={_.id} />,
                }
              })}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  )
}

export default ProductSuggestion
