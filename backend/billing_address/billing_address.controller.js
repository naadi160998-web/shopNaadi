const express = require("express");
const billingAddressServices = require("./billing_address.service");
const router = express.Router();

// CREATE
const createBilling = async (req, res) => {
  try {
    const billing = await req.body;
    const newBilling = await billingAddressServices.createBilling(billing);
    res.status(201).json({
      success: true,
      data: newBilling,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ALL
const getAllBilling = async (req, res) => {
  try {
    const billingAddresses = await billingAddressServices.getAllBilling();

    res.json({
      success: true,
      data: billingAddresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ONE
const getBilling = async (req, res) => {
  try {
    const billing = await billingAddressServices.getBilling(req.params.id);

    if (!billing) {
      return res.status(404).json({
        success: false,
        message: "Billing address not found",
      });
    }

    res.json({
      success: true,
      data: billing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
const updateBilling = async (req, res) => {
  try {
    const billing = await billingAddressServices.updateBilling(req.params.id, req.body);

    res.json({
      success: true,
      data: billing,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const deleteBilling = async (req, res) => {
  try {
    await billingAddressServices.deleteBilling(req.params.id);

    res.json({
      success: true,
      message: "Billing address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = router;

router.post("/", createBilling);
router.get("/", getAllBilling);
router.get("/:id", getBilling);
router.put("/:id", updateBilling);
router.delete("/:id", deleteBilling);