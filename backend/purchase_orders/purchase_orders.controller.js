const express = require("express");
const purchaseOrderServices = require("./purchase_orders.service");

const router = express.Router();

// ========================================
// CREATE PURCHASE ORDER
// ========================================
const createPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = req.body;

    const newPurchaseOrder =
      await purchaseOrderServices.createPurchaseOrder(purchaseOrder);

    res.status(201).json({
      success: true,
      data: newPurchaseOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// READ ALL PURCHASE ORDERS
// ========================================
const getAllPurchaseOrders = async (req, res) => {
  try {
    const purchaseOrdersList =
      await purchaseOrderServices.getAllPurchaseOrders();

    res.json({
      success: true,
      data: purchaseOrdersList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// READ ONE PURCHASE ORDER
// ========================================
const getPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder =
      await purchaseOrderServices.getPurchaseOrder(req.params.id);

    if (!purchaseOrder) {
      return res.status(404).json({
        success: false,
        message: "Purchase order not found",
      });
    }

    res.json({
      success: true,
      data: purchaseOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// UPDATE PURCHASE ORDER
// ========================================
const updatePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder =
      await purchaseOrderServices.updatePurchaseOrder(
        req.params.id,
        req.body
      );

    res.json({
      success: true,
      data: purchaseOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// DELETE PURCHASE ORDER
// ========================================
const deletePurchaseOrder = async (req, res) => {
  try {
    await purchaseOrderServices.deletePurchaseOrder(req.params.id);

    res.json({
      success: true,
      message: "Purchase order deleted successfully",
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

router.post("/", createPurchaseOrder);
router.get("/", getAllPurchaseOrders);
router.get("/:id", getPurchaseOrder);
router.put("/:id", updatePurchaseOrder);
router.delete("/:id", deletePurchaseOrder);

module.exports = router;