const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },

    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      default: null,
    },

    payment_reference: {
      type: String,
      default: null,
      trim: true,
    },

    payment_method: {
      type: String,
      enum: [
        "COD",
        "UPI",
        "CARD",
        "NETBANKING",
      ],
      default: null,
    },

    payment_gateway: {
      type: String,
      enum: [
        "Razorpay",
        "Stripe",
        "Paypal",
      ],
      default: null,
    },

    payment_status: {
      type: String,
      enum: [
        "pending",
        "success",
        "failed",
        "refunded",
        "paid failed",
      ],
      default: "pending",
    },

    currency: {
      type: String,
      default: "INR",
      trim: true,
    },

    amt_desc: {
      type: Number,
      default: 0,
    },

    gateway_fee: {
      type: Number,
      default: 0,
    },

    tax_amt: {
      type: Number,
      default: 0,
    },

    refund_amt: {
      type: Number,
      default: 0,
    },

    payment_date: {
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
    collection: "payments",
  }
);

module.exports = mongoose.model("Payment", paymentSchema);