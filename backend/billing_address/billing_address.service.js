const billingAddress = require("./billing_address.model");

// CREATE
const createBilling = async (params) => {
  try {
    const billing = await billingAddress.create(params);
    return billing;
  } catch (error) {
    return error;
  }
};

// READ ALL
const getAllBilling = async () => {
  try {
    const billingAddresses = await billingAddress.find();
    return billingAddresses;
  } catch (error) {
    return error;
  }
};

// READ ONE
const getBilling = async (id) => {
  try {
    const billing = await billingAddress.findById(id);

    if (!billing) {
      return {
        success: false,
        message: "Billing address not found",
      };
    }

    return billing;
  } catch (error) {
    return error;
  }
};

// UPDATE
const updateBilling = async (id, params) => {
  try {
    const billing = await billingAddress.findByIdAndUpdate(
      id,
      params,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!billing) {
      return {
        success: false,
        message: "Billing address not found",
      };
    }

    return billing;
  } catch (error) {
    return error;
  }
};

// DELETE
const deleteBilling = async (id) => {
  try {
    const billing = await billingAddress.findByIdAndDelete(id);

    if (!billing) {
      return {
        success: false,
        message: "Billing address not found",
      };
    }

    return "Billing address deleted successfully";
  } catch (error) {
    return error;
  }
};

module.exports = {
  createBilling,
  getAllBilling,
  getBilling,
  updateBilling,
  deleteBilling,
};