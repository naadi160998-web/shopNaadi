const mongoose = require("mongoose");

const purchaseOrderSchema = new mongoose.Schema(
  {
    suppliers_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      default: null,
    },

    warehouse_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      default: null,
    },

    order_date: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "received",
        "cancelled",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PurchaseOrder",
  purchaseOrderSchema
);