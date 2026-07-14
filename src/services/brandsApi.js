import axiosInstance from "../API/axiosInstance";
import { setBrandDatas,removeBrandsId } from "../features/brandSlice";

export const createBrands = async (brandsData) => {
    try {
        // console.log("brandsData:",brandsData);
        const response = await axiosInstance.post("/brands/", brandsData);
        console.log("res:",response.data);
        
        return response.data;
    } catch (error) {
        console.error("Error creating brand:", error);
        throw error;
    }
};

export const getBrands = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`/brands/`);
        const datas = response.data.data;
        // console.log("datas:",datas);
        
        const updateData = []
        
        dispatch(setBrandDatas({
            brandsData: datas
        }))
        return response.data;
    } catch (error) {
        console.error("Error fetching brands:", error);
        throw error;
    }
};

export const updateBrands = async (brand_id, brandsData) => {
    try {
        // console.log("Updating brand with ID:", brand_id, "and data:", brandsData);
        const response = await axiosInstance.put(`/brands/update/${brand_id}`, brandsData);
        return response.data;
    } catch (error) {
        console.error("Error updating brand:", error);
        throw error;
    }
};
// export const deletewarehouse = (brand_id,vendor_id) => async (dispatch) => {
export const deleteBrand = async (brand_id) => {
    
    try {
        const response = await axiosInstance.post(`/brands/delete/${brand_id}`);
        return response.data;
    } catch (error) {
        console.error("Error creating brand:", error);
        throw error;
    }
};