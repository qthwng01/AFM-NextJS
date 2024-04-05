'use client'

import { useState, useRef, useEffect } from 'react'
import { Popover } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { DataServices } from '@/constants/DataServices'
import Link from 'next/link'
import { signOut } from 'firebase/auth'
import { auth } from '@/libs/firebase/FirebaseConfig'
import { Badge } from 'antd'
import useUser from '@/auth/useUser'
import useSWR from 'swr'
import { useAppSelector } from '@/store/hook/hooks'
import { CartItems } from '@/store/slices/cartSlice'
import { BrandProps } from '@/app/types'
import SearchForm from './searchForm'
import useFetcher from '@/hooks/useFetcher'
import '@/components/Header/header.scss'
import logo from '@/app/assets/logo.png'
import user from '@/app/assets/user.png'
import exit from '@/app/assets/exit.png'

function Header() {
  const router = useRouter()
  const isUser = useUser()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false)
  const [countQuantity, setCountQuantity] = useState<string>('')
  const menuListRef = useRef<HTMLDivElement | null>() as React.MutableRefObject<HTMLInputElement>
  const buttonRef = useRef<HTMLDivElement | null>() as React.MutableRefObject<HTMLInputElement>
  const cartItems = useAppSelector(CartItems)

  const cartQuantity =
    typeof window !== 'undefined' && localStorage.getItem('cart-quanity') !== null
      ? JSON.parse(localStorage.getItem('cart-quanity') as string)
      : ''
  useEffect(() => {
    setCountQuantity(cartQuantity)
  }, [cartItems])

  //handle menu button
  const handleClickOutside = (e: MouseEvent) => {
    if (!menuListRef?.current?.contains(e.target as HTMLElement) && !buttonRef?.current?.contains(e.target as HTMLElement)) {
      setMenuOpen(false)
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  })
  //end handle menu button

  //handle logout
  const handleLogout = async () => {
    await signOut(auth)
    const response = await fetch(`/api/logout`, {
      method: 'POST',
    })
    if (response.status === 200) {
      window.location.reload()
    }
  }

  // fetching data
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_URL_CATEGORY}`, useFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const content = (
    <ul className="menu_ly">
      {data?.data.map((item: BrandProps) => (
        <li
          className="menu_ly_li"
          key={item.id}
          onClick={() => {
            setPopoverVisible(false)
            router.push(`/product?category_id=${item?.id}&page=1`)
          }}
        >
          <span className="top_header_span">{item?.name}</span>
        </li>
      ))}
    </ul>
  )

  return (
    <header>
      <div className="top_header">
        <ul className="top_header_ul">
          {DataServices?.map((item, key) => (
            <li key={key}>
              <span className="top_header_span">
                <i>
                  <Image src={item.img} alt="freeship 2km" />
                </i>
                {item.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="main_header">
        <div className="container main_header_inside">
          <div className="main_header_logo">
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>
          </div>
          <Popover
            content={content}
            placement="bottomLeft"
            open={popoverVisible}
            trigger="click"
            onOpenChange={(visible) => setPopoverVisible(visible)}
          >
            <div className="main_header_cate">
              <div className="cate_inside">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
                Danh mục
              </div>
            </div>
          </Popover>
          <SearchForm />
          {/* <div className="main_header_search">
            <form className="main_header_search_form">
              <div className="search_form_wrap">
                <input placeholder="Tìm kiếm..." type="search" id="input_search" />
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
              <div className="search_result" id='scrollbar_rs'>
                <ul className="search_result_list">
                  <li className="search_result_item">
                    <Link href={''} className="a_item">
                      <Image
                        src={
                          'https://static.dimuadi.vn/prod/product/image/uynf7kcgg1bpzxskqji0m_z5055956448203a4761650905923644aa170e53ab99a42.jpg'
                        }
                        width={55}
                        height={55}
                        alt=""
                        className="image"
                      />
                    </Link>
                    <div className="info_item">
                      <span className="name">Tảo xanh</span>
                      <span className="price">100.000</span>
                    </div>
                  </li>
                </ul>
              </div>
            </form>
          </div> */}
          <div className="main_header_login">
            {!isUser ? (
              <Link href={'/login'} className="button_login">
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
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                Đăng nhập
              </Link>
            ) : (
              <span ref={buttonRef} className="button_login" onClick={() => setMenuOpen((prev) => !prev)}>
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
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                {isUser?.email}
              </span>
            )}
            <div ref={menuListRef} className={`info_user${menuOpen ? ' show_menu' : ''}`}>
              <ul className="info_user_list">
                <li className="info_user_item">
                  <Link href={`/infomation/${isUser?.uid}`} onClick={() => setMenuOpen(false)}>
                    <Image src={user} width={24} height={24} alt="user"></Image>Tài khoản
                  </Link>
                </li>
                {/* <li className="info_user_item" onClick={() => setMenuOpen(false)}>
                  <Link href={''}>
                    <Image src={order} width={24} height={24} alt="order"></Image>Đơn hàng
                  </Link>
                </li> */}
                <li className="info_user_item" onClick={() => setMenuOpen(false)}>
                  <span onClick={handleLogout}>
                    <Image src={exit} width={24} height={24} alt="logout"></Image>Đăng xuất
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="main_header_cart">
            <Badge count={countQuantity}>
              <div className="main_header_cart_inside">
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
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                <Link href={'/cart'}>Giỏ hàng</Link>
              </div>
            </Badge>
          </div>
        </div>
        <div className="container main__header-mobile">
          <div>Menu</div>
          <div className="main_header_logo">
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>
          </div>
          {/* <div className="main_header_login">
            {!isUser ? (
              <Link href={'/login'} className="button_login">
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
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                Đăng nhập
              </Link>
            ) : (
              <span ref={buttonRef} className="button_login" onClick={() => setMenuOpen((prev) => !prev)}>
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
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                {isUser?.email}
              </span>
            )}
            <div ref={menuListRef} className={`info_user${menuOpen ? ' show_menu' : ''}`}>
              <ul className="info_user_list">
                <li className="info_user_item">
                  <Link href={`/infomation/${isUser?.uid}`} onClick={() => setMenuOpen(false)}>
                    <Image src={user} width={24} height={24} alt="user"></Image>Tài khoản
                  </Link>
                </li>
                <li className="info_user_item" onClick={() => setMenuOpen(false)}>
                  <span onClick={handleLogout}>
                    <Image src={exit} width={24} height={24} alt="logout"></Image>Đăng xuất
                  </span>
                </li>
              </ul>
            </div>
          </div> */}
          <div className="main_header_cart">
            <Badge count={countQuantity}>
              <div className="main_header_cart_inside" onClick={() => router.push('/cart')}>
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
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
            </Badge>
          </div>
        </div>
      </div>
      {/* <SearchForm /> */}
    </header>
  )
}

export default Header
