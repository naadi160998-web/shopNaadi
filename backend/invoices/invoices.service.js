const Invoice = require("./invoices.model");

// CREATE
const createInvoice = async (params) => {
  try {
    const invoice = await Invoice.create(params);
    return invoice;
  } catch (error) {
    return error;
  }
};

// READ ALL
const getAllInvoices = async () => {
  try {
    const invoicesList = await Invoice.find();
    return invoicesList;
  } catch (error) {
    return error;
  }
};

// READ ONE
const getInvoice = async (id) => {
  try {
    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return {
        success: false,
        message: "Invoice not found",
      };
    }

    return invoice;
  } catch (error) {
    return error;
  }
};

// UPDATE
const updateInvoice = async (id, params) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(
      id,
      params,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!invoice) {
      return {
        success: false,
        message: "Invoice not found",
      };
    }

    return invoice;
  } catch (error) {
    return error;
  }
};

// DELETE
const deleteInvoice = async (id) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(id);

    if (!invoice) {
      return {
        success: false,
        message: "Invoice not found",
      };
    }

    return "Invoice deleted successfully";
  } catch (error) {
    return error;
  }
};

module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoice,
  updateInvoice,
  deleteInvoice,
};