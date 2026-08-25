const Shipment = require("./shipment.model");

// ========================================
// CREATE SHIPMENT
// ========================================
const createShipment = async (params) => {
  try {
    const shipment = await Shipment.create(params);

    return shipment;
  } catch (error) {
    return error;
  }
};

// ========================================
// READ ALL SHIPMENTS
// ========================================
const getAllShipments = async () => {
  try {
    const shipmentsList = await Shipment.find()
      .populate("customer_id")
      .populate("order_id")
      .populate("invoice_id")
      .populate("warehouse_id");

    return shipmentsList;
  } catch (error) {
    return error;
  }
};

// ========================================
// READ ONE SHIPMENT
// ========================================
const getShipment = async (id) => {
  try {
    const shipment = await Shipment.findById(id)
      .populate("customer_id")
      .populate("order_id")
      .populate("invoice_id")
      .populate("warehouse_id");

    if (!shipment) {
      return {
        success: false,
        message: "Shipment not found",
      };
    }

    return shipment;
  } catch (error) {
    return error;
  }
};

// ========================================
// UPDATE SHIPMENT
// ========================================
const updateShipment = async (id, params) => {
  try {
    const shipment = await Shipment.findByIdAndUpdate(
      id,
      params,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("customer_id")
      .populate("order_id")
      .populate("invoice_id")
      .populate("warehouse_id");

    if (!shipment) {
      return {
        success: false,
        message: "Shipment not found",
      };
    }

    return shipment;
  } catch (error) {
    return error;
  }
};

// ========================================
// DELETE SHIPMENT
// ========================================
const deleteShipment = async (id) => {
  try {
    const shipment = await Shipment.findByIdAndDelete(id);

    if (!shipment) {
      return {
        success: false,
        message: "Shipment not found",
      };
    }

    return "Shipment deleted successfully";
  } catch (error) {
    return error;
  }
};

module.exports = {
  createShipment,
  getAllShipments,
  getShipment,
  updateShipment,
  deleteShipment,
};