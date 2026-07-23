import axiosInstance from "../API/axiosInstance";
import { setCustomerDatas } from "../features/customerSlice";

export const getCustomers = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`/customer/`);
        const datas = response.data;
        
        // console.log("datas:",datas)
        

        dispatch(setCustomerDatas({
            customerData: datas
        }))
        return response.data;
    } catch (error) {
        console.error("Error fetching customer:", error);
        throw error;
    }
};