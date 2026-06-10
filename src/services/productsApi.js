import axiosInstance from "../API/axiosInstance";
import { setProductsImages } from "../features/productImageSlice";
import { setProductId, setProducts,removeProductId } from "../features/productSlice";

export const createProduct = (productData) => async (dispatch) => {
    try {
        const response = await axiosInstance.post("/product/", productData);
        dispatch(setProductId({
            productId: response.data
        }))
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

export const getProducts = (vendor_id) => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`/product/${vendor_id}`);
        const datas = response.data;
        const updateData = []

        for (let i = 0; i < datas.length; i++) {
            datas[i].productimgs.reverse()
            updateData.push(datas[i])
        }
        
        dispatch(setProducts({
            productsData: datas
        }))
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const updateProduct = (productId, productData) => async (dispatch) => {
    try {
        console.log("Updating product with ID:", productId, "and data:", productData);
        const response = await axiosInstance.put(`/product/update/${productId}`, productData);
        dispatch(setProductId({
            productId: response.data
        }))
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};
// export const deleteProduct = (product_id,vendor_id) => async (dispatch) => {
export const deleteProduct = (product_id,vendor_id,imgIds,data) => async (dispatch) => {
    console.log("call it:",product_id,vendor_id,imgIds);
    const obj = {
        imgIds:imgIds,
        imgsData:data
    }
    try {
        const response = await axiosInstance.post(`/product/delete/${product_id}/${vendor_id}`,obj);
        // dispatch(removeProductId())
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

// **********************image upload*************************//
export const uploadProductImg = (formData, params) => async (dispatch) => {
    //console.log("formData:", formData);

    const { vendor_id,
        product_id,
        product_gender,
        product_color,
        product_size,
        product_type,
        category_id,
    } = params
    //console.log("params:",params);

    try {

        const res = await axiosInstance.post(
            `/uploads/upload/${vendor_id}/${product_id}/${product_gender}/${product_color}/${product_size}/${product_type}/${category_id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        dispatch(setProductsImages({
            productImgPaths: res.data.data
        }))
        //console.log(res.data);
        return res.data
    } catch (err) {
        console.error(err);
    }
};

export const deleteProductImg = async (data) => {
    
    try {
        const res = await axiosInstance.post(`/uploads/delete`, data);

        console.log(res.data);
    } catch (err) {
        console.error(err);
    }
}

export const updateProductImg = async (formData, obj) => {
    const { vendor_id,
        product_id,
        product_gender,
        product_color,
        product_size,
        product_type,
        category_id,
        product_img_id
    } = obj
    console.log("params:",obj);

    try {
        /****
         * /update/:vendor_id/:product_id/:gender/:color/:size/:product_type/:category_id/:product_img_id
         */
        const res = await axiosInstance.put(
            `/uploads/update/${vendor_id}/${product_id}/${product_gender}/${product_color}/${product_size.toString()}/${product_type}/${category_id}/${product_img_id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        dispatch(setProductsImages({
            productImgPaths: res.data.data
        }))
        console.log(res.data);
        return res.data
    } catch (err) {
        console.error(err);
    }
}