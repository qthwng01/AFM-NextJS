import { configureStore } from '@reduxjs/toolkit'
import FilterReducer from '@/store/slices/filterSlice'
import AuthReducer from '@/store/slices/authSlice'
import CartReducer from '@/store/slices/cartSlice'

export const store = configureStore({
  reducer: {
    filter: FilterReducer,
    auth: AuthReducer,
    cart: CartReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
