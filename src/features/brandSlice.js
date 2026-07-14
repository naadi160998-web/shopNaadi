import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brandsData:null,
    brandId:0
}

const brandSlice = createSlice({
    name:"brands",
    initialState,
    reducers:{
        setBrandDatas:(state,action) => {
            // console.log("*************brands",action.payload.brandsData);
            state.brandsData = action.payload.brandsData
        },
        setBrandsId:(state,action)=>{
            // console.log("actions:",action.payload.productId.data);
            state.brandId = action.payload.brandId.data
        },
        removeBrandsId:(state)=>{
            state.brandId = 0
        }
    }
})

export const { setBrandDatas,setBrandsId,removeBrandsId } = brandSlice.actions;
export default brandSlice.reducer;