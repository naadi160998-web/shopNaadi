import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    warehouseData:[],
    warehouseId:0
}

const warehousesSlice = createSlice({
    name:"warehouses",
    initialState,
    reducers:{
        setWarehouses:(state,action)=>{
            // console.log("actions:",action.payload);
            state.warehouseData = action.payload.warehouseData
        },
        setWarehousesId:(state,action)=>{
            // console.log("actions:",action.payload.productId.data);
            state.warehouseId = action.payload.warehouseId.data
        },
        removeWarehousesId:(state)=>{
            state.warehouseId = 0
        }
    }
})

export const {setWarehouses,setWarehousesId,removeWarehousesId} = warehousesSlice.actions;
export default warehousesSlice.reducer;