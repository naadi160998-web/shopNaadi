const express = require("express");
const warehouseServices = require("./warehouse.service");

const router = express.Router();

// ========================================
// CREATE WAREHOUSE
// ========================================
const createWarehouse = async (req, res) => {
  try {
    const warehouse = req.body;

    const newWarehouse =
      await warehouseServices.createWarehouse(warehouse);

    res.status(201).json({
      success: true,
      data: newWarehouse,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// READ ALL WAREHOUSES
// ========================================
const getAllWarehouses = async (req, res) => {
  try {
    const warehousesList =
      await warehouseServices.getAllWarehouses();

    res.status(200).json({
      success: true,
      data: warehousesList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// READ ONE WAREHOUSE
// ========================================
const getWarehouse = async (req, res) => {
  try {
    const warehouse =
      await warehouseServices.getWarehouse(req.params.id);

    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: "Warehouse not found",
      });
    }

    res.status(200).json({
      success: true,
      data: warehouse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// UPDATE WAREHOUSE
// ========================================
const updateWarehouse = async (req, res) => {
  try {
    const warehouse =
      await warehouseServices.updateWarehouse(
        req.params.id,
        req.body
      );

    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: "Warehouse not found",
      });
    }

    res.status(200).json({
      success: true,
      data: warehouse,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// DELETE WAREHOUSE
// ========================================
const deleteWarehouse = async (req, res) => {
  try {
    const result =
      await warehouseServices.deleteWarehouse(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Warehouse not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Warehouse deleted successfully",
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

router.post("/", createWarehouse);

router.get("/", getAllWarehouses);

router.get("/:id", getWarehouse);

router.put("/:id", updateWarehouse);

router.delete("/:id", deleteWarehouse);

module.exports = router;