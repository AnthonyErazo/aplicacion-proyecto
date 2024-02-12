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
        getProductByRating: builder.query({
            query: () => `products.json?orderBy="rating"&limitToLast=5`,
        }),
        getProductByStock: builder.query({
            query: () => `products.json?orderBy="stock"&limitToFirst=5`,
        }),
        getProductByDescount: builder.query({
            query: () => `products.json?orderBy="discountPercentage"&limitToLast=5`,
        }),
        getSomeCategories: builder.query({
            query: () => `categories.json`,
            transformResponse: (response) => response.slice(0, 5),
        }),
    }),
})

export const { 
    useGetProductsQuery,
    useGetProductQuery,
    useGetProductsByCategoriesQuery,
    useGetCategoriesQuery,
    useGetProductByRatingQuery,
    useGetProductByStockQuery,
    useGetProductByDescountQuery,
    useGetSomeCategoriesQuery
} = shopApi