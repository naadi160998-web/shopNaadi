const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },

    qty: {
      type: Number,
      default: 0,
    },

    warehouse_name: {
      type: String,
      default: null,
      trim: true,
    },

    city: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Warehouse", warehouseSchema);