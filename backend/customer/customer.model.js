const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      default: null,
      trim: true,
    },

    customer_email: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
    },

    customer_password: {
      type: String,
      default: null,
    },

    customer_address: {
      type: String,
      default: null,
    },

    customer_mobile: {
      type: String,
      default: null,
      trim: true,
    },

    profile_img_name: {
      type: String,
      default: null,
    },

    profile_path: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "customers",
  }
);

module.exports = mongoose.model("Customer", customerSchema);