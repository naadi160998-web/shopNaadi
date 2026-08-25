const express = require("express");
const invoiceServices = require("./invoices.service");

const router = express.Router();

// CREATE
const createInvoice = async (req, res) => {
  try {
    const invoice = req.body;

    const newInvoice = await invoiceServices.createInvoice(invoice);

    res.status(201).json({
      success: true,
      data: newInvoice,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ALL
const getAllInvoices = async (req, res) => {
  try {
    const invoicesList = await invoiceServices.getAllInvoices();

    res.json({
      success: true,
      data: invoicesList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ONE
const getInvoice = async (req, res) => {
  try {
    const invoice = await invoiceServices.getInvoice(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
const updateInvoice = async (req, res) => {
  try {
    const invoice = await invoiceServices.updateInvoice(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const deleteInvoice = async (req, res) => {
  try {
    await invoiceServices.deleteInvoice(req.params.id);

    res.json({
      success: true,
      message: "Invoice deleted successfully",
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
router.post("/", createInvoice);
router.get("/", getAllInvoices);
router.get("/:id", getInvoice);
router.put("/:id", updateInvoice);
router.delete("/:id", deleteInvoice);