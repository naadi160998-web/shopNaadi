const mongoose = require("mongoose");

const suppliersSchema = new mongoose.Schema(
  {
    suppliers_name: {
      type: String,
      default: null,
      trim: true,
    },

    contact_person: {
      type: String,
      default: null,
      trim: true,
    },

    email: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
    },

    mobile: {
      type: String,
      default: null,
      trim: true,
    },

    address: {
      type: String,
      default: null,
      trim: true,
    },

    city: {
      type: String,
      default: null,
      trim: true,
    },

    state: {
      type: String,
      default: null,
      trim: true,
    },

    pincode: {
      type: String,
      default: null,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "active",
        "inactive",
      ],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Supplier", suppliersSchema);