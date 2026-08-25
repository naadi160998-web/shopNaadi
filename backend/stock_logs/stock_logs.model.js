const mongoose = require("mongoose");

const stockLogsSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },

    warehouse_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      default: null,
    },

    movement_type: {
      type: String,
      enum: [
        "stock_in",
        "stock_out",
        "return",
        "adjustment",
      ],
      default: null,
    },

    quantity: {
      type: Number,
      default: 0,
    },

    notes: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("StockLogs", stockLogsSchema);