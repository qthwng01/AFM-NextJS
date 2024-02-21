import type { Metadata } from 'next'
import Signup from '@/components/User/signup/signup'

export const metadata: Metadata = {
  title: 'Đăng ký | PickBazar',
  description: 'Trang đang ký vào PickBazar',
}

function SignupPage() {
  return <Signup />
}

export default SignupPage
