const Warehouse = require("./warehouse.model");

// ========================================
// CREATE WAREHOUSE
// ========================================
const createWarehouse = async (params) => {
  try {
    const warehouse = await Warehouse.create(params);

    return warehouse;
  } catch (error) {
    return error;
  }
};

// ========================================
// READ ALL WAREHOUSES
// ========================================
const getAllWarehouses = async () => {
  try {
    const warehousesList = await Warehouse.find()
      .populate("product_id");

    return warehousesList;
  } catch (error) {
    return error;
  }
};

// ========================================
// READ ONE WAREHOUSE
// ========================================
const getWarehouse = async (id) => {
  try {
    const warehouse = await Warehouse.findById(id)
      .populate("product_id");

    if (!warehouse) {
      return {
        success: false,
        message: "Warehouse not found",
      };
    }

    return warehouse;
  } catch (error) {
    return error;
  }
};

// ========================================
// UPDATE WAREHOUSE
// ========================================
const updateWarehouse = async (id, params) => {
  try {
    const warehouse = await Warehouse.findByIdAndUpdate(
      id,
      params,
      {
        new: true,
        runValidators: true,
      }
    ).populate("product_id");

    if (!warehouse) {
      return {
        success: false,
        message: "Warehouse not found",
      };
    }

    return warehouse;
  } catch (error) {
    return error;
  }
};

// ========================================
// DELETE WAREHOUSE
// ========================================
const deleteWarehouse = async (id) => {
  try {
    const warehouse = await Warehouse.findByIdAndDelete(id);

    if (!warehouse) {
      return {
        success: false,
        message: "Warehouse not found",
      };
    }

    return "Warehouse deleted successfully";
  } catch (error) {
    return error;
  }
};

module.exports = {
  createWarehouse,
  getAllWarehouses,
  getWarehouse,
  updateWarehouse,
  deleteWarehouse,
};