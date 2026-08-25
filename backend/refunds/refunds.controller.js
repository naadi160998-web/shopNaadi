const express = require("express");
const refundServices = require("./refunds.service");

const router = express.Router();

// ========================================
// CREATE REFUND
// ========================================
const createRefund = async (req, res) => {
  try {
    const refund = req.body;

    const newRefund = await refundServices.createRefund(refund);

    res.status(201).json({
      success: true,
      data: newRefund,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// READ ALL REFUNDS
// ========================================
const getAllRefunds = async (req, res) => {
  try {
    const refundsList = await refundServices.getAllRefunds();

    res.json({
      success: true,
      data: refundsList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// READ ONE REFUND
// ========================================
const getRefund = async (req, res) => {
  try {
    const refund = await refundServices.getRefund(req.params.id);

    if (!refund) {
      return res.status(404).json({
        success: false,
        message: "Refund not found",
      });
    }

    res.json({
      success: true,
      data: refund,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// UPDATE REFUND
// ========================================
const updateRefund = async (req, res) => {
  try {
    const refund = await refundServices.updateRefund(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: refund,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// DELETE REFUND
// ========================================
const deleteRefund = async (req, res) => {
  try {
    await refundServices.deleteRefund(req.params.id);

    res.json({
      success: true,
      message: "Refund deleted successfully",
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

router.post("/", createRefund);
router.get("/", getAllRefunds);
router.get("/:id", getRefund);
router.put("/:id", updateRefund);
router.delete("/:id", deleteRefund);

module.exports = router;