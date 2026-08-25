const express = require("express");
const orderItemServices = require("./order_items.service");

const router = express.Router();

// CREATE
const createOrderItem = async (req, res) => {
  try {
    const orderItem = req.body;

    const newOrderItem =
      await orderItemServices.createOrderItem(orderItem);

    res.status(201).json({
      success: true,
      data: newOrderItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ALL
const getAllOrderItems = async (req, res) => {
  try {
    const orderItemsList =
      await orderItemServices.getAllOrderItems();

    res.json({
      success: true,
      data: orderItemsList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ONE
const getOrderItem = async (req, res) => {
  try {
    const orderItem =
      await orderItemServices.getOrderItem(req.params.id);

    if (!orderItem) {
      return res.status(404).json({
        success: false,
        message: "Order item not found",
      });
    }

    res.json({
      success: true,
      data: orderItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
const updateOrderItem = async (req, res) => {
  try {
    const orderItem =
      await orderItemServices.updateOrderItem(
        req.params.id,
        req.body
      );

    res.json({
      success: true,
      data: orderItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const deleteOrderItem = async (req, res) => {
  try {
    await orderItemServices.deleteOrderItem(req.params.id);

    res.json({
      success: true,
      message: "Order item deleted successfully",
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
router.post("/", createOrderItem);
router.get("/", getAllOrderItems);
router.get("/:id", getOrderItem);
router.put("/:id", updateOrderItem);
router.delete("/:id", deleteOrderItem);