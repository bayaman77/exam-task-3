/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit'
import { productsSlice } from './products/Products.slice'


export const store = configureStore({
    reducer: {
        [productsSlice.name]: productsSlice.reducer,
    },
})
