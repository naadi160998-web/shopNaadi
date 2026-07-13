import axiosInstance from "../API/axiosInstance";
import { setOrderDatas } from "../features/orderSlice";

export const getOrders = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`/orders`);
        const datas = response.data;
        
        console.log("datas:",datas);
        

        dispatch(setOrderDatas({
            orderData: datas
        }))
        return response.data;
    } catch (error) {
        console.error("Error fetching order:", error);
        throw error;
    }
};