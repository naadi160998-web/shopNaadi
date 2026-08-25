const express = require("express");
const supplierServices = require("./suppliers.service");

const router = express.Router();

// ========================================
// CREATE SUPPLIER
// ========================================
const createSupplier = async (req, res) => {
  try {
    const supplier = req.body;

    const newSupplier =
      await supplierServices.createSupplier(supplier);

    res.status(201).json({
      success: true,
      data: newSupplier,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// READ ALL SUPPLIERS
// ========================================
const getAllSuppliers = async (req, res) => {
  try {
    const suppliersList =
      await supplierServices.getAllSuppliers();

    res.json({
      success: true,
      data: suppliersList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// READ ONE SUPPLIER
// ========================================
const getSupplier = async (req, res) => {
  try {
    const supplier =
      await supplierServices.getSupplier(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
    }

    res.json({
      success: true,
      data: supplier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// UPDATE SUPPLIER
// ========================================
const updateSupplier = async (req, res) => {
  try {
    const supplier =
      await supplierServices.updateSupplier(
        req.params.id,
        req.body
      );

    res.json({
      success: true,
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// DELETE SUPPLIER
// ========================================
const deleteSupplier = async (req, res) => {
  try {
    await supplierServices.deleteSupplier(req.params.id);

    res.json({
      success: true,
      message: "Supplier deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// ROUTES
// ========================================

router.post("/", createSupplier);
router.get("/", getAllSuppliers);
router.get("/:id", getSupplier);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

module.exports = router;