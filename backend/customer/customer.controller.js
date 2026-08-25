const express = require("express");
const customerServices = require("./customer.services");

const router = express.Router();

// CREATE
const createCustomer = async (req, res) => {
  try {
    const customer = req.body;

    const newCustomer = await customerServices.createCustomer(customer);

    res.status(201).json({
      success: true,
      data: newCustomer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ALL
const getAllCustomers = async (req, res) => {
  try {
    const customersList = await customerServices.getAllCustomers();

    res.json({
      success: true,
      data: customersList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ONE
const getCustomer = async (req, res) => {
  try {
    const customer = await customerServices.getCustomer(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
const updateCustomer = async (req, res) => {
  try {
    const customer = await customerServices.updateCustomer(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const deleteCustomer = async (req, res) => {
  try {
    await customerServices.deleteCustomer(req.params.id);

    res.json({
      success: true,
      message: "Customer deleted successfully",
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
router.post("/", createCustomer);
router.get("/", getAllCustomers);
router.get("/:id", getCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);