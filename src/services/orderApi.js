import axiosInstance from "../API/axiosInstance";
import { setOrderDatas } from "../features/orderSlice";


export const createOrders = async(ordersData) => {
try {
        // console.log("ordersData:",ordersData);
        const response = await axiosInstance.post("/orders/", ordersData);
        // console.log("res:",response.data);
        if(response.data.status === 201){
            ordersData.order_id = response.data.order.order_id

            const res = await axiosInstance.post("/orderItems/", ordersData);
            
            if(res.data.status === 201){
                const warehouseRes = await axiosInstance.put(`/warehouses/update/${ordersData.warehouse_id}`, ordersData);
                // console.log("warehouseRes:",warehouseRes);
                if(warehouseRes.data.status === 200){
                    ordersData.movement_type = ordersData.status !== "Cancelled" ? "stock_in" : "stock_out"
                    ordersData.notes = ordersData.order_number;
                    const stock_logs = await axiosInstance.post(`/stock_logs`, ordersData);
                    // console.log("stock_logs:",stock_logs);
                    if(stock_logs.data.status === 201){
                        return response.data;
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error creating warehouse:", error);
        throw error;
    }
}

export const getOrders = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`/orders`);
        const datas = response.data;
        // console.log("datas:",datas);

        dispatch(setOrderDatas({
            orderData: datas
        }))
        return response.data;
    } catch (error) {
        console.error("Error fetching order:", error);
        throw error;
    }
};