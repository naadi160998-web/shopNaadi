const mongoose = require("mongoose");

const returnProductSchema = new mongoose.Schema(
  {
    order_items_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      default: null,
    },

    status: {
      type: String,
      enum: [
        "requested",
        "approved",
        "rejected",
        "completed",
      ],
      default: "requested",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ReturnProduct",
  returnProductSchema
);