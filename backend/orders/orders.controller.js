const express = require("express");
const orderServices = require("./orders.service");

const router = express.Router();

// CREATE
const createOrder = async (req, res) => {
  try {
    const order = req.body;

    const newOrder = await orderServices.createOrder(order);

    res.status(201).json({
      success: true,
      data: newOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ALL
const getAllOrders = async (req, res) => {
  try {
    const ordersList = await orderServices.getAllOrders();

    res.json({
      success: true,
      data: ordersList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ONE
const getOrder = async (req, res) => {
  try {
    const order = await orderServices.getOrder(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
const updateOrder = async (req, res) => {
  try {
    const order = await orderServices.updateOrder(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const deleteOrder = async (req, res) => {
  try {
    await orderServices.deleteOrder(req.params.id);

    res.json({
      success: true,
      message: "Order deleted successfully",
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
router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);