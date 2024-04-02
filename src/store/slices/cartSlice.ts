import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'
import { CartProps } from '@/app/types'

interface CartState {
  items: CartProps[]
}

const cartItems =
  typeof window !== 'undefined' && localStorage.getItem('cart-store') !== null
    ? JSON.parse(localStorage.getItem('cart-store') as string)
    : []

const initialState: CartState = {
  items: cartItems,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProps>) => {
      const existingItem = state.items.find((item) => item.productId === action.payload.productId)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push(action.payload)
      }
      localStorage.setItem('cart-store', JSON.stringify(state.items.map((item) => item)))
      localStorage.setItem('cart-quanity', JSON.stringify(state.items.reduce((acc, cur) => acc + cur.quantity, 0)))
    },
    increaseAmount: (state, action: { payload: { productId: string } }) => {
      const existingItem = state.items.find((item) => item.productId === action.payload.productId)
      if (existingItem) {
        existingItem.quantity += 1
      }
      localStorage.setItem('cart-store', JSON.stringify(state.items.map((item) => item)))
      localStorage.setItem('cart-quanity', JSON.stringify(state.items.reduce((acc, cur) => acc + cur.quantity, 0)))
    },
    decreaseAmount: (state, action: { payload: { productId: string } }) => {
      const existingItem = state.items?.find((item) => item.productId === action.payload.productId)
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1
      } else if (existingItem && existingItem.quantity === 1) {
        existingItem.quantity = 1
      }
      localStorage.setItem('cart-store', JSON.stringify(state.items.map((item) => item)))
      localStorage.setItem('cart-quanity', JSON.stringify(state.items.reduce((acc, cur) => acc + cur.quantity, 0)))
    },
    removeItem: (state, action: { payload: { productId: string } }) => {
      const existingItem = state.items?.find((item) => item.productId === action.payload.productId)
      const index = state.items.map((e) => e.productId).indexOf(`${action.payload.productId}`)
      if (existingItem) {
        state.items.splice(index, 1)
      }
      localStorage.setItem('cart-store', JSON.stringify(state.items.map((item) => item)))
      localStorage.setItem('cart-quanity', JSON.stringify(state.items.reduce((acc, cur) => acc + cur.quantity, 0)))
    },
    deleteAll: (state) => {
      state.items = []
      localStorage.removeItem('cart-store')
      localStorage.removeItem('cart-quanity')
    },
  },
})
export const { addToCart, increaseAmount, decreaseAmount, removeItem, deleteAll } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const CartItems = (state: RootState) => state.cart?.items || []

export default cartSlice.reducer
