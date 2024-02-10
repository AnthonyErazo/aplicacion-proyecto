import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_url } from '../../firebase/db'

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => `products.json`,
        }),
        getProductsByCategories: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
        }),
        getCategories: builder.query({
            query: () => `categories.json`,
        }),
        getProduct: builder.query({
            query: (id) => `products/${id}.json`,
        }),
    }),
})

export const { 
    useGetProductsQuery,
    useGetProductQuery,
    useGetProductsByCategoriesQuery,
    useGetCategoriesQuery
} = shopApi