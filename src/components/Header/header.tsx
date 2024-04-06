'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Popover, Badge } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { DataServices } from '@/constants/DataServices'
import Link from 'next/link'
import { signOut } from 'firebase/auth'
import { auth } from '@/libs/firebase/FirebaseConfig'
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

const Header: React.FC = () => {
  const router = useRouter()
  const isUser = useUser()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false)
  const [countQuantity, setCountQuantity] = useState<string>('')
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [isMenuMobile, setIsMenuMobile] = useState<boolean>(false)
  const menuListRef = useRef<HTMLDivElement | null>() as React.MutableRefObject<HTMLInputElement>
  const buttonRef = useRef<HTMLDivElement | null>() as React.MutableRefObject<HTMLInputElement>
  const cartItems = useAppSelector(CartItems)

  // Check cart-quantity exists
  const cartQuantity =
    typeof window !== 'undefined' && localStorage.getItem('cart-quanity') !== null
      ? JSON.parse(localStorage.getItem('cart-quanity') as string)
      : ''

  useEffect(() => {
    setCountQuantity(cartQuantity)
  }, [cartItems])
  // End check cart-quantity

  // handle menu button
  const handleClickOutside = (e: MouseEvent) => {
    if (!menuListRef?.current?.contains(e.target as HTMLElement) && !buttonRef?.current?.contains(e.target as HTMLElement)) {
      setMenuOpen(false)
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  })
  // end handle menu button

  // handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth)
      const response = await fetch(`/api/logout`, {
        method: 'POST',
      })
      if (response.ok) {
        window.location.reload()
      } else {
        throw new Error(`Logout failed with status ${response.status}`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // handle toggle search
  const toggleSearch = () => {
    setIsSearch(!isSearch)
  }

  // handle toggle menu mobile
  const toggleMenuMobile = () => {
    setIsMenuMobile(!isMenuMobile)
  }

  // fetching data
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_URL_CATEGORY}`, useFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  // Menu popover
  const content = (
    <ul className="menu_ly">
      {data?.data?.map((item: BrandProps) => (
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
                    <Image src={user} width={24} height={24} alt="user"></Image>
                    Tài khoản
                  </Link>
                </li>
                <li className="info_user_item" onClick={() => setMenuOpen(false)}>
                  <span onClick={handleLogout}>
                    <Image src={exit} width={24} height={24} alt="logout"></Image>
                    Đăng xuất
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
          {isSearch ? (
            <React.Fragment>
              <SearchForm />
              <span className="i__menu-toggle" onClick={toggleSearch}>
                Close
              </span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span className="i__menu" onClick={toggleMenuMobile}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6H20M4 12H20M4 18H20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="main_header_logo">
                <Link href="/">
                  <Image src={logo} alt="logo" />
                </Link>
              </div>
              <div className="main_header_cart">
                <span className="i__search" onClick={toggleSearch}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32">
                    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                      <g fill="#000" transform="translate(-256 -1139)">
                        <path d="M269.46 1163.45c-6.29 0-11.389-5.01-11.389-11.2 0-6.19 5.099-11.21 11.389-11.21 6.29 0 11.39 5.02 11.39 11.21 0 6.19-5.1 11.2-11.39 11.2zm18.228 5.8l-8.259-8.13c2.162-2.35 3.491-5.45 3.491-8.87 0-7.32-6.026-13.25-13.46-13.25-7.434 0-13.46 5.93-13.46 13.25 0 7.31 6.026 13.24 13.46 13.24a13.52 13.52 0 008.472-2.96l8.292 8.16c.405.4 1.06.4 1.464 0 .405-.39.405-1.04 0-1.44z"></path>
                      </g>
                    </g>
                  </svg>
                </span>
                <Badge count={countQuantity}>
                  <span className="main_header_cart_inside" onClick={() => router.push('/cart')}>
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
                  </span>
                </Badge>
              </div>
            </React.Fragment>
          )}
        </div>
        <React.Fragment>
          <div className={isMenuMobile ? `list__menu-mobile-active` : `list__menu-mobile-unactive`}>
            <div className="close__menu-mobile">
              <span id="close" onClick={toggleMenuMobile}>
                <svg width="30" height="30" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 21.32L21 3.32001" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 3.32001L21 21.32" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <ul className="list__menu">
              {data?.data?.map((item: BrandProps) => (
                <li
                  className="item__menu-mobile"
                  key={item.id}
                  onClick={() => {
                    setIsMenuMobile(!isMenuMobile)
                    router.push(`/product?category_id=${item?.id}&page=1`)
                  }}
                >
                  <span>{item?.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </React.Fragment>
      </div>
    </header>
  )
}

export default Header
