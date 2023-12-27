import { createSlice } from '@reduxjs/toolkit'
import allProducts from "../../Data/products.json"
import allCategories from "../../Data/categories.json"

const initialState = {
    value:{
        products: allProducts,
        categories:allCategories,
        productSelected:{},
        productsFilteredByCategory:[]
    }
  }

  export const shopSlice = createSlice({
    name:"shop",
    initialState,
    reducers:{
        setProductsFilteredByCategory: (state,actions) => {
            state.value.productsFilteredByCategory = state.value.products.filter(product => product.category == actions.payload)
        },
        setProductSelected: (state,actions) =>{
            state.value.productSelected = state.value.products.find(product => product.id ===actions.payload)
        }
    }
  })

  export const { setProductsFilteredByCategory,setProductSelected} = shopSlice.actions

  export default shopSlice.reducer