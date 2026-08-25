const Delivery = require("./deliveries.model");

// CREATE
const createDelivery = async (params) => {
  try {
    const delivery = await Delivery.create(params);
    return delivery;
  } catch (error) {
    return error;
  }
};

// READ ALL
const getAllDeliveries = async () => {
  try {
    const deliveriesList = await Delivery.find();
    return deliveriesList;
  } catch (error) {
    return error;
  }
};

// READ ONE
const getDelivery = async (id) => {
  try {
    const delivery = await Delivery.findById(id);

    if (!delivery) {
      return {
        success: false,
        message: "Delivery not found",
      };
    }

    return delivery;
  } catch (error) {
    return error;
  }
};

// UPDATE
const updateDelivery = async (id, params) => {
  try {
    const delivery = await Delivery.findByIdAndUpdate(
      id,
      params,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!delivery) {
      return {
        success: false,
        message: "Delivery not found",
      };
    }

    return delivery;
  } catch (error) {
    return error;
  }
};

// DELETE
const deleteDelivery = async (id) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(id);

    if (!delivery) {
      return {
        success: false,
        message: "Delivery not found",
      };
    }

    return "Delivery deleted successfully";
  } catch (error) {
    return error;
  }
};

module.exports = {
  createDelivery,
  getAllDeliveries,
  getDelivery,
  updateDelivery,
  deleteDelivery,
};