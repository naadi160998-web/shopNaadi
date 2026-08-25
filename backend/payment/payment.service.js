const Payment = require("./payment.model");

// CREATE
const createPayment = async (params) => {
  try {
    const payment = await Payment.create(params);
    return payment;
  } catch (error) {
    return error;
  }
};

// READ ALL
const getAllPayments = async () => {
  try {
    const paymentsList = await Payment.find()
      .populate("order_id")
      .populate("customer_id");

    return paymentsList;
  } catch (error) {
    return error;
  }
};

// READ ONE
const getPayment = async (id) => {
  try {
    const payment = await Payment.findById(id)
      .populate("order_id")
      .populate("customer_id");

    if (!payment) {
      return {
        success: false,
        message: "Payment not found",
      };
    }

    return payment;
  } catch (error) {
    return error;
  }
};

// UPDATE
const updatePayment = async (id, params) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      id,
      params,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!payment) {
      return {
        success: false,
        message: "Payment not found",
      };
    }

    return payment;
  } catch (error) {
    return error;
  }
};

// DELETE
const deletePayment = async (id) => {
  try {
    const payment = await Payment.findByIdAndDelete(id);

    if (!payment) {
      return {
        success: false,
        message: "Payment not found",
      };
    }

    return "Payment deleted successfully";
  } catch (error) {
    return error;
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPayment,
  updatePayment,
  deletePayment,
};