import axiosInstance from "../API/axiosInstance";
import { setWarehouses,removeWarehousesId } from "../features/warehousesSlice";

export const createWarehouse = async (warehouseData) => {
    try {
        // console.log("warehouseData:",warehouseData);
        const response = await axiosInstance.post("/warehouses/", warehouseData);
        console.log("res:",response.data);
        
        return response.data;
    } catch (error) {
        console.error("Error creating warehouse:", error);
        throw error;
    }
};

export const getWarehouse = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`/warehouses/`);
        const datas = response.data;
        // console.log("datas:",response);
        
        const updateData = []
        
        dispatch(setWarehouses({
            warehouseData: datas
        }))
        return response.data;
    } catch (error) {
        console.error("Error fetching warehouse:", error);
        throw error;
    }
};

export const updateWarehouse = async (warehouse_id, warehouseData) => {
    try {
        // console.log("Updating warehouse with ID:", warehouse_id, "and data:", warehouseData);
        const response = await axiosInstance.put(`/warehouses/update/${warehouse_id}`, warehouseData);
        return response.data;
    } catch (error) {
        console.error("Error updating warehouse:", error);
        throw error;
    }
};
// export const deletewarehouse = (warehouse_id,vendor_id) => async (dispatch) => {
export const deleteWarehouse = async (warehouse_id) => {
    
    try {
        const response = await axiosInstance.post(`/warehouses/delete/${warehouse_id}`);
        return response.data;
    } catch (error) {
        console.error("Error creating warehouse:", error);
        throw error;
    }
};