const mongoose = require("mongoose");

const billingAddressSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      default: null,
    },

    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      default: null,
    },

    company_name: {
      type: String,
      default: null,
      trim: true,
    },

    email: {
      type: String,
      default: null,
      trim: true,
    },

    phone: {
      type: String,
      default: null,
      trim: true,
    },

    address: {
      type: String,
      default: null,
    },

    city: {
      type: String,
      default: null,
    },

    state: {
      type: String,
      default: null,
    },

    country: {
      type: String,
      default: null,
    },

    postal_code: {
      type: String,
      default: null,
    },

    gst_number: {
      type: String,
      default: null,
      trim: true,
    },

    address_type: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "billingaddresses",
  }
);

module.exports = mongoose.model(
  "BillingAddress",
  billingAddressSchema
);