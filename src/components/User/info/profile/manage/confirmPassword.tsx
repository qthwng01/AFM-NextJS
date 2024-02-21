'use client'

import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Space, Modal, Divider } from 'antd'
import { updateProfile, sendPasswordResetEmail, reauthenticateWithCredential, EmailAuthProvider, AuthCredential } from 'firebase/auth'
import { auth } from '@/libs/firebase/FirebaseConfig'
import '@/components/User/info/profile/manage/style.scss'

interface ConfirmPasswordProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsReauthenticate: React.Dispatch<React.SetStateAction<boolean>>
}

type FieldType = {
  username?: string
  password?: string
}

const ConfirmPassword: React.FC<ConfirmPasswordProps> = ({ open, setOpen, setIsReauthenticate }) => {
  const [passowrd, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  //   const clearError = () => {
  //     setError('');
  //   };

  //   useEffect(() => {
  //     if (error) {
  //       const timeoutId = setTimeout(clearError, 3000)
  //       return () => clearTimeout(timeoutId)
  //     }
  //   }, [error])

  const handleOk = async () => {
    if (auth?.currentUser?.email && passowrd !== '') {
      setLoading(true)
      const credential = EmailAuthProvider.credential(auth?.currentUser?.email, passowrd)
      await reauthenticateWithCredential(auth?.currentUser, credential)
        .then(() => {
          console.log('Reauthenticated successfully')
          setIsReauthenticate(false)
          setOpen(false)
          setLoading(false)
        })
        .catch((e) => {
          setLoading(false)
          //console.log(e)
          setError('Mật khẩu không đúng. Thử lại.')
        })
    } else {
      console.warn('No password.')
      setError('Vui lòng nhập mật khẩu.')
    }
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <div className="confirm_password_ly">
      <Modal
        title="Xác nhận mật khẩu cũ"
        centered
        width={400}
        open={open}
        onCancel={handleCancel}
        footer={[
          <Button loading={loading} key="submit" type="primary" onClick={handleOk}>
            Xác nhận
          </Button>,
        ]}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="form_confirm_password"
        >
          <Form.Item<FieldType> name="password" rules={[{ required: true, message: 'Nhập password' }]}>
            <Input.Password value={passowrd} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            {error ? <p style={{ color: 'red', marginTop: '10px' }}>{error}</p> : ''}
          </Form.Item>
          <Divider />
        </Form>
      </Modal>
    </div>
  )
}

export default ConfirmPassword
