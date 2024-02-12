import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        cart: [],
    }
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setProductCart: (state, actions) => {
            const { product, quantity } = actions.payload;
            const existingProductIndex = state.value.cart.findIndex(p => p.product.id === product.id);

            if(existingProductIndex !== -1){
                state.value.cart[existingProductIndex].quantity += quantity;
            }else{
                state.value.cart.push({
                    product: product,
                    quantity: quantity,
                })
            }
        },
        deleteProbuctsCart: (state, actions) => {
            state.value.cart=[]
        },
        detletProbuctCartById: (state, actions) => {
            const { id } = actions.payload;
            state.value.cart=state.value.cart.filter(p=>p.product.id!=id)
        },
    }
})

export const { setProductCart,deleteProbuctsCart,detletProbuctCartById } = cartSlice.actions

export default cartSlice.reducer