import { createSlice } from '@reduxjs/toolkit'


export const OrderListSlice = createSlice ({
    name: 'orderList',
    initialState: {
        orderFilterSelector: 'All',
    },
    reducers: {
        switchSize(state, action){
            state.orderFilterSelector = action.payload
            console.log(action.payload)
        }
    }
})

export const {
    switchSize
}  = OrderListSlice.actions


export default OrderListSlice.reducer