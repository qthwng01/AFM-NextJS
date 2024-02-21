'use client'

import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Divider, ConfigProvider } from 'antd'
import { getRedirectResult, signInWithRedirect, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, provider } from '@/libs/firebase/FirebaseConfig'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import iconGoogle from '@/app/assets/google.svg'
import './login.scss'

// type FieldType = {
//   username?: string
//   password?: string
//   remember?: string
// }

const Login: React.FC = () => {
  const searchParams = useSearchParams()
  const continueTo = searchParams.get('callbackUrl')!
  const continueToString = continueTo?.replace(/%2F/g, '/')
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getRedirectResult(auth).then(async (userCred) => {
      if (!userCred) {
        return
      }
      fetch('/api/login', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${await userCred.user.getIdToken()}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          router.replace(continueToString ? continueToString : '/')
        }
      })
    })
  }, [])

  const signInWGoogle = () => {
    signInWithRedirect(auth, provider)
  }

  const signIn = async () => {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
        if (!userCredential) return
        setLoading(false)
        fetch('/api/login', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${await userCredential.user.getIdToken()}`,
          },
        }).then((response) => {
          if (response.status === 200) {
            setLoading(false)
            router.replace(continueTo ? continueTo : '/')
          }
        })
      })
    } catch (err: any) {
      const errorMessage = err.message
      setError(errorMessage)
      setLoading(false)
      console.log(err)
    }
  }

  return (
    <div className="user_login_ly">
      <div className="user_login_inside">
        <h2 className="title_login">Đăng nhập</h2>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#03c78c',
            },
            components: {
              Form: {
                itemMarginBottom: 20,
              },
            },
          }}
        >
          <Form name="complex-form" onFinish={signIn} initialValues={{ remember: true }} autoComplete="off">
            <Form.Item>
              <Form.Item name="email" rules={[{ required: true, message: 'Nhập email' }]} wrapperCol={{ offset: 2, span: 20 }}>
                <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true, message: 'Nhập password' }]} wrapperCol={{ offset: 2, span: 20 }}>
                <Input.Password type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 2, span: 20 }}>
                <Form.Item>
                  {/* <Checkbox>Ghi nhớ</Checkbox> */}
                  <a className="login-form-forgot" href="#">
                    Quên mật khẩu?
                  </a>
                </Form.Item>
                {error ? <p style={{ color: 'red', marginTop: '10px' }}>{error}</p> : ''}
              </Form.Item>
              <Form.Item name="submit" wrapperCol={{ offset: 2, span: 20 }}>
                {!loading ? (
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Đăng nhập
                  </Button>
                ) : (
                  <Button loading type="primary" htmlType="submit" className="login-form-button">
                    Đăng nhập
                  </Button>
                )}
              </Form.Item>

              <Form.Item name="submit-google" wrapperCol={{ offset: 2, span: 20 }}>
                <Button onClick={signInWGoogle} htmlType="button" className="google_login">
                  <Image src={iconGoogle} width={24} height={24} alt="icon"></Image>
                  Đăng nhập bằng Google
                </Button>
              </Form.Item>
            </Form.Item>

            <Divider />
            <p className="not_account">
              Chưa có tài khoản?{' '}
              <Link href={'/signup'} className="signup">
                Đăng ký
              </Link>
            </p>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  )
}

export default Login
