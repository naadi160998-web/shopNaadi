const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema(
  {
    return_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Return",
      default: null,
    },

    payment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      default: null,
    },

    refund_amount: {
      type: Number,
      default: 0,
    },

    refund_status: {
      type: String,
      enum: [
        "pending",
        "processed",
        "failed",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Refund", refundSchema);