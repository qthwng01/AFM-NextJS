import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

interface FilterState {
  categoryId: number,
  brandId: number,
}

const initialState: FilterState = {
  categoryId: 0,
  brandId: 0,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload
    },
    setBrandId: (state, action: PayloadAction<number>) => {
      state.brandId = action.payload
    }
  },
})
export const { setCategoryId, setBrandId } = filterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const CategoryValue = (state: RootState) => state.filter?.categoryId
export const BrandValue = (state: RootState) => state.filter?.brandId

export default filterSlice.reducer