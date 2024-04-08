'use client'

import React, { useEffect, useState } from 'react'
import useUser from '@/auth/useUser'
import { Button, Form, Input, Space } from 'antd'
import { updateProfile, signInWithEmailAndPassword, updatePassword } from 'firebase/auth'
import { auth } from '@/libs/firebase/FirebaseConfig'
import ConfirmPassword from './manage/confirmPassword'
import './profile.scss'

function Profile() {
  const isUser = useUser()
  const [form] = Form.useForm()
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('********')
  const [submittable, setSubmittable] = React.useState(false)
  const [isModalConfirmPasswordOpen, setIsModalConfirmPasswordOpen] = useState(false)
  const [isReauthenticate, setIsReauthenticate] = useState(true)

  useEffect(() => {
    form.setFieldsValue({
      name: isUser?.displayName,
    })

    form.setFieldsValue({
      email: isUser?.email,
    })
  }, [isUser])

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmittable(true)
    setName(e.target.value)
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmittable(true)
    setPassword(e.target.value)
  }

  const handleConfirmPassword = () => {
    setIsModalConfirmPasswordOpen(true)
  }

  const updateProfileHandler = async () => {
    if (auth?.currentUser) {
      await updateProfile(auth?.currentUser, {
        displayName: name ? name : isUser?.displayName,
      })
        .then(() => {
          setSubmittable(false)
          console.log('Profile updated!')
        })
        .catch((error) => {
          console.error('Error updating profile:', error.message)
        })
    }
    if (!isReauthenticate) {
      const user: any = auth?.currentUser
      await updatePassword(user, password)
        .then(() => {
          setSubmittable(true)
          console.log(' Update password successful.')
          const email: any = isUser?.email
          signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
            if (!userCredential) return
            fetch('/api/login', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${await userCredential.user.getIdToken()}`,
              },
            }).then((response) => {
              if (response.status === 200) {
                window.location.reload()
              }
            })
          })
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      console.warn('No user is currently signed in.')
    }
  }

  return (
    <div className="profile_ly">
      <div className="profile_inside">
        {isModalConfirmPasswordOpen && (
          <ConfirmPassword
            open={isModalConfirmPasswordOpen}
            setOpen={setIsModalConfirmPasswordOpen}
            setIsReauthenticate={setIsReauthenticate}
          />
        )}
        <Form onFinish={updateProfileHandler} form={form} name="validateOnly" layout="vertical" autoComplete="off">
          <Form.Item name="name" label="Tên">
            <Input className="input__profile" style={{ width: 500 }} value={name} size="large" type="text" onChange={handleChangeName} />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input className="input__profile" style={{ width: 500 }} name="input-email" disabled size="large" type="text" />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu">
            <Input
              className="input__profile"
              style={{ width: 500 }}
              name="input-password"
              value={password}
              disabled={isReauthenticate}
              size="large"
              type="text"
              onChange={handleChangePassword}
            />
          </Form.Item>
          <span className="change_password" onClick={handleConfirmPassword}>
            Thay đổi mật khẩu
          </span>
          <Form.Item name="button">
            <Space>
              <Button className="btn_change_password" style={{ width: 150 }} type="primary" htmlType="submit" disabled={!submittable}>
                Lưu
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Profile
