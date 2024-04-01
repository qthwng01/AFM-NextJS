'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/libs/firebase/FirebaseConfig'

interface IUserDataProps {
  displayName: string | null
  email: string | null
  phoneNumber: string | null
  photoURL: string | null
  uid: string
}

function useUser() {
  const [userData, setUserData] = useState<IUserDataProps | null>(null)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, phoneNumber, photoURL, uid } = user
        setUserData({ displayName, email, phoneNumber, photoURL, uid })
      } else {
        setUserData(null)
      }
    })
    return () => unsubscribe()
  }, [])
  return userData
}

export default useUser
