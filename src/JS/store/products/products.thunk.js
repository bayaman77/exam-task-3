/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getProducts } from '../../dataService'

const getProductsThunk = createAsyncThunk(
    'products/getProducts',
    async (_, { rejectWithValue }) => {
        try {
            const { products } = await getProducts()
            const productsWithQuantity = products.map((product) => ({
                ...product,
                quantity: 0,
                total: 0,
            }))
            return productsWithQuantity
        } catch (error) {
            return rejectWithValue('Something went wrong')
        }
    }
)
export default getProductsThunk
