'use client'

import { useState, useRef, useEffect } from 'react'
import { Popover } from 'antd'
import Image from 'next/image'
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
import '@/components/Header/header.scss'
import logo from '@/app/assets/logo.png'
import user from '@/app/assets/user.png'
import exit from '@/app/assets/exit.png'
import ConfirmPassword from '../User/info/profile/manage/confirmPassword'

function Header() {
  const isUser = useUser()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [countQuantity, setCountQuantity] = useState<string>('')
  const menuListRef = useRef<HTMLDivElement | null>() as React.MutableRefObject<HTMLInputElement>
  const buttonRef = useRef<HTMLDivElement | null>() as React.MutableRefObject<HTMLInputElement>
  const cartItems = useAppSelector(CartItems)

  const cartQuantity =
    typeof window !== 'undefined' && localStorage.getItem('cart-quanity') !== null ? JSON.parse(localStorage.getItem('cart-quanity') as string) : ''
  useEffect(() => {
    setCountQuantity(cartQuantity)
  }, [cartItems])

  const handleClickOutside = (e: MouseEvent) => {
    if (!menuListRef?.current?.contains(e.target as HTMLElement) && !buttonRef?.current?.contains(e.target as HTMLElement)) {
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  })

  const handleLogout = async () => {
    await signOut(auth)
    const response = await fetch(`/api/logout`, {
      method: 'POST',
    })
    if (response.status === 200) {
      window.location.reload()
    }
  }

  const fetcher = (url: string) => {
    return fetch(url).then((res) => res.json())
  }
  const { data, error, isLoading } = useSWR(
    `https://apis.dimuadi.vn/d2c-service/category`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  const content = (
    <div className="menu_ly">
      {data?.data.map((item: BrandProps) => (
        <li key={item?.id}>
          <span className="top_header_span">
            {item.name}
          </span>
        </li>
      ))}
    </div>
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
          <Popover content={content} placement="bottomLeft" trigger="click">
            <div className="main_header_cate">
              <div className="cate_inside">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
                Danh mục
              </div>
            </div>
          </Popover>
          <div className="main_header_search">
            <form className="main_header_search_form">
              <div>
                <input placeholder="Tìm kiếm..." type="text" id="input_search" autoComplete="off"></input>
                <button type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
          <div className="main_header_login">
            {!isUser ? (
              <Link href={'/login'} className="button_login">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
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
      </div>
    </header>
  )
}

export default Header
