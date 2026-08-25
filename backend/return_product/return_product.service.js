const ReturnProduct = require("./return_product.model");

// ========================================
// CREATE RETURN PRODUCT
// ========================================
const createReturnProduct = async (params) => {
  try {
    const returnProduct = await ReturnProduct.create(params);

    return returnProduct;
  } catch (error) {
    return error;
  }
};

// ========================================
// READ ALL RETURN PRODUCTS
// ========================================
const getAllReturnProducts = async () => {
  try {
    const returnProductsList = await ReturnProduct.find()
      .populate("order_items_id");

    return returnProductsList;
  } catch (error) {
    return error;
  }
};

// ========================================
// READ ONE RETURN PRODUCT
// ========================================
const getReturnProduct = async (id) => {
  try {
    const returnProduct = await ReturnProduct.findById(id)
      .populate("order_items_id");

    if (!returnProduct) {
      return {
        success: false,
        message: "Return product not found",
      };
    }

    return returnProduct;
  } catch (error) {
    return error;
  }
};

// ========================================
// UPDATE RETURN PRODUCT
// ========================================
const updateReturnProduct = async (id, params) => {
  try {
    const returnProduct = await ReturnProduct.findByIdAndUpdate(
      id,
      params,
      {
        new: true,
        runValidators: true,
      }
    ).populate("order_items_id");

    if (!returnProduct) {
      return {
        success: false,
        message: "Return product not found",
      };
    }

    return returnProduct;
  } catch (error) {
    return error;
  }
};

// ========================================
// DELETE RETURN PRODUCT
// ========================================
const deleteReturnProduct = async (id) => {
  try {
    const returnProduct = await ReturnProduct.findByIdAndDelete(id);

    if (!returnProduct) {
      return {
        success: false,
        message: "Return product not found",
      };
    }

    return "Return product deleted successfully";
  } catch (error) {
    return error;
  }
};

module.exports = {
  createReturnProduct,
  getAllReturnProducts,
  getReturnProduct,
  updateReturnProduct,
  deleteReturnProduct,
};