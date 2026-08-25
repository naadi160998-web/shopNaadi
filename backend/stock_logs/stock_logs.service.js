const StockLogs = require("./stock_logs.model");

// ========================================
// CREATE STOCK LOG
// ========================================
const createStockLog = async (params) => {
  try {
    const stockLog = await StockLogs.create(params);

    return stockLog;
  } catch (error) {
    return error;
  }
};

// ========================================
// READ ALL STOCK LOGS
// ========================================
const getAllStockLogs = async () => {
  try {
    const stockLogsList = await StockLogs.find()
      .populate("product_id")
      .populate("warehouse_id");

    return stockLogsList;
  } catch (error) {
    return error;
  }
};

// ========================================
// READ ONE STOCK LOG
// ========================================
const getStockLog = async (id) => {
  try {
    const stockLog = await StockLogs.findById(id)
      .populate("product_id")
      .populate("warehouse_id");

    if (!stockLog) {
      return {
        success: false,
        message: "Stock log not found",
      };
    }

    return stockLog;
  } catch (error) {
    return error;
  }
};

// ========================================
// UPDATE STOCK LOG
// ========================================
const updateStockLog = async (id, params) => {
  try {
    const stockLog = await StockLogs.findByIdAndUpdate(
      id,
      params,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("product_id")
      .populate("warehouse_id");

    if (!stockLog) {
      return {
        success: false,
        message: "Stock log not found",
      };
    }

    return stockLog;
  } catch (error) {
    return error;
  }
};

// ========================================
// DELETE STOCK LOG
// ========================================
const deleteStockLog = async (id) => {
  try {
    const stockLog = await StockLogs.findByIdAndDelete(id);

    if (!stockLog) {
      return {
        success: false,
        message: "Stock log not found",
      };
    }

    return "Stock log deleted successfully";
  } catch (error) {
    return error;
  }
};

module.exports = {
  createStockLog,
  getAllStockLogs,
  getStockLog,
  updateStockLog,
  deleteStockLog,
};