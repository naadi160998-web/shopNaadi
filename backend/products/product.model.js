const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      default: null,
      trim: true,
    },

    product_desc: {
      type: String,
      default: null,
      trim: true,
    },

    old_price: {
      type: Number,
      default: 0,
    },

    new_price: {
      type: Number,
      default: 0,
    },

    product_gender: {
      type: String,
      default: null,
      trim: true,
    },

    product_dealer: {
      type: String,
      default: null,
      trim: true,
    },

    product_discount: {
      type: Number,
      default: 0,
    },

    product_size: {
      type: String,
      default: null,
      trim: true,
    },

    product_color: {
      type: String,
      default: null,
      trim: true,
    },

    product_brand: {
      type: String,
      default: null,
      trim: true,
    },

    product_type: {
      type: String,
      default: null,
      trim: true,
    },

    supplier_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      default: null,
    },

    vendor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      default: null,
    },

    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "products",
  }
);

module.exports = mongoose.model("Product", productSchema);