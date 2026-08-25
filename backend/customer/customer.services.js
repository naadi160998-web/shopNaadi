const Customer = require("./customer.model");

// CREATE
const createCustomer = async (params) => {
  try {
    const customer = await Customer.create(params);
    return customer;
  } catch (error) {
    return error;
  }
};

// READ ALL
const getAllCustomers = async () => {
  try {
    const customersList = await Customer.find();
    return customersList;
  } catch (error) {
    return error;
  }
};

// READ ONE
const getCustomer = async (id) => {
  try {
    const customer = await Customer.findById(id);

    if (!customer) {
      return {
        success: false,
        message: "Customer not found",
      };
    }

    return customer;
  } catch (error) {
    return error;
  }
};

// UPDATE
const updateCustomer = async (id, params) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      id,
      params,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!customer) {
      return {
        success: false,
        message: "Customer not found",
      };
    }

    return customer;
  } catch (error) {
    return error;
  }
};

// DELETE
const deleteCustomer = async (id) => {
  try {
    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      return {
        success: false,
        message: "Customer not found",
      };
    }

    return "Customer deleted successfully";
  } catch (error) {
    return error;
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};