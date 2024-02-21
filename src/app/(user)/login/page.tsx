import type { Metadata } from 'next'
import Login from '@/components/User/login/login'

export const metadata: Metadata = {
  title: 'Đăng nhập | PickBazar',
  description: 'Trang đang nhập vào PickBazar',
}

function LoginPage() {
  return <Login />
}

export default LoginPage
