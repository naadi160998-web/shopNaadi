import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productsData:[],
    productId:0
}

const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        setProducts:(state,action)=>{
            console.log("actions:",action.payload);
            state.productsData = action.payload.productsData
        },
        setProductId:(state,action)=>{
            console.log("actions:",action.payload.productId.data);
            state.productId = action.payload.productId.data
        },
        removeProductId:(state)=>{
            state.productId = 0
        }
    }
})

export const {setProducts,setProductId,removeProductId} = productSlice.actions;
export default productSlice.reducer;