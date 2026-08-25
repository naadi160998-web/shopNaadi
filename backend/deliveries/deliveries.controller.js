const express = require("express");
const deliveryServices = require("./deliveries.service");

const router = express.Router();

// CREATE
const createDelivery = async (req, res) => {
  try {
    const delivery = req.body;

    const newDelivery = await deliveryServices.createDelivery(delivery);

    res.status(201).json({
      success: true,
      data: newDelivery,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ALL
const getAllDeliveries = async (req, res) => {
  try {
    const deliveriesList = await deliveryServices.getAllDeliveries();

    res.json({
      success: true,
      data: deliveriesList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ONE
const getDelivery = async (req, res) => {
  try {
    const delivery = await deliveryServices.getDelivery(req.params.id);

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found",
      });
    }

    res.json({
      success: true,
      data: delivery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
const updateDelivery = async (req, res) => {
  try {
    const delivery = await deliveryServices.updateDelivery(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: delivery,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const deleteDelivery = async (req, res) => {
  try {
    await deliveryServices.deleteDelivery(req.params.id);

    res.json({
      success: true,
      message: "Delivery deleted successfully",
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
router.post("/", createDelivery);
router.get("/", getAllDeliveries);
router.get("/:id", getDelivery);
router.put("/:id", updateDelivery);
router.delete("/:id", deleteDelivery);