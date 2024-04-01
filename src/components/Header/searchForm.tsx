import { useState } from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import { ProductProps } from '@/app/types'
import { formatPrice } from '@/utils/formatCurrency'
import { convertSlug } from '@/utils/convertSlugUrl'
import { useRouter } from 'next/navigation'
import useFetcher from '@/hooks/useFetcher'

const searchForm = () => {
  const [searchValue, setSearchValue] = useState('')
  const [isSegmentVisible, setIsSegmentVisible] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setSearchValue(value)
    toggleSegmentVisibility(value)
  }

  const toggleSegmentVisibility = (value: string) => {
    setIsSegmentVisible(value.trim() !== '')
  }

  const { data } = useSWR(searchValue ? `${process.env.NEXT_PUBLIC_URL_PRODUCT}?name=${searchValue}` : null, useFetcher)

  return (
    <div className="main_header_search">
      <form className="main_header_search_form">
        <div className="search_form_wrap">
          <input placeholder="Tìm kiếm..." type="search" id="input_search" value={searchValue} onInput={handleInputChange} />
          <button type="button" className="search_form_btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        {isSegmentVisible && (
          <div className="search_result" id="scrollbar_rs">
            <ul className="search_result_list">
              {data?.data && data?.data.length > 0
                ? data?.data.map((item: ProductProps, index: number) => (
                    <li className="search_result_item" key={index}>
                      <Image src={item?.thumbImage} width={60} height={60} alt="" className="image" />
                      <div className="info_item" onClick={() => router.push(`/product/${convertSlug(item?.name)}-${item?.id}.html`)}>
                        <span className="name">{item?.name}</span>
                        <span className="price">{formatPrice(item?.price)}</span>
                      </div>
                    </li>
                  ))
                : 'Không có kết quả...'}
            </ul>
          </div>
        )}
      </form>
    </div>
  )
}

export default searchForm
