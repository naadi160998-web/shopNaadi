const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      default: null,
    },

    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },

    invoice_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      default: null,
    },

    warehouse_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      default: null,
    },

    courier_name: {
      type: String,
      default: null,
      trim: true,
    },

    tracking_number: {
      type: String,
      default: null,
      trim: true,
    },

    shipping_method: {
      type: String,
      enum: [
        "standard",
        "express",
        "same_day",
        "pick_up",
        "Refunded",
      ],
      default: null,
    },

    shipping_status: {
      type: String,
      enum: [
        "pending",
        "packed",
        "dispatched",
        "in_transit",
        "out_of_delivery",
        "delivered",
        "returned",
        "cancelled",
      ],
      default: "pending",
    },

    estimated_delivery: {
      type: Date,
      default: null,
    },

    dispatched_at: {
      type: Date,
      default: null,
    },

    shipped_at: {
      type: Date,
      default: null,
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

module.exports = mongoose.model("Shipment", shipmentSchema);