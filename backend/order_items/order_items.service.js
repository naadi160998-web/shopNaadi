const OrderItem = require("./order_items.model");

// CREATE
const createOrderItem = async (params) => {
  try {
    const orderItem = await OrderItem.create(params);
    return orderItem;
  } catch (error) {
    return error;
  }
};

// READ ALL
const getAllOrderItems = async () => {
  try {
    const orderItemsList = await OrderItem.find();
    return orderItemsList;
  } catch (error) {
    return error;
  }
};

// READ ONE
const getOrderItem = async (id) => {
  try {
    const orderItem = await OrderItem.findById(id);

    if (!orderItem) {
      return {
        success: false,
        message: "Order item not found",
      };
    }

    return orderItem;
  } catch (error) {
    return error;
  }
};

// UPDATE
const updateOrderItem = async (id, params) => {
  try {
    const orderItem = await OrderItem.findByIdAndUpdate(
      id,
      params,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!orderItem) {
      return {
        success: false,
        message: "Order item not found",
      };
    }

    return orderItem;
  } catch (error) {
    return error;
  }
};

// DELETE
const deleteOrderItem = async (id) => {
  try {
    const orderItem = await OrderItem.findByIdAndDelete(id);

    if (!orderItem) {
      return {
        success: false,
        message: "Order item not found",
      };
    }

    return "Order item deleted successfully";
  } catch (error) {
    return error;
  }
};

module.exports = {
  createOrderItem,
  getAllOrderItems,
  getOrderItem,
  updateOrderItem,
  deleteOrderItem,
};