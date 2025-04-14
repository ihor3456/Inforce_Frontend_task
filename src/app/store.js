import { configureStore } from '@reduxjs/toolkit'
import listSlice from '../features/list/listSlice'

// create store from different splices
export const store = configureStore({
  reducer: {
    list: listSlice
  }
})
