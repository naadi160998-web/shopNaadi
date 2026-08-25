const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    vendor_name: {
      type: String,
      default: null,
      trim: true,
    },

    vendor_email: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
    },

    vendor_password: {
      type: String,
      default: null,
      trim: true,
    },

    vendor_address: {
      type: String,
      default: null,
      trim: true,
    },

    vendor_mobile: {
      type: String,
      default: null,
      trim: true,
    },

    vendor_company_name: {
      type: String,
      default: null,
      trim: true,
    },

    profile_img_name: {
      type: String,
      default: null,
      trim: true,
    },

    profile_path: {
      type: String,
      default: null,
      trim: true,
    },

    role_id: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vendor", vendorSchema);