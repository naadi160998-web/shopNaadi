const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    order_number: {
      type: String,
      default: null,
      unique: true,
      trim: true,
    },

    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      default: null,
    },

    date: {
      type: Date,
      default: null,
    },

    total_amount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Packed",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
    collection: "orders",
  }
);

module.exports = mongoose.model("Order", orderSchema);