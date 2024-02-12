import { createSlice } from '@reduxjs/toolkit'
import allProducts from "../../data/products.json"
import allCategories from "../../data/categories.json"
// import { useGetCategoriesQuery } from '../app/services/shopServices'
// const {data:allCategories,isLoading,error} =useGetCategoriesQuery()

const initialState = {
    value: {
        products: [],
        categories: allCategories,
        productSelected: {},
        productsFilteredByCategory: [],
        productSearch: []
    }
}

export const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        setProductsFilteredByCategory: (state, actions) => {
            state.value.productsFilteredByCategory = state.value.products.filter((product) => product.category == actions.payload)
        },
        setAllProducts: (state, actions) => {
            state.value.products = actions.payload
        },
        setProductSelected: (state, actions) => {
            state.value.productSelected = state.value.products.find((product) => product.id === actions.payload.id)
        },
        setProductSearch: (state, actions) => {
            if (actions.payload === '') {
                state.value.productSearch = []
            } else {
                state.value.productSearch = state.value.products
                    .filter((product) =>
                        product.title.toLowerCase().includes(actions.payload.toLowerCase())
                    )
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 15);
            }
        }
    }
})

export const { setAllProducts,setProductsFilteredByCategory, setProductSelected, setProductSearch } = shopSlice.actions

export default shopSlice.reducer