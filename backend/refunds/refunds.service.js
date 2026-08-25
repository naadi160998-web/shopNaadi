const Refund = require("./refunds.model");

// ========================================
// CREATE REFUND
// ========================================
const createRefund = async (params) => {
  try {
    const refund = await Refund.create(params);

    return refund;
  } catch (error) {
    return error;
  }
};

// ========================================
// READ ALL REFUNDS
// ========================================
const getAllRefunds = async () => {
  try {
    const refundsList = await Refund.find()
      .populate("return_id")
      .populate("payment_id");

    return refundsList;
  } catch (error) {
    return error;
  }
};

// ========================================
// READ ONE REFUND
// ========================================
const getRefund = async (id) => {
  try {
    const refund = await Refund.findById(id)
      .populate("return_id")
      .populate("payment_id");

    if (!refund) {
      return {
        success: false,
        message: "Refund not found",
      };
    }

    return refund;
  } catch (error) {
    return error;
  }
};

// ========================================
// UPDATE REFUND
// ========================================
const updateRefund = async (id, params) => {
  try {
    const refund = await Refund.findByIdAndUpdate(
      id,
      params,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("return_id")
      .populate("payment_id");

    if (!refund) {
      return {
        success: false,
        message: "Refund not found",
      };
    }

    return refund;
  } catch (error) {
    return error;
  }
};

// ========================================
// DELETE REFUND
// ========================================
const deleteRefund = async (id) => {
  try {
    const refund = await Refund.findByIdAndDelete(id);

    if (!refund) {
      return {
        success: false,
        message: "Refund not found",
      };
    }

    return "Refund deleted successfully";
  } catch (error) {
    return error;
  }
};

module.exports = {
  createRefund,
  getAllRefunds,
  getRefund,
  updateRefund,
  deleteRefund,
};