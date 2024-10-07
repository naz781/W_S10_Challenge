import { createSlice } from '@reduxjs/toolkit'


export const pizzaFormSlice = createSlice({
    name: 'pizzaForm',
    initialState: {
        fullName: '',
        size: '',
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
    },
})

export default pizzaFormSlice.reducer