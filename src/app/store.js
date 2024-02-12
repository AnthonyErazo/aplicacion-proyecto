import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import shopReducer from "../features/shop/shopSlice"
import authReducer from "../features/auth/authSlice"
import cartReducer from "../features/cart/cartSlice"
import { shopApi } from './services/shopServices'
import { authApi } from './services/authService'
import { userApi } from './services/userService'

export const store = configureStore({
  reducer: {
    shop:shopReducer,
    cart:cartReducer ,
    auth:authReducer,
    [shopApi.reducerPath]:shopApi.reducer,
    [authApi.reducerPath]:authApi.reducer,
    [userApi.reducerPath]:userApi.reducer,
  },
  middleware:(getDefaultMiddleware)=>
  getDefaultMiddleware().concat(shopApi.middleware,authApi.middleware,userApi.middleware),
})

setupListeners(store.dispatch)