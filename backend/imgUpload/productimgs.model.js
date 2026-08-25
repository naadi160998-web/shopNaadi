const mongoose = require("mongoose");

const productImgSrcSchema = new mongoose.Schema(
  {
    product_img_src: {
      type: String,
      default: null,
      trim: true,
    },

    vendor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      default: null,
    },

    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },

    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model(
  "ProductImgSrc",
  productImgSrcSchema
);