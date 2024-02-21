import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

interface User {
  providerData: any[]
  uid: string
}

interface AuthState {
  user: User
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: {
    providerData: [],
    uid: ''
  },
  isAuthenticated: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
  },
})
export const { setUser, setIsAuthenticated } = authSlice.actions

// Other code such as selectors can use the imported `RootState?
export const getUser = (state: RootState) => state.auth?.user
export const getAuth = (state: RootState) => state.auth?.isAuthenticated

export default authSlice.reducer
