import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stockData:[]
}

const stockSlice = createSlice({
    name:"stocks",
    initialState,
    reducers:{
        setStockDatas:(state,action) => {
            console.log("*************stock",action.payload);
            state.stockData.push(action.payload.stockData)
        }
    }
})

export const { setStockDatas } = stockSlice.actions;
export default stockSlice.reducer;