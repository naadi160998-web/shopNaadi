const express = require("express");
const cartServices = require("./cart.service");

const router = express.Router();

// CREATE
const createCart = async (req, res) => {
  try {
    const cart = req.body;

    const newCart = await cartServices.createCart(cart);

    res.status(201).json({
      success: true,
      data: newCart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ALL
const getAllCarts = async (req, res) => {
  try {
    const cartsList = await cartServices.getAllCarts();

    res.json({
      success: true,
      data: cartsList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ONE
const getCart = async (req, res) => {
  try {
    const cart = await cartServices.getCart(req.params.id);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
const updateCart = async (req, res) => {
  try {
    const cart = await cartServices.updateCart(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const deleteCart = async (req, res) => {
  try {
    await cartServices.deleteCart(req.params.id);

    res.json({
      success: true,
      message: "Cart deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = router;

// Routes
router.post("/", createCart);
router.get("/", getAllCarts);
router.get("/:id", getCart);
router.put("/:id", updateCart);
router.delete("/:id", deleteCart);