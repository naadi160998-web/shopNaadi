const PurchaseOrder = require("./purchase_orders.model");

// ========================================
// CREATE PURCHASE ORDER
// ========================================
const createPurchaseOrder = async (params) => {
  try {
    const purchaseOrder = await PurchaseOrder.create(params);

    return purchaseOrder;
  } catch (error) {
    return error;
  }
};

// ========================================
// READ ALL PURCHASE ORDERS
// ========================================
const getAllPurchaseOrders = async () => {
  try {
    const purchaseOrdersList = await PurchaseOrder.find()
      .populate("suppliers_id")
      .populate("warehouse_id");

    return purchaseOrdersList;
  } catch (error) {
    return error;
  }
};

// ========================================
// READ ONE PURCHASE ORDER
// ========================================
const getPurchaseOrder = async (id) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(id)
      .populate("suppliers_id")
      .populate("warehouse_id");

    if (!purchaseOrder) {
      return {
        success: false,
        message: "Purchase order not found",
      };
    }

    return purchaseOrder;
  } catch (error) {
    return error;
  }
};

// ========================================
// UPDATE PURCHASE ORDER
// ========================================
const updatePurchaseOrder = async (id, params) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndUpdate(
      id,
      params,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("suppliers_id")
      .populate("warehouse_id");

    if (!purchaseOrder) {
      return {
        success: false,
        message: "Purchase order not found",
      };
    }

    return purchaseOrder;
  } catch (error) {
    return error;
  }
};

// ========================================
// DELETE PURCHASE ORDER
// ========================================
const deletePurchaseOrder = async (id) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndDelete(id);

    if (!purchaseOrder) {
      return {
        success: false,
        message: "Purchase order not found",
      };
    }

    return "Purchase order deleted successfully";
  } catch (error) {
    return error;
  }
};

module.exports = {
  createPurchaseOrder,
  getAllPurchaseOrders,
  getPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
};