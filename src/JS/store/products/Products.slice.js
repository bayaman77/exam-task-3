/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'
import getProductsThunk from './products.thunk'

export const productsActionTypes = {
    GET_PRODUCTS_SUCCESS: 'GET_PRODUCTS_SUCCESS',
    GET_PRODUCTS_STARTED: 'GET_PRODUCTS_STARTED',
    GET_PRODUCTS_FAILED: 'GET_PRODUCTS_FAILED',
}

const initialState = {
    products: [],
    discount: 0,
    total: 0,
    isLoading: false,
    error: '',
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        increment(state, action) {
            state.products.find((product) => {
                if (product.id === action.payload) {
                    return product.quantity++
                }
                state.products.map((product) => {
                    product.total = product.price * product.quantity
                })
            })
        },
        decrement(state, action) {
            state.products.find((product) => {
                if (product.id === action.payload) {
                    return product.quantity--
                }
            })
        },
        getProductTotal(state, action) {
            state.products.map((product) => {
                if (product.id === action.payload) {
                    const productTotal = product.price * product.quantity
                    return (product.total = productTotal.toFixed(2))
                }
            })
        },
        getAllTotal(state) {
            const sum = state.products.reduce(
                (sum, product) => sum + Number(product.total),
                0
            )

            if (sum > 1000) {
                state.discount = (sum * 0.1).toFixed(2)
                state.total = sum - state.discount
            } else {
                state.total = sum
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProductsThunk.fulfilled, (state, action) => {
            state.products = action.payload
            state.isLoading = false
            state.error = ''
        })
        builder.addCase(getProductsThunk.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getProductsThunk.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    },
})

export const productsActions = productsSlice.actions
