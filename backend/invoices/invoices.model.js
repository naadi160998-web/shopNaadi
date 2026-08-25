const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      default: null,
    },

    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },

    billing_address_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BillingAddress",
      default: null,
    },

    invoice_number: {
      type: String,
      default: null,
      trim: true,
    },

    invoice_date: {
      type: Date,
      default: null,
    },

    due_date: {
      type: Date,
      default: null,
    },

    invoice_status: {
      type: String,
      enum: [
        "Paid",
        "Un Paid",
        "Partially Paid",
        "Cancelled",
        "Refunded",
      ],
      default: "Un Paid",
    },

    sub_total: {
      type: String,
      default: null,
    },

    discount_amount: {
      type: String,
      default: null,
    },

    tax_amount: {
      type: String,
      default: null,
    },

    shipping_charges: {
      type: String,
      default: null,
    },

    total_amount: {
      type: String,
      default: null,
    },

    paid_amount: {
      type: String,
      default: null,
    },

    notes: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "invoices",
  }
);

module.exports = mongoose.model("Invoice", invoiceSchema);