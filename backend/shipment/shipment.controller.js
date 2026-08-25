const express = require("express");
const shipmentServices = require("./shipment.service");

const router = express.Router();

// ========================================
// CREATE SHIPMENT
// ========================================
const createShipment = async (req, res) => {
  try {
    const shipment = req.body;

    const newShipment =
      await shipmentServices.createShipment(shipment);

    res.status(201).json({
      success: true,
      data: newShipment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// READ ALL SHIPMENTS
// ========================================
const getAllShipments = async (req, res) => {
  try {
    const shipmentsList =
      await shipmentServices.getAllShipments();

    res.json({
      success: true,
      data: shipmentsList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// READ ONE SHIPMENT
// ========================================
const getShipment = async (req, res) => {
  try {
    const shipment =
      await shipmentServices.getShipment(req.params.id);

    if (!shipment || shipment.success === false) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found",
      });
    }

    res.json({
      success: true,
      data: shipment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// UPDATE SHIPMENT
// ========================================
const updateShipment = async (req, res) => {
  try {
    const shipment =
      await shipmentServices.updateShipment(
        req.params.id,
        req.body
      );

    if (!shipment || shipment.success === false) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found",
      });
    }

    res.json({
      success: true,
      data: shipment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// DELETE SHIPMENT
// ========================================
const deleteShipment = async (req, res) => {
  try {
    const result =
      await shipmentServices.deleteShipment(req.params.id);

    res.json({
      success: true,
      message: "Shipment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// ROUTES
// ========================================

router.post("/", createShipment);

router.get("/", getAllShipments);

router.get("/:id", getShipment);

router.put("/:id", updateShipment);

router.delete("/:id", deleteShipment);

module.exports = router;