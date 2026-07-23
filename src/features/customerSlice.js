import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    customerData:null
}

const customerSlice = createSlice({
    name:"customers",
    initialState,
    reducers:{
        setCustomerDatas:(state,action) => {
            // console.log("*************order",action.payload.customerData);
            state.customerData = action.payload.customerData
        }
    }
})

export const { setCustomerDatas } = customerSlice.actions;
export default customerSlice.reducer;