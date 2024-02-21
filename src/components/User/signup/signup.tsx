'use client'

import React, { useState } from 'react'
import { message, Button, Form, Input, Divider, ConfigProvider } from 'antd'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/libs/firebase/FirebaseConfig'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import './signup.scss'

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

const Signup: React.FC = () => {
  const router = useRouter()
  const [messageApi, contextHolder] = message.useMessage()
  const [newEmail, setEmail] = useState<string>('')
  const [newPassword, setPassword] = useState<string>('')
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, newEmail, newPassword).then(() => {
        router.push('/login')
      })
    } catch (e) {
      errorMessage()
    }
  }
  const errorMessage = () => {
    messageApi.open({
      type: 'error',
      content: 'Email đăng ký đã tồn tại,',
    })
  }
    
  return (
    <div className="user_login_ly">
      <div className="user_login_inside">
        {contextHolder}
        <h2 className="title_login">Đăng ký</h2>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#03c78c',
            },
          }}
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={handleSignup}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType> name="username" rules={[{ required: true, message: 'Nhập email' }]} wrapperCol={{ offset: 2, span: 20 }}>
              <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
            </Form.Item>

            <Form.Item<FieldType> name="password" rules={[{ required: true, message: 'Nhập password' }]} wrapperCol={{ offset: 2, span: 20 }}>
              <Input.Password onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </Form.Item>

            {/* <Form.Item<FieldType> name="password" rules={[{ required: true, message: 'Nhập lại password' }]} wrapperCol={{ offset: 2, span: 20 }}>
              <Input.Password placeholder="Password again" />
            </Form.Item> */}

            <Form.Item wrapperCol={{ offset: 2, span: 20 }}>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Đăng ký
              </Button>
            </Form.Item>
            <Divider />
            <div className="signup_suggestion">
              <p>
                Đã có tài khoản?{' '}
                <Link href={'/login'} className="signin">
                  Đăng nhập
                </Link>
              </p>
            </div>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  )
}

export default Signup
