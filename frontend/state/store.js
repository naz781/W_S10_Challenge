import { configureStore } from '@reduxjs/toolkit'
//import pizzaFormSlice from './PizzaFormSlice'
import orderListSlice from './OrderListSlice'
import {ordersApi} from './OrdersApi'

export const resetStore = () => configureStore({
  reducer: {
    //pizzaForm: pizzaFormSlice,
    orderList: orderListSlice,
    [ordersApi.reducerPath]: ordersApi.reducer
    // add your reducer(s) here
  },
  middleware: getDefault => getDefault().concat(
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
    ordersApi.middleware
  ),
})

export const store = resetStore()