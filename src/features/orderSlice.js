import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderData:null
}

const orderSlice = createSlice({
    name:"orders",
    initialState,
    reducers:{
        setOrderDatas:(state,action) => {
            console.log("*************order",action.payload.orderData);
            state.orderData = action.payload.orderData
        }
    }
})

export const { setOrderDatas } = orderSlice.actions;
export default orderSlice.reducer;