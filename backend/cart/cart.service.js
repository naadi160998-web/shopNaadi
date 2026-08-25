const Cart = require("./cart.model");

// CREATE
const createCart = async (params) => {
  try {
    const cart = await Cart.create(params);
    return cart;
  } catch (error) {
    return error;
  }
};

// READ ALL
const getAllCarts = async () => {
  try {
    const cartsList = await Cart.find();
    return cartsList;
  } catch (error) {
    return error;
  }
};

// READ ONE
const getCart = async (id) => {
  try {
    const cart = await Cart.findById(id);

    if (!cart) {
      return {
        success: false,
        message: "Cart not found",
      };
    }

    return cart;
  } catch (error) {
    return error;
  }
};

// UPDATE
const updateCart = async (id, params) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      id,
      params,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!cart) {
      return {
        success: false,
        message: "Cart not found",
      };
    }

    return cart;
  } catch (error) {
    return error;
  }
};

// DELETE
const deleteCart = async (id) => {
  try {
    const cart = await Cart.findByIdAndDelete(id);

    if (!cart) {
      return {
        success: false,
        message: "Cart not found",
      };
    }

    return "Cart deleted successfully";
  } catch (error) {
    return error;
  }
};

module.exports = {
  createCart,
  getAllCarts,
  getCart,
  updateCart,
  deleteCart,
};