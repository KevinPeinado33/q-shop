import { configureStore } from '@reduxjs/toolkit'

import { 
  authReducer, 
  cartReducer, 
  uiReducer 
} from './slices'

export const store = configureStore({
  reducer: {
    ui  : uiReducer,
    cart: cartReducer,
    auth: authReducer
  },
})

export type RootState   = ReturnType< typeof store.getState >
export type AppDispatch = typeof store.dispatch
