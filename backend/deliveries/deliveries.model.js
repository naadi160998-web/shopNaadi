const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
  {
    shipment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shipment",
        default: null,
    },

    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      default: null,
    },

    delivered_to: {
      type: String,
      default: null,
      trim: true,
    },

    receivered_phone: {
      type: String,
      default: null,
      trim: true,
    },

    received_by: {
      type: String,
      default: null,
      trim: true,
    },

    delivery_status: {
      type: String,
      enum: [
        "pending",
        "out_of_delivery",
        "delivered",
        "failed",
        "returned",
      ],
      default: "pending",
    },

    proof_of_delivery_url: {
      type: String,
      default: null,
      trim: true,
    },

    otp_verified: {
      type: Boolean,
      default: false,
    },

    delivery_otp: {
      type: String,
      default: null,
    },

    delivery_at: {
      type: Date,
      default: null,
    },

    failed_reason: {
      type: String,
      default: null,
    },

    remarks: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "deliveries",
  }
);

module.exports = mongoose.model("Delivery", deliverySchema);