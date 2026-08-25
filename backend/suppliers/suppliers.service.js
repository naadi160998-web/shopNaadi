const Supplier = require("./suppliers.model");

// ========================================
// CREATE SUPPLIER
// ========================================
const createSupplier = async (params) => {
  try {
    const supplier = await Supplier.create(params);

    return supplier;
  } catch (error) {
    return error;
  }
};

// ========================================
// READ ALL SUPPLIERS
// ========================================
const getAllSuppliers = async () => {
  try {
    const suppliersList = await Supplier.find();

    return suppliersList;
  } catch (error) {
    return error;
  }
};

// ========================================
// READ ONE SUPPLIER
// ========================================
const getSupplier = async (id) => {
  try {
    const supplier = await Supplier.findById(id);

    if (!supplier) {
      return {
        success: false,
        message: "Supplier not found",
      };
    }

    return supplier;
  } catch (error) {
    return error;
  }
};

// ========================================
// UPDATE SUPPLIER
// ========================================
const updateSupplier = async (id, params) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(
      id,
      params,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!supplier) {
      return {
        success: false,
        message: "Supplier not found",
      };
    }

    return supplier;
  } catch (error) {
    return error;
  }
};

// ========================================
// DELETE SUPPLIER
// ========================================
const deleteSupplier = async (id) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(id);

    if (!supplier) {
      return {
        success: false,
        message: "Supplier not found",
      };
    }

    return "Supplier deleted successfully";
  } catch (error) {
    return error;
  }
};

module.exports = {
  createSupplier,
  getAllSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier,
};