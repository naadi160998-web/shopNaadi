import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productImgPaths:[],
}

const productImageSlice = createSlice({
    name:"productImages",
    initialState,
    reducers:{
        setProductsImages:(state,action)=>{
            console.log("actions:",action.payload);
            state.productImgPaths = action.payload.productImgPaths
        },
        removeProductImages:(state)=>{
            state.productImgPaths = []
        }
    }
})

export const {setProductsImages,removeProductImages} = productImageSlice.actions;
export default productImageSlice.reducer;