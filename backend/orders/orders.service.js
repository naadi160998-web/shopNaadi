const Order = require("./orders.model");

// CREATE
const createOrder = async (params) => {
  try {
    const order = await Order.create(params);
    return order;
  } catch (error) {
    return error;
  }
};

// READ ALL
const getAllOrders = async () => {
  try {
    const ordersList = await Order.find();
    return ordersList;
  } catch (error) {
    return error;
  }
};

// READ ONE
const getOrder = async (id) => {
  try {
    const order = await Order.findById(id);

    if (!order) {
      return {
        success: false,
        message: "Order not found",
      };
    }

    return order;
  } catch (error) {
    return error;
  }
};

// UPDATE
const updateOrder = async (id, params) => {
  try {
    const order = await Order.findByIdAndUpdate(
      id,
      params,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!order) {
      return {
        success: false,
        message: "Order not found",
      };
    }

    return order;
  } catch (error) {
    return error;
  }
};

// DELETE
const deleteOrder = async (id) => {
  try {
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return {
        success: false,
        message: "Order not found",
      };
    }

    return "Order deleted successfully";
  } catch (error) {
    return error;
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrder,
  deleteOrder,
};