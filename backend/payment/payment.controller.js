const express = require("express");
const paymentServices = require("./payment.service");

const router = express.Router();

// CREATE
const createPayment = async (req, res) => {
  try {
    const payment = req.body;

    const newPayment =
      await paymentServices.createPayment(payment);

    res.status(201).json({
      success: true,
      data: newPayment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ALL
const getAllPayments = async (req, res) => {
  try {
    const paymentsList =
      await paymentServices.getAllPayments();

    res.json({
      success: true,
      data: paymentsList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ONE
const getPayment = async (req, res) => {
  try {
    const payment =
      await paymentServices.getPayment(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
const updatePayment = async (req, res) => {
  try {
    const payment =
      await paymentServices.updatePayment(
        req.params.id,
        req.body
      );

    res.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const deletePayment = async (req, res) => {
  try {
    await paymentServices.deletePayment(req.params.id);

    res.json({
      success: true,
      message: "Payment deleted successfully",
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
router.post("/", createPayment);
router.get("/", getAllPayments);
router.get("/:id", getPayment);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);