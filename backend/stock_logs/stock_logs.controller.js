const express = require("express");
const stockLogServices = require("./stock_logs.service");

const router = express.Router();

// ========================================
// CREATE STOCK LOG
// ========================================
const createStockLog = async (req, res) => {
  try {
    const stockLog = req.body;

    const newStockLog =
      await stockLogServices.createStockLog(stockLog);

    res.status(201).json({
      success: true,
      data: newStockLog,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// READ ALL STOCK LOGS
// ========================================
const getAllStockLogs = async (req, res) => {
  try {
    const stockLogsList =
      await stockLogServices.getAllStockLogs();

    res.json({
      success: true,
      data: stockLogsList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// READ ONE STOCK LOG
// ========================================
const getStockLog = async (req, res) => {
  try {
    const stockLog =
      await stockLogServices.getStockLog(req.params.id);

    if (!stockLog) {
      return res.status(404).json({
        success: false,
        message: "Stock log not found",
      });
    }

    res.json({
      success: true,
      data: stockLog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// UPDATE STOCK LOG
// ========================================
const updateStockLog = async (req, res) => {
  try {
    const stockLog =
      await stockLogServices.updateStockLog(
        req.params.id,
        req.body
      );

    res.json({
      success: true,
      data: stockLog,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// DELETE STOCK LOG
// ========================================
const deleteStockLog = async (req, res) => {
  try {
    await stockLogServices.deleteStockLog(req.params.id);

    res.json({
      success: true,
      message: "Stock log deleted successfully",
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

router.post("/", createStockLog);
router.get("/", getAllStockLogs);
router.get("/:id", getStockLog);
router.put("/:id", updateStockLog);
router.delete("/:id", deleteStockLog);

module.exports = router;