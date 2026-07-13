import axiosInstance from "../API/axiosInstance";
import { setStockDatas } from "../features/stockSlice";

export const getStocks = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`/stocks`);
        const datas = response.data;
        
        console.log("datas:",datas);
        

        dispatch(setStockDatas({
            stockData: datas
        }))
        return response.data;
    } catch (error) {
        console.error("Error fetching stocks:", error);
        throw error;
    }
};